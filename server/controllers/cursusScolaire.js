const {cursus, Users, CursusScolaire} = require('../models.js/models');

const createCursus = async (req, res) =>{
    try{
        const {annee, diplome, etablissementEtLieu, UserId} = req.body;

        const user = await Users.findByPk(UserId);
        if(!user){
            return res.status(404).json({ message: 'cette personne est introuvable'});

        }
        const cursus = await CursusScolaire.create({
            annee,
            diplome,
            etablissementEtLieu,
            UserId,
        });
        res.status(201).json(cursus);
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'il y avait une erreur'});
    }
};

const getCursus = async (req,res) =>{
    try{
        const cursus = await CursusScolaire.findAll();
        res.status(200).json(cursus);

    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'une erreur s\'est produite'});
    }

}

const getCursusById = async (req, res) =>{
    const cursusId = req.params.id;
    try{
       const cursus = await CursusScolaire.findByPk(cursusId);
       if(!cursus) {
        return res.status(404).json({message: 'cursus non trouver'});
       } 
       res.status(200).json(cursus);
    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'une erreur s\'est produite'});
    }
};

// Supprimer un module par son ID
const deleteCursus = async (req, res) => {
    const cursusId = req.params.id;
    try {
      // Vérifiez si le module existe
      const cursus = await CursusScolaire.findByPk(cursusId);
      if (!cursus) {
        return res.status(404).json({ message: 'Module non trouvé.' });
      }
  
      // Supprimez le module
      await cursus.destroy();
  
      res.status(204).json(); // Réponse vide pour indiquer que la suppression a réussi
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du module.' });
    }
  };
  
module.exports = {
    getCursus,
    deleteCursus,
    getCursusById,
    createCursus,
};
  