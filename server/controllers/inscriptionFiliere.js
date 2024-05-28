const { EtudiantFiliere} = require('../models.js/models')
const creatInscription = async (req, res) => {
  try {
    const {EtudiantId, FiliereId} = req.body;
    console.log(req.body);
    const etudiant = await EtudiantFiliere.findOne({
      where:{
        FiliereId : FiliereId,
        EtudiantId: EtudiantId
      }});
    if(!etudiant){
      const inscription = await EtudiantFiliere.create(req.body);
      res.status(201).json({message:'Votre inscription a été enregistrer', data:inscription});
    }else{
      res.json({message:"Vous êtes déjà isncrite à cette filière"});
    }  
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
    const inscription = await EtudiantFiliere.findAll({
      where : {
        EtudiantId : id
      }
    });
    res.json(inscription);
  }catch(err){
    console.log(err);
  }
}


const getInscription = async(req, res) =>{
    try {
        const inscriptions = await EtudiantFiliere.findAll();
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
    
        const inscription = await EtudiantFiliere.findByPk(id);
    
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
    
        const inscription = await EtudiantFiliere.findByPk(id);
    
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

module.exports ={
    creatInscription,
    getInscription,
    updateInscription,
    deleteInscription,
    getInscriptionByEtudiant
}