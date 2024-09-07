const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Pour générer des noms de fichiers uniques

// Initialisation de Firebase Admin SDK
if (!process.env.SERVICE_ACCOUNT_KEY) {
  throw new Error('La variable d\'environnement FIREBASE_SERVICE_ACCOUNT_JSON est manquante');
}

const serviceAccount = process.env.SERVICE_ACCOUNT_KEY; // Chemin vers le fichier de clé de compte de service

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET, 
});

// Récupération de la référence du bucket
const bucket = admin.storage().bucket();

// Configuration de Multer pour stocker les fichiers en mémoire
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/i)) {
      return cb(new Error('Only upload files with jpg, jpeg, png, pdf, doc, docx format.'));
    }
    cb(null, true);
  },
  
});

// Middleware pour le traitement de l'upload et l'envoi vers Firebase Storage
const uploadToFirebase = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }

  // Générer un nom unique pour le fichier
  const blob = bucket.file(`uploads/${uuidv4()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    next(err);
  });

  blobStream.on('finish', () => {
    // Le fichier a été téléchargé avec succès
    blob.makePublic().then(() => {
      req.file.firebaseUrl = `${process.env.STORAGE_URL}${bucket.name}/${blob.name}`;
      next();
    }).catch((err) => {
      return res.status(500).send({ error: 'Error making file public.' });
    });
    
  });

  blobStream.end(req.file.buffer);
};

module.exports = { upload, uploadToFirebase };
