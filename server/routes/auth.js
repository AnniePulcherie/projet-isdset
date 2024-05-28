let express = require('express');
let passport = require('passport');
let LocalStrategy = require('passport-local');
let crypto = require('crypto');
const validator = require('validator');
const { Users, Filiere, Inscription, InscriptionFormation, Etudiant, Formation, InscriptionModulaire, Module, UniteEnseignement } = require('../models.js/models');

var router = express.Router();

passport.use(
    new LocalStrategy({ usernameField: 'email' }, function verify(email, password, cb) {
      Users.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
  
          const hashedPassword = crypto.pbkdf2Sync(password, Buffer.from(user.salt, 'hex'), 310000, 32, 'sha256');
  
          if (!crypto.timingSafeEqual(Buffer.from(user.password, 'hex'), hashedPassword)) {
            return cb(null, false, { message: 'Incorrect email or password.' });
          }
  
          return cb(null, user);
        })
        .catch((err) => {
          console.error(err); // Affichez les erreurs dans la console
          return cb(err);
        });
    })
  );
  

passport.serializeUser(function (user, cb){
    cb(null, {id: user.id, email: email});
});

passport.deserializeUser(function (user, cb) {
    Users.findByPk(user.id)
    .then((user) => {
        cb(null, user);
    })
    .catch((err) => cb(err));
});

router.post('/logout', function (req, res){
    req.logout();
    res.redirect('/');
});

// Dans votre route de connexion
router.post('/login/password', async function (req, res, next) {
  passport.authenticate('local', async function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    let listeFormation = [];
    const etudiant = await Etudiant.findOne({ where: { userId: user.id } });
    let modulaire = [];
    let inscription = [];
    let listeFilieres = [];
    console.log(etudiant);
    if(etudiant){
    const modules = await Etudiant.findByPk(etudiant.id,{
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
        console.log("inscriptionMod",inscriptionMod.Modules);
        modulaire = inscriptionMod.Modules;
      }
    })
    .catch(error =>{console.log.log(error)});

    inscription = await InscriptionFormation.findAll({where:{EtudiantId:etudiant.id}});
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
      }).catch(error =>{
        console.log(error);
      })
      

    }
    console.log("liste modulaire", modulaire);
  }
    const reponse = {
      user : user, 
      etudiant :etudiant, 
      inscription: inscription, 
      listeFormation: listeFormation,
      listeFilieres:listeFilieres,
      modulaire:modulaire}
    
    return res.status(200).json({reponse});
       
  })(req, res, next);
});


router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/signup', function (req, res, next) {
    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256')
    // if (!validator.isEmail(req.body.email)) {
    //     return res.status(400).json({ message: 'Invalid email address.' });
    // }
    Users.create({
        nom: req.body.nom,
        email: req.body.email,
        password: hashedPassword.toString('hex'),
        salt: salt.toString('hex'),
      })
        .then((user) => {
        
            res.status(200).json(user);
        
        })
        .catch((err) => {
          res.status(500).json(err);
          
        });
});

module.exports = router;