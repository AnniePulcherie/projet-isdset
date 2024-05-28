const express = require('express');
const routerDownload = express.Router();
const path = require('path');
const fs = require('fs');

// ...

routerDownload.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  const filePath = path.join(__dirname, '../uploads', filename);
    console.log(filePath);
  
  // Vérifier si le fichier existe
  if (fs.existsSync(filePath)) {
    // Définir les en-têtes pour le téléchargement
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf');

    // Créer un flux de lecture depuis le fichier
    const fileStream = fs.createReadStream(filePath);
    console.log("fileStream");
    // Pipe le flux de lecture dans la réponse
    fileStream.pipe(res);
  } else {
    console.log("ts hita");
    res.status(404).json({ message: 'Fichier non trouvé' });
  }
});

// ...

module.exports = routerDownload;
