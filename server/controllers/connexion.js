// login.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Etudiant = require('../models.js/models');
const connexion = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    // Recherchez l'utilisateur dans la base de données par son email
    const etudiant = await Etudiant.findOne({ where: { mail } });

    if (!etudiant) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifiez le mot de passe
    const passwordMatch = await bcrypt.compare(password, etudiant.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Si les informations d'identification sont correctes, créez un token JWT
    const token = jwt.sign({ etudiantId: etudiant.id }, jwtSecret);

    // Renvoyez le nom de l'utilisateur dans la réponse
    res.status(200).json({ message: 'Connexion réussie', token, etudiantID: etudiant.id });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

module.exports = connexion;
