import { Request, Response, RequestHandler } from 'express';
import nodemailer from 'nodemailer';

const EMAIL_TO = process.env.EMAIL_TO || '';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const sendContactController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, telefono, email, descripcion } = req.body;

    if (!nombre || !apellido || !telefono || !email || !descripcion) {
      res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos: nombre, apellido, telefono, email, descripcion',
      });
      return;
    }

    if (!EMAIL_TO || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.warn('[Contact] Email no configurado. Datos recibidos:', {
        nombre,
        apellido,
        telefono,
        email,
        descripcion,
      });
      res.status(503).json({
        success: false,
        message: 'El servicio de contacto no está configurado. Por favor, intente más tarde.',
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const html = `
      <h2>Nuevo contacto desde la landing Nexpo</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Apellido:</strong> ${apellido}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Descripción:</strong></p>
      <p>${descripcion.replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: SMTP_USER,
      to: EMAIL_TO,
      subject: `[Nexpo] Contacto: ${nombre} ${apellido}`,
      html,
      replyTo: email,
    });

    res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente',
    });
  } catch (error) {
    console.error('[Contact] Error enviando email:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intente más tarde.',
    });
  }
};
