import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './sidebar';
import { selectIsSidebarOpen } from '../../app/sidebarSlice';
import { useSelector } from 'react-redux';
const FormationAdmin = () => {
  const programme = [
    {
      id: 1,
      nom: "Semestrielle",
    },
    {
      id: 2,
      nom: 'Intensive',
    },
    {
      id: 3,
      nom: 'Modulaire',
    },
  ];
  const payement = [
    {
      id: 1,
      nom: 'Par mois',
    },
    {
      id: 2,
      nom: 'en trois tranche'
    },
    {
      id: 3,
      nom: 'Par module',
    }
  ];

  const duree = [
    {
      id : 1,
      temps: '2 ans',
    },
    {
      id :2,
      temps: '3 ans'
    },
    {
      id: 3,
      temps: '4 ans'
    },
    {
      id: 4,
      temps: '5 ans',
    },
    {
      id: 5,
      temps: 'Pas de limite'
    }
];
const nomFormation = [
  {
     id : 1,
    nom : "DTS",
  },
  {
    id : 2,
    nom : "LICENCE",
  },
  {
    id: 3,
    nom : "MASTER",
    }
];

  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const [formations, setFormations] = useState([]);
  const [nouvelleFormation, setNouvelleFormation] = useState({});
  const [typeFormation, setTypeFormation] = useState('');
  const [fraisGeneraux, setFraisGeneraux] = useState(0);
  const [droitInscription, setDroitInscription] = useState(0);
  const [droitExamen, setDroitExamen] = useState(0);
  const [ecolage, setEcolage] = useState(0);
  const [tranche, setTranche] = useState('');
  const [temps, setTemps] = useState('');
  const [nom, setNom] = useState('');
  // État pour l'ID de la formation à modifier
  // const [modifierFormation, setModifierFormation] = useState(false);
  // const [formationIdAModifier, setFormationIdAModifier] = useState(null);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [showModalM, setShowModalM] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  // État pour les données de la formation à modifier
  const [formationAModifier, setFormationAModifier] = useState({
    nom:'',
    typeFormation: '',
    duree,
    fraisGeneraux: 0,
    droitInscription: 0,
    droitExamen: 0,
    ecolage: 0,
    tranche: '',
  });
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const annulerModification = () => {
    setShowModalM(false);
    // Réinitialisez également les états de la formation à modifier ici si nécessaire
  };
  useEffect(() => {
    // Chargez les formations depuis l'API lorsque le composant est monté
    chargerFormations();
  }, []);

  const chargerFormations = async () => {
    try {
      const response = await axios.get(`${apiURL}formation`);
      setFormations(response.data);
      console.log(formations);
    } catch (erreur) {
      console.error('Erreur lors du chargement des formations :', erreur);
    }
  };

  const ajouterFormation = async () => {
    
    setNouvelleFormation({
      nom,
      typeFormation,
      duree: temps,
      fraisGeneraux,
      droitInscription,
      droitExamen,
      ecolage,
      tranche,
    });
    try {
      await axios.post(
        `${apiURL}formation`,
        nouvelleFormation,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(nouvelleFormation);
      setTypeFormation('');
      setFraisGeneraux('');
      setDroitInscription('');
      setDroitExamen('');
      setEcolage('');
      setTranche('');
      chargerFormations();
      handleCloseModal();
    } catch (erreur) {
      console.error('Erreur lors de l\'ajout de la formation :', erreur);
    }
  };

  const supprimerFormation = async (id) => {
    try {
      await axios.delete(`${apiURL}formation/${id}`);
      chargerFormations();
    } catch (erreur) {
      console.error('Erreur lors de la suppression de la formation :', erreur);
    }
  };

  // Fonction pour récupérer les données de la formation par son ID
  const getFormationById = async (id) => {
    try {
      const response = await axios.get(`${apiURL}formation/${id}`);
      setFormationAModifier(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la formation :', error);
    }
  };

  const handleModifierClick = (id) => {
    
    setSelectedFormationId(id);
    getFormationById(id);
    setShowModalM(true);
    
  };

  // Fonction pour mettre à jour la formation
  const soumettreModification = async () => {
    try {
      await axios.put(`${apiURL}formation/${selectedFormationId}`, formationAModifier);
      console.log(formationAModifier);
      console.log('Formation mise à jour avec succès');
      // Réinitialisez les états après la mise à jour
      setFormationAModifier({
        nom :'',
        typeFormation: '',
        duree: '',
        fraisGeneraux: 0,
        droitInscription: 0,
        droitExamen: 0,
        ecolage: 0,
        tranche: '',
      });
      // setFormationIdAModifier(null);
      chargerFormations();
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
              <Form.Group controlId="nom">
                    <Form.Label>Formation</Form.Label>
                    <Form.Control as="select" name="nom" value={nom} onChange={(e)=> setNom(e.target.value)}>
                        <option value="">Sélectionnez une formation</option>
                        {nomFormation.map((program) => (
                        <option key={program.id} value={program.nom}>
                            {program.nom}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formation">
                    <Form.Label>Formation</Form.Label>
                    <Form.Control as="select" name="formation" value={typeFormation} onChange={(e)=> setTypeFormation(e.target.value)}>
                        <option value="">Sélectionnez letype de formation</option>
                        {programme.map((program) => (
                        <option key={program.id} value={program.nom}>
                            {program.nom}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="fg">
                  <Form.Label>Frais Generaux</Form.Label>
                  <Form.Control type="number" name="fg" value={fraisGeneraux} onChange={(e) => setFraisGeneraux(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="di">
                  <Form.Label>Droit d'inscription</Form.Label>
                  <Form.Control type="number" name="di" value={droitInscription} onChange={(e) => setDroitInscription(e.target.value)}  />
                </Form.Group>
                <Form.Group controlId="insertionProfessionnel">
                  <Form.Label>Droit d'examen</Form.Label>
                  <Form.Control type="number" name="insertionProfessionnel" value={droitExamen} onChange={(e) => setDroitExamen(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="ecolage">
                  <Form.Label>Ecolage</Form.Label>
                  <Form.Control type="number" name="ecolage" value={ecolage} onChange={(e)=> setEcolage(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formation">
                    <Form.Label>Modalité de paiement</Form.Label>
                    <Form.Control as="select" name="formation" 
                      value={tranche} onChange={(e) => setTranche(e.target.value)}>
                        <option value="">Sélectionnez une formation</option>
                        {payement.map((paie) => (
                        <option key={paie.id} value={paie.nom}>
                            {paie.nom}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formation">
                    <Form.Label>Durée</Form.Label>
                    <Form.Control as="select" name="duree" 
                      value={temps} onChange={(e) => setTemps(e.target.value)}>
                        <option value="">Sélectionnez une formation</option>
                        {duree.map((tmp) => (
                        <option key={tmp.id} value={tmp.temps}>
                            {tmp.temps}
                        </option>
                        ))}
                    </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Annuler
              </Button>
              <Button variant="primary" onClick={ajouterFormation}>
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
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Formation</label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formationAModifier.nom}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, nom: e.target.value })}
                      >
                        <option value="">Sélectionnez une formation</option>
                        {nomFormation.map((type) => (
                          
                          <option key={type.id} value={type.nom}>
                            {type.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Type de formation</label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formationAModifier.typeFormation}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, typeFormation: e.target.value })}
                      >
                        <option value="">Sélectionnez une formation</option>
                        {programme.map((type) => (
                          
                          <option key={type.id} value={type.nom}>
                            {type.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Frais Généraux</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        value={formationAModifier.fraisGeneraux}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, fraisGeneraux: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Droit d'inscription</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        value={formationAModifier.droitInscription}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, droitInscription: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Droit d'examen</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        value={formationAModifier.droitExamen}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, droitExamen: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">Ecolage :</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control"
                        value={formationAModifier.ecolage}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, ecolage: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-3 col-form-label">Modalité de paiement ecolage</label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formationAModifier.tranche}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, tranche: e.target.value })}
                      >
                      <option value="">Sélectionnez une paiement</option>
                        {payement.map((type) => (
                          <option key={type.id} value={type.nom}>
                            {type.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputText" className="col-sm-3 col-form-label">Durée de formation</label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={formationAModifier.duree}
                        onChange={(e) => setFormationAModifier({ ...formationAModifier, duree: e.target.value })}
                      >
                      <option value="">Sélectionnez une paiement</option>
                        {duree.map((type) => (
                          <option key={type.id} value={type.temps}>
                            {type.temps}
                          </option>
                        ))}
                      </select>
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
                  {/* <th>Nom</th> */}
                  <th>Type de formation</th>
                  <th>Frais Généraux</th>
                  <th>Droit d'inscription</th>
                  <th>Droit d'examen</th>
                  <th>Ecolage</th>
                  <th>Paiement d'ecolage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formations.map((formation) => (
                  <tr key={formation.id}>
                    {/* <td>{formation.nom}</td> */}
                    <td>{formation.typeFormation}</td>
                    <td>{formation.fraisGeneraux} Ar</td>
                    <td>{formation.droitInscription} Ar</td>
                    <td>{formation.droitExamen} Ar</td>
                    <td>{formation.ecolage} Ar</td>
                    <td>{formation.tranche}</td>
                    <td>
                      <button className="btn btn-danger espace" onClick={() => supprimerFormation(formation.id)}>Supprimer</button>
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

export default FormationAdmin;
