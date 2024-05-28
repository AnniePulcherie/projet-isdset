import React, { useEffect, useState } from 'react';

import Header from './Header';
import Sidebar from './sidebar';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Dashboard = () => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const [nbByFiliere, setNbByFiliere] = useState(null);
    const [nbByNiveau, setNbByNiveau] = useState(null);
    const [listePaiement, setListePaiement] = useState(null);
    const [nombreInscriptionPayer, setNombreInscriptionPayer] = useState();
    const nombreInscrit = async()=>{
        try{
            const reponse = await axios.get(`${apiURL}inscription/total/inscrit`);
            console.log(reponse.data);
            setNbByFiliere(reponse.data.statsByFiliere);
            setNbByNiveau(reponse.data.statsByNiveau);
        }catch(error){
            console.log(error);
        }
    }
    const nombreInscriptionPaye = async()=>{
        try{
        const reponse = await axios.get(`${apiURL}inscription/inscrits/payer`);
        console.log(reponse);
        setNombreInscriptionPayer(reponse.data)
        }catch(error){
            console.log(error);
        }
    }

    const listePaiementEnAttente = async()=>{
        try{
            const reponse = await axios.get(`${apiURL}paiement/paiementEnAttente/total`);
            console.log(reponse.data);
            setListePaiement(reponse.data);
        }catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        nombreInscrit();
        nombreInscriptionPaye();
        listePaiementEnAttente();
    },[]);
    
    return (
        <div>
            
            <Header />
            
            <Sidebar />
            <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">

                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    
                </div>
                <section className="section dashboard">
                    <div className="row">

                        {/* <!-- Left side columns --> */}
                        <div className="col-lg-8">
                        <div className="row">

                            {/* <!-- Sales Card --> */}
                            {nbByFiliere && nbByFiliere.map((filiere)=>(
                                <div className="col-xxl-4 col-md-6">
                                <div className="card info-card sales-card">

                                    <div className="card-body">
                                    <h5 className="card-title">{filiere.Filiere.nom} </h5>

                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-cart"></i>
                                        </div>
                                        <div className="ps-3">
                                        <h6>{filiere.totalInscrits}</h6>
                                        <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            ))}
                            
                            {/* <!-- End Sales Card --> */}

                            {/* <!-- Revenue Card --> */}
                            { nbByNiveau && nbByNiveau.map((nb)=>(
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">


                                    <div className="card-body">
                                    <h5 className="card-title">Niveau : {nb.niveau}</h5>

                                    <div className="d-flex align-items-center">
                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-currency-dollar"></i>
                                        </div>
                                        <div className="ps-3">
                                        <h6>{nb.totalInscrits}</h6>
                                        <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            ))}
                            { nombreInscriptionPayer &&(
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">


                                    <div className="card-body">
                                    <h5 className="card-title">Nombre d'inscription payer : {nombreInscriptionPayer}</h5>

                                    </div>

                                </div>
                            </div>
                            )}
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">

                                   

                                    <div className="card-body">
                                    <h5 className="card-title">Paiement reçu en attente de verification</h5>

                                    <table className="table table-borderless datatable">
                                        <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Motifs</th>
                                            <th scope="col">Mois</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                        </thead>
                                        {listePaiement && listePaiement.map((liste)=>(
                                            
                                        <tbody>
                                        <tr>
                                            <th scope="row">{ new Date(liste.dateVersement).getDate()}/{liste.dateVersement && new Date(liste.dateVersement).getMonth() + 1}/{liste.dateVersement && new Date(liste.dateVersement).getFullYear()}</th>
                                            <td>{liste.montantTotal}</td>
                                            <td>{liste.motifs}</td>
                                            <td>{liste.nombreMois}</td>
                                            <td><span className="badge bg-success">{liste.etatPaiement}</span></td>
                                        </tr>
                                       
                                        </tbody>
                                        ))}
                                    </table>

                                    </div>

                                </div>
                            </div>
                            {/* <!-- End Recent Sales --> */}

                           

                        </div>
                        </div>
                      

                       

                       
                    </div>
                </section>

            </main>
            <footer id="footer" className="footer">
                <div className="copyright">
                &copy; Copyright <strong><span>ISDset</span></strong>. 
                </div>
                <div className="credits">
                
                Designed by <a href="https://bootstrapmade.com/">R.A.P</a>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;