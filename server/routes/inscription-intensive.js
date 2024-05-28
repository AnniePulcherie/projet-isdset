// Dans votre fichier de routage (par exemple, inscriptionRoutes.js)
const express = require('express');
const { creatInscription, getInscription, updateInscription, deleteInscription, getInscriptionByEtudiant } = require('../controllers/inscriptionFiliere');
const etudiantFiliereR = express.Router();

etudiantFiliereR.post('/',creatInscription);
etudiantFiliereR.get('/', getInscription);
etudiantFiliereR.put('/:id',updateInscription);
etudiantFiliereR.delete('/:id', deleteInscription);
etudiantFiliereR.get('/:id', getInscriptionByEtudiant);

module.exports = etudiantFiliereR;
