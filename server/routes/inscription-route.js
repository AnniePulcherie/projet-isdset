const express = require('express');
const { creatInscription, getInscription, updateInscription, deleteInscription, getAllInscriptionByUser, getStatsByFiliere } = require('../controllers/inscriptionController');

const inscriptionRouter = express.Router();

inscriptionRouter.post('/', creatInscription);
inscriptionRouter.get('/', getInscription);
inscriptionRouter.put('/:id', updateInscription);
inscriptionRouter.delete('/:id', deleteInscription);
inscriptionRouter.get('/inscription/:id', getAllInscriptionByUser);
inscriptionRouter.get('/nombre', getStatsByFiliere);
module.exports = inscriptionRouter;
