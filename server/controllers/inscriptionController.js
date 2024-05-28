const { Inscription, Filiere, InscriptionModulaire, Formation, InscriptionFormation } = require('../models.js/models');
const { Op } = require('sequelize');

const getStatsByFiliere = async (req, res) => {
  try {
    // Requête Sequelize pour obtenir le nombre d'inscrits par filière avec le nom de la filière
    const statsByFiliere = await Inscription.findAll({
      attributes: [
        [Inscription.sequelize.fn('COUNT', InscriptionFormation.sequelize.col('InscriptionFormation.id')), 'totalInscrits']
      ],
      include: [{
        model: Filiere,
        attributes: ['nom'],
        where: {
          id: InscriptionFormation.sequelize.col('FiliereId')
        }
      }],
      group: ['Filiere.nom']
    });

    // Requête Sequelize pour obtenir le nombre total d'inscrits par niveau
    const statsByNiveau = await InscriptionFormation.findAll({
      attributes: [
        'niveau',
        [InscriptionFormation.sequelize.fn('COUNT', InscriptionFormation.sequelize.col('Inscription.id')), 'totalInscrits']
      ],
      group: ['niveau']
    });

    res.json({ statsByFiliere, statsByNiveau });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};

const creatInscription = async (req, res) => {
  let createdInscriptions = [];
  // Obtenez le nom du fichier diplôme
  try {  
    const {
      EtudiantId,
      FormationId,
      niveau,
      selectedModules,     
    } = req.body;
    if(selectedModules){
    for(module of selectedModules){
      const inscriptions = {
        EtudiantId,
        FormationId,
        ModuleId:module,
        
      };
  // Créez les enregistrements d'inscription en utilisant la méthode .createMany() si disponible
      const createdInscription = await InscriptionModulaire.create(inscriptions);
      createdInscriptions.push(createdInscription);
  
    }
    res.status(201).json(createdInscriptions);
  }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'inscription." });
  }
};

const getInscription = async(req, res) =>{
    try {
        const inscriptions = await InscriptionModulaire.findAll();
        res.json(inscriptions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des inscriptions.' });
      }
}

const updateInscription =async(req, res)=>{
    try {
        const { id } = req.params;
        const updatedFields = req.body; // Les champs à mettre à jour
    
        const inscription = await InscriptionModulaire.findByPk(id);
    
        if (!inscription) {
          return res.status(404).json({ message: 'Inscription non trouvée.' });
        }
    
        // Mettez à jour les champs spécifiés
        await InscriptionModulaire.update(updatedFields);
        console.log(inscription);
        res.json(inscription);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'inscription.' });
      }
}

const deleteInscription = async(req, res)=>{
    try {
        const { id } = req.params;
    
        const inscription = await InscriptionModulaire.findByPk(id);
    
        if (!inscription) {
          return res.status(404).json({ message: 'Inscription non trouvée.' });
        }
    
        await inscription.destroy();
    
        res.json({ message: 'Inscription supprimée avec succès.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'inscription.' });
      }
}
const getAllInscriptionByUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const inscriptions = await InscriptionModulaire.findAll({
      where: { 
        EtudiantId:id,
       
      }
    });

    const paiementsNonEffectues = inscriptions.filter(inscrit => !inscrit.paiement);
    const nbNonPaye = paiementsNonEffectues.length;
    let formation = [];
    if(nbNonPaye >0){
      formation = await Formation.findOne({where:{typeFormation: "Modulaire"}});
    }
    console.log(formation, nbNonPaye);
    res.json({ nbNonPaye , formation});
  } catch (error) {
    console.error('Erreur lors de la récupération des Inscriptions :', error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des Inscriptions." });
  }
};

module.exports ={
    creatInscription,
    getInscription,
    updateInscription,
    deleteInscription,
    getAllInscriptionByUser,
    getStatsByFiliere,
}