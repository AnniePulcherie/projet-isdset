import React, { useState, useEffect } from 'react';
import FormationService from './FormationsService'; // Importez le service pour les opérations CRUD

const FormationForm = ({ formation, refreshList }) => {
  const initialFormationState = {
    id: null,
    nom: '',
    // Ajoutez d'autres champs spécifiques à la formation ici
  };

  const [currentFormation, setCurrentFormation] = useState(
    initialFormationState
  );

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (formation) {
      setCurrentFormation(formation);
    }
  }, [formation]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFormation({ ...currentFormation, [name]: value });
  };

  const saveFormation = () => {
    const data = {
      nom: currentFormation.nom,
      // Ajoutez d'autres champs spécifiques à la formation ici
    };

    if (!currentFormation.id) {
      FormationService.create(data)
        .then(response => {
          setCurrentFormation({
            id: response.data.id,
            nom: response.data.nom,
            // Définissez d'autres champs ici
          });
          setMessage('La formation a été créée avec succès !');
          refreshList();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      FormationService.update(currentFormation.id, data)
        .then(() => {
          setMessage('La formation a été mise à jour avec succès !');
          refreshList();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const deleteFormation = () => {
    FormationService.remove(currentFormation.id)
      .then(() => {
        setMessage('La formation a été supprimée avec succès !');
        refreshList();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <h4>Formulaire de Formation</h4>
      <form>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={currentFormation.nom}
            onChange={handleInputChange}
          />
        </div>
        {/* Ajoutez ici les champs spécifiques à la formation */}
      </form>

      {currentFormation.id ? (
        <div className="btn-group">
          <button
            className="btn btn-success"
            onClick={saveFormation}
          >
            Mettre à jour
          </button>
          <button
            className="btn btn-danger"
            onClick={deleteFormation}
          >
            Supprimer
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={saveFormation}
        >
          Créer
        </button>
      )}

      <p>{message}</p>
    </div>
  );
};

export default FormationForm;
