import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListeFiliere from './ListeFiliere';
import sary1 from '../../assets/img/sary1.jpg';
import {  useSelector } from 'react-redux';
import axios from 'axios';
import Aos from 'aos';
import Menu from './Menu';
import Footer from './footer';

const Accueil = () => {
   
    // const [recherche,setRecherche] = useState("");
   
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const etudiant= useSelector((state)=>state.etudiant);
    
    const getVerification = async ()=>{
        try{
          const verification = await axios.get(`${apiURL}verification/${etudiant.id}`);
          console.log(verification.data);
  
          }catch(error){
            console.log(error);
          }
      }

    //   useEffect(()=>{
    //     // getEtudiant();
    //     Aos.init({duration: 2000});
    //     getVerification();
    //   },[]);
    return (
        
        <div className='myAccueil'>
        <Menu />
        <main className="main-Accueil">
          
            <section className='sectionTitre'>
                <article className='articleTitre'>
                    <h1>Institut Superieur de Developpement</h1>
                    <h3>Sciences, Education et Technologie</h3>
                </article>
                <div className= 'slogan'>
                    <p>Construisons votre avenir et changer le monde </p>
                    <p>en apprenant à votre rythme</p>
                </div>
                <img className='autre-logo' src={sary1} alt='logo' />
            </section>
            
            <section className='section2'>
                <div className='rechercher'>
                    {/* <div className='lesInput'>
                        <input type="text" className='inputRecherche' value={recherche} onChange = {(e)=>setRecherche(e.target.value)} placeholeder="Rechercher ..."/>
                        <button type="submit" className='btnChercher'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>   
                        
                    </div> */}
                    <button className='mybtn'>
                    <Link to ='/formation' >Explorer nos formations  
                        <FontAwesomeIcon icon={faArrowRight} className="fleche"/>
                    </Link>
                    </button>

                </div>
                <div className='mySearch'>
                    <ul className='format'>
                        <li>A DISTANCE</li>
                        <li>EN SALLE</li>
                    </ul>
                </div>
            </section> 
            <div className="filiere-Accueil"></div>
            <section className="contente-filiere">
                <h1> Filières</h1>
                <div><ListeFiliere /></div>
            
            </section>
            
        </main>
        
        <Footer />
        </div>
    );
};

export default Accueil;