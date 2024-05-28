const { createPaiement, getAllPaiement, updatePaiement, getPaiementById } = require('../controllers/paiementMobile');

const express = require('express');
const routeMobile = express.Router();

routeMobile.post('/',createPaiement);
routeMobile.get('/', getAllPaiement);
routeMobile.put('/:id', updatePaiement);
routeMobile.get('/:id', getPaiementById);

module.exports = routeMobile;