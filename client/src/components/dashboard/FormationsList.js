import React, { useState, useEffect } from 'react';
import FormationService from './FormationsService'; // Importez le service pour les opérations CRUD
import FormationForm from './FormationForm'; // Créez ce composant pour le formulaire de création/mise à jour

const FormationsList = () => {
  const [formations, setFormations] = useState([]);
  const [currentFormation, setCurrentFormation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNom, setSearchNom] = useState('');

  useEffect(() => {
    retrieveFormations();
  }, []);

  const retrieveFormations = () => {
    FormationService.getAll()
      .then(response => {
        setFormations(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const refreshList = () => {
    retrieveFormations();
    setCurrentFormation(null);
    setCurrentIndex(-1);
  };

  const setActiveFormation = (formation, index) => {
    setCurrentFormation(formation);
    setCurrentIndex(index);
  };

  const removeFormation = id => {
    FormationService.remove(id)
      .then(() => {
        refreshList();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const removeAllFormations = () => {
    FormationService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const findByNom = () => {
    FormationService.findByNom(searchNom)
      .then(response => {
        setFormations(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Chercher par nom"
            value={searchNom}
            onChange={e => setSearchNom(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByNom}
            >
              Chercher
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Liste des Formations</h4>

        <ul className="list-group">
          {formations &&
            formations.map((formation, index) => (
              <li
                className={
                  'list-group-item ' +
                  (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveFormation(formation, index)}
                key={index}
              >
                {formation.nom}
              </li>
            ))}
        </ul>

        <button
          className="btn btn-danger mt-3"
          onClick={removeAllFormations}
        >
          Supprimer toutes les formations
        </button>
      </div>
      <div className="col-md-6">
        {currentFormation ? (
          <FormationForm
            formation={currentFormation}
            refreshList={refreshList}
          />
        ) : (
          <div>
            <br />
            <FormationForm />
            <p>Cliquez sur une formation pour voir les détails.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormationsList;
