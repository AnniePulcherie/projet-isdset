const { UniteEnseignement } = require('../models.js/models'); // Importez le modèle Sequelize

const UniteEnseignementController = {
  createUniteEnseignement: async (req, res) => {
    try {
      const uniteEnseignement = await UniteEnseignement.create(req.body);
      return res.status(201).json(uniteEnseignement);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'unité d\'enseignement' });
    }
  },

  getAllUniteEnseignements: async (req, res) => {
    try {
      const unitesEnseignement = await UniteEnseignement.findAll();
      return res.status(200).json(unitesEnseignement);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des unités d\'enseignement' });
    }
  },

  getUniteEnseignementById: async (req, res) => {
    try {
      const uniteEnseignement = await UniteEnseignement.findByPk(req.params.id);
      if (!uniteEnseignement) {
        return res.status(404).json({ error: 'Unité d\'enseignement non trouvée' });
      }
      return res.status(200).json(uniteEnseignement);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'unité d\'enseignement' });
    }
  },

  getUniteByFiliere: async (req, res) => {
    console.log(req.params.id);
    try {
      const ues = await UniteEnseignement.findAll({
        where: { FiliereId: req.params.id },
       
      });
      console.log(ues);
      if (!ues || ues.length === 0) { // Vérifie si le tableau est vide
        return res.status(404).json({ error: 'Unités d\'enseignement non trouvées' });
      }
      return res.status(200).json(ues);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erreur lors de la récupération des unités d\'enseignement' });
    }
  },
  

  updateUniteEnseignement: async (req, res) => {
    console.log( "body",req.body);
  const {code, nom,type, competencesVise, objectif, FiliereId} = req.body;
    try {
      const updatedUniteEnseignement = await UniteEnseignement.update(
        {code, nom,type, competencesVise, objectif, FiliereId},
         {where: { id: req.params.id } }
      );
      
      return res.status(200).json(updatedUniteEnseignement);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'unité d\'enseignement' });
    }
  },

  deleteUniteEnseignement: async (req, res) => {
    try {
      const rowsDeleted = await UniteEnseignement.destroy({ where: { id: req.params.id } });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'Unité d\'enseignement non trouvée' });
      }
      return res.status(204).send(); // Réponse sans contenu pour une suppression réussie
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de la suppression de l\'unité d\'enseignement' });
    }
  },
};

module.exports = UniteEnseignementController;
