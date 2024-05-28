import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './sidebar';
import card from '../../assets/img/card.jpg';
const Filiere = () => {
    const [formations, setFormations] = useState(null);
    const [creer, setCreer] = useState(false);
    const [modifierFiliere, setModifierFiliere] = useState(false);
    const [FormationId, setFormationId] = useState('');
    const [nom, setNom] = useState('')
    const [objectif, setObectif] = useState('');
    const [insertionProfessionnel, setInsertionProfessionnel] = useState('');
    const [vacation, setVacation] = useState('');
    const [nouvelleFiliere, setNouvelleFiliere] = useState({});
    const [filieres, setFilieres] = useState(null);
    const [typeFormation, setTypeFormation] = useState();
    const [message, setMessage] = useState('');

    const [filiereAModifier, setFiliereAModifier] = useState({
        typeFormation: '',
        nom: '',
        objectif: '',
        insertionProfessionnel: '',
        vacation: '',
        
      });
    const chargerFormation = async () => {
        try {
          const response = await axios.get('http://localhost:3001/formation');
          setFormations(response.data);
          console.log(formations);
        } catch (erreur) {
          console.error('Erreur lors du chargement des formations :', erreur);
        }
      };
  const chargerUneFormation = async() =>{
    try {
      const reponse = await axios.get(`http://localhost:3001/formation/${FormationId}`);
      setTypeFormation(reponse.data.typeFormation);
    }catch (erreur){
      console.log(erreur);
    }
  }
      const chargerFiliere = async () => {
        try {
          const response = await axios.get('http://localhost:3001/filiere');

          setFilieres(response.data);
          console.log(filieres);
        } catch (erreur) {
          console.error('Erreur lors du chargement des formations :', erreur);
        }
      };
      const ajouterFiliere = async () => {
    
        setNouvelleFiliere({
          
          nom,
          objectif,
          insertionProfessionnel,
          vacation,
          FormationId,
        });
        try {
          await axios.post(
            'http://localhost:3001/filiere',
            {
              
              nom,
              objectif,
              insertionProfessionnel,
              vacation,
              FormationId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(nouvelleFiliere);
          setFormationId('');
          setNom('');
          setObectif('');
          setInsertionProfessionnel('');
          setVacation('');
          setMessage("Nouvelle filière enregistrer");
          alert(message);
          chargerFiliere();
        } catch (erreur) {
          console.error('Erreur lors de l\'ajout de la formation :', erreur);
        }
      };
      const supprimerFiliere = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/filiere/${id}`);
          alert("Filière supprimer");
          chargerFiliere();
        } catch (erreur) {
          console.error('Erreur lors de la suppression de la formation :', erreur);
        }
      };
      const getFormationById = async (id) => {
        try {
          const response = await axios.get(`http://localhost:3001/filiere/${id}`);
          setFiliereAModifier(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération de la formation :', error);
        }
      };
      const [selectedFiliereId, setSelectedFiliereId] = useState('');
      const handleModifierClick = (id) => {
        setModifierFiliere(true);
        setSelectedFiliereId(id);
        getFormationById(id);
      };
      const annulerModification = () => {
        setModifierFiliere(false);
        // Réinitialisez également les états de la formation à modifier ici si nécessaire
      };
      // Fonction pour mettre à jour la formation
      const soumettreModification = async () => {
        try {
          await axios.put(`http://localhost:3001/filiere/${selectedFiliereId}`, filiereAModifier);
          console.log('Formation mise à jour avec succès');
          // Réinitialisez les états après la mise à jour
          setFiliereAModifier({
           nom: '',
            objectif: '',
            insertionProfessionnel: '',
            vacation: '',
            FormationId: '',
            
          });
         
          chargerFiliere();
          setModifierFiliere(false); // Fermez le formulaire de modification après la mise à jour
        } catch (error) {
          console.error('Erreur lors de la modification de la formation :', error);
        }
      };
      useEffect(()=>{

        chargerFiliere();
        chargerFormation();
        chargerUneFormation();
        console.log(formations);
      },[]);
    return (
        <div>
            <Header />
      <section>
        <Sidebar />
      </section>
      <main id="main" className="main">
        <section className="section">
        {creer && modifierFiliere === false ? (
          <div className='formulaire'>
            <div className="col-lg-8">
              <div className="card">
                <div className = 'card-body'>
                  
                  <h5 className="card-title">Creer un compte</h5>
                  <span onClick={()=>setCreer(false)}>fermer</span>
                  <form>
                    <div className="row mb-3">
                      <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Type de formation</label>
                      <div className="col-sm-8">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={FormationId}
                          onChange={(e) => setFormationId(e.target.value)}
                        >
                          {formations && formations.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.typeFormation}
                            </option>
                          ))}
                        </select>
                        <p>type formation {FormationId}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Nom de la filière :</label>
                      <div className="col-sm-8">
                        <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Objectif :</label>
                      <div className="col-sm-8">
                        <textarea type="text" className="form-control" value={objectif} onChange={(e) => setObectif(e.target.value)} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Droit d/'examen</label>
                      <div className="col-sm-8">
                        <textarea type="text" className="form-control" value={insertionProfessionnel} onChange={(e) => setInsertionProfessionnel(e.target.value)} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Vacation :</label>
                      <div className="col-sm-8">
                        <textarea type="text" className="form-control" value={vacation} onChange={(e) => setVacation(e.target.value)} />
                      </div>
                    </div>
                    
                    <div>
                      <button type="button" className="btn btn-primary mybtn" onClick={ajouterFiliere}>Ajouter une Filière</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ):(<button onClick={()=>setCreer(true)}>Creer une Filiere</button>)
        }   
        </section>
        <section className="section">
        {modifierFiliere ? (
          <div className='formulaire'>
            <form>
              <div className="row mb-3">
                <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Type de formation</label>
                <div className="col-sm-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={filiereAModifier.typeFormation}
                    onChange={(e) => setFiliereAModifier({ ...filiereAModifier, FormationId: e.target.value })}
                  >
                    {formations.map((type) => (
                      <option key={type.id} value={type.FormationId}>
                        {type.typeFormation}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Nom :</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    value={filiereAModifier.nom}
                    onChange={(e) => setFiliereAModifier({ ...filiereAModifier, nom: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Objectif :</label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    value={filiereAModifier.objectif}
                    onChange={(e) => setFiliereAModifier({ ...filiereAModifier, objectif: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Insertion Professionnel</label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    value={filiereAModifier.insertionProfessionnel}
                    onChange={(e) => setFiliereAModifier({ ...filiereAModifier, insrtionProfessionnel: e.target.value })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Vacation :</label>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control"
                    value={filiereAModifier.vacation}
                    onChange={(e) => setFiliereAModifier({ ...filiereAModifier, vacation: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <button type="button" className="btn btn-success mybtn" onClick={soumettreModification}>Enregistrer Modification</button>
                <button type="button" className="btn btn-secondary mybtn" onClick={annulerModification}>Annuler Modification</button>
              </div>
            </form>
          </div>
        ) : (
          <span></span>
        )}

        </section>
        <section>
          <h2 className="card-title">Prix de formation</h2>
          <div class=" colone">
          {filieres && filieres.map((filiere)=>(
                
                    <div className="card grille" > 
                        <img src={card}  className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{filiere.nom}</h5>
                            <p className="card-text">{filiere.objectif}</p>
                        </div>
                        <section className='bouton'>
                          <button className= "btn btn-primary" onClick={handleModifierClick}>Modifier</button>
                          <button className = "btn btn-danger" onClick={supprimerFiliere}>supprimer</button>
                        </section>
                        
                    </div>
          )
          )}
          </div>
        </section>
      </main>
        </div>
    );
};

export default Filiere;