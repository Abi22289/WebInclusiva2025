const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/transcribir", upload.single("audio"), async (req, res) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: req.file.path,
      model: "whisper-1",
      response_format: "text",
    });

    res.send(transcription);
  } catch (error) {
    console.error("Error al transcribir:", error);
    res.status(500).send("Error en la transcripción");
  }
});

app.listen(3000, () => {
  console.log("Servidor activo en http://localhost:3000");
});
