<?php
/**
 * /api/lead.php — proxy del frontend hacia el Google Apps Script.
 *
 * El frontend POSTea a /api/lead.php con el payload del formulario.
 * Este script lee la URL real del webhook desde un archivo de config
 * que vive FUERA del docroot (/home/$USER/ccg-config.php) y reenvía.
 *
 * Beneficio: la URL del Apps Script nunca llega al bundle JS ni al
 * navegador del visitante — solo existe en el servidor.
 *
 * Setup manual una sola vez en cPanel:
 *   File Manager → ve a /home/fbhvoiow/  (un nivel ARRIBA de public_html)
 *   Crea archivo "ccg-config.php" con este contenido:
 *
 *     <?php
 *     return [
 *       'sheets_webhook_url' => 'https://script.google.com/macros/s/.../exec',
 *     ];
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

// ─── Solo POST ────────────────────────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// ─── Carga config desde fuera del docroot ─────────────────────
$configPath = dirname($_SERVER['DOCUMENT_ROOT']) . '/ccg-config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config_missing']);
    exit;
}
$config = require $configPath;
$webhookUrl = is_array($config) ? ($config['sheets_webhook_url'] ?? '') : '';
if (!is_string($webhookUrl) || $webhookUrl === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'webhook_not_configured']);
    exit;
}

// ─── Lee el payload JSON del frontend ─────────────────────────
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '{}', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_payload']);
    exit;
}

// ─── Apostrofe en el teléfono para que Sheets lo trate como texto ─
// Google Sheets interpreta "+57..." como fórmula y marca error.
// Prefijar con "'" fuerza el tipo texto sin que el apóstrofe se vea
// en la celda.
if (isset($data['telefono']) && is_string($data['telefono']) && $data['telefono'] !== '') {
    if (substr($data['telefono'], 0, 1) !== "'") {
        $data['telefono'] = "'" . $data['telefono'];
    }
}

// ─── Honeypot anti-spam (opcional, descomenta si lo agregas al form) ─
// if (!empty($data['_hp'])) {
//     http_response_code(200);
//     echo json_encode(['ok' => true, 'spam' => true]);
//     exit;
// }

// ─── Reenvía al Apps Script ───────────────────────────────────
$body = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$ch = curl_init($webhookUrl);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $body,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: text/plain;charset=utf-8',
        'Content-Length: ' . strlen($body),
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_CONNECTTIMEOUT => 5,
]);

$response   = curl_exec($ch);
$httpCode   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError  = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode >= 400) {
    error_log('CCG lead proxy upstream error: ' . $curlError . ' (HTTP ' . $httpCode . ')');
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'upstream_error', 'status' => $httpCode]);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true]);
