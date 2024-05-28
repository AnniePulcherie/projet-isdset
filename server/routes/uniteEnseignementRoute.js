const express = require('express');
const routeUE = express.Router();
const UniteEnseignementController = require('../controllers/uniteEnseignementController');

// Routes pour les opérations CRUD
routeUE.post('/', UniteEnseignementController.createUniteEnseignement);
routeUE.get('/', UniteEnseignementController.getAllUniteEnseignements);
routeUE.get('/:id', UniteEnseignementController.getUniteEnseignementById);
routeUE.get('/filiere/:id', UniteEnseignementController.getUniteByFiliere);
routeUE.put('/:id', UniteEnseignementController.updateUniteEnseignement);
routeUE.delete('/:id', UniteEnseignementController.deleteUniteEnseignement);

module.exports = routeUE;
