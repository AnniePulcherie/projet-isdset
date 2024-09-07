const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./config/config.js');
const cors = require('cors');
const routeFormation = require('./routes/formation-routes.js');
const router = require('./routes/auth');
const routeFiliere = require('./routes/filiere-routes');
const passport = require('passport');
const session = require('express-session');
const moduleRoute = require('./routes/module-routes.js');
const routeCursus = require('./routes/cursus-route.js');
const inscriptionRouter = require('./routes/inscription-route.js');
const contactRouter = require('./routes/contact-route.js');
const routeUE = require('./routes/uniteEnseignementRoute.js');
const routeBancaire = require('./routes/paiementBancaire.js');
const routeMobile = require('./routes/paiementMobile.js');
const routePaiement = require('./routes/paiement-route.js');
const routerPF = require('./routes/paiementFormation.js');
const routerDownload = require('./routes/downoload.js');
const routePaiementRecu = require('./routes/routePaiementRecu.js');
const path = require('path');
const routerEtudiant = require('./routes/etudiant-routes.js');
//const upload = require('./middleware/multer.js');

const { creerEtudiant } = require('./controllers/Etudiant.js');
const multer = require('multer');
const { createFiliere, updateFiliere } = require('./controllers/filiereController.js');
const inscriptionModulaire = require('./routes/inscription-modulaire.js');
const etudiantFiliereR = require('./routes/inscription-intensive.js');
const { createModule } = require('./controllers/moduleController.js');
const routerUploads = require('./routes/uploads.js');
const { verification } = require('./controllers/verificationPaiement.js');
const { uploadToFirebase } = require('./middleware/multer.js');
const app = express();



const corsOptions = {
  origin: process.env.CLIENT_URL, // Autorise uniquement ce domaine à accéder à l'API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Autorise les cookies et les en-têtes d'authentification
  optionsSuccessStatus: 204, // Retourne un statut 204 pour les pré-vérifications (OPTIONS)
  allowedHeaders : ['Content-Type', 'multiform/form-data', 'application/json'],
};


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configuration de express-session

app.use(session({
  secret: process.env.SESSION_SECRET || 'my_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Mettre à true si vous utilisez HTTPS
}));
app.get('/', (req, res) => {
  res.send('Bonjour, le serveur fonctionne correctement !'); // Réponse simple pour la racine de l'URL
});

app.post('/etudiant/', upload.fields([{name: 'cin'},{name :'diplome'}]), uploadToFirebase, creerEtudiant);
app.post('/module/',upload.fields([{name: 'cours'},{name :'exercice'}]), uploadToFirebase, createModule);
app.post('/filiere/', upload.single('image'), uploadToFirebase, createFiliere);
app.put('/filiere/:id', upload.fields([{name:'image'}]), uploadToFirebase, updateFiliere);
app.use('/user',router);
app.use('/etudiant', routerEtudiant);
app.use('/formation',routeFormation);
app.use('/inscription', inscriptionModulaire); //inscriptionFormation
app.use('/inscriptionModulaire', inscriptionRouter); //inscription modulaire
app.use('/etudiantFiliere', etudiantFiliereR); //inscription Filiere
app.use('/filiere', routeFiliere);
app.use('/module',moduleRoute);
app.use('/cursus',routeCursus);
app.use('/contact', contactRouter);
app.use('/ue', routeUE);
app.use('/paiementMobile', routeMobile);
app.use('/paiementBancaire', routeBancaire);
app.use('/paiement', routePaiement);
app.use('/paiementFormation', routerPF);
app.use('/paiementRecu', routePaiementRecu);
app.use('/download', routerDownload);
app.use('/uploads', routerUploads);
app.get('/verification/:id', verification);
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.MYSQLPORT || 3001;

sequelize
.authenticate()
.then(()=>{
  console.log("création des tables effectué");
  return sequelize.sync();
}).then(()=>{
  app.listen(PORT, () => {
    
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
})
.catch((error)=>{
    console.log("presence de probleme dans connexion: ", error);
});