const { Ecolage } = require('../models.js/models');

// Créer un enregistrement d'écolage
const createEcolage = async (req, res) => {
  try {
    const {montant, mois, date,formationId} = req.body;
    const ecolage = await Ecolage.create({
        montant,
        mois,
        date,
        formationId,
    });
    res.status(201).json(ecolage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'écolage' });
  }
};

// Lire tous les enregistrements d'écolage
const getAllEcolage = async (req, res) => {
  try {
    const ecolages = await Ecolage.findAll();
    res.status(200).json(ecolages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des écolages' });
  }
};

// Lire un enregistrement d'écolage par ID
const getEcolageById = async (req, res) => {
  const { id } = req.params;
  try {
    const ecolage = await Ecolage.findByPk(id);
    if (!ecolage) {
      res.status(404).json({ message: 'Écolage non trouvé' });
    } else {
      res.status(200).json(ecolage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'écolage' });
  }
};

// Mettre à jour un enregistrement d'écolage
const updateEcolage = async (req, res) => {
  const { id } = req.params;
  try {
    const {montant, mois, date,formationId} = req.body;
    const [updated] = await Ecolage.update({
        montant,
        mois,
        date,
        formationId,

    }, {
      where: { id: id },
    });
    if (updated) {
      const updatedEcolage = await Ecolage.findByPk(id);
      res.status(200).json(updatedEcolage);
    } else {
      throw new Error('Écolage non trouvé');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'écolage' });
  }
};

// Supprimer un enregistrement d'écolage
const deleteEcolage = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Ecolage.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Écolage non trouvé');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'écolage' });
  }
};

module.exports = {
  createEcolage,
  getAllEcolage,
  getEcolageById,
  updateEcolage,
  deleteEcolage,
};
