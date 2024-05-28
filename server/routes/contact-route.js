const express = require('express');
const routerContact = express.Router();
const {contacter } = require('../controllers/contact'); // Importez la fonction pour envoyer l'e-mail depuis le contrôleur

// Route pour gérer les messages de contact
routerContact.post('/', contacter);

module.exports = routerContact;
