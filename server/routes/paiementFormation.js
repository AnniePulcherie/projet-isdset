const express = require('express');
const routerPF = express.Router();
const {getStudentEnrollmentsWithPayments} = require('../controllers/formationPayement');
routerPF.get('/:id',getStudentEnrollmentsWithPayments);

module.exports = routerPF;