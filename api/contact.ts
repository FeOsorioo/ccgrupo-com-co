import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, empresa, email, telefono, servicio, mensaje } = request.body;

  // Basic validation
  if (!nombre || !email || !mensaje) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER || "api",
      pass: process.env.MAILTRAP_PASS
    }
  });

  try {
    await transport.sendMail({
      from: '"CCGrupo Web" <no-reply@ccgrupo.com.co>',
      to: "contacto@ccgrupo.com.co", // Destinatario real
      subject: `Nuevo contacto: ${nombre} - ${empresa}`,
      html: `
        <h2>Nuevo mensaje desde el sitio web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    return response.status(500).json({ error: 'Failed to send email' });
  }
}
