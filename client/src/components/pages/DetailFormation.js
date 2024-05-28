import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Menu from './Menu';
import {  Card, Image } from 'react-bootstrap'; // Importez les composants Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Footer from './footer';

const DetailFormation = () => {
  const [formation, setFormation] = useState(null);
  const id = useParams();
  const apiURL = process.env.REACT_APP_API_USER_URL;
    console.log(id);
  const getFormation = async () => {
    try {
      const reponse = await axios.get(`${apiURL}filiere/${id.id}`);
      console.log(reponse.data);
      setFormation(reponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFormation();
  }, []);

  return (
    <div>
      
        <div className="formationDetails">
            {formation && (
                
                <main className="d-flex justify-content-center align-items-center detail" >
                    <Card style={{ width: '80%'}}>
                        <Link to='' onClick={() => window.history.back()} className="arrow-link">
                            <span style={{marginRight:'10px'}}>Retour</span>
                            <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
                        </Link>
                        <div className='styleCard'>
                            <Image src={formation.image} alt={formation.nom} fluid />
                            <Card.Body>
                            <Card.Title>{formation.nom}</Card.Title>
                            <Card.Text><h6>Objectif :</h6> </Card.Text>
                            <Card.Text>{formation.objectif}</Card.Text>
                            <Card.Text><h6>Insertion Professionnelle :</h6> </Card.Text>
                            <Card.Text>{formation.insertionProfessionnel}</Card.Text>
                            <Card.Text><h6>Vacation</h6> </Card.Text>
                            <Card.Text>{formation.vacation}</Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                </main>
                    
                
            )}
        </div>
       
        
        
    
    </div>
  );
};

export default DetailFormation;
