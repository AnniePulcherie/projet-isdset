import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setInscription } from '../../app/inscriptionSlice';
import { setEtudiant } from '../../app/etudiantSlice';
import FileUpload from './FileUpload';

const  Etudiant =() =>{
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nomPere, setNomPere] = useState('');
  const [nomMere, setNomMere] = useState('');
  const [dateDeNaissance, setDateDeNaissance] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [situationMatrimoniale, setSituationMatrimoniale] = useState('');
  const [fonction, setFonction] = useState('');
  const [cinURL, setCinURL] = useState('');
  const [diplomeURL, setDiplomeURL] = useState('');
  
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [resultat, setResultat] = useState(null);
  const dispatch = useDispatch();
 
  
  const [showModal, setShowModal] = useState(false);
  const apiURL = process.env.REACT_APP_API_USER_URL;
  dispatch(setEtudiant(resultat));
 
  
  const situations = [
    {
      id : 1,
      nom: "Célibataire",
    },
    {
      id: 2,
      nom: "Marié",
    },
    {
      id: 3,
      nom : "Veuf(ve)",
    },
    {
      id: 4,
      nom: "Autre",
    },
  ];

 
  useEffect(() => {
    if(user){
      setEmail(user.email);
      // fetchFilieres();
      // fetchFormations();
      // console.log(inscription);
      
    }else{
      navigate('/login');
    }
    
    
  },[]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Vérification des champs vides
     if (
      !nom ||
      !prenom ||
      !nomPere ||
      !nomMere ||
      !dateDeNaissance ||
      !lieuNaissance ||
      !situationMatrimoniale ||
      !fonction ||
      !telephone ||
      !email 
      // !formationId ||
      // (!filiereId && selectedModules)
    ) {
      alert('Veuillez remplir tous les champs');
      return; // Arrête l'exécution de la fonction si un champ est vide
    }
    // Créez un objet FormData pour stocker les données du formulaire, y compris les fichiers
    const formData = new FormData();
  
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('nomPere', nomPere);
    formData.append('nomMere', nomMere);
    formData.append('dateDeNaissance', dateDeNaissance);
    formData.append('lieuNaissance', lieuNaissance);
    formData.append('situationMatrimoniale', situationMatrimoniale);
    formData.append('fonction', fonction);
    formData.append('cin', cinURL);
    formData.append('diplome', diplomeURL); 
    formData.append('telephone', telephone);
    formData.append('email', email);
    formData.append('userId', user.id);
    
     
    try {
      console.log(formData);
        const response = await axios.post(`${apiURL}etudiant/`,formData, 
          {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });
      console.log(formData);
      console.log('Données envoyées avec succès', response.data);
      console.log(response.data.nouvelEtudiant);
      setResultat(response.data.nouvelEtudiant);
      dispatch(setInscription(response.data.nouvelEtudiant));
      alert("Votre inscription a été réussi !");
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données', error);
    }
  };
  
  const navigation =()=>{
    navigate('/paiement');
  }
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/accueil');
  };

 
  
  return (
    <div>
      
      <section className="section">
        <div className='formulaire'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Fiche d'Inscription</h5>
                <form onSubmit={handleSubmit}>
                  <div className = 'row'>
                    <div className="col-lg-6">
                      <div className="row mb-3">
                        <label for="inputText" className="col-sm-3 col-form-label">Nom</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={nom} onChange={(e)=>setNom(e.target.value)}/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="inputText" className="col-sm-3 col-form-label">Prénom</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={prenom} onChange={(e)=>setPrenom(e.target.value)}/>
                        </div>
                      </div>    

                      <div className="row mb-3">
                        <label for="inputText" className="col-sm-3 col-form-label">Fils (Fille de): </label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={nomPere} onChange={(e)=>setNomPere(e.target.value)}/>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <label for="inputText" className="col-sm-3 col-form-label">Et de</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={nomMere} onChange={(e)=>setNomMere(e.target.value)}/>
                        </div>
                      </div>
                    <div className="row mb-3">
                      <label for="inputDate" className="col-sm-3 col-form-label">Né(e) le :</label>
                      <div className='col-sm-9'>
                        <input type="date" className="form-control" value={dateDeNaissance} onChange={(e)=>setDateDeNaissance(e.target.value)}/>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label for="inputDate" className="col-sm-3 col-form-label">Lieu de Naissance :</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" value={lieuNaissance} onChange={(e)=>setLieuNaissance(e.target.value)}/>
                      </div>
                    </div>
                    
                    </div>
                    <div className='col-lg-6'>
                    <div className="row mb-3">
                        <label for="inputText" className="col-sm-3 col-form-label">Fonction</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={fonction} onChange={(e)=>setFonction(e.target.value)}/>
                        </div>
                      </div>
                    <div className="row mb-3">
                      <label for="inputText" className="col-sm-3 col-form-label">Situation </label>
                      <div className="col-sm-9">
                        <select as="select" className="form-control" name="formation" value={situationMatrimoniale} onChange={(e)=>setSituationMatrimoniale(e.target.value)}>
                          <option value="">Situation matrimoniale</option>
                          {situations && situations.map((situation) => (
                          <option key={situation.id} value={situation.id}>
                              {situation.nom}
                          </option>
                          ))}
                        </select>
                      </div>
                    </div>
                      <div className="row mb-3">
                        <label for="inputNumber" className="col-sm-3 col-form-label">CIN</label>
                        <div className="col-sm-9">
                          <FileUpload onFileUpload={(url) => setCinURL(url)} /> 
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label for="inputNumber" className="col-sm-3 col-form-label"> Diplome</label>
                        <div className="col-sm-9">
                          <FileUpload onFileUpload={(url) => setDiplomeURL(url)} /> 
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="inputNumber" className="col-sm-3 col-form-label">Telephone</label>
                        <div className="col-sm-9">
                          <input type="number" className="form-control" value={telephone} onChange={(e)=>setTelephone(e.target.value)}/>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="inputEmail" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                      </div>
                      
                        <button type="submit" className="btn btn-primary mybtn" >Creer un compte étudiant</button>
                      
                    </div>
                  </div>
                </form>

              </div>
            </div>

        </div>
      </section>
      
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Inscription réussie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Votre inscription a été enregistrée avec succès.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={navigation}>
              Payer l'inscription
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Etudiant;

