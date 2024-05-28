const express = require('express');
const routeFormation = express.Router();
const formationController = require('../controllers/formationController');

// Créer une nouvelle formation
routeFormation.post('/', formationController.createFormation);

// Mettre à jour une formation existante par son ID
routeFormation.put('/:id', formationController.updateFormation);

// Supprimer une formation par son ID
routeFormation.delete('/:id', formationController.deleteFormation);

// Récupérer une formation par son ID
routeFormation.get('/:id', formationController.getFormationById);

// Récupérer toutes les 
routeFormation.get('/', formationController.getAllFormations);

module.exports = routeFormation;
