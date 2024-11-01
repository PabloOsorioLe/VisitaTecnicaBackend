require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const pdf = require('html-pdf'); // Importar html-pdf

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.send('API de envío de correos y generación de PDF está en funcionamiento.');
});

// Ruta para enviar el correo
app.post('/api/send-email', (req, res) => {
  const {
    cliente,
    fecha,
    direccion,
    faenaLugar,
    maquina,
    entrada,
    salida,
    destinatario,
    equipo,
    horas,
    trabajoRealizado,
    estadoMaquina,
    trabajoEfectuados,
    observaciones,
    lubricantes,
    estadoFiltros,
  } = req.body;

  // Configura el transporte del correo
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambiado a Gmail
    auth: {
      user: process.env.EMAIL, // Tu correo de Gmail
      pass: process.env.PASSWORD, // Tu contraseña de aplicación de Gmail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: destinatario,
    subject: 'Factura de Servicio',
    html: `
      <div id="pdf-content" class="datos" style="padding: 5px; width: 90%; max-width: 800px; margin: 0 auto; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333; margin: 0;">Factura de Servicio</h2>
        <h3 style="font-size: 1.4em; color: #333; margin: 0;">Informe Técnico</h3>
        
        <div style="padding: 5px; border: 1px solid #ccc; border-radius: 10px; margin-bottom: 15px;">
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 2;">
              <strong>Cliente:</strong>
              <p>${cliente}</p>
            </div>
            <div style="flex: 1;">
              <strong>Fecha:</strong>
              <p>${fecha}</p>
            </div>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 2;">
              <strong>Dirección:</strong>
              <p>${direccion}</p>
            </div>
            <div style="flex: 1;">
              <strong>Faena Lugar:</strong>
              <p>${faenaLugar}</p>
            </div>
          </div>
  
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 2;">
              <strong>Máquina:</strong>
              <p>${maquina}</p>
            </div>
            <div style="flex: 1;">
              <strong>Entrada:</strong>
              <p>${entrada}</p>
            </div>
            <div style="flex: 1;">
              <strong>Salida:</strong>
              <p>${salida}</p>
            </div>
          </div>
  
          <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div style="flex: 2;">
              <strong>Equipo:</strong>
              <p>${equipo}</p>
            </div>
            <div style="flex: 1;">
              <strong>Horas:</strong>
              <p>${horas}</p>
            </div>
          </div>
  
          <div style="margin-bottom: 15px;">
            <strong>Trabajo Realizado:</strong>
            <p>${trabajoRealizado}</p>
          </div>
          
        </div>
  
        <h3 style="font-size: 1.4em; color: #333;">Lubricantes empleados</h3>
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Carter:</strong>
            <p>${lubricantes.carter}</p>
          </div>
          
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Transmisión:</strong>
            <p>${lubricantes.transmision}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Caja:</strong>
            <p>${lubricantes.caja}</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Diferencial:</strong>
            <p>${lubricantes.diferencial}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Hidráulico:</strong>
            <p>${lubricantes.hidraulico}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Grasas:</strong>
            <p>${lubricantes.grasas}</p>
          </div>
        </div>
  
        <h3 style="font-size: 1.4em; color: #333;">Estado Filtros</h3>
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Motor:</strong>
            <p>${estadoFiltros.motor}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Aire:</strong>
            <p>${estadoFiltros.aire}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Convertidor:</strong>
            <p>${estadoFiltros.convertidor}</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Hidráulico:</strong>
            <p>${estadoFiltros.hidraulico}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Respiraderos:</strong>
            <p>${estadoFiltros.respiraderos}</p>
          </div>
          <div style="flex: 2;">
            <strong style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">Combustible:</strong>
            <p>${estadoFiltros.combustible}</p>
          </div>
        </div>
  
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="margin-bottom: 15px;">
            <strong>Estado Máquina:</strong>
            <p>${estadoMaquina}</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="margin-bottom: 15px;">
            <strong>Trabajo Efectuados:</strong>
            <p>${trabajoEfectuados}</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
          <div style="margin-bottom: 15px;">
            <strong>Observaciones:</strong>
            <p>${observaciones}</p>
          </div>
        </div>
  
        <footer style="text-align: center; margin-top: 20px;">
          <p style="color: #777;">Este informe fue generado automáticamente por el sistema.</p>
        </footer>
      </div>
    `,
  };
  
  


  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).send({ message: 'Error al enviar el correo', error: error.toString() });
    }
    console.log("Correo enviado:", info.response);
    res.status(200).send({ message: 'Correo enviado con éxito', response: info.response });
  });
});

// Ruta para generar y descargar el PDF
app.post('/api/generate-pdf', (req, res) => {
  const {
    cliente,
    fecha,
    direccion,
    faenaLugar,
    maquina,
    entrada,
    salida,
    equipo,
    horas,
    trabajoRealizado,
    estadoMaquina,
    trabajoEfectuados,
    observaciones,
    lubricantes,
    estadoFiltros,
    destinatario,
  } = req.body; // Asegúrate de que estos campos estén en el cuerpo de la solicitud

  // Crea el contenido HTML para el PDF
  const htmlContent = `
  <div id="pdf-content" class="datos" style="padding: 5px; width: 90%; max-width: 800px; margin: 0 auto; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="text-align: center; color: #333; margin: 0;">Formulario de Registro</h2>
    
    <h3 style="font-size: 1.4em; color: #333; margin-bottom: 2px; margin: 0;">Informe Técnico</h3>
    
    <div style="padding: 5px; border: 1px solid #ccc; border-radius: 10px; margin-bottom: 2px;">
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <div style="flex: 2;">
          <label for="cliente" style="color: #555; margin-bottom: 10px; display: block;">Cliente:</label>
          <input type="text" id="cliente" name="cliente" placeholder="Ingrese el nombre del cliente" value="${cliente}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
        <div style="flex: 1;">
          <label for="fecha" style="color: #555; margin-bottom: 10px; display: block;">Fecha:</label>
          <input type="date" id="fecha" name="fecha" value="${fecha}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
      </div>
      
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <div style="flex: 2;">
          <label for="direccion" style="color: #555; margin-bottom: 10px; display: block;">Dirección:</label>
          <input type="text" id="direccion" name="direccion" placeholder="Ingrese la dirección" value="${direccion}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
        <div style="flex: 1;">
          <label for="faenaLugar" style="color: #555; margin-bottom: 10px; display: block;">Faena Lugar:</label>
          <input type="text" id="faenaLugar" name="faenaLugar" placeholder="Ingrese Faena/Lugar" value="${faenaLugar}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
      </div>
  
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <div style="flex: 2;">
          <label for="maquina" style="color: #555; margin-bottom: 10px; display: block;">Máquina:</label>
          <input type="text" id="maquina" name="maquina" placeholder="Ingrese el nombre de la máquina" value="${maquina}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
        <div style="flex: 1;">
          <label for="entrada" style="color: #555; margin-bottom: 10px; display: block;">Entrada:</label>
          <input type="time" id="entrada" name="entrada" value="${entrada}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
        <div style="flex: 1;">
          <label for="salida" style="color: #555; margin-bottom: 10px; display: block;">Salida:</label>
          <input type="time" id="salida" name="salida" value="${salida}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
      </div>
  
      <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <div style="flex: 2;">
          <label for="equipo" style="color: #555; margin-bottom: 10px; display: block;">Equipo:</label>
          <input type="text" id="equipo" name="equipo" placeholder="Ingrese el equipo" value="${equipo}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
        <div style="flex: 1;">
          <label for="horas" style="color: #555; margin-bottom: 10px; display: block;">Horas:</label>
          <input type="number" id="horas" name="horas" placeholder="Ingrese horas" value="${horas}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
        </div>
      </div>
  
      <div>
        <label for="trabajoRealizado" style="color: #555; margin-bottom: 10px; display: block;">Trabajo que realiza:</label>
        <textarea id="trabajoRealizado" name="trabajoRealizado" rows="4" style="width: 95%; padding: 5px; border: 1px solid #ddd; border-radius: 5px; resize: none; height: 20px;">${trabajoRealizado}</textarea>
      </div>
    </div>
  
    <h3 style="font-size: 1.4em; color: #333; margin-bottom: 0px; margin: 0;">Lubricantes empleados</h3>
    <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
      <div style="flex: 1;">
        <label for="carter" style="color: #555; display: block;">Carter:</label>
        <input type="text" id="carter" name="carter" value="${lubricantes.carter}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="transmision" style="color: #555; display: block;">Transmisión:</label>
        <input type="text" id="transmision" name="transmision" value="${lubricantes.transmision}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="caja" style="color: #555; display: block;">Caja:</label>
        <input type="text" id="caja" name="caja" value="${lubricantes.caja}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="diferencial" style="color: #555; display: block;">Diferencial:</label>
        <input type="text" id="diferencial" name="diferencial" value="${lubricantes.diferencial}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="hidraulico" style="color: #555; display: block;">Hidráulico:</label>
        <input type="text" id="hidraulico" name="hidraulico" value="${lubricantes.hidraulico}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="grasas" style="color: #555; display: block;">Grasas:</label>
        <input type="text" id="grasas" name="grasas" value="${lubricantes.grasas}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
    </div>
  
    <h3 style="font-size: 1.4em; color: #333; margin-bottom: 0px; margin: 0;">Estado Filtros</h3>
    <div style="display: flex; gap: 10px; border: 1px solid #ccc; border-radius: 10px; padding: 5px; margin-bottom: 15px;">
      <div style="flex: 1;">
        <label for="motor" style="color: #555; display: block;">Motor:</label>
        <input type="text" id="motor" name="motor" value="${estadoFiltros.motor}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="aire" style="color: #555; display: block;">Aire:</label>
        <input type="text" id="aire" name="aire" value="${estadoFiltros.aire}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="convertidor" style="color: #555; display: block;">Convertidor:</label>
        <input type="text" id="convertidor" name="convertidor" value="${estadoFiltros.convertidor}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="hidraulico" style="color: #555; display: block;">Hidráulico:</label>
        <input type="text" id="hidraulico" name="hidraulico" value="${estadoFiltros.hidraulico}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="respiradores" style="color: #555; display: block;">Respiraderos:</label>
        <input type="text" id="respiradores" name="respiradores" value="${estadoFiltros.respiraderos}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
      <div style="flex: 1;">
        <label for="combustible" style="color: #555; display: block;">Combustible:</label>
        <input type="text" id="combustible" name="combustible" value="${estadoFiltros.combustible}" style="width: 90%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
      </div>
    </div>
  
    <div style="padding: 10px 0;">
      <label for="estadoMaquina" style="color: #555; display: block;">Estado Máquina:</label>
      <input type="text" id="estadoMaquina" name="estadoMaquina" value="${estadoMaquina}" style="width: 95%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
    </div>
  
    <div style="padding: 10px 0;">
      <label for="trabajoEfectuados" style="color: #555; display: block;">Trabajo Efectuados:</label>
      <input type="text" id="trabajoEfectuados" name="trabajoEfectuados" value="${trabajoEfectuados}" style="width: 95%; padding: 5px; border: 1px solid #ddd; border-radius: 5px;" />
    </div>
  
    <div style="padding: 10px 0;">
      <label for="observaciones" style="color: #555; display: block;">Observaciones:</label>
      <textarea id="observaciones" name="observaciones" rows="4" style="width: 95%; padding: 5px; border: 1px solid #ddd; border-radius: 5px; resize: none; height: 20px;">${observaciones}</textarea>
    </div>
  
    <footer style="text-align: center; margin-top: 20px;">
      <p style="color: #777;">Este informe fue generado automáticamente por el sistema.</p>
    </footer>
  </div>
  `;

  // Configuración de opciones para el PDF
  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
  };

  // Generar PDF
  pdf.create(htmlContent, options).toFile('output.pdf', (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Enviar el PDF como respuesta
    res.download(result.filename, 'FacturaServicio.pdf', (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
