import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from './Header';
import Sidebar from './sidebar';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
const Module = () => {
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filieres, setFilieres] = useState([]);
  const [uniteE, setUniteE] = useState([]);
  const [formData, setFormData] = useState({ nom: '', competencesVise: '', cours: '', exercice: '', credit:'', semestre: '', FiliereId:'', UniteEnseignementId: 0 });
  const [formDataModifier, setFormDataModifier] = useState({ nom: '', competencesVise: '', cours: '', exercice: '', credit:'', semestre: '', FiliereId:'', UniteEnseignementId: 0 });
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [showModalM, setShowModalM] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [modifierFormation, setModifierFormation] = useState(false);
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const handleShowModalM = (moduleChoisi) => {
    setSelectedModuleId(moduleChoisi.id);
    getUeById(moduleChoisi.id);
    setShowModalM(true);
    setShowModal(false);
    
    
  };
  const getUeById = async (id) => {
    try {
      const response = await axios.get(`${apiURL}module/ue/${id}`);
      setFormDataModifier(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la UE :', error);
    }
  };
  const handleCloseModalM = () => {
    setShowModalM(false);
  };

  const soumettreModification = async () => {
    try {
      await axios.put(`{apiURL}module/${selectedModuleId}`, formDataModifier,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log('Formation mise à jour avec succès');
      // Réinitialisez les états après la mise à jour
      setFormDataModifier({
        nom: '', competencesVise: '', cours: '', exercice: '', credit:'', semestre: '',FiliereId:'', UniteEnseignementId: 0 
      });
      fetchModules();
      setModifierFormation(false); // Fermez le formulaire de modification après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la modification de la formation :', error);
    }
  };

  useEffect(() => {
    fetchFilieres();
    fetchUE();
    fetchModules();
    
  }, [formData.FiliereId]);

  const fetchModules = async () => {
    try {
      const response = await axios.get(`${apiURL}module`); 
      setModules(response.data);
      console.log(modules);
    } catch (error) {
      console.error('Erreur lors de la récupération des modules :', error);
    }
  };

  const fetchFilieres = async () => {
    try {
      const response = await axios.get(`${apiURL}filiere`); 
      setFilieres(response.data);
      console.log(filieres);
    } catch (error) {
      console.error('Erreur lors de la récupération des filiere :', error);
    }
  };

  const fetchUE = async () => {
    console.log(formData.FiliereId)
    try {
      const response = await axios.get(`${apiURL}ue/filiere/${formData.FiliereId}`); 
      setUniteE(response.data);
      console.log(uniteE);
    } catch (error) {
      console.error('Erreur lors de la récupération des filiere :', error);
    }
  };

  const supprimerFormation = async (id) => {
    try {
      await axios.delete(`${apiURL}module/${id}`);
      fetchModules();
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la formation :', erreur);
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const annulerModification = () => {
    setModifierFormation(false);
    setFormData({ nom: '', competencesVise: '', cours: '', credit: '',exercice:'',semestre:'',FiliereId:'', UniteEnseignementId: 0 });
    // Réinitialisez également les états de la formation à modifier ici si nécessaire
    setShowModalM(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.semestre);
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };
  const handleSubmit = async () => {
    const newFormData = new FormData();
    newFormData.append('nom',formData.nom);
    newFormData.append('competencesVise',formData.competencesVise);
    newFormData.append('cours', formData.cours);
    newFormData.append('exercice', formData.exercice);
    newFormData.append('credit', formData.credit);
    newFormData.append('semestre', formData.semestre);
    newFormData.append('FiliereId', formData.FiliereId);
    newFormData.append('UniteEnseignementId',formData.UniteEnseignementId);
    console.log(newFormData);
    try {
      await axios.post( `${apiURL}module`, newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      }); // Remplacez par l'URL de votre API
      fetchModules();
      console.log(formData);
      setShowModal(false);
      setFormData({ nom: '', competencesVise: '', cours: '', credit: '',exercice:'',semestre:'', FiliereId:'', UniteEnseignementId: 0 });
    } catch (error) {
      console.error('Erreur lors de la création de la module :', error);
    }
  };

  return (
    <div>
    <Header />
    <section>
      <Sidebar />
    </section>
    <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
      <h1>Liste des Modules   </h1>
      <Button variant="success" onClick={handleShowModal}>Ajouter une Module</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Credit</th>
            <th>CompetencesVise</th>
            <th>Cours</th>          
            <th>Exercice</th>
            <th>Semestre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.nom}</td>
              <td>{module.credit}</td>
              <td>{module.competencesVise}</td>
              
              <td>{module.cours}</td>
              <td>{module.exercice}</td>
              <td>{module.semestre}</td>
              
              <td>
                <Button variant="primary" onClick={() => handleShowModalM(module)}>Modifier</Button>
                <Button variant="danger" onClick={() => supprimerFormation(module.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form content-type = 'multipart/form-data'>
            <Form.Group controlId="FiliereId">
                <Form.Label>Filiere</Form.Label>
                <Form.Control as="select" name="FiliereId" value={formData.FiliereId} onChange={handleInputChange}>
                    <option value="">Sélectionnez une filière</option>
                    {filieres && filieres.map((filiere) => (
                    <option key={filiere.id} value={filiere.id}>
                        {filiere.nom}
                    </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="UniteEnseignementId">
                <Form.Label>Unité d'enseignement</Form.Label>
                <Form.Control as="select" name="UniteEnseignementId" value={formData.UniteEnseignementId} onChange={handleInputChange}>
                    <option value="">Sélectionnez l'UE</option>
                    {uniteE && uniteE.map((ue) => (
                    <option key={ue.id} value={ue.id}>
                        {ue.code}
                    </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="competencesVise">
              <Form.Label>Competence visé</Form.Label>
              <Form.Control type="text" name="competencesVise" value={formData.competencesVise} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="cours">
              <Form.Label>Cours</Form.Label>
              <Form.Control
                type="file"
                name="cours"
                onChange={(e) => setFormData({ ...formData, cours: e.target.files[0] })}
              />

            </Form.Group>
            
            <Form.Group controlId="credit">
              <Form.Label>credit</Form.Label>
              <Form.Control type="number" name="credit" value={formData.credit} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="exercice">
              <Form.Label>Exercices</Form.Label>
              <Form.Control
                type="file"
                name="exercice"
                onChange={(e) => setFormData({ ...formData, exercice: e.target.files[0] })}
              />

            </Form.Group>
            <Form.Group controlId="semestre">
              <Form.Label>Semestre</Form.Label>
              <Form.Control type="number" name="semestre" value={formData.semestre} onChange={handleInputChange} />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>

      <section className='sectioon'>
      <Modal show={showModalM} onHide={handleCloseModalM}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="FiliereId">
                <Form.Label>Filiere</Form.Label>
                <Form.Control as="select" name="FiliereId" value={formDataModifier.FiliereId} onChange={handleInputChange}>
                    <option value="">Sélectionnez une filière</option>
                    {filieres && filieres.map((filiere) => (
                    <option key={filiere.id} value={filiere.id}>
                        {filiere.nom}
                    </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="UniteEnseignementId">
                <Form.Label>Unité d'enseignement</Form.Label>
                <Form.Control as="select" name="UniteEnseignementId" value={formDataModifier.UniteEnseignementId} onChange={handleInputChange}>
                    <option value="">Sélectionnez l'unité enseignement</option>
                    {uniteE && uniteE.map((ue) => (
                    <option key={ue.id} value={ue.id}>
                        {ue.code}
                    </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formDataModifier.nom} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="competencesVise">
              <Form.Label>Competence visé</Form.Label>
              <Form.Control type="text" name="competencesVise" value={formDataModifier.competencesVise} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="cours">
              <Form.Label>Cours</Form.Label>
              <Form.Control type="file" name="cours" onChange={handleFileChange} />
            </Form.Group>
            
            <Form.Group controlId="credit">
              <Form.Label>credit</Form.Label>
              <Form.Control type="number" name="credit" value={formDataModifier.credit} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="exercice">
              <Form.Label>Exercices</Form.Label>
              <Form.Control type="file" name="exercice" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="semestre">
              <Form.Label>Semestre</Form.Label>
              <Form.Control type="number" name="semestre" value={formDataModifier.semestre} onChange={handleInputChange} />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={annulerModification}>
            Annuler
          </Button>
          <Button variant="primary" onClick={soumettreModification}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
      </section>
    </main>
    </div>
  );
};

export default Module;
