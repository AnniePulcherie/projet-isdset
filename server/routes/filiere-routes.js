const express = require('express');
const routeFiliere = express.Router();
const filiereController = require('../controllers/filiereController');
const { Filiere } = require('../models.js/models');
const upload = require('../middleware/multer')

// Créer une nouvelle filière
// routeFiliere.post('/', upload.single('image'),filiereController.createFiliere);
// // Mettre à jour une filière existante par son ID
// routeFiliere.put('/:id', upload.single('image'),filiereController.updateFiliere);

// Supprimer une filière par son ID
routeFiliere.delete('/:id', filiereController.deleteFiliere);

// Récupérer une filière par son ID
routeFiliere.get('/:id', filiereController.getFiliereById);

// Récupérer toutes les filières
routeFiliere.get('/', filiereController.getAllFilieres);

module.exports = routeFiliere;
