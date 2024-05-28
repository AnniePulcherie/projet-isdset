const { InscriptionFormation, Formation, Etudiant, EtudiantFiliere, Filiere, InscriptionModulaire} = require('../models.js/models')


const getStatistique = async (req, res) => {
  try {
    // Requête Sequelize pour obtenir le nombre d'inscrits par filière avec le nom de la filière
    const statsByFiliere = await InscriptionFormation.findAll({
      attributes: [
        [InscriptionFormation.sequelize.fn('COUNT', InscriptionFormation.sequelize.col('InscriptionFormation.id')), 'totalInscrits']
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
    console.log("reponse statbyfiliere et niveau : ", statsByFiliere, statsByNiveau)
    res.json({ statsByFiliere, statsByNiveau });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};

const creatInscription = async (req, res) => {
  const {
    EtudiantId,
    FormationId,
    niveau,
    FiliereId,
    selectedModules,     
  } = req.body;
  console.log("body", req.body);
  let createdInscriptions = [];
  try {
    if(selectedModules){
      for(module of selectedModules){
        const inscriptions = {
          EtudiantId,
          FormationId,
          niveau,
          FiliereId,
          ModuleId:module,
          
        };
    // Créez les enregistrements d'inscription en utilisant la méthode .createMany() si disponible
        const createdInscription = await InscriptionFormation.create(inscriptions);
        createdInscriptions.push(createdInscription);
      
      }
      console.log("inscription",createdInscriptions);
    }
    else{
     createdInscriptions = await InscriptionFormation.create(req.body);
     const rechercheFiliereInscrit = await EtudiantFiliere.findAll({where:{
      FiliereId,
      EtudiantId
     }});
     if(!rechercheFiliereInscrit){
      const creationFiliere = await EtudiantFiliere.create({EtudiantId,FiliereId});
      console.log(creationFiliere);
     }
     
     
    }
    console.log(createdInscriptions);
    res.status(201).json(createdInscriptions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'inscription." });
  }
};

const getInscriptionByEtudiant = async(req, res)=>{
  const {id} = req.params;
  try{
      const formation = await InscriptionFormation.findAll(
        { where:
          {EtudiantId: id}
        });
        console.log(formation);
        res.status(204).json(formation);
  }catch(err){
    console.log(err);
  }
}

const getInscription = async(req, res) =>{
    try {
        const inscriptions = await InscriptionFormation.findAll();
        const nombreInscription = inscriptions.length
        res.json(inscriptions, nombreInscription);
        console.log("inscription",inscriptions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des inscriptions.' });
      }
}

const updateInscription =async(req, res)=>{
    try {
        const { id } = req.params;
        const updatedFields = req.body; // Les champs à mettre à jour
    
        const inscription = await InscriptionFormation.findByPk(id);
    
        if (!inscription) {
          return res.status(404).json({ message: 'Inscription non trouvée.' });
        }
    
        // Mettez à jour les champs spécifiés
        await inscription.update(updatedFields);
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
    
        const inscription = await InscriptionFormation.findByPk(id);
    
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

const getFormation = async(req, res)=>{
const {id} = req.params;
  try {
    // Recherche de l'étudiant avec les formations associées
    const etudiant = await Etudiant.findByPk(id, {
      include: Formation, // Inclure les formations associées à l'étudiant
      
    });

    if (!etudiant) {
      return res.status(404).json({ error: 'Étudiant non trouvé.' });
    }

    // Récupération des formations de l'étudiant
    const formations = etudiant.Formations;
    console.log("FORMATION",formations);
    res.json(formations);
  } catch (error) {
    console.error('Erreur lors de la récupération des formations de l\'étudiant :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des formations de l\'étudiant.' });
  }
}

const getInscriptionNomPayer = async(req, res)=>{
  const id = req.params.id;
  try{
  const inscription = await InscriptionFormation.findAll({
    where:{
      etatInscription:false,
      EtudiantId: id
    }
  });
  const modulaire = await InscriptionModulaire.findAll({
    where: {
      paiement:false,
      EtudiantId:id
    }
});
  console.log("inscription",inscription);
 
  console.log("modulaire", modulaire);
  const reponse = {
    modulaire,
    inscription
  }
  console.log("reponse",reponse);
    res.status(200).json({reponse : reponse});
  }catch(error){
    console.log(error);
  }
  }
const lesInscrits = async(req, res)=>{
  try{
      const reponse = await InscriptionFormation.findAll({
        where:
        {etatInscription :true}
      });
      console.log("reponse nombre inscrit");
      const nbInscriptionPaye = reponse.length;
      res.json(nbInscriptionPaye);
  }catch(error){
    console.log(error);
  }
}
module.exports ={
    creatInscription,
    getInscription,
    updateInscription,
    deleteInscription,
    getInscriptionByEtudiant,
    getFormation,
    lesInscrits,
    getStatistique,
    getInscriptionNomPayer,
}