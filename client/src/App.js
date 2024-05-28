
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Accueil from './components/pages/Accueil';
import Contact from './components/pages/Contact';

import Formation from './components/pages/Formation';
import Inscription from './components/pages/Inscription';

import Connexion from './components/pages/Connexion';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/pages/footer';
import Etudiant from './components/pages/Etudiant';
import FormationAdmin from './components/dashboard/FormationAdmin';
import CreateAcount from './components/pages/CreateAcount';
import FiliereAdmin from './components/dashboard/FiliereAdmin';
import Apropos from './components/pages/Apropos';
import DashboardEtudiant from './components/dashboard/DashboardEtudiant';
import Module from './components/dashboard/Module';
import ModuleDetails from './components/dashboard/ListModule';
import ChoisirFormation from './components/pages/ChoisirFormation';
import Paiement from './components/pages/paiement';
import UniteEnseignement from './components/dashboard/UniteEnseignement';
import Profil from './components/dashboard/Profil';
import Semestre from './components/dashboard/Semestre';
import DetailFormation from './components/pages/DetailFormation';
import PayementFormation from './components/dashboard/PayementFormation';
import PaiementRecu from './components/dashboard/PaiementRecu';
import Filiere from './components/pages/Filiere';
import Menu from './components/pages/Menu';


function App() {
  
  return (
    <div className="App">
  
  
        <Routes>
          <Route path='/' element={<Accueil/>}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/accueil' element={<Accueil />}/>
          <Route path='/formation' element={<Formation />}/>
          {/* <Route path='/choisirModule' element={<InscriptionModulaire />}/> */}
          <Route path='/filiere' element={<Filiere />}/>
          <Route path='/formation/:id' element={<DetailFormation />}/>
          <Route path= '/choisir-type' element= {<ChoisirFormation />} />
          <Route path='/inscription' element ={<Inscription />}/>
          <Route path='/apropos' element ={<Apropos />}/>
          <Route path='/paiement' element= {<Paiement />}/>
          <Route path='/login' element = {<Connexion />} />
          <Route path='/logup' element={<CreateAcount />} />
          <Route path='/admin/:id' element ={<Dashboard />} />
          <Route path='/admin/:id/formation' element={<FormationAdmin/>}/>
          <Route path='/admin/:id/ue' element={<UniteEnseignement />}/>
          <Route path= '/admin/:id/module' element = {<Module />}/>
          <Route path= '/admin/:id/paiementRecu' element = {<PaiementRecu />}/>
          <Route path='/admin/:id/filiere' element={<FiliereAdmin />}/>
          <Route path='/Etudiant/:id/dashboard' element= {<DashboardEtudiant />}/>
          <Route path='/Etudiant/:id' element= {<DashboardEtudiant />}/>
          <Route path='/Etudiant/:id/module/:id' element = {<ModuleDetails />}/>
          <Route path='/Etudiant/:id/profile' element={<Profil />}/>
          <Route path= '/Etudiant/:id/semestre/:semestre' element={<Semestre />}/>
          <Route path='/admin/:id/profile' element={<Profil />}/>
          <Route path='/Etudiant/:id/paiementFormation' element={<PayementFormation />}/>
          
        </Routes>
        
     
    </div>
  );
}

export default App;
