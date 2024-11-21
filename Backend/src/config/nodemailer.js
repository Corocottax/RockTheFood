const nodemailer = require("nodemailer");

// Configurar el transporter con el servicio de correo que vas a usar (Gmail en este caso)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmail = (email, name, id, token) => {

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Verifica tu cuenta",
    text: `Hola ${name}, por favor verifica tu cuenta en Rock The Food haciendo clic en el siguiente enlace.`,
    html: `<h1>Verifica tu cuenta</h1><p>Hola ${name}, por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="https://rock-the-food-8z1x.vercel.app/verifyaccount/${id}/${token}">Verificar cuenta</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).send("Error enviando el correo.");
    } else {
      console.log("Correo enviado:", info.response);
      res.status(200).send("Correo enviado exitosamente.");
    }
  });
};

module.exports = { sendEmail };
