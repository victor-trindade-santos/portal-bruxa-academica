const nodemailer = require('nodemailer');

// Simples (para testes use SMTP do Gmail ou serviço próprio)
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8a7eb9d2cb1ad6",
    pass: "62bb94a6deb0ff"
  }
});

async function sendPasswordResetEmail(to, token) {
  await transporter.sendMail({
    from: '"Astrologia Site" <8a7eb9d2cb1ad6>',
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
