const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const AnneeUniversitaire = sequelize.define('AnneeUniversitaire', {
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

const Formation = sequelize.define('Formation', {
  nom: {
    type: DataTypes.STRING,
    defaultValue: "DTS",
  },
  typeFormation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fraisGeneraux: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  droitInscription: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  droitExamen: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ecolage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  tranche: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moisTotal:{
    type: DataTypes.INTEGER,
    defaultValue:12
  }
});

const Filiere = sequelize.define('Filiere', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objectif: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  insertionProfessionnel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vacation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nbModule: {
    type: DataTypes.INTEGER,
    defaultValue: 16
  }
});


const UniteEnseignement = sequelize.define('UniteEnseignement', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  competencesVise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  objectif: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

const Module = sequelize.define('Module', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  competencesVise: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cours: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  exercice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  semestre: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

const CursusScolaire = sequelize.define('CursusScolaire', {
  annee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diplome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etablissementEtLieu: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const Users = sequelize.define('users', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Etudiant",
  },
  salt: DataTypes.STRING,
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

const Etudiant = sequelize.define('Etudiant', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomPere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomMere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateDeNaissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lieuNaissance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situationMatrimoniale: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fonction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diplome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moduleTelecharger: {
    type: DataTypes.INTEGER,
    defaultValue:0
  }
  
});

const EtudiantFiliere = sequelize.define('EtudiantFiliere', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Correction ici
    primaryKey: true // Ajouté si id est la clé primaire
  },
  date:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  moduleSelectionner: {
    type: DataTypes.STRING,
    allowNull:true
  }
});

const InscriptionModulaire = sequelize.define('InscriptionModulaire', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Correction ici
    primaryKey: true // Ajouté si id est la clé primaire
  },
  date:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  paiement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

});

const InscriptionFormation = sequelize.define('InscriptionFormation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Correction ici
    primaryKey: true // Ajouté si id est la clé primaire
  },
  dateInscription:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  etatInscription: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  anneeUniversitaire: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  niveau: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

const Paiement = sequelize.define('Paiement', {
  motifs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreMois: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dateVersement: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  montantTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  etatInscription: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  etatEcolage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  etatPaiement: {
    type: DataTypes.STRING,
    defaultValue: "En attente"
  }
});

const PaiementRecu = sequelize.define('PaiementRecu', {
 
  dateVersement: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  operateur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});
const PaiementMobile = sequelize.define('PaiementMobile', {
  operateur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  montant : {
    type: DataTypes.INTEGER,
    allowNull: false,
  }

});

const PaiementBancaire = sequelize.define('PaiementBancaire', {
  agence: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bordereau: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  montant : {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

const Examen = sequelize.define('Examen', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  sujet: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.hasMany(PaiementRecu);
PaiementRecu.belongsTo(Users);

Users.hasOne(Etudiant);
Etudiant.belongsTo(Users);

Etudiant.belongsToMany(Formation, {through: InscriptionFormation},{unique:false});
Formation.belongsToMany(Etudiant, {through : InscriptionFormation}, {unique:false});


Filiere.hasMany(InscriptionFormation);
InscriptionFormation.belongsTo(Filiere);

Etudiant.belongsToMany(Filiere, {through: EtudiantFiliere});
Filiere.belongsToMany(Etudiant, {through: EtudiantFiliere});

Etudiant.belongsToMany(Module, {through: InscriptionModulaire, unique:false});
Module.belongsToMany(Etudiant, {through: InscriptionModulaire, unique:false});

Paiement.hasOne(PaiementMobile);
PaiementMobile.belongsTo(Paiement);

Paiement.hasOne(PaiementBancaire);
PaiementBancaire.belongsTo(Paiement);
Paiement.belongsTo(Etudiant);
Etudiant.hasMany(Paiement);
Formation.hasMany(Paiement);
Paiement.belongsTo(Formation);
Filiere.hasMany(Module);
Module.belongsTo(Filiere);

Filiere.hasMany(UniteEnseignement);
UniteEnseignement.belongsTo(Filiere);

UniteEnseignement.hasMany(Module);
Module.belongsTo(UniteEnseignement);

CursusScolaire.belongsTo(Users);
Users.hasMany(CursusScolaire);

Examen.belongsTo(Users);
Examen.belongsTo(Module);

Users.hasMany(Examen);
Module.hasMany(Examen);

 async () => {
  try {
    await sequelize.sync({force:true});
    console.log('Tables créées avec succès');
  } catch (erreur) {
    console.error('Erreur lors de la création des tables :', erreur);
  }
};

module.exports = {
  Formation,
  Filiere,
  Module,
  Users,
  Etudiant,
  Examen,
  UniteEnseignement,
  EtudiantFiliere,
  InscriptionFormation,
  InscriptionModulaire,
  CursusScolaire,
  Paiement,
  PaiementRecu,
  PaiementMobile,
  PaiementBancaire,
  AnneeUniversitaire,
 
  
};
