const express = require('express');
const routeBancaire = express.Router();
const { createPaiement, getAllPaiement, updatePaiement, getPaiementById } = require('../controllers/paiementBancaire');
routeBancaire.post('/',createPaiement);
routeBancaire.get('/', getAllPaiement);
routeBancaire.put('/:id', updatePaiement);
routeBancaire.get('/:id', getPaiementById);

module.exports = routeBancaire;