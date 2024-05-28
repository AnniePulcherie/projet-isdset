const anneeRoute = require('express').Router();
const {createAnneeUniversitaire, updateAnneeUniversitaire, deleteAnneeUniversitaire, getAllAnneeUniversitaire} = require('../controllers/anneeUController');

anneeRoute.post('/', createAnneeUniversitaire);
anneeRoute.put('/:id', updateAnneeUniversitaire);
anneeRoute.delete('/:id', deleteAnneeUniversitaire);
anneeRoute.get('/', getAllAnneeUniversitaire);

exports.module = anneeRoute;