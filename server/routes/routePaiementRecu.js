const express = require('express');
const routePaiementRecu = express.Router();
const { createPaiement, getAllPaiement, updatePaiement, getPaiementById, verifierEtatPaiement } = require('../controllers/paiementRecu');
routePaiementRecu.post('/',createPaiement);
routePaiementRecu.get('/', getAllPaiement);
routePaiementRecu.put('/:id', updatePaiement);
routePaiementRecu.get('/:id', getPaiementById);
routePaiementRecu.get('/verification/:reference', verifierEtatPaiement);

module.exports = routePaiementRecu;