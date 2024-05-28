import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './sidebar';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
const PaiementRecu = () => {
 
  const payement = [
    {
      id: 1,
      nom: 'Telma',
    },
    {
      id: 2,
      nom: 'Orange'
    },
    {
      id: 3,
      nom: 'Airtel',
    }
  ];

  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const [paiementRecu, setPaiementRecu] = useState([]);
  const [nouvellePaiement, setNouvellePaiement] = useState({});
  const [operateur, setOperateur] = useState(0);
  const [montant, setMontant] = useState(0);
  const [reference, setReference] = useState('');
  const [dateVersement, setDateVersement] = useState('');
  const user = useSelector((state)=>state.user);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [showModalM, setShowModalM] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  // État pour les données de la formation à modifier
  const [formationAModifier, setFormationAModifier] = useState({
    dateVersement: '',
    montant:0,
    operateur: 0,
    reference: '',
    
  });
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const annulerModification = () => {
    setShowModalM(false);
    // Réinitialisez également les états de la formation à modifier ici si nécessaire
  };
  useEffect(() => {
    // Chargez les formations depuis l'API lorsque le composant est monté
    chargerPaiement();
  }, []);

  const chargerPaiement = async () => {
    try {
      const response = await axios.get(`${apiURL}paiementRecu`);
      setPaiementRecu(response.data);
      console.log(response.data);
    } catch (erreur) {
      console.error('Erreur lors du chargement des formations :', erreur);
    }
  };

  const ajouterPaiement = async () => {
    const formData = new FormData();
    formData.append('dateVersement', dateVersement);
    formData.append('montant',montant);
    formData.append('operateur', operateur);
    formData.append('reference',reference);
    formData.append('userId', user.id);
    try {
      await axios.post(
        `${apiURL}paiementRecu`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(nouvellePaiement);
      setMontant('');
      setDateVersement('');
      setReference('');
      setOperateur('');
      chargerPaiement();
      handleCloseModal();
    } catch (erreur) {
      console.error('Erreur lors de l\'ajout de la formation :', erreur);
    }
  };

  const supprimerPaiement = async (id) => {
    try {
      await axios.delete(`${apiURL}paiementRecu/${id}`);
      chargerPaiement();
    } catch (erreur) {
      console.error('Erreur lors de la suppression du paiement :', erreur);
    }
  };

  // Fonction pour récupérer les données de la formation par son ID
  const getPaiementById = async (id) => {
    try {
      const response = await axios.get(`${apiURL}paiementRecu/${id}`);
      setFormationAModifier(response.data);
      console.log(response.data);
      console.log(formationAModifier);
    } catch (error) {
      console.error('Erreur lors de la récupération de la formation :', error);
    }
  };

  const handleModifierClick = (id) => {
    
    setSelectedFormationId(id);
    getPaiementById(id);
    setShowModalM(true);
    
  };

  // Fonction pour mettre à jour la formation
  const soumettreModification = async () => {
    try {
      await axios.put(`${apiURL}formation/${selectedFormationId}`, formationAModifier);
      console.log('Formation mise à jour avec succès');
      // Réinitialisez les états après la mise à jour
      setFormationAModifier({
        dateVersement: '',
        montant:0,
        operateur: 0,
        reference: '',
      });
      // setFormationIdAModifier(null);
      chargerPaiement();
      setShowModalM(false);
      // setModifierFormation(false); // Fermez le formulaire de modification après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la modification de la formation :', error);
    }
  };
  
  const handleShowModalA = () => {
    setShowModalA(true);
  };

  const handleShowModalM = (id) => {
    handleModifierClick(id);
    setShowModalM(true);
    setShowModalA(false);
    
  };

  const handleCloseModal = () => {
    setShowModalA(false);
  };
  const handleCloseModalM = () => {
    setShowModalM(false);
  };
  return (
    <div>
      <Header />
      <section>
        <Sidebar />
      </section>
      <main id={`${isSidebarOpen ? 'mainy' : 'main'}`} className="main">
        <Button variant="success" onClick={handleShowModalA}>Ajouter une Formation</Button>
        <section className="section">
          <Modal show={showModalA} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Creer une formation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
             
                <Form.Group controlId="operateur">
                    <Form.Label>Formation</Form.Label>
                    <Form.Control as="select" name="operateur" value={operateur} onChange={(e)=> setOperateur(e.target.value)}>
                        <option value="">Sélectionnez l'Opérateur</option>
                        {payement.map((program) => (
                        <option key={program.id} value={program.nom}>
                            {program.nom}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="fg">
                  <Form.Label>Montant reçu</Form.Label>
                  <Form.Control type="number" name="montant" value={montant} onChange={(e) => setMontant(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="dateVersement">
                  <Form.Label>Date de versement</Form.Label>
                  <Form.Control type="date" name="dateVersement" value={dateVersement} onChange={(e) => setDateVersement(e.target.value)}  />
                </Form.Group>
                <Form.Group controlId="reference">
                  <Form.Label>Reference</Form.Label>
                  <Form.Control type="text" name="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
                </Form.Group>
                
            
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Annuler
              </Button>
              <Button variant="primary" onClick={ajouterPaiement}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>   
        </section>
        <section className="section">
          <Modal show={showModalM} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Modifier une Formation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Operateur</label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formationAModifier.operateur}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, operateur: e.target.value })}
                      >
                        <option value="">Sélectionnez une operateur</option>
                        {payement.map((type) => (
                          
                          <option key={type.id} value={type.nom}>
                            {type.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Montant</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        value={formationAModifier.montant}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, montant: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Reference</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        value={formationAModifier.reference}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, reference: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Date de veresement</label>
                    <div className="col-sm-8">
                      <input
                        type="date"
                        className="form-control"
                        value={formationAModifier.dateVersement}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, dateVersement: e.target.value })}
                      />
                    </div>
                  </div>
                 
                </Form>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalM}>
                Fermer
              </Button>
              <Button variant="secondary" onClick={annulerModification}>
                Annuler
              </Button>
              <Button variant="primary" onClick={soumettreModification}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>   
        </section>
        <section>
          <h2 className="card-title">Prix de formation</h2>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Operateur</th>
                  <th>Montant</th>
                  <th>Reference</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paiementRecu.map((formation) => (
                  <tr key={formation.id}>
                    <td>{formation.operateur}</td>
                    <td>{formation.montant} Ar</td>
                    <td>{formation.reference}</td>
                    <td>{formation.dateVersement} </td>
                    <td>
                      <button className="btn btn-danger espace" onClick={() => supprimerPaiement(formation.id)}>Supprimer</button>
                      <button className="btn btn-primary" onClick={() => handleModifierClick(formation.id)}>Modifier</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaiementRecu;
