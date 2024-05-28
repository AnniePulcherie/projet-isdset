import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import SidebarEtudiant from './SidebarEtudiant';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import axios from 'axios';

const DashboardEtudiant = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const inscription = useSelector((state)=>state.inscription);
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [message, setMessage] = useState('');
  const etudiant  = useSelector((state)=>state.etudiant);
  const navigate = useNavigate();
  const listeFormation = useSelector((state)=>state.formations);
  const modulaire = useSelector((state)=>state.modulaire);
  const filiere = useSelector((state)=>state.listeFilieres);
  const [paiementEnAttente,setPaiementEnAttente] = useState(null);
  console.log(modulaire);
 
  const getInscriptionNonPayer = async()=>{
    try{
     const inscriptionss = await axios.get(`${apiURL}inscription/inscription/nonPayer/${etudiant.id}}`);
     console.log(inscriptionss.data.reponse.modulaire.length);
     if( inscriptionss.data.reponse.inscription.length >0 || inscriptionss.data.reponse.modulaire.length >0){
      setMessage(`Vous avez des inscriptions en attente`);
     }
     
    }catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    if (!inscription) {
      navigate('/accueil');
    }
    if(!filiere){ 
      setMessage("Vous n'avez pas encore payer votre inscription, veuillez les payer d'abord s'il vous plait");
    }
    getInscriptionNonPayer();
    getPaiementEnAttente();
    if(paiementEnAttente){
      setMessage(`Veuillez patienter, vous avez des paiements en attente`);
    }
  
    console.log(listeFormation);
  }, []);

  const getPaiementEnAttente = async()=>{
    try{
      const reponsePaiement = await axios.get(`${apiURL}paiement/paiementEnAttente/etudiant/${etudiant.id}`);
      console.log(reponsePaiement.data.nbPaiementEnAttente);
      if(reponsePaiement.data.nbPaiementEnAttente >0){
        setPaiementEnAttente(reponsePaiement.data.nbPaiementEnAttente);
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleDownloadPDF = (pdfFilename) => {
    const downloadURL = `${apiURL}download/${pdfFilename}`;

    fetch(downloadURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement du fichier');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', pdfFilename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Erreur de téléchargement :', error.message);
      });
  };

  return (
    <div>
      <Header />
      <SidebarEtudiant />
    
      <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
        <div className="pagetitle">
          <h1>Dashboard </h1>
         
        </div>
        <div>
        {message &&(
          <span>{message}</span>
        )}
        <br/>
          {/* {listeFormation && listeFormation.map((formation)=>(
            <button className='btn btn-primary' onClick={()=> navigate('/paiement')}>{formation.typeFormation}</button>
          ))
            
          } */}
        {/* {filiere && filiere.map((filiere)=>(
          <div key={filiere.id}>
            <h2>Objectif</h2>
            <p>{filiere.objectif}</p>

            <h2>Vacation</h2>
            <p>{filiere.vacation}</p>

            <h2>Insertion Professionnelle</h2>
            <p>{filiere.insertionProfessionnel}</p>
          </div>
        ))} */}
        </div>

        <div className='row'>
            { modulaire && modulaire.map((mod)=>(
            <div className=" col-md-4 module">
                <div className="card info-card revenue-card">

                    <div className="card-body">
                    <h5 className="card-title">{mod.nom}</h5>

                    <div className="d-flex align-items-center">
                        
                        <div className="ps-3">
                        <h6>Competences visé :</h6>
                        <p>{mod.competencesVise}</p>
                        <span 
                            className="text-success small pt-1 fw-bold"
                            onClick={() => handleDownloadPDF(mod.cours)}
                            style={{ cursor: 'pointer' }}
                        >
                        Telecharger le Pdf</span> 

                        </div>
                    </div>
                    </div>

                </div>
            </div>
        ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardEtudiant;
