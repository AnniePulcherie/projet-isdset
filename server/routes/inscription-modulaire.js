// Dans votre fichier de routage (par exemple, inscriptionRoutes.js)
const express = require('express');
const { 
    creatInscription, getInscription, 
    updateInscription, deleteInscription, 
    getInscriptionByEtudiant, getFormation, 
    nombreInscriptionPayer, getStatsByFiliere, 
    lesInscrits, getStatistique, getInscriptionNomPayer 
} = require('../controllers/inscriptionModulaire');

const inscriptionModulaire = express.Router();

inscriptionModulaire.post('/',creatInscription);
inscriptionModulaire.get('/', getInscription);
inscriptionModulaire.put('/:id', updateInscription);
inscriptionModulaire.delete('/:id', deleteInscription);
inscriptionModulaire.get('/:id',getInscriptionByEtudiant);
inscriptionModulaire.get('/formation/:id', getFormation);
inscriptionModulaire.get('/inscrits/payer', lesInscrits);
inscriptionModulaire.get('/total/inscrit',getStatistique);
inscriptionModulaire.get('/inscription/nonPayer/:id',getInscriptionNomPayer);
module.exports = inscriptionModulaire;
