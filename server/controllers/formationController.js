// Importez le modèle Formation et Sequelize
const { Formation } = require('../models.js/models.js');

// Créez une route POST pour créer une nouvelle formation
exports.createFormation = async(req, res)=> {
  try {
    // Récupérez les données de formation depuis le corps de la requête (req.body)
    console.log(req.body);
    const { 
        typeFormation,
        duree,
        fraisGeneraux, 
        droitInscription, 
        droitExamen,
        ecolage,
        tranche,
        AnneeUniversitaireId,
         } = req.body;
         
    // Créez une nouvelle formation en utilisant le modèle Sequelize
    const nouvelleFormation = await Formation.create({
        typeFormation,
        duree,
        fraisGeneraux, 
        droitInscription, 
        droitExamen,
        ecolage,
        tranche,
        AnneeUniversitaireId,
    });

    // Renvoyez la nouvelle formation créée en tant que réponse
    res.status(201).json(nouvelleFormation);
  } catch (erreur) {
    console.error('Erreur lors de la création de la formation :', erreur);
    res.status(500).json({ message: 'Erreur lors de la création de la formation' });
  }
};

exports.updateFormation = async (req, res) => {
    const formationId = req.params.id;
  
    try {
      const formation = await Formation.findByPk(formationId);
  
      if (!formation) {
        return res.status(404).json({ message: 'Formation non trouvée' });
      }
  
      const {  
        typeFormation,
        duree,
        fraisGeneraux, 
        droitInscription, 
        droitExamen,
        ecolage,
        tranche,
        AnneeUniversitaireId } = req.body;
  
      await formation.update({
        typeFormation,
        duree,
        fraisGeneraux, 
        droitInscription, 
        droitExamen,
        ecolage,
        tranche,
        AnneeUniversitaireId,
        
      });
  
      res.json(formation);
    } catch (erreur) {
      console.error('Erreur lors de la modification de la formation :', erreur);
      res.status(500).json({ message: 'Erreur lors de la modification de la formation' });
    }
  };
  
  exports.deleteFormation = async (req, res) => {
    const formationId = req.params.id;
  
    try {
      const formation = await Formation.findByPk(formationId);
  
      if (!formation) {
        return res.status(404).json({ message: 'Formation non trouvée' });
      }
  
      await formation.destroy();
      res.json({ message: 'Formation supprimée avec succès' });
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la formation :', erreur);
      res.status(500).json({ message: 'Erreur lors de la suppression de la formation' });
    }
  };
  exports.getFormationById = async (req, res) => {
    const formationId = req.params.id;
  
    try {
      const formation = await Formation.findByPk(formationId);
  
      if (!formation) {
        return res.status(404).json({ message: 'Formation non trouvée' });
      }
  
      res.json(formation);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de la formation :', erreur);
      res.status(500).json({ message: 'Erreur lors de la récupération de la formation' });
    }
  };
    
  exports.getAllFormations = async (req, res) => {
    try {
      const formations = await Formation.findAll();
      res.json(formations);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de toutes les formations :', erreur);
      res.status(500).json({ message: 'Erreur lors de la récupération de toutes les formations' });
    }
  };
  