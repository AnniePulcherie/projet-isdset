const express = require('express');
const routerEtudiant = express.Router();
const etudiant = require('../controllers/Etudiant');
const upload = require('../middleware/multer');

// const fileFields = [
//     {name: 'cin'},
//     {name: 'diplome' }
// ];
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, './uploads'); // Le dossier où les fichiers téléchargés seront stockés
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
  });
  
  const upload = multer({storage: storage});
// Créer un nouvel étudiant
app.post('/', upload.fields([{name: 'cin'},{name :'diplome'}]), etudiant.creerEtudiant);
// routerEtudiant.post('/',upload.fields(fileFields), etudiant.creerEtudiant);
routerEtudiant.get('/user/:id', etudiant.etudiantByUser);
// Mettre à jour un étudiant existant par son ID
routerEtudiant.put('/:id',upload.fields(fileFields), etudiant.modifierEtudiant);

// Supprimer un étudiant par son ID
routerEtudiant.delete('/:id', etudiant.supprimerEtudiant);

// Récupérer un étudiant par son ID
routerEtudiant.get('/:id', etudiant.obtenirEtudiantParId);

// Récupérer tous les étudiants
routerEtudiant.get('/', etudiant.obtenirTousLesEtudiants);
routerEtudiant.get('/filiere/:id', etudiant.getEtudiantWithFiliere);

module.exports = routerEtudiant;
