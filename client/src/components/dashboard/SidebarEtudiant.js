import axios from 'axios';
import { faBook, faCreditCard, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import profile from "../../assets/img/profile-img.jpg";
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { clearModules, setModuleSemestre } from '../../app/modulesReducer';
import { clearUser } from '../../app/userSlice';
import { clearInscription } from '../../app/inscriptionSlice';
import '../../assets/css/sidebar.css';
import { setNombreTelechargement } from '../../app/telechargement';
import { setListeFilieres } from '../../app/listeFiliereSlice';

const SidebarEtudiant = () => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const formationInscrit = useSelector((state)=>state.formations);
    const user = useSelector((state) => state.user);
    const etudiant = useSelector((state) => state.etudiant);
 
    const [nbModules, setNbModule] = useState(0);
    const [nbMois, setNbMois] = useState(0);
    const totalMois = 12;
  
    const navigate = useNavigate();
  
    const [modules, setModules ] = useState([]);
    const semestres = [...new Set(modules.map((module) => module.semestre))];
    const dispatch = useDispatch();
 
    const getFiliere = async () => {
      let table = [];
      try {
        const response = await axios.get(`${apiURL}etudiant/filiere/${etudiant.id}`);
        console.log('reponse', response.data.listeModule);
        dispatch(setListeFilieres(response.data.listeFilieres));
      
        for(let m of response.data.listeModule){
            console.log(m);
            for(let i of m){
              const tableau = table.push(i);
            console.log("tableau",tableau);
            }
           
        }
        console.log("table " ,table);
        setModules(table);
        dispatch(setModuleSemestre(table));
        setNbModule(table.length);
  
      } catch (error) {
        console.error('Erreur lors de la récupération de la filière :', error);
      }
    };

    console.log("semestre: ", semestres);
  
    const getPaiement = async ()=>{
      try{
      for ( const formation of formationInscrit){
        const reponse = await axios.get(`${apiURL}paiement/nombreMois/${etudiant.id}/${formation.id}`);
        console.log(reponse.data);
       setNbMois(reponse.data.totalMois);
     
      }}catch(error){
        console.log(error);
      }
     
    }

   
      const handleLogout = () => {
        dispatch(clearUser());
        dispatch(clearInscription());
        dispatch(clearModules());
        
        navigate('/login'); // Utilisez la fonction navigate pour la redirection
      };

      const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
      
          try {
            const response = await axios.put(`${apiURL}etudiant/${etudiant.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log('Image uploaded successfully:', response.data);
            
            // Si votre backend renvoie une URL de l'image téléchargée,
            // vous pouvez la récupérer et l'afficher dans votre application
            const uploadedImageUrl = response.data.imageUrl;
            // Faites quelque chose avec l'URL de l'image téléchargée
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    useEffect(()=>{
     
          if(!user){
              navigate('/login');
          }
          else if(!etudiant){
            
              navigate('/accueil');
          }
   
          getFiliere();
          getPaiement();
          
          console.log(nbMois, totalMois, nbModules);
          
          const nombreModulesTelechargeables = Math.floor(2*(nbMois * nbModules)/totalMois);
          console.log("module telechargeable",nombreModulesTelechargeables);
          
         if(nombreModulesTelechargeables >0){
          dispatch(setNombreTelechargement(Math.max(nombreModulesTelechargeables)));
         }
          // s'assure que le nombreModulesTelechargeables est toujours positif
       
    },[]);

    return (
        <div>
            {!user ? (<Navigate to='/accueil' />) : (
            <aside  id="sidebar" className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                
                <div className='sary'>
                  {etudiant.image ? (<img src={etudiant.image} alt="sary" />):(<img src={profile} alt="sary"/>)}
                  <label htmlFor="upload-input" className="edit-button">Modifier</label>
                  <input id="upload-input" type="file" style={{ display: 'none' }} onChange={handleImageUpload}/>
                  <h3>{user.nom}</h3>
                </div>
                <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item ">
                    <Link to={`/${user.role}/${user.id}/dashboard`} className= "nav-link collapsed">
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <NavLink to={`/${user.role}/${user.id}/profile`}className= "nav-link collapsed">
                    <FontAwesomeIcon icon={faUser} />
                    <span className='span'>Profile</span>
                    </NavLink>
                </li>
                
                <li className="nav-item">
                    <NavLink to={`/paiement`} className= "nav-link collapsed">
                    <FontAwesomeIcon icon={faCreditCard} />
                    <span className='span'>Payer la Formation</span>
                    </NavLink>
                </li>
                <div>
                 <h4> Mes cours </h4>
                    <ul>
                    
                    {semestres && semestres.map((semestre) => (
                       <NavLink 
                            to={`/${user.role}/${user.id}/semestre/${semestre}`} 
                            className="nav-item nav-link collapsed"> 
                       <FontAwesomeIcon icon={faBook} /><span>Semestre {semestre}</span></NavLink>
                    ))}
                    </ul>
                </div>
                
                </ul>
                <ul>
                <li className="nav-item nav-link collapsed" onClick={handleLogout}>
                         
                         <FontAwesomeIcon icon={faSignOut} />
                         <span
                         style={{ cursor: 'pointer' }}>LogOut</span>
                     
                 </li>
                </ul>
            </aside>
            )}
        </div>
    );

};

export default SidebarEtudiant;
