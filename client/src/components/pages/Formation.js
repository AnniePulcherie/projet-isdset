import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './footer';
import ChoisirFormation from './ChoisirFormation';

const Formation = () => {

  const [filieres, setFilieres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // État du filtre

  useEffect(() => {
    // Chargez la liste des filières depuis l'API (par exemple, une API REST)
    async function fetchFilieres() {
      try {
        const response = await axios.get('http://localhost:3001/filiere');
        setFilieres(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des filières :', error);
      }
    }

    fetchFilieres();
  }, []);

  const filteredFilieres = filieres.filter((filiere) => {
    if (filter && filiere.filter !== filter) {
      return false;
    }
    if (
      filiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.objectif.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.insertionProfessionnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.vacation.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return (
    <div>
       <Menu />
          <ChoisirFormation />
         <Footer/>
        
    </div>
  );
};


export default Formation;