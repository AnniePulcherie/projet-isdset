const { Filiere, Formation } = require('../models.js/models');

exports.createFiliere = async (req, res) => {
  const { nom, objectif, insertionProfessionnel, vacation,image } = req.body;
  console.log(req.file);
    console.log('file',req.file.filename);
    
  try {
    const nouvelleFiliere = await Filiere.create({
      
      nom,
      objectif,
      insertionProfessionnel,
      vacation,
      image: req.file.filename,
      
    });
    console.log(nouvelleFiliere);
    res.status(201).json(nouvelleFiliere);
  } catch (erreur) {
    console.error('Erreur lors de la création de la filière :', erreur);
    res.status(500).json({ message: 'Erreur lors de la création de la filière' });
  }
};

exports.updateFiliere = async (req, res) => {
    const filiereId = req.params.id;
  
    try {
      const filiere = await Filiere.findByPk(filiereId);
  
      if (!filiere) {
        return res.status(404).json({ message: 'Filière non trouvée' });
      }
  
      const { nom, objectif, insertionProfessionnel, vacation} = req.body;
      
      let data;
      if(req.files['image']){
         data = {
          nom,
          objectif,
          insertionProfessionnel,
          vacation,
          image: req.files['image'][0].filename,
        }}
        else{
            data = {
              nom,
              objectif,
              insertionProfessionnel,
              vacation,
            }
        }
      await filiere.update( data);
  
      res.json(filiere);
    } catch (erreur) {
      console.error('Erreur lors de la modification de la filière :', erreur);
      res.status(500).json({ message: 'Erreur lors de la modification de la filière' });
    }
  };
  
  exports.deleteFiliere = async (req, res) => {
    const filiereId = req.params.id;
  
    try {
      const filiere = await Filiere.findByPk(filiereId);
  
      if (!filiere) {
        return res.status(404).json({ message: 'Filière non trouvée' });
      }
  
      await filiere.destroy();
      res.json({ message: 'Filière supprimée avec succès' });
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la filière :', erreur);
      res.status(500).json({ message: 'Erreur lors de la suppression de la filière' });
    }
  };
  exports.getFiliereById = async (req, res) => {
    const filiereId = req.params.id;
  
    try {
      const filiere = await Filiere.findByPk(filiereId);
  
      if (!filiere) {
        return res.status(404).json({ message: 'Filière non trouvée' });
      }
      
      res.json(filiere);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de la filière :', erreur);
      res.status(500).json({ message: 'Erreur lors de la récupération de la filière' });
    }
  };
  exports.getAllFilieres = async (req, res) => {
    try {
      const filieres = await Filiere.findAll();
      console.log(filieres)  ;
      res.json(filieres);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de toutes les filières :', erreur);
      res.status(500).json({ message: 'Erreur lors de la récupération de toutes les filières' });
    }
  };
      