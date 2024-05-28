const { Sequelize, where } = require('sequelize');
const { Paiement, InscriptionFormation, EtudiantFiliere, InscriptionModulaire } = require('../models.js/models');

// Créer  un paiement
const createPaiement = async (req, res) => {
  const {
    nombreMois,
    motifs,
    dateVersement,
    montantTotal,
    etatEcolage,
    etatInscription,
    EtudiantId,
    FormationId
  } = req.body;

  try {
    
    //   where: {
    //     EtudiantId,
    //     FormationId
    //   }
    // });

    // if (existingPaiement) {
    //   // Mettre à jour le paiement existant
    //   const updatedPaiement = await Paiement.update({
    //     motifs: existingPaiement.motifs + ',' + motifs,
    //     nombreMois: existingPaiement.nombreMois + nombreMois,
    //     dateVersement,
    //     montantTotal: existingPaiement.montantTotal + montantTotal,
    //     etatInscription,
    //     etatEcolage: true,
    //     etatPaiement:"En attente",
    //   }, {
    //     where: {
    //       EtudiantId,
    //       FormationId
    //     }
    //   });
    //   console.log(updatedPaiement);
    //   res.status(200).json({ updatedPaiement });
    // } else {
      // Créer un nouveau paiement
      const motifsArray = motifs.split(',');
      const motifsNecessaires = ['DroitInscription', 'FraisGeneraux'];
      const motifsInclus = motifsNecessaires.every(motif => motifsArray.includes(motif));
      const paiementsExistants = await Paiement.findAll({
        where: {
            EtudiantId,
            FormationId,
            
            motifs: {
              [Sequelize.Op.and]: [
                { [Sequelize.Op.like]: '%DroitInscription%' },
                { [Sequelize.Op.like]: '%FraisGeneraux%' }
              ]
            }
           // Combiner toutes les conditions en une seule
        }
      });
      console.log("paiement existant", paiementsExistants);
      if (paiementsExistants.length >0 ||motifsInclus) {
          const newPaiement = await Paiement.create({
          motifs,
          nombreMois,
          dateVersement,
          montantTotal,
          etatEcolage,
          etatInscription,
          EtudiantId,
          FormationId
          });

          const inscription = await InscriptionFormation.findOne({
            where: {
              EtudiantId,
              FormationId
            }
          }); 

            if (!inscription) {
              const inscriptionModulaire = InscriptionModulaire.findAll({where:{EtudiantId}});
              if(inscriptionModulaire){
                await InscriptionModulaire.update({paiement:true}, {where:{EtudiantId}});
              }else{
              return res.status(404).json({ message: 'Inscription non trouvée.' });
              }
            }else{
              await InscriptionFormation.update({ etatInscription: true }, {
                where: {
                  EtudiantId,
                  FormationId
                }
              });
            }
            res.status(201).json(newPaiement);
          }
          else{
            return res.status(400).json({ message: "Tu dois payer le frais d'inscription et le droit d'examen." });
        }    
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création ou de la mise à jour du paiement' });
  }
};

// Obtenir tous les paiements
const getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
    res.status(200).json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des paiements' });
  }
};

// obtenir paiement dont l'etat est en attente

const getAllPaiementsEnAttente = async (req, res) => {
  try {
    const paiements = await Paiement.findAll({
      where:{etatPaiement: "En attente"}
    });
    console.log(paiements);
    res.status(200).json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des paiements' });
  }
};

const getPaiementsEnAttenteByEtudiant = async (req, res) => {
  const id = req.params.id;
  try {
    const paiements = await Paiement.findAll({
      where:{
        EtudiantId: id,
        etatPaiement: "En attente"}
    });
    console.log(paiements);
    if(paiements){
      const nbPaiementEnAttente = paiements.length
      res.status(200).json({nbPaiementEnAttente});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des paiements' });
  }
};
// Obtenir un paiement par son ID
const getPaiementById = async (req, res) => {
  const { id } = req.params;
  try {
    const paiement = await Paiement.findByPk(id);
    if (!paiement) {
      res.status(404).json({ message: 'Paiement non trouvé' });
    } else {
      res.status(200).json(paiement);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du paiement' });
  }
};

// Obtenir les paiements par ID d'inscription
const getPaiementByInscription = async (req, res) => {
  const { id } = req.params;
  try {
    const paiements = await Paiement.findAll({
      where: {
        EtudiantId: id,
        
      }
    });
    if (!paiements.length) {
      res.status(404).json({ message: 'Paiement non trouvé' });
    } else {
      res.status(200).json(paiements);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des paiements' });
  }
};

const getTotalMoisPayes = async (req, res) =>{
  const {etudiantId, formationId} = req.params;
  try {
    const paiements = await Paiement.findAll({
      where: {
        EtudiantId: etudiantId,
        FormationId: formationId,
        etatPaiement: "payé"
      }
    });

    let totalMois = 0;
    paiements.forEach(paiement => {
      totalMois += paiement.nombreMois;
    });

   console.log(totalMois);
   res.json({totalMois, paiements});
  } catch (error) {
    console.error("Erreur lors du calcul du total des mois payés :", error);
    throw error;
  }
}


// Mettre à jour un paiement
const updatePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Paiement.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedPaiement = await Paiement.findByPk(id);
      res.status(200).json(updatedPaiement);
    } else {
      throw new Error('Paiement non trouvé');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du paiement' });
  }
};

// Supprimer un paiement
const deletePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Paiement.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Paiement non trouvé');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du paiement' });
  }
};

module.exports = {
  createPaiement,
  getTotalMoisPayes,
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
  getPaiementByInscription,
  getAllPaiementsEnAttente,
  getPaiementsEnAttenteByEtudiant
};
