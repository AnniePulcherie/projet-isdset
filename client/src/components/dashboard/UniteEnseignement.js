import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUniteEnseignement from './EditUniteEnseignement';
import Sidebar from './sidebar';
import Header from './Header';
import { Button, Modal, Table } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import AddUniteEnseignement from './AddUniteEnseignement';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
const UniteEnseignement = () => {
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const [unitesEnseignement, setUnitesEnseignement] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUniteEnseignement, setSelectedUniteEnseignement] = useState([]);
    const [showModalA, setShowModalA] = useState(false);
    const [ueID, setUeID] = useState('');
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
 const handleShowModalA = () => {
    setShowModalA(true);
  };
  const handleCloseModalA = () => {
    setSelectedUniteEnseignement([]);
    setShowModalA(false);
  };
  const getUE = async (id) => {
    try {
        const reponse = await axios.get(`${apiURL}ue/${id}`);
        console.log(reponse);
        setSelectedUniteEnseignement(reponse.data);
        console.log(selectedUniteEnseignement);
        return reponse; // Retourne la réponse pour indiquer que la requête a réussi
    } catch (erreur) {
        console.error('Erreur lors de la récupération de l\'unité d\'enseignement :', erreur);
    }
};

  const handleEdit = (id) => {
    console.log(id);
    setUeID(id);
    getUE(id).then(() => {
        setShowModal(true);
    });
};

  const supprimerUE = async (id) => {
    try {
      await axios.delete(`${apiURL}ue/${id}`);
      chargerUE();
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la formation :', erreur);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUniteEnseignement(null);
  };

  const chargerUE = () =>{
        axios.get(`${apiURL}ue`)
        .then((response) => {
            setUnitesEnseignement(response.data);
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des unités d\'enseignement', error);
        });
  }
  useEffect(()=>{
    chargerUE();
  },[]);
 
  const handleAddSuccess = () => {
    chargerUE(); // Rechargez la liste des unités d'enseignement après l'ajout
    setShowModal(false); // Fermez le modal d'ajout
  };
  return (
    <div>
    <Header />
    <Sidebar /> 
    <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main"> 
        <section>
          <Button variant="success" onClick={handleShowModalA}>
            Ajouter une UE
          </Button>
          <Modal show={showModalA} onHide={handleCloseModalA}>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter une Unité d'enseignement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddUniteEnseignement onAddSuccess={handleAddSuccess} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalA}>
                Annuler
              </Button>
              {/* Le bouton d'ajout est géré dans le composant AddUniteEnseignementForm */}
            </Modal.Footer>
          </Modal>
        </section>   
        <section>
            <h3>Liste des Unités d'Enseignement</h3>
            <Table table striped bordered hover>
                <thead>
                <tr>
                    <th>Intutlé</th>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Compétences Visées</th>
                    <th>Objectif</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {unitesEnseignement.map((uniteEnseignement) => (
                    <tr key={uniteEnseignement.id}>
                    <td>{uniteEnseignement.code}</td>
                    <td>{uniteEnseignement.nom}</td>
                    <td>{uniteEnseignement.type}</td>
                    <td>{uniteEnseignement.competencesVise}</td>
                    <td>{uniteEnseignement.objectif}</td>
                    
                    
                    <td>
                      <button className='btn btn-primary' onClick={()=>handleEdit(uniteEnseignement.id)}>Modifier</button>
                      <button className='btn btn-danger' onClick={()=>supprimerUE(uniteEnseignement.id)}>Suprimer</button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </section>
        <section>
            <div className="container">
        <EditUniteEnseignement
            uniteEnseignement={selectedUniteEnseignement}
            show={showModal}
            handleClose={handleCloseModal}
            handleUpdate={handleAddSuccess}
        />
        </div>
        </section>
      </main>
    </div>
  );
};

export default UniteEnseignement;
