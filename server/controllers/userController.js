const { Users } = require('../models.js/models'); 


// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour récupérer le profil d'un utilisateur par ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour mettre à jour les informations d'un utilisateur par ID
const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updated] = await Users.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await Users.findByPk(id);
      return res.status(200).json(updatedUser);
    }
    throw new Error('Utilisateur non trouvé');
  } catch (error) {
    next(error);
  }
};

// Contrôleur pour supprimer un utilisateur par ID
const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Users.destroy({
      where: { id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Utilisateur non trouvé');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
