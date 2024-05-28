const {  Paiement } = require('../models.js/models');


const createOrUpdatePaiement = async (req, res) => {
  const {
    nombreMois,
    motifs,
    dateVersement,
    montantTotal,
    PaiementBancaireId,
    PaiementMobileId,
    etatEcolage,
    moduleTelchargeable,
    etatInscription,
    
    InscriptionId
  } = req.body;

  try {
    // Vérifiez si un paiement existe déjà pour l'InscriptionId
    const existingPaiement = await Paiement.findOne({
      where: {
        InscriptionId: InscriptionId
      }
    });

    if (existingPaiement) {
      // Si un paiement existe, mettez à jour les données existantes
      const updatedPaiement = await Paiement.update({
        nombreMois: existingPaiement.nombreMois + nombreMois, // Ajoutez le nombre de mois
        motifs,
        dateVersement,
        montantTotal: existingPaiement.montantTotal + montantTotal,
        PaiementBancaireId,
        PaiementMobileId,
        etatEcolage,
        moduleTelchargeable: existingPaiement.moduleTelchargeable + moduleTelchargeable,
      }, {
        where: {
          InscriptionId: InscriptionId
        }
      });

      res.status(200).json(updatedPaiement);
    } else {
      // Si aucun paiement n'existe, créez un nouveau paiement
      const motifsArray = motifs.split(',');
  // Vérifier que les motifs nécessaires sont présents
      const motifsNecessaires = ['DroitInscription', 'FraisGeneraux'];
      const motifsPresent = motifsNecessaires.every(m => motifsArray.includes(m));

      if (!motifsPresent) {
        return res.status(400).json({ message: "Tu dois payer le frais d'inscription et le droit d'examen." });
      }else{
      const newPaiement = await Paiement.create({
        nombreMois,
        motifs,
        dateVersement,
        montantTotal,
        PaiementBancaireId,
        PaiementMobileId,
        etatEcolage,
        etatInscription,
        InscriptionId
      });

      res.status(201).json(newPaiement);
    }
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création ou de la mise à jour du paiement' });
  }
};

// ...

// Lire tous les paiements
const getAllPaiement = async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
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

const getPaiementByInscriptionId = async (req, res) => {
  const { id } = req.params;

  try {
    // Chercher le paiement en fonction de l'InscriptionId
    const paiement = await Paiement.findOne({
      where: {
        InscriptionId: id
      }
    });

    if (!paiement) {
      return res.status(404).json({ message: 'Paiement non trouvé pour cet InscriptionId', success: false });
    }

    res.status(200).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du paiement par InscriptionId' });
  }
};



// Mettre à jour un paiement
const updatePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Paiement.update(req.body, {
      where: { id: id },
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

module.exports = {
  getPaiementByInscriptionId,
  createOrUpdatePaiement,
  getAllPaiement,
  getPaiementById,
  updatePaiement,
  deletePaiement,
};
