import React, { useEffect, useState } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';

import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setInscription } from '../../app/inscriptionSlice';
import Footer from './footer';

const Paiement = () => {
  const user = useSelector((state) => state.user);
  const inscription = useSelector((state) => state.inscription);
  const etudiant = useSelector((state)=>state.etudiant);
  const navigate = useNavigate();
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const [motif, setMotif] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [bancaire, setBancaire] = useState(false);
  const [operateur, setOperateur] = useState('');
  const [nombreMois, setNombreMois] = useState(0);
  const [reference, setReference] = useState('');
  const [dateVersement, setDateVersement] = useState('');
  const [montant, setMontant] = useState(0);
  const [mois, setMois] = useState(false);
  const [bordereau, setBorderau] = useState('');
  const [agence, setAgence] = useState('');
  const [etatEcolage, setEtatEcolage] = useState(false);
  const [intensive, setIntensive] = useState(false);
  const [ecolageIntensive, setEcolageIntensive] = useState(300000);
  const [module, setModule] = useState(false);
  const totalMois = 12;
  const [nbModule, setNbModule] = useState(0);
  const [nbMoisPayer, setNbMoisPayer] = useState(0);
  const [moduleTelechargeable, setModuleTelechargeable] = useState(0);
  const listeFormation = useSelector((state)=>state.formations);
  const listeFilieres = useSelector((state)=> state.listeFilieres);

  console.log("liste filière", listeFilieres);
  const [paiementExist, setPaiementExist] = useState(null);
  const [formation, setFormation] = useState(listeFormation[0]);
  const [moisApayer,setMoisApayer] = useState(0);
  const getPaiement = async()=>{
    
    try{
      console.log("inscription",inscription);
      const paiementReponse = await axios.get(`${apiURL}paiement/etudiant/${etudiant.id}`);
      if(paiementReponse){
        setPaiementExist(paiementReponse.data);
        console.log(paiementReponse.data[0]);
        
        console.log(formation);
        // setTotalMois(formation.moisTotal);
        setNbMoisPayer(paiementReponse.data[0].nombreMois);
        console.log(paiementReponse.data[0].nombreMois, formation.moisTotal, nbModule);
      }
      
    }catch(err){

      console.log(err);
    }
  }
  const methodePaiement = async () =>{
    if(mois){
      setEtatEcolage(true);
    }

    const paiementData = {
      motifs: motif.toString(),
      nombreMois,
      dateVersement,
      montantTotal: montant,
      etatEcolage,
      etatInscription: true,
      etatPaiement: "En attente",
      moduleTelechargeable,
      EtudiantId: etudiant.id,
      FormationId: formation.id,
    };
    console.log(user.id);
    // Envoyez les données du paiement au serveur
    
    try{
       // Si les deux motifs sont inclus, définir etatInscription à true
        paiementData.etatInscription = true;
       const newPaiement = await axios.post(`${apiURL}paiement`, paiementData);

       console.log(newPaiement.data);
            if(mobile){
              const reponse = await axios.post(`${apiURL}paiementMobile`, {
                operateur,
                reference,
                montant,
                PaiementId : newPaiement.data.id
              });
            
              console.log(reponse);
              
            }else if(bancaire){
              const reponse = await axios.post(`${apiURL}paiementBancaire`, {
                bordereau,
                agence,
                montant,
                PaiementId:newPaiement.data.id
              })
             
              console.log(reponse.data);
            }
            alert("Paiement bien enregistrer, Merci de patienter en attendant la verification");
            navigate('/accueil');
        
    
      }catch (erreur){
        console.log(erreur);
        alert(erreur.response.data.message);
      }
  }
  const postPaiement = async()=>{
    console.log(nbMoisPayer,totalMois);
    const mois = parseFloat((parseInt(nbMoisPayer) * 100)/ parseInt(formation.totalMois));
    console.log("mois : ", mois);
    setModuleTelechargeable(parseFloat(mois * parseInt(nbModule))/ 100);
    methodePaiement();
      
}
  const paiementMobile = () => {
    setBancaire(false);
    setMobile(true);
  };

  const paiementBancaire = () => {
    setMobile(false);
    setBancaire(true);
  };

  const nombreMoisChange = (e) => {
    const newNombreMois = parseInt(e.target.value, 10);
    setNombreMois(newNombreMois);
  };

  const handleMotifChange = (e, forma) => {
    const { name, checked } = e.target;
    let newMotif = [...motif];
    let newMontant = montant;
    if (checked) {
      // La checkbox a été cochée
      if (name === "Ecolage") {
        if(intensive || module){
          setMois(false);
        }else{
          setMois(true);
        }

      }
      if( name ==="FraisGeneraux"){
        console.log(forma);
      }
      newMontant += parseFloat(forma);
      newMotif.push(name);
     // setMontant(newMontant);
    } else {
      // La checkbox a été décochée
      const index = newMotif.indexOf(name);
      if (index !== -1) {
        newMotif.splice(index, 1);
        if (name === "Ecolage") {
          setMois(false);
          
        }
        newMontant -= parseFloat(forma);
        setMontant(newMontant);
      }
    }
    setMontant(newMontant);
    setMotif(newMotif);
  };

  const resetCheckboxes = () => {
    setMotif([]);
    setMontant(0);
    setMois(false);
    setIntensive(false);
    setModule(false);
    setNombreMois(1);
    setEcolageIntensive(300000);
  };
  
  const appelFormation =(formation)=>{
    resetCheckboxes();
    setFormation(formation); 
    if(formation.typeFormation === "Modulaire"){
        setNombreMois(moisApayer);
        setIntensive(false);
    }
    else if(formation.typeFormation === "Intensive"){
      setIntensive(true)
    }else{
      setIntensive(false);
    }
  }

  const formationModulaire = async()=>{
    try{
    const formation = await axios.get(`${apiURL}inscriptionModulaire/inscription/${etudiant.id}`);
    console.log(formation.data);
    setMoisApayer(formation.data.nbNonPaye);
    if (formation.data.formation) {
      const formationExistante = listeFormation.find(form => form.id === formation.data.formation.id);
      if (!formationExistante) {
        listeFormation.push(formation.data.formation);
      }
    }
    
    }catch(error){
      console.log(error);
    }
  }
 const handleEcolaIntensive =(e)=>{
    if(e.target.value <300000){
      alert("Le montant minimum est de 300000 Ar");
    }
    setEcolageIntensive(e.target.value);
 }
  useEffect(() => {
    // Calculez le montant total lorsque nombreMois change
    if(!user && !inscription){
      navigate('/login');
    }
    formationModulaire();

    getPaiement();
    
    if(formation.length >0){
      const ecolage = parseFloat(formation.ecolage);
      console.log(listeFormation);
      let montantTotal = 0;
      if(intensive){
        setMois(false);
        montantTotal += parseFloat(ecolageIntensive);
      } 
      if (mois || module) {
        
          montantTotal += ecolage * parseFloat(nombreMois);
          setEtatEcolage(true);   
          motif.forEach((name) => {
            switch (name) {
              case 'DroitInscription':
                montantTotal += parseFloat(formation.droitInscription);
                break;
              case 'FraisGeneraux':
                montantTotal += parseFloat(formation.fraisGeneraux);
                console.log(formation.fraisGeneraux);
                break;
              case 'Ecolage':
                // Déjà géré ci-dessus
                break;
              case 'DroitExamen':
                montantTotal += parseFloat(formation.droitExamen);
                break;
              // Ajoutez d'autres cas pour d'autres motifs si nécessaire
              default:
                break;
            }
          });
          setMontant(montantTotal);
      }
    }
    
  }, [nombreMois, mois, motif, ecolageIntensive]);
  
  const handleOperateurChange = (e) => {
    setOperateur(e.target.value);
  };

  return (
    <div>
      <Menu />
      <main className='paiement'>
        <div className='formationApayer'>
            {listeFormation && listeFormation.map((formation, index)=>(
              <div key={formation.id}>
                <button className='btn btn-primary' onClick={()=>appelFormation(formation)}>{formation.typeFormation}- {listeFilieres[index] &&listeFilieres[index].nom}</button>
              </div>
              ))}
        </div>
        
        <div className='paiementMode'>
        
            
            <section className ='droitePaiement'>
              <h2>Mode de paiement</h2>
              <div>
                <button className='btn btn-primary' onClick={paiementMobile}>
                  Paiement via Mobile Money
                </button>
                <button className='boutonPaiement' onClick={paiementBancaire}>
                  Paiement par versement bancaire
                </button>
              </div>
            </section>
         
            <section className='gauchePaiment'>
              <article>
              
               
                { (listeFormation.length >0 || formation.length >0) &&(
                <Form>
                <h4>Formation { formation.typeFormation}</h4>
                <FormLabel>Motifs</FormLabel>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="DroitInscription"
                      label={`Droit d'inscription ${formation.droitInscription} Ar`}
                      value="Droit d'inscription"
                      checked={motif.includes('DroitInscription')}
                      onChange={(e) => handleMotifChange(e, formation.droitInscription)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="FraisGeneraux"
                      label={`Frais Generaux ${formation.fraisGeneraux} Ar`}
                      value='FraisGeneraux'
                      checked={motif.includes('FraisGeneraux')}
                      onChange={(e) => handleMotifChange(e, formation.fraisGeneraux)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="Ecolage"
                      label={`Ecolage ${ formation.ecolage} Ar`}
                      value="Ecolage"
                      checked={motif.includes('Ecolage')}
                      onChange={(e) => handleMotifChange(e, formation.ecolage)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      name="DroitExamen"
                      label={`Droit d'examen ${formation.droitExamen} Ar`}
                      value="DroitExamen"
                      checked={motif.includes('DroitExamen')}
                      onChange={(e) => handleMotifChange(e, formation.droitExamen)}
                    />
                  </Form.Group>
                </Form>
                )}
              </article>
              <article className='formulairePayement'>
                <div>
                      {mois && (
                            <Form.Group controlId="nombreMois">
                              <Form.Label>Nombre de Mois</Form.Label>
                              <Form.Control type="number"  name="nombreMois" value={nombreMois} min={1} onChange={nombreMoisChange} requierd />
                            </Form.Group>
                          )}
                      {module && (
                        <Form.Group controlId="nombreMois">
                          <Form.Label>Nombre de Module</Form.Label>
                          <Form.Control type="number"  name="nombreMois" value={nombreMois} />
                        </Form.Group>
                      )}
                      {intensive &&(
                        <Form.Group controlId="nombreMois">
                          <Form.Label>Première versement: minimum 300.000 Ar</Form.Label>
                          <Form.Control type="number" 
                          name="ecolageIntensive" 
                          value={ecolageIntensive} min= {300000} 
                          onChange={handleEcolaIntensive} requierd/>
                        </Form.Group>
                      )}
                </div>
                <div>
                      {mobile && (
                        <Form>
                          <div className='row'>
                            <FormLabel>Opérateur</FormLabel>
                            <Form.Group controlId="operateur">
                              <Form.Check
                                type="radio"
                                label='Telma'
                                name='choix'
                                value='Telma'
                                checked={operateur === 'Telma'}
                                onChange={handleOperateurChange}
                                required
                              />
                            </Form.Group>
                            <Form.Group controlId="operateur">
                              <Form.Check
                                type="radio"
                                label='Orange'
                                name='choix'
                                value='Orange'
                                checked={operateur === 'Orange'}
                                onChange={handleOperateurChange}
                                required
                              />
                            </Form.Group>
                            <Form.Group controlId="operateur">
                              <Form.Check
                                type="radio"
                                label='Airtel'
                                name='choix'
                                value='Airtel'
                                checked={operateur === 'Airtel'}
                                onChange={handleOperateurChange}
                                required
                              />
                            </Form.Group>
                          </div>
                          <div></div>
                          <Form.Group controlId="reference">
                            <Form.Label>Reference</Form.Label>
                            <Form.Control type="text" name="reference" value={reference} onChange={(e) => setReference(e.target.value)} requierd/>
                          </Form.Group>
                          <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={dateVersement} onChange={(e) => setDateVersement(e.target.value)} requierd/>
                          </Form.Group>
                          
                          <br/>
                          <Button variant="primary" onClick={postPaiement}>Enregistrer le paiement</Button>
                          <h2>Montant total: {montant} Ar</h2>
                          
                        </Form>
                      )}
                      {bancaire && (
                        <Form>
                          
                          <Form.Group controlId="borderau">
                            <Form.Label>Numero de Borderau</Form.Label>
                            <Form.Control type="text" name="borderau" 
                            value={bordereau} onChange={(e) => setBorderau(e.target.value)} requierd/>
                          </Form.Group>
                          <Form.Group controlId="agence">
                            <Form.Label>Nom de l'agence</Form.Label>
                            <Form.Control type="text" name="agence" 
                            value={agence} onChange={(e) => setAgence(e.target.value)} />
                          </Form.Group>
                          <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={dateVersement} onChange={(e) => setDateVersement(e.target.value)} requierd/>
                          </Form.Group>
                          <br/>
                          <Button variant="primary" onClick={postPaiement}>Ajouter le Paiement</Button>
                          <h2>Montant total: {montant} Ar</h2>
                          
                        </Form>
                      )}
                </div>
              </article>
            </section>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Paiement;
