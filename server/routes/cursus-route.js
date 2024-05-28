const { getCursus, createCursus, getCursusById, deleteCursus } = require('../controllers/cursusScolaire');

const routeCursus = require('express').Router();

routeCursus.post('/', createCursus);
routeCursus.get('/',getCursus);
routeCursus.get('/:id', getCursusById);
routeCursus.delete('/:id',deleteCursus);

module.exports = routeCursus;