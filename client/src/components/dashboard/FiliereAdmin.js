import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import axios from 'axios';
import Header from './Header';
import Sidebar from './sidebar';
import { useSelector } from 'react-redux';

const FiliereAdmin = () => {
  const [filieres, setFilieres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalM, setShowModalM] = useState(false);
  const imageInputRef = useRef(null);
  const [formData, setFormData] = useState({ nom: '', objectif: '', insertionProfessionnel: '', vacation: '',image:null});
  const [formDataAModifier, setFormDataAModifier] = useState({ nom: '', objectif: '', insertionProfessionnel: '', vacation: '',image:null});
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [selectedId, setSelectedId] = useState('');
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  useEffect(() => {
    fetchFilieres();
    // fetchFormations();
  }, []);

  const fetchFilieres = async () => {
    try {
      const response = await axios.get(`${apiURL}filiere`); // Remplacez par l'URL de votre API
      setFilieres(response.data);
      console.log(filieres);
    } catch (error) {
      console.error('Erreur lors de la récupération des filières :', error);
    }
  };
  const getFiliereById = async (id) => {
    try {
      const response = await axios.get(`${apiURL}filiere/${id}`);
      setFormDataAModifier(response.data);
      console.log(response.data);
      console.log(formDataAModifier);
    } catch (error) {
      console.error('Erreur lors de la récupération de la filiere :', error);
    }
  };
  const handleModifierClick = (id) => {
    
    setSelectedId(id);
    getFiliereById(id);
    setShowModalM(true);
    
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalM = () => {
    setShowModalM(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputModificationChange = (e) => {
    const { name, value } = e.target;
    setFormDataAModifier({ ...formDataAModifier, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleImageModifierChange = (e) => {
    const imageFile = e.target.files[0];
    setFormDataAModifier({ ...formDataAModifier, image: imageFile });
    console.log(imageFile);
  };
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('nom', formData.nom);
    formDataToSend.append('objectif', formData.objectif);
    formDataToSend.append('insertionProfessionnel', formData.insertionProfessionnel);
    formDataToSend.append('vacation', formData.vacation);
    formDataToSend.append('image', formData.image);
  
    try {
      console.log(formData.image);
      await axios.post(`${apiURL}filiere/`, formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchFilieres();
      setShowModal(false);
      setFormData({ nom: '', objectif: '', insertionProfessionnel: '', vacation: '', image: null });
    } catch (error) {
      console.error('Erreur lors de la création de la filière :', error);
    }
  };
  
  const handleSubmitModifier = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('nom', formDataAModifier.nom);
    formDataToSend.append('objectif', formDataAModifier.objectif);
    formDataToSend.append('insertionProfessionnel', formDataAModifier.insertionProfessionnel);
    formDataToSend.append('vacation', formDataAModifier.vacation);
    formDataToSend.append('image', formDataAModifier.image);
  
    try {
      console.log(formDataToSend);
      await axios.put(`${apiURL}filiere/${selectedId}`, formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFilieres();
      setShowModalM(false);
      setFormDataAModifier({ nom: '', objectif: '', insertionProfessionnel: '', vacation: '', image: null });
    } catch (error) {
      console.error('Erreur lors de la création de la filière :', error);
    }
  };
  const supprimerFiliere = async (id) => {
    try {
      await axios.delete(`${apiURL}filiere/${id}`);
      fetchFilieres();
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la filiere :', erreur);
    }
  };
  return (
    <div>
    <Header />
    <section>
      <Sidebar />
    </section>
    <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
      <h1>Liste des Filieres</h1>
      <Button variant="success" onClick={handleShowModal}>Ajouter une Filière</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Objectif</th>
            <th>Insertion Professionnelle</th>
            <th>Vacation</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filieres.map((filiere) => (
            <tr key={filiere.id}>
              <td>{filiere.nom}</td>
              <td>{filiere.objectif}</td>
              <td>{filiere.insertionProfessionnel}</td>
              <td>{filiere.vacation}</td>
              <td>{filiere.image}</td>
              <td>
                <Button variant="primary" onClick={()=>handleModifierClick(filiere.id)}>Modifier</Button>
                <Button variant="danger" onClick={()=>supprimerFiliere(filiere.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Filière</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="objectif">
              <Form.Label>Objectif</Form.Label>
              <Form.Control type="text" name="objectif" value={formData.objectif} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="insertionProfessionnel">
              <Form.Label>Insertion Professionnelle</Form.Label>
              <Form.Control type="text" name="insertionProfessionnel" value={formData.insertionProfessionnel} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="vacation">
              <Form.Label>Vacation</Form.Label>
              <Form.Control type="text" name="vacation" value={formData.vacation} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
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

       <Modal show={showModalM} onHide={handleCloseModalM}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une Filière</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group controlId="nom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" name="nom" value={formDataAModifier.nom} onChange={handleInputModificationChange} />
            </Form.Group>
            <Form.Group controlId="objectif">
              <Form.Label>Objectif</Form.Label>
              <Form.Control type="text" name="objectif" value={formDataAModifier.objectif} onChange={handleInputModificationChange} />
            </Form.Group>
            <Form.Group controlId="insertionProfessionnel">
              <Form.Label>Insertion Professionnelle</Form.Label>
              <Form.Control type="text" name="insertionProfessionnel" value={formDataAModifier.insertionProfessionnel} onChange={handleInputModificationChange} />
            </Form.Group>
            <Form.Group controlId="vacation">
              <Form.Label>Vacation</Form.Label>
              <Form.Control type="text" name="vacation" value={formDataAModifier.vacation} onChange={handleInputModificationChange} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image"  onChange={handleImageModifierChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalM}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmitModifier}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal> 
    </main>
    </div>
  );
};

export default FiliereAdmin;
