const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Inicializa o multer com a configuração de armazenamento
const upload = multer({ storage: storage });

// Rota para upload de um único arquivo
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Informações do arquivo carregado
  res.send('Arquivo carregado com sucesso!');
});

// Rota para upload de múltiplos arquivos
app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
  console.log(req.files); // Informações dos arquivos carregados
  res.send('Arquivos carregados com sucesso!');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});