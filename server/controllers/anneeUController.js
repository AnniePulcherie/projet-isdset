const { AnneeUniversitaire } = require('../models.js/models');

// Créer une année universitaire
const createAnneeUniversitaire = async (req, res) => {
  try {
    const {dateDebut, dateFin} =req.body
    const anneeUniversitaire = await AnneeUniversitaire.create({
        dateDebut,
        dateFin,
    });
    res.status(201).json(anneeUniversitaire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'année universitaire' });
  }
};

// Lire toutes les années universitaires
const getAllAnneeUniversitaire = async (req, res) => {
  try {
    const anneesUniversitaires = await AnneeUniversitaire.findAll();
    res.status(200).json(anneesUniversitaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des années universitaires' });
  }
};

// Mettre à jour une année universitaire
const updateAnneeUniversitaire = async (req, res) => {
  const { id } = req.params;
  try {
    const {dateDebut, dateFin} = req.body;
    const [updated] = await AnneeUniversitaire.update({
        dateDebut,
        dateFin,
    }, {
      where: { id: id },
    });
    if (updated) {
      const updatedAnneeUniversitaire = await AnneeUniversitaire.findOne({ where: { id: id } });
      res.status(200).json(updatedAnneeUniversitaire);
    } else {
      throw new Error('Année universitaire non trouvée');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'année universitaire' });
  }
};

// Supprimer une année universitaire
const deleteAnneeUniversitaire = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await AnneeUniversitaire.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Année universitaire non trouvée');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'année universitaire' });
  }
};

module.exports = {
  createAnneeUniversitaire,
  getAllAnneeUniversitaire,
  updateAnneeUniversitaire,
  deleteAnneeUniversitaire,
};
