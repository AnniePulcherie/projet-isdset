const {   PaiementRecu, Paiement, PaiementMobile } = require('../models.js/models');

// Créer un paiement
const createPaiement = async (req, res) => {
  try {
    
    const paiement = await PaiementRecu.create(req.body);
    res.status(201).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du paiement' });
  }
};

// Lire tous les paiements
const getAllPaiement = async (req, res) => {
  try {
    const paiements = await PaiementRecu.findAll();
    res.status(200).json(paiements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des paiements' });
  }
};

// Lire un paiement par ID
const getPaiementById = async (req, res) => {
  const { id } = req.params;
  try {
    const paiement = await PaiementRecu.findByPk(id);
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

// Mettre à jour un paiement
const updatePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await PaiementRecu.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedPaiement = await PaiementRecu.findByPk(id);
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
    const deleted = await PaiementRecu.destroy({
      where: { id: id },
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

const verifierEtatPaiement = async (req, res) => {
    
    try {
      // Rechercher le paiement correspondant dans les deux tables
      const paiement = await Paiement.findOne({
        where: { reference },
      });
  
      const paiementRecu = await PaiementRecu.findOne({
        where: { reference },
      });
  
      // Vérifier si les données correspondent dans les deux tables
      if (
        paiement &&
        paiementRecu &&
        paiement.dateVersement.getTime() === paiementRecu.dateVersement.getTime() &&
        paiement.montantTotal === paiementRecu.montant &&
        paiementRecu.operateur === paiement.operateur
      ) {
        // Mettre à jour l'état de paiement dans la table Paiement
        await Paiement.update(
          { etatPaiement: 'Vérifié' },
          {
            where: { reference },
          }
        );
  
        console.log(`État de paiement vérifié pour la référence ${reference}`);
        res.status(200).json({success: true});
        
      } else {
        console.log(`Les données ne correspondent pas pour la référence ${reference}`);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'état de paiement :', error.message);
    }
  };
  
  const verifierEtModifierEtatPaiement = async (req, res) => {
    const {reference} = req.params;
    try {
      // Rechercher les paiements correspondants avec références
      const paiements = await Paiement.findOne({
        include: [
          {
            model: PaiementMobile,
            required: false,
            where: {
              reference: reference,
            },
          },
         
        ],
      });
  
      // Vérifier et mettre à jour l'état de paiement
      
        // Vérifier si l'état de paiement est "En attente"
        if (paiements.etatPaiement === 'En attente') {
          // Mettre à jour l'état de paiement dans la table Paiement
          await Paiement.update(
            { etatPaiement: 'Vérifié' },
            {
              where: { id: paiements.id },
            }
          );
  
          console.log(`État de paiement vérifié et modifié pour le paiement avec l'id ${paiements.id}`);
          res.status(200).json({success: true});
        } else {
          console.log(`L'état de paiement pour le paiement avec l'id ${paiements.id} n'est pas "En attente"`);
        }
    } catch (error) {
      console.error('Erreur lors de la vérification et de la modification de l\'état de paiement :', error.message);
    }
  };
  

  

module.exports = {
  createPaiement,
  getAllPaiement,
  getPaiementById,
  updatePaiement,
  deletePaiement,
  verifierEtatPaiement,
};
