/**
 * Shared helper that POSTs a lead payload to our PHP proxy at /api/lead.php.
 * The proxy reads the real Apps Script webhook URL from a config file
 * OUTSIDE the docroot (/home/$USER/ccg-config.php) so the URL never
 * leaves the server — it's not in the JS bundle, not in the network
 * tab, not in the GitHub repo.
 *
 * Used by both ContactModule and CareersModule so the column order
 * stays consistent across the two forms.
 *
 * Column layout on the sheet (must match the Apps Script):
 *   A  ID                  ← generated server-side (CCG-NNN)
 *   B  Fecha               ← server-side, dd/MM/yyyy America/Bogota
 *   C  Tipo de lead        ← "CONTACTO" | "NOSOTROS"
 *   D  Nombre Completo
 *   E  Teléfono            ← prefixed with "'" by the proxy so Sheets
 *                            stores it as text, not as a formula
 *   F  Correo
 *   G  Empresa
 *   H  Cargo
 *   I  Sector
 *   J  País                ← derived from phone country code in Spanish
 *   K  Tipo Contacto       ← server-side: Prospecto / Candidato per tipoLead
 *   L  Servicio de Interés
 *   M  Mensaje
 */

import { parsePhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import esLabels from 'react-phone-number-input/locale/es.json';

// Same-origin endpoint — no secrets in the client bundle. The PHP at
// /api/lead.php (lives in public_html/api/) reads the webhook URL from
// /home/$USER/ccg-config.php (outside the docroot) and forwards there.
const PROXY_URL = '/api/lead.php';

export type LeadType = 'CONTACTO' | 'NOSOTROS';

export interface LeadPayload {
  tipoLead: LeadType;
  nombre: string;
  telefono: string;     // E.164 from PhoneInput, or plain text fallback
  correo: string;
  empresa?: string;
  cargo?: string;
  sector?: string;
  servicio?: string;
  mensaje?: string;
}

/** Try to extract a human-readable country name from an E.164 phone number. */
function countryFromPhone(phone: string): string {
  if (!phone) return '';
  try {
    const parsed = parsePhoneNumber(phone);
    if (!parsed?.country) return '';
    const labels = esLabels as Record<string, string>;
    return labels[parsed.country] || parsed.country;
  } catch {
    return '';
  }
}

/** Pretty-format an E.164 phone as "+57 300 123 4567". Falls back to raw. */
function prettyPhone(phone: string): string {
  if (!phone) return '';
  try {
    return formatPhoneNumberIntl(phone) || phone;
  } catch {
    return phone;
  }
}

export async function sendLeadToSheets(payload: LeadPayload): Promise<void> {
  const body = {
    formularioOrigen: 'spa',
    timestamp: new Date().toISOString(),
    tipoLead: payload.tipoLead,
    nombre:   payload.nombre   ?? '',
    telefono: prettyPhone(payload.telefono ?? ''),
    correo:   payload.correo   ?? '',
    empresa:  payload.empresa  ?? '',
    cargo:    payload.cargo    ?? '',
    sector:   payload.sector   ?? '',
    pais:     countryFromPhone(payload.telefono ?? ''),
    servicio: payload.servicio ?? '',
    mensaje:  payload.mensaje  ?? '',
  };

  try {
    await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    /* fire-and-forget; EmailJS remains the primary notification channel */
  }
}
