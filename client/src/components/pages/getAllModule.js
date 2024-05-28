import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const GetAllModules = ({onModulesSelect}) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedModules, setSelectedModules] = useState([]);
  const etudiant = useSelector((state)=>state.etudiant);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
console.log(etudiant);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const getModule = async () => {
        try {
          const response = await axios.get(`${apiURL}module`); 
          setModules(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des filières :', error);
        }
      };
    useEffect(()=>{
        getModule();
        handleShowModal();
        
    }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModuleChange = (e) => {
    const module = e.target.value;
    if (e.target.checked) { 
      setSelectedModules([...selectedModules, module]);
      
    } else {
      setSelectedModules(selectedModules.filter((selected) => selected !== module));
    }
  };

  const handleSubmit = async() => {
    // Gérez ici l'envoi des modules sélectionnés au backend, par exemple en utilisant une requête HTTP.
   onModulesSelect(selectedModules); 
   try{
      const post = await axios.post(`${apiURL}inscriptionModulaire/`,
      {
        EtudiantId: etudiant.id,
        selectedModules,
      });
      console.log(selectedModules);
      console.log(post);
      setSelectedModules([]);
      handleCloseModal();
      navigate('/accueil');
    }catch(error){
      console.log(error);
    }
    
    // Réinitialisez la sélection et fermez la modal

   
  };

  return (
    <div>
    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sélection de modules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modules.map((module) => (
              <Form.Group as={Col} key={module.id}>
                <Form.Check
                  type="checkbox"
                  label={module.nom}
                  value={module.id}
                  onChange={handleModuleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GetAllModules;