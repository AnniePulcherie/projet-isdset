// ModuleDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModuleDetails = ({ match }) => {
  const [module, setModule] = useState(null);

  useEffect(() => {
    const moduleId = match.params.id; // Obtenez l'ID du module à partir de l'URL
    fetchModule(moduleId);
  }, [match]);

  const fetchModule = async (moduleId) => {
    try {
      const response = await axios.get(`http://localhost:3001/modules/${moduleId}`); // Assurez-vous que l'URL est correcte
      setModule(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du module :', error);
    }
  };

  return (
    <div className="container mt-4">
      {module ? (
        <div>
          <img src={module.image} alt={module.nom} />
          <h1>{module.nom} coefficient: {module.coefficient}</h1>
          <p>Description : {module.description}</p>
          <p>Cours : {module.cours}</p>
          <p>Exercice : {module.exercice}</p>
          <p>Examen : {module.examen}</p>
          
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
};

export default ModuleDetails;
