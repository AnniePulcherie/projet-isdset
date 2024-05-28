import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AddUniteEnseignement = ({ onAddSuccess }) => {
const apiURL = process.env.REACT_APP_API_USER_URL;
const [filieres, setFilieres] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    type: '',
    competencesVise: '',
    objectif: '',
    
    FiliereId:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ajouterUE = async (e) => {
    e.preventDefault();
    if(!formData.code ||
        !formData.nom ||
        !formData.type ||
        !formData.competencesVise)
        {
            alert('Veillez completer tous les champs');
        }
    

    try {
      const response = await axios.post(`${apiURL}ue`, formData); // Assurez-vous de configurer le chemin correct
      console.log('Unité d\'Enseignement créée avec succès', response.data);
      onAddSuccess();
      setFormData({
        code: '',
        nom: '',
        type: '',
        competencesVise: '',
        objectif: '',
       
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'unité d\'enseignement', error);
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
  },[]);
  
  return (
    <div>
      
      <form onSubmit={ajouterUE}>
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
        <label htmlFor="code">Code et intutilé du UE</label>
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
          <label htmlFor="nom">Nom du responsable</label>
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
          <label htmlFor="type">Type</label>
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
          <label htmlFor="objectif">Objectif de l'UE</label>
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
        <div className="mb-3">
          <label htmlFor="competencesVise">Competences Vise</label>
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
        
        
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default AddUniteEnseignement;
