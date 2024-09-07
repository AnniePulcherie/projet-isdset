const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Pour générer des noms de fichiers uniques

// Initialisation de Firebase Admin SDK
if (!process.env.SERVICE_ACCOUNT_KEY) {
  throw new Error('La variable d\'environnement FIREBASE_SERVICE_ACCOUNT_JSON est manquante');
}

const serviceAccount = {
  "type": "service_account",
  "project_id": "formation-573d3",
  "private_key_id": "383a807c48d366c7e87b6b90bfcde798ab4ef69a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpFkmiGtNtRHiP\nawmtjcqiNE3lVmp0QIP7NM5YtRgr3L1ik+yBzqkWmvu8Ri7gIU6RWG1ujzWOEzmv\nq+eOdDg0w/etRw9o55UsprnpTArunvyeGNGS+oP74r9Udc0UBxWrlNR8gR4/wP2K\ny7Z0nF9/7RhujUp2EyOl9aOAz7y6igQ5424mKzu7Q66XQxdR4sM7I8lCtEiJq1MX\nHzeJ7Osir4ex+tmi9qX563EZeoFDw5MbRgQH1jKfiRHYVt6yoJDMVoLq9wh/Hk+L\nUfLBSUHdDK5rgrsBlNQ4jx+xB3LAPbZovRYafggIeD6JUC7V8UFv1Mzg+4pclrQP\nTa9VgPTXAgMBAAECggEAR/jsrsusYz5Z8vIk1HMeZZzN62i1N3aetzbq/mdXOpRj\nKKq+aSKGZtDhhmp5WX3T65owOndK3IbibxxFHCXsJsmji2ZL8ONiY/cz+1Ia9SdH\ncCQwUNfBhl4mAtWBzZyWZMqdB8IOFiUXxxSfPVOycsmBNM1/fHL5IZNFXXcPZnbX\nSz9WvBopXXHQbLuHdlu47fDD7WskS9BHGRlq9oVRHrjNFMWu21sShxQvh6aBurFp\ndkWFDgWgldAjFa658mu6pScYuta4JmYOCE4IeaGQAvapNEWjKljnxavPx2K0yTQ1\ntAKoCbqxkiWKUFLGnjFFaXiC19ZSoDeiX8BeYDJbQQKBgQDiBxY05dXvB/OhysK0\nzwU2tpY8WkRe599hkTIa1sALVn/L3xLm8wuR5d/y4J6X/blMKHFIFJuvQ+ujXq6B\nPX64lA4X72vtlolODa2mI3ri4Lr3o7Qt7T+cGf9fD+Ur3I3iRquEV+NMOzNWRQjz\nNLxKi1khYA7NDVroo6Q2e6nYUwKBgQC/gj/0NYhrieCNJH2OeEOtLCUi6Z7PNkY6\nHlUH/0386BEVoiH8g+y2hvO4HJywEmZy7WhXock+5yvZdjDGSM9/0cdfcEd2Q491\ngJ1RUW9t/oip+rHHASJSoq03KouEOpoIxR8KakKtlpUu1rIP8EbFdWynUNOuo8mc\nErsJG3eQ7QKBgQDTECcOcmjZcqVwubQjvwVxWALmjKw3q3KO21TcdxiR/c4MhFxU\nSTTOosgDNvkhmQ5FLabK1mOiwFv0DGAL027X0XlvpGU2UVIaDu/OqmcAITa2NKn2\nEQtLK4OqM1+fG69qUu+q/58C+m0v6/s1kFMbkRBD+D0aAZSYlOas8cFifQKBgEzy\n6/mXLPpwyw5LVDvTrPW/ICjYEByYZT1jBK2S8uYk5QB5RgithYaN0Q3wSTEiI5IY\nPG3BrxgcUO0u5Ug251EnnGGHvt8RJGqFRDDxdMGQnZ8XASnCFeV4QftBmA+IcG4H\nroJD0gjn0Yehcqie1gDvPro36uZoH1Eb4ZU2OSO9AoGBAMd1Lua44tEhSXsmFs+S\nFk+87tKF4MStKJf+1uNw2q0eQa3wZXi5u+nWI0Tq9AtE/lwBoti+7wZf7wu7rsF1\nZvofUf7xLSwuLWJTjndN/BfFPP3bIBhDe4fw1jlaC/bhn0oiosMx5KSVdwDiTNJ2\ngi79VKGXMPjpxVPEKXwqzxRK\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-iweqb@formation-573d3.iam.gserviceaccount.com",
  "client_id": "102474646890316582532",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iweqb%40formation-573d3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}; // Chemin vers le fichier de clé de compte de service

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
