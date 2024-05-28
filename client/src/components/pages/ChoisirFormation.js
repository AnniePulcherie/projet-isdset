import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import { Card, Button, Modal, Col } from 'react-bootstrap';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInscription } from '../../app/inscriptionSlice';
import GetAllModules from './getAllModule';


const ChoisirFormation = () => {
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [formations, setFormations] = useState([]);
  
  const [formationID, setFormationID] = useState('');
  const navigate = useNavigate();
  const etudiant = useSelector((state)=>state.etudiant);
  const [showModal, setShowModal] = useState(false);
  const [niveau, setNiveau] = useState('');
  const [filieres, setFilieres] = useState(null);
  const [filiereId, setFiliereId] = useState('');
  const [modulaire, setModulaire] = useState(false);
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  const dispatch = useDispatch();
  const niveaux = [
    {
      id:1,
      nom: "L1",
    },
    {
      id:2,
      nom:"L2",
    },
    {
      id:3,
      nom:"L3",
    },
    {
      id:4,
      nom:"M1",
    },
    {
      id:2,
      nom:"M2",
    },
  ];
   
  const choixFormation = async(formationId)=>{
    console.log(etudiant);
    if(!etudiant){
      navigate('/inscription');
    }else{
      console.log(etudiant.id);
      console.log(formationId);
      setFormationID(formationId);
      if(formationId ===3){
        setModulaire(true);
        
      }else{
        setModulaire(false);
        handleShowModal();
      }
      
      
       
      
  }
}
  const inscription = async()=>{
      // console.log('anaty inscription modulaire');
      const formData = new FormData();
      formData.append('EtudiantId',etudiant.id);
      formData.append('FormationId',formationID);
      formData.append('niveau', niveau);
      formData.append('FiliereId', filiereId);
      formData.append('selectedModule', selectedModules);
      console.log('selectedModule', selectedModules);

      try{
    
          const reponse = await axios.post(`${apiURL}inscription/`, formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(reponse.data);
          dispatch(setInscription(reponse.data));
          alert("Votre inscription a été bien enregistrer");
          navigate('/accueil');
      }catch(err){
        console.log(err);
      }
    }
  
    
    const getModule = async () => {
      try {
        const response = await axios.get(`${apiURL}module`); 
        setModules(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des filières :', error);
      }
    };
   const getFilieres = async() => {
      try {
        const response = await axios.get(`${apiURL}filiere`);
        setFilieres(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des filières :', error);
      }
    }
  const  getFormation = async() => {
    try {
      const response = await axios.get(`${apiURL}formation`);
      setFormations(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des filières :', error);
    }
  }

 
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

 
  // const handleModuleChange = (e) => {
  //   const module = e.target.value;
  //   if (e.target.checked) { 
  //     setSelectedModules([...selectedModules, module]);
      
  //   } else {
  //     setSelectedModules(selectedModules.filter((selected) => selected !== module));
  //   }
  // };
  useEffect(() => {
    getFormation();
    getFilieres();
    getModule();
    
  },[]);

  
  return (
    <div>
        
        <main>
          <div className="container centrer">
          <h1>Quel type de formation ira mieux pour vous ?</h1>
          <div className="row">
              {formations && formations.map((formation) => (
              <div className="col-md-4" key={formation.id}>
                  <Card style={{ width: '22rem', margin: '10px', height: '22rem'}}>
                  
                  <Card.Body style={{ justifyContent:'space-between'}}>
                      <Card.Title>{formation.typeFormation}</Card.Title>
                      <Card.Text>
                      <strong>Frais generaux :</strong> {formation.fraisGeneraux} Ar
                      <br />
                      <strong>Droit d'inscription :</strong> {formation.droitInscription} Ar
                       <br />
                      <p><strong>Ecolage :</strong> {formation.ecolage} Ar</p>
                      <br />
                      <strong>Payement de l'ecolage :</strong> {formation.tranche}
                      <br />
                      <strong>Durée de formation :</strong> {formation.duree}
                      <br />
                      <p><strong>Droit d'examen :</strong> {formation.droitExamen} Ar </p>
                      </Card.Text>
                      <Button variant="primary" onClick={()=>choixFormation(formation.id, formation.typeFormation)}>S'inscrire</Button>
                  </Card.Body>
                  </Card>
              </div>
              ))}
          </div>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>S'inscrire  à quelle niveau</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Niveau</label>
                                <div className="col-sm-9">
                                  <select as="select" className="form-control" name="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)}>
                                    <option value="">Sélectionnez votre niveau</option>
                                    {niveaux && niveaux.map((niv) => (
                                      <option key={niv.id} value={niv.id}>
                                        {niv.nom}
                                      </option>
                                    ))}
                                  </select> 
                                  <select as="select" className="form-control" name="filiere" value={filiereId} onChange={(e) => setFiliereId(e.target.value)}>
                                    <option value="">Sélectionnez une Filière</option>
                                    {filieres && filieres.map((filiere) => (
                                      <option key={filiere.id} value={filiere.id}>
                                        {filiere.nom}
                                      </option>
                                    ))}
                                  </select>
                                </div>
              </div>
                
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Annuler
              </Button>
              <Button variant="primary" onClick={inscription}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>
      
      
    
          {
            modulaire &&(
              <GetAllModules onModulesSelect = {setSelectedModules} />
            )
          }
       
      
        </main>
    </div>
  );
};


export default ChoisirFormation;