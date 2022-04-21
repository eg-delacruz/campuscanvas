//tutorial: https://www.youtube.com/watch?v=-rcRf7yswfM&t=75s
//File to send emails from campuscanvas.info@gmail.com

import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = process.env.MAILER_CLIENT_ID;
const CLIENT_SECRET = process.env.MAILER_CLIENT_SECRET;
const REDIRECT_URL = process.env.MAILER_REDIRECT_URL;
const REFRESH_TOKEN = process.env.MAILER_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

async function sendResetPasswordMail(receiver, link) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAILER_TRANSPORTER_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Campus Canvas <campuscanvas.info@gmail.com>',
      to: receiver,
      subject:
        'Petición para reestablecer contraseña || No respondas a este email',
      //text: link,
      //HTML is optional
      html: `<b>Ingresa a este enlace: ${link}</b>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendAuthStudentUserMail(receiver, link) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAILER_TRANSPORTER_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Campus Canvas <campuscanvas.info@gmail.com>',
      to: receiver,
      subject: 'Verificación de estudiante || No respondas a este email',
      //text: link,
      //HTML is optional
      html: `<b>Ingresa a este enlace para autenticar tu cuenta de estudiante: ${link}</b>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  sendResetPasswordMail,
  sendAuthStudentUserMail,
};

// //Poner esto donde se vaya a usar/enviar este email:
// sendMail()
//   .then((result) => {
//     console.log('Email sent...', result);
//   })
//   .catch((error) => {
//     console.log('Error sending email...', error);
//   });
