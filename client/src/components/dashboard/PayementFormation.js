import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SidebarEtudiant from './SidebarEtudiant';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';

const PayementFormation = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [dateN, setDateN] = useState(null);
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const inscription = useSelector((state) => state.inscription);
    const [formation, setFormation] = useState(null);
    const [paiement, setPaiement] = useState(null);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const verification = () => {
        if (Array.isArray(inscription) && inscription.length > 0) {
            console.log(inscription);
        } 
    }
     const getPaiementFormation = async()=>{
        try{
            const reponse = await axios.get(`${apiURL}paiementFormation/${user.id}`);
            setFormation(reponse.data);
            
        
        }catch(error){
            console.log(error);
        }
        
     }
     const getPaiementByInscription = async()=>{
        try{
            const reponse = await axios.get(`${apiURL}paiement/inscription/${inscription.id}`);
            setPaiement(reponse.data);
            console.log(reponse.data);
        }catch(error){
            console.log(error);
        }
     }
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        verification();
        getPaiementFormation();
        getPaiementByInscription();
        console.log(paiement);
        
    }, []);

    return (
        <div>
            <Header />
            <SidebarEtudiant />
            <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
            
                <div className="container">
                    <div className="section-profil">
                        <div className="col-md-6">
                        <h2>Ma formations</h2>
                        {formation && formation.map((formation)=>(
                            <section>
                                <p>Formation : <span>{formation.formation.nom}</span></p>
                                <p>Type :<span>{formation.formation.typeFormation}</span></p>
                                
                            </section>
                            ))}
                        </div>
                        <div className="vertical-line"></div>
                        <div className="col-md-6">
                        <h2>Mes payements</h2>
                        {paiement && paiement.map((paiement)=>(
                            
                            <section>
                                <p>EMAIL : <span>{paiement.etat}</span></p>
                                <p>TELEPHONE : <span>{paiement.etatDroit}</span></p>
                                <p>NOM DU MERE: <span>{paiement.nomMere}</span></p>
                                <p>NOM DU PERE : <span>{paiement.nomPere}</span></p>
                            </section>)
                        )}
                        </div>
                        </div>
                </div>
            </main>
        </div>
    );
};

export default PayementFormation;
