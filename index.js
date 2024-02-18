const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

//app.use(express.static('public'));

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/enviar-correo', (req, res) => {
  const datosUsuario = req.body;
  const datosCotizador = req.body['cotizador'];

  console.log('Datos del formulario:', datosUsuario);
  console.log('Datos del formulario:', datosCotizador);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'danielugartecorrea1@gmail.com',
      pass: 'qedv phrf xaos xwnv'
    }
  });

  const mailOptions = {
    from: 'matriax39@gmail.com',
    to: 'contacto@cobertizoen1dia.cl',
    subject: 'Datos del usuario',
    text: `
      Nombre Completo: ${datosUsuario['nombre-completo']}
      Teléfono: ${datosUsuario['telefono']}
      Correo Electrónico: ${datosUsuario['correo-mail']}
      Medidas: ${datosCotizador.medidas}
      Techo/Vigas: ${datosCotizador.techo}
      Pilares/Poste: ${datosCotizador.pilares}
      N° Luces techo: ${datosCotizador.cantidadLuces}
      Tipo de luces techo: ${datosCotizador.tipoLucesTecho}
      Tipo de luces pilares: ${datosCotizador.tipoLucesPilares}
      Precio Referencial: ${datosCotizador.precioTotal}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
    res.status(200).json({ success: 'Correo electrónico enviado con éxito' });
  });
});

app.post('/enviar-correo2', (req, res) => {
  const datosContacto = req.body;

  console.log('Datos del formulario de contacto:', datosContacto);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'danielugartecorrea1@gmail.com',
      pass: 'qedv phrf xaos xwnv'
    }
  });

  const mailOptions = {
    from: 'matriax39@gmail.com',
    to: 'contacto@cobertizoen1dia.cl',
    subject: 'Datos de contacto',
    text: `
      Nombre Completo: ${datosContacto.nombre2}
      Teléfono Celular: ${datosContacto.telefono2}
      Correo Electrónico: ${datosContacto.correo2}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error al enviar el correo electrónico', message: 'Error al enviar el correo electrónico'  });
    }
    res.status(200).json({ success: 'Correo electrónico enviado con éxito', message: 'Correo electrónico enviado con éxito' });
    
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
