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

module.exports = {
  sendAuthStudentUserMail,
  sendResetPasswordMail,
};
