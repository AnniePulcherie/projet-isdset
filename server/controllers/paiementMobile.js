const {  PaiementMobile } = require('../models.js/models');

// Créer un paiement
const createPaiement = async (req, res) => {
  console.log(req.body);
  try {
    const paiement = await PaiementMobile.create(req.body);
    res.status(201).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du paiement' });
  }
};

// Lire tous les paiements
const getAllPaiement = async (req, res) => {
  try {
    const paiements = await PaiementMobile.findAll();
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
    const paiement = await PaiementMobile.findByPk(id);
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
    const [updated] = await PaiementMobile.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedPaiement = await PaiementMobile.findByPk(id);
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
    const deleted = await PaiementMobile.destroy({
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
  createPaiement,
  getAllPaiement,
  getPaiementById,
  updatePaiement,
  deletePaiement,
};
