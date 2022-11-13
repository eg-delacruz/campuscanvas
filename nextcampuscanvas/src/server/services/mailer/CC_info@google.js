//tutorial: https://www.youtube.com/watch?v=KjheexBLY4A
//File to send emails from campuscanvas.info@gmail.com

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_TRANSPORTER_USER,
    pass: process.env.MAILER_TRANSPORTER_PASSWORD,
  },
});

async function sendAuthStudentUserMail(receiver, link) {
  transporter.verify().then(() => {
    console.log('Server is ready to send messages');
  });

  const result = await transporter.sendMail({
    from: 'Campus Canvas <campuscanvas.info@gmail.com>', // sender address
    to: receiver,
    subject: 'Verificación de estudiante || No respondas a este email', // Subject line
    html: `
    <b>Ingresa a este enlace para autenticar tu cuenta de estudiante:</b>
    <a href="${link}">${link}</a>
    `, // html body
  });
  return result;
}

async function sendResetPasswordMail(receiver, link) {
  transporter.verify().then(() => {
    console.log('Server is ready to send messages');
  });

  const result = await transporter.sendMail({
    from: 'Campus Canvas <campuscanvas.info@gmail.com>', // sender address
    to: receiver,
    subject:
      'Petición para reestablecer contraseña || No respondas a este email', // Subject line
    html: `
    <b>Ingresa a este enlace para cambiar tu contraseña:</b>
    <a href="${link}">${link}</a>
    `, // html body
  });
  return result;
}

async function sendAccValidatedByStuIdMail(userEmail) {
  transporter.verify().then(() => {
    console.log('Server is ready to send messages');
  });

  const result = await transporter.sendMail({
    from: 'Campus Canvas <campuscanvas.info@gmail.com>', // sender address
    to: userEmail,
    subject: 'Tu cuenta ha sido verificada || No respondas a este email', // Subject line
    html: `
    <h3>¡Ya puedes disfrutar de tus beneficios de estudiante!</h3>
    <p>Hemos revisado tu documento de estudiante y te hemos dado de alta en nuestra plataforma.</p>
    <p>Para completar la verificación, haz click en el siguiente enlace a nuestra plataforma e inicia sesión: </p>

    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="border-radius: 2px;" bgcolor="#ad2146">
          <a href="https://www.campuscanvas.net/auth/cuenta_verificada" style="padding: 8px 12px; border: 1px solid #ad2146;border-radius: 5px;font-family: Arial, Helvetica, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
            Completar verificación           
          </a>
        </td>
      </tr>
    </table>

    <p>Si tienes alguna duda, estamos siempre disponibles para ti en <a href="https://www.campuscanvas.net/contacto">https://www.campuscanvas.net/contacto</a></p>
    <p>Saludos cordiales,</p>
    <p>El equipo de Campus Canvas</p>
    <p><img src="https://i.imgur.com/FXcN6YI.png"/></p>
    `, // html body
  });
  return result;
}

//IMPORTANT: body_reason has to be a string
async function sendRejectedAccValidationByStuId(userEmail, body_reason) {
  transporter.verify().then(() => {
    console.log('Server is ready to send messages');
  });

  const result = await transporter.sendMail({
    from: 'Campus Canvas <campuscanvas.info@gmail.com>', // sender address
    to: userEmail,
    subject:
      'Error al verificarte como estudiante || No respondas a este email', // Subject line
    html: `
    <h3>Hemos revisado tus documentos, pero ha habido un problema...</h3>
    <p>${body_reason}</p>
    <p>Para completar tu verificación, sube una identificación de estudiante válida.</p>

    <table cellspacing="0" cellpadding="0">
      <tr>
        <td style="border-radius: 2px;" bgcolor="#ad2146">
          <a href="https://www.campuscanvas.net/auth/login" style="padding: 8px 12px; border: 1px solid #ad2146;border-radius: 5px;font-family: Arial, Helvetica, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
            Subir documentos nuevamente          
          </a>
        </td>
      </tr>
    </table>

    <p>Si tienes alguna duda, estamos siempre disponibles para ti en <a href="https://www.campuscanvas.net/contacto">https://www.campuscanvas.net/contacto</a></p>
    <p>Saludos cordiales,</p>
    <p>El equipo de Campus Canvas</p>
    <p><img src="https://i.imgur.com/FXcN6YI.png"/></p>
    `, // html body
  });
  return result;
}

module.exports = {
  sendAuthStudentUserMail,
  sendResetPasswordMail,
  sendAccValidatedByStuIdMail,
  sendRejectedAccValidationByStuId,
};
