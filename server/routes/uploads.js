const express = require('express');
const routerUploads = express.Router();
const path = require('path');

// Définir la route pour les téléchargements
routerUploads.get('/:filename', (req, res) => {
  // Récupérer le nom de fichier depuis les paramètres d'URL
  const filename = req.params.filename;

  // Construire le chemin absolu du fichier à télécharger
  const filePath = path.join(__dirname, '../uploads', filename);
  console.log(filePath);
  // Envoyer le fichier en réponse
  res.sendFile(filePath, (err) => {
    if (err) {
      // Gérer les erreurs d'envoi de fichier
      console.error('Erreur lors de l\'envoi du fichier :', err);
      res.status(err.status || 500).send('Erreur lors du téléchargement du fichier.');
    } else {
      console.log('Le fichier a été envoyé avec succès.');
    }
  });
});

module.exports = routerUploads;
