const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('mysql://root:yOYYXZJNXhvHyCPBXospfnjexWKnmgXK@roundhouse.proxy.rlwy.net:23449/railway');

// Vérification de la connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database successfully.');
    // Votre code de sauvegarde ici
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
