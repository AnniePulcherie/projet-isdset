const express = require('express');
const moduleRoute = express.Router();
const moduleController = require('../controllers/moduleController');
const upload = require('../middleware/multer');

const fileFields = [
    {name: 'cours'},
    {name: 'exercice' }
];
// Créer un nouveau module
moduleRoute.post('/', upload.fields(fileFields), moduleController.createModule);

// Mettre à jour un module existant par son ID
moduleRoute.put('/:id', moduleController.updateModule);

// Supprimer un module par son ID
moduleRoute.delete('/:id', moduleController.deleteModule);

// Récupérer un module par son ID
moduleRoute.get('/:id', moduleController.getModuleById);

// Récupérer tous les modules
moduleRoute.get('/', moduleController.getAllModules);

moduleRoute.get('/filiere/:id',moduleController.getModuleByFiliere);
moduleRoute.get('/semestre/:id/:id', moduleController.getModuleBySemestre);
moduleRoute.get('/modulaire/:id', moduleController.getAllModuleUser);
module.exports = moduleRoute;
