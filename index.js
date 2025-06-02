const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // si tienes tu frontend aquí

const upload = multer({ dest: 'uploads/' });

app.post('/transcribe', upload.single('audio'), (req, res) => {
  const audioPath = req.file.path;
  const outputPath = `${audioPath}.txt`;

  exec(`whisper ${audioPath} --language English --model base --output_format txt`, (err) => {
    if (err) {
      console.error('Error ejecutando whisper:', err);
      return res.status(500).send('Error al transcribir el audio.');
    }

    fs.readFile(outputPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error leyendo la transcripción.');
      }
      res.send({ text: data });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
