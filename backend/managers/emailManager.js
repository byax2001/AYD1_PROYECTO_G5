const nodemailer = require('nodemailer');
require('dotenv').config();

// Configurar el transporte SMTP
const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  }
});

exports.enviarEmailUser = async function (to, subject, username){

    const correo = {
        from: process.env.NODEMAILER_EMAIL,
        to: to,
        subject: subject,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Correo atractivo</title>
            <style>
                .container {
                    width: 600px;
                    margin: 0 auto;
                    font-family: Arial, sans-serif;
                }
                
                .image {
                    float: left;
                    margin-right: 20px;
                }
                
                .content {
                    float: right;
                    width: 350px;
                }
                
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-top: 0;
                }
                
                .description {
                    margin-top: 10px;
                }
                
                .button {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="image">
                    <img src="https://res.cloudinary.com/alex4191/image/upload/v1685731006/Alchilazo/ALCHILAZO_bpuyvh.png" alt="Imagen" width="200">
                </div>
                <div class="content">
                    <h1 class="title">Bienvenido Al Chilazo ${username}</h1>
                    <p class="description">Por tu registro Al chilazo, te da de regalo el codigo de bienvenida "NUEVO", usalo en tu siguiente compra para recibir un descuento de 15%</p>
                    <a class="button" href="https://www.google.com">Botón</a>
                </div>
            </div>
        </body>
        </html>
        
        `
      };


      transporter.sendMail(correo, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado exitosamente');
        }
      });
      

}