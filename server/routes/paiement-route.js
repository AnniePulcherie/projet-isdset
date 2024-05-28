const { createPaiement, updatePaiement, getPaiementById, getPaiementByInscription, getAllPaiements, getTotalMoisPayes, getAllPaiementsEnAttente, getPaiementsEnAttenteByEtudiant } = require('../controllers/paiement');

const express = require('express');

const routePaiement = express.Router();

routePaiement.post('/',createPaiement);
routePaiement.get('/', getAllPaiements);
routePaiement.put('/:id', updatePaiement);
routePaiement.get('/:id', getPaiementById);
routePaiement.get('/etudiant/:id', getPaiementByInscription);
routePaiement.get('/nombreMois/:etudiantId/:formationId', getTotalMoisPayes);
routePaiement.get('/paiementEnAttente/total', getAllPaiementsEnAttente);
routePaiement.get('/paiementEnAttente/etudiant/:id', getPaiementsEnAttenteByEtudiant);

module.exports = routePaiement;