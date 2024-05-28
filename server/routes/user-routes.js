const express = require('express');
const connexion = require('../controllers/connexion');
const router = express.Router();
const userController = require('../controllers/userController'); // Importez le contrôleur des utilisateurs
const authMiddleware = require('../middleware/authMidllware');


// Lecture de tous les utilisateurs
router.get('/', authMiddleware, userController.getAllUsers);
//recuperer le profil
router.get('/:id', authMiddleware, userController.getUserById);
// Mise à jour d'un utilisateur
router.put('/:id', authMiddleware, userController.updateUserById);

// Suppression d'un utilisateur
router.delete('/:id', authMiddleware, userController.deleteUserById);


router.post('/login', connexion);


module.exports = router;
