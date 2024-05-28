const { ModePaiement } = require('../models.js/models');

// Créer un mode de paiement
const createModePaiement = async (req, res) => {
  try {
    const modePaiement = await ModePaiement.create(req.body);
    res.status(201).json(modePaiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du mode de paiement' });
  }
};

// Lire tous les modes de paiement
const getAllModePaiement = async (req, res) => {
  try {
    const modesPaiement = await ModePaiement.findAll();
    res.status(200).json(modesPaiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des modes de paiement' });
  }
};

// Lire un mode de paiement par ID
const getModePaiementById = async (req, res) => {
  const { id } = req.params;
  try {
    const modePaiement = await ModePaiement.findByPk(id);
    if (!modePaiement) {
      res.status(404).json({ message: 'Mode de paiement non trouvé' });
    } else {
      res.status(200).json(modePaiement);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du mode de paiement' });
  }
};

// Mettre à jour un mode de paiement
const updateModePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await ModePaiement.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedModePaiement = await ModePaiement.findByPk(id);
      res.status(200).json(updatedModePaiement);
    } else {
      throw new Error('Mode de paiement non trouvé');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du mode de paiement' });
  }
};

// Supprimer un mode de paiement
const deleteModePaiement = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ModePaiement.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Mode de paiement non trouvé');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du mode de paiement' });
  }
};

module.exports = {
  createModePaiement,
  getAllModePaiement,
  getModePaiementById,
  updateModePaiement,
  deleteModePaiement,
};
