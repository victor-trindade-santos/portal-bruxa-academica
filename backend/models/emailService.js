const nodemailer = require('nodemailer');

// Simples (para testes use SMTP do Gmail ou serviço próprio)
var transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: "astrologia868@gmail.com",
    pass: "srip bxjd ypwn iquk"
  }
});

async function sendPasswordResetEmail(to, token) {
  await transporter.sendMail({
    from: '"Astrologia Site" <astrologia868@gmail.com>',
    to,
    subject: 'Recuperação de senha',
    html: `
      <p>Você solicitou a recuperação de senha.</p>
      <p>Seu código de verificação é: <b>${token}</b></p>
      <p>O código expira em 15 minutos.</p>
    `
  });
}

module.exports = { sendPasswordResetEmail };
