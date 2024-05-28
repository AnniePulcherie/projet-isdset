import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import { Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';
import { useSelector } from 'react-redux';


const Filiere = () => {
  const apiURL = process.env.REACT_APP_API_USER_URL;
  // const user = useSelector((state) => state.user);
  const [filieres, setFilieres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState(''); // État du filtre
  
  const fetchFilieres= async()=>{
    try {
      const response = await axios.get(`${apiURL}filiere`);
      setFilieres(response.data);
      console.log(response.data);
      // uploadImages(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des filières :', error);
    }
  }

  useEffect(() => {
    
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
      <main>
        <div className="container">
          <h1>Liste des Filières</h1>
          <section className='search'>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Rechercher une filière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            
          </section>
          <div className="row">
            {filteredFilieres && filteredFilieres.map((matiere) => (
              <div className="col-md-4" key={matiere.id}>
                <Card style={{ width: '18rem', margin: '7px', height: '30rem'}}>
                  <img src={`${apiURL}uploads/${matiere.image}`} alt={`sary `} />
                    
                  <Card.Body>
                    <Card.Title>{matiere.nom}</Card.Title>
                    <Card.Text>
                      <strong>Vacation :</strong> {matiere.vacation}
                    </Card.Text>
                    <div className='boutonFiliere'>
                      <Link to={`/formation/${matiere.id}`} className='btn btn-primary'>En savoir plus</Link>
                      {/* <button onClick={() => choixFiliere(matiere.id)} className='btn btn-primary' variant="primary">S'inscrire</button> */}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Filiere;
