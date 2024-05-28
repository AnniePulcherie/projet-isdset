const { Module, Filiere, Inscription, Users } = require('../models.js/models');

exports.createModule = async (req, res) => {
  try {

    const filiere = await Filiere.findByPk(req.body.FiliereId);
    if(!filiere) {
      return res.status(404).json({message: 'La filière spécifiée n\'existe pas'});
    }
    const {nom, competencesVise,credit,semestre, FiliereId, UniteEnseignementId} = req.body;
    console.log(req.body);
    console.log(req.files);
    const cours = req.files['cours'][0].filename;
    const exercice = req.files['exercice'][0].filename;

    const nouveauModule = await Module.create({
      nom,
      competencesVise,
      cours,
      credit,
      exercice,
      semestre, 
      FiliereId, 
      UniteEnseignementId
    });

    res.status(201).json(nouveauModule);
  } catch (erreur) {
    console.error('Erreur lors de la création du module :', erreur);
    res.status(500).json({ message: 'Erreur lors de la création du module' });
  }
};

exports.getModuleBySemestreUe = async (req, res)=> {
  const {filiereId, semestre} = req.params;
  try{
    const module = await Module.findAll({
      where: {
        FiliereId: filiereId, // Filtrez par l'unité d'enseignement spécifiée
        semestre: semestre, // Filtrez par le numéro de semestre
      },
      
    })
    console.log('Modules du semestre', semestre, 'de l\'UE avec ID', filiereId);
    module.forEach((module) => {
      console.log('Nom du module :', module.nom);
      // Vous pouvez accéder à d'autres propriétés du module ici
    });
    res.status(200).json(module);
  }catch (error){
    console.log(error);
  }
}

exports.updateModule = async (req, res) => {
    const moduleId = req.params.id;
  
    try {
      const module = await Module.findByPk(moduleId);
  
      if (!module) {
        return res.status(404).json({ message: 'Module non trouvé' });
      }
  
      await module.update(req.body);
      await module.save();
      res.status(200).json(module);
    } catch (erreur) {
      console.error('Erreur lors de la modification du module :', erreur);
      res.status(500).json({ message: 'Erreur lors de la modification du module' });
    }
  };

  exports.deleteModule = async (req, res) => {
    const moduleId = req.params.id;
  
    try {
      const module = await Module.findByPk(moduleId);
  
      if (!module) {
        return res.status(404).json({ message: 'Module non trouvé' });
      }
  
      await module.destroy();
      res.status(204).json({ message: 'Module supprimé avec succès' });
    } catch (erreur) {
      console.error('Erreur lors de la suppression du module :', erreur);
      res.status(500).json({ message: 'Erreur lors de la suppression du module' });
    }
  };

  exports.getModuleById = async (req, res) => {
    const moduleId = req.params.id;
  
    try {
      const module = await Module.findByPk(moduleId);
  
      if (!module) {
        return res.status(404).json({ message: 'Module non trouvé' });
      }
  
      res.json(module);
    } catch (erreur) {
      console.error('Erreur lors de la récupération du module :', erreur);
      res.status(500).json({ message: 'Erreur lors de la récupération du module' });
    }
  };

  exports.getModuleByFiliere = async (req,res) =>{
    const FiliereId = req.params.id
    try {
      const modules = await Module.findAll({
        where: {FiliereId: FiliereId}, 
        
      });
      const nombreTotalModules = await Module.count({
        where: {
          FiliereId: FiliereId,
        },
      });
      console.log(modules);
      res.status(200).json({ modules, nombreTotalModules });
    }catch(erreur){
      res.status(500).json({message: 'Erreur lors de recuperation du module'});
    }
  }

  exports.getModuleBySemestre = async (req,res) =>{
    const {id, semestre} = req.params;
    console.log(req.params);
    console.log(id, semestre);
    try {
      const module = await Module.findAll({
        where: {
        FiliereId: id,
        semestre: semestre
      }
        
      });
      //console.log(module);
      res.status(200).json(module);
    }catch(erreur){
      res.status(500).json({message: 'Erreur lors de recuperation du module'});
    }
  }

  exports.getAllModules = async (req, res) => {
    try {
      const modules = await Module.findAll();
      res.json(modules);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de tous les modules :', erreur);
      res.status(500).json({ message: 'Erreur lors de la récupération de tous les modules' });
    }
  };
  
  
exports.getAllModuleUser = async (req, res) =>{

// Supposons que vous ayez l'ID de l'étudiant
const etudiantId = req.params.id; // Remplacez par l'ID réel de l'étudiant
console.log(req.params);
// Utilisez la méthode `findAll` de Sequelize pour effectuer la requête
 Module.findAll({
  include: [
    {
      model: Inscription,
      where: {
        userId: etudiantId, // Filtrer les inscriptions de l'étudiant
        // etatInscription: true // Filtrer les inscriptions avec etatInscription=true
      },
      include: [
        {
          model: Users // Inclure les données de l'utilisateur (facultatif)
        }
      ]
    }
  ]
})
  .then((modules) => {
    console.log('Modules où l\'étudiant a fait une inscription avec etatInscription=true:', modules);
    res.status(200).json(modules)
  })
  .catch((erreur) => {
    console.error('Erreur lors de la récupération des modules :', erreur);
  });
}

