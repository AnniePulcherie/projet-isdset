
const { Etudiant, Filiere, InscriptionModulaire, UniteEnseignement, Module, InscriptionFormation, Formation } = require('../models.js/models');

// Fonction pour créer un nouvel étudiant
exports.creerEtudiant = async (req, res) => {
  try {
    console.log(req.body);
    const {nom ,
      prenom,
      nomPere, 
      nomMere ,
      dateDeNaissance ,
      lieuNaissance,
      situationMatrimoniale ,
      fonction ,
      telephone ,
      email,userId} = req.body;
    
    const cin = req.files['cin'][0].filename;
    const diplome = req.files['diplome'][0].filename;
    console.log(req.body);

      const etudiant = await Etudiant.findOne({
        where: {
          userId 
        },
      });
  
      if (!etudiant) {
        try{
          const nouvelEtudiant = await Etudiant.create({
            nom,
            prenom,
            nomPere, 
            nomMere ,
            dateDeNaissance ,
            lieuNaissance,
            situationMatrimoniale ,
            cin,
            diplome,
            fonction ,
            telephone ,
            email,userId});
         
          res.status(201).json({ message: 'Etudiant enregistré avec succès', nouvelEtudiant  });
        } catch (erreur) {
          console.error('Erreur lors de la création de l\'étudiant :', erreur);
          res.status(500).json({ message: 'Erreur lors de la création de l\'étudiant' });
        }
      }else{
        return res.status(404).json({ message: 'Étudiant existe' });
      }
    }catch(e){
      console.error('Erreur lors de recherche de l\'étudiant :', e);
          res.status(500).json({ message: 'Erreur lors de la recherche de l\'étudiant' });
    }
};

// Fonction pour mettre à jour un étudiant existant
exports.modifierEtudiant = async (req, res) => {
  const etudiantId = req.params.id;

  try {
    const etudiant = await Etudiant.findByPk(etudiantId);

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    await Etudiant.update(req.body );

    res.json(etudiant);
  } catch (erreur) {
    console.error('Erreur lors de la modification de l\'étudiant :', erreur);
    res.status(500).json({ message: 'Erreur lors de la modification de l\'étudiant' });
  }
};

// Fonction pour supprimer un étudiant
exports.supprimerEtudiant = async (req, res) => {
  const etudiantId = req.params.id;

  try {
    const etudiant = await Etudiant.findByPk(etudiantId);

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    await etudiant.destroy();
    res.json({ message: 'Étudiant supprimé avec succès' });
  } catch (erreur) {
    console.error('Erreur lors de la suppression de l\'étudiant :', erreur);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'étudiant' });
  }
};

// Fonction pour récupérer un étudiant par son ID
exports.obtenirEtudiantParId = async (req, res) => {
  const etudiantId = req.params.id;

  try {
    const etudiant = await Etudiant.findByPk(etudiantId);

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    res.json(etudiant);
  } catch (erreur) {
    console.error('Erreur lors de la récupération de l\'étudiant :', erreur);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'étudiant' });
  }
};

exports.etudiantByUser = async(req,res) =>{
  const {id} = req.params;
  try{
    const etudiant = await Etudiant.findOne({
      where:{
        userId: id
      }
    });
    console.log(etudiant);
    res.json({etudiant:etudiant});
  }catch(err){
    console.log(err);
  }
}

// Fonction pour récupérer tous les étudiants
exports.obtenirTousLesEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll();
    res.json(etudiants);
  } catch (erreur) {
    console.error('Erreur lors de la récupération de tous les étudiants :', erreur);
    res.status(500).json({ message: 'Erreur lors de la récupération de tous les étudiants' });
  }
};

exports.getEtudiantWithFiliere = async (req, res) =>{
  const {id} = req.params;
  let listeFormation = [];
  let modulaire = [];
  let inscription = [];
  let listeFilieres = [];
  let listeModule = [];

  const modules = await Etudiant.findByPk(id,{
    include:[{
      model: Module,
      through: {
        model:InscriptionModulaire,
        where:{
            paiement: true,
        }
      }
    }]
  })
  .then(inscriptionMod =>{
    if(inscriptionMod){
     
      modulaire = inscriptionMod.Modules;
    }
  })
  .catch(error =>{console.log(error)});

  inscription = await InscriptionFormation.findAll({where:
    {
      EtudiantId:id,
      etatInscription: true
  }});
  for (const m of inscription) {
    const formations = await Formation.findOne({ where: { id: m.FormationId } });
    listeFormation.push(formations);
  }
  
  for (const m of inscription){
    const filiere = await Filiere.findByPk(m.FiliereId, {
      include:{
        model: UniteEnseignement,
        include: [
          {
            model: Module,
          }
        ]
      }
      
    })
    .then(filiere =>{
      listeFilieres.push(filiere);
     const modulesListe = filiere.UniteEnseignements;
      if(modulesListe){
        for(let m of modulesListe){
          console.log("module", m.Modules);
          listeModule.push(m.Modules);
          
        }
        console.log(" liste module",listeModule);
        
      }
      
    }).catch(error =>{
      console.log(error);
    })
    

  }

  const reponse = {
    inscription: inscription, 
    listeFormation: listeFormation,
    listeFilieres:listeFilieres,
    listeModule : listeModule,
    modulaire:modulaire}
    res.json(reponse);
  };