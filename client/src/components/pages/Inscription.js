import React, { useState } from 'react';
import axios from 'axios';
import Menu from './Menu';
import Etudiant from './Etudiant';
import Footer from './footer';



const  Inscription =() =>{
  
  const [userData, setUserData] = useState({
    typeFormation: '',
    nomFiliere: '',
    dateInscription: '',
    etatInscription: '',
    
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Gérer les champs de fichier séparément
    if (type === 'file') {
      setUserData({
        ...userData,
        [name]: files[0],
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  
  return (
    <div className="contenair">
      <Menu />
      <main>
      <section className="section-inscription">
        <section>
            <Etudiant />
        </section>
        
      </section>
      </main>
      <Footer/>
    </div>
  );
}

export default Inscription;

