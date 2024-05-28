const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, '../uploads'); // Le dossier où les fichiers téléchargés seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Conservez le nom d'origine du fichier
  },
});

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 10, // Limite de 10 Mo (ajustez selon vos besoins)
  // },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpeg|jpg|PNG|pdf|doc|docx)$/)){
      return cb(
        new Error(
          'only upload files jpg, jpeg, PNG, pdf, doc, docx'
        )
      )
    }
  }
});

module.exports = upload;
