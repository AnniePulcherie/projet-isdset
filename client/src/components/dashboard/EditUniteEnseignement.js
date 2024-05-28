import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditUniteEnseignement = ({ uniteEnseignement, show, handleClose, handleUpdate }) => {
  const [formData, setFormData] = useState(uniteEnseignement);
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [filieres, setFilieres] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
        if (!uniteEnseignement || !uniteEnseignement.id) {
            console.error("Erreur : l'identifiant de l'unité d'enseignement est manquant.");
            return;
        }
        const response = await axios.put(`${apiURL}ue/${uniteEnseignement.id}`, formData);
        console.log(response.data);
        handleUpdate();// Appeler la fonction pour mettre à jour la liste
        
        handleClose(); // Fermer le modal après la modification
    } catch (error) {
        console.error('Erreur lors de la modification de l\'unité d\'enseignement', error);
    }
};


  const fetchFilieres = async () => {
    try {
      const response = await axios.get(`${apiURL}filiere`); 
      setFilieres(response.data);
      console.log(filieres);
    } catch (error) {
      console.error('Erreur lors de la récupération des filières :', error);
    }
  };

  useEffect(()=>{
    fetchFilieres();
    setFormData(uniteEnseignement);
    console.log(uniteEnseignement);
    console.log(formData);
  },[uniteEnseignement]);
  
  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Modifier l'Unité d'Enseignement</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {formData &&(
            <div className="modal-body">
            <div className="mb-3">
           
            <label htmlFor="code">Filière</label>
                <select name="FiliereId" value={formData.FiliereId} className="form-control" onChange={handleInputChange}>
                    <option value="">Sélectionnez une filière</option>
                    {filieres && filieres.map((filiere) => (
                    <option key={filiere.id} value={filiere.id}>
                        {filiere.nom}
                    </option>
                    ))}
                </select>
            </div>
              <div className="mb-3">
                <label htmlFor="code">Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
            <label htmlFor="type">type</label>
            <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="nom">competencesVise</label>
            <input
                type="text"
                className="form-control"
                id="competencesVise"
                name="competencesVise"
                value={formData.competencesVise}
                onChange={handleInputChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="objectif">Objectif</label>
            <input
                type="text"
                className="form-control"
                id="objectif"
                name="objectif"
                value={formData.objectif}
                onChange={handleInputChange}
                required
            />
            </div>
           
            </div>
            )}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Fermer</button>
              <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Enregistrer les modifications</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUniteEnseignement;
