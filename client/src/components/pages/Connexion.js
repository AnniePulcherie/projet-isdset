import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/userSlice';
import validator from 'validator';
import { setInscription } from '../../app/inscriptionSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { setEtudiant } from '../../app/etudiantSlice';
import { setModulaire } from '../../app/modulaireSlice';
import { setFormations } from '../../app/formationsSlice.js';
import { setListeFilieres } from '../../app/listeFiliereSlice';
const Connexion = () => {
  const apiURL = process.env.REACT_APP_API_USER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isRegistered, setIsRegistered] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (e) => {
    setMail(e.target.value); 
    if (validator.isEmail(mail))
    {
      setValidEmail(true)
    } else
    { 
      setValidEmail(false)
    }
  }
  useEffect(()=>{
    setValidEmail(true);
    setMessage('');
  },[]);
  const seConnecter = async (e) => {
    e.preventDefault();
    console.log(mail,password);
    if(validEmail){
    try {
      const response = await axios.post(`${apiURL}user/login/password`, 
        {   
          email: mail,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const userData = await response.data.reponse;
      console.log(userData);
      const user = userData.user;
      const etudiant = userData.etudiant;
      const inscription = userData.inscription;
      const modulaire = userData.modulaire;
      const listeFormation = userData.listeFormation;
      const listeFilieres = userData.listeFilieres;
      console.log(userData.etudiant);
      if(!userData){
        
        console.log(message);
      }    
      dispatch(setUser(user));
      dispatch(setEtudiant(etudiant));
      dispatch(setInscription(inscription));
      dispatch(setModulaire(modulaire));
      dispatch(setFormations(listeFormation));
      dispatch(setListeFilieres(listeFilieres));
      console.log(userData);
      if(user.role === "admin"){        
        navigate(`/admin/${userData.user.id}`);
      }else{       
        navigate('/');
      }
     
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données', error);
       setMessage(error.response.data.message);
    
    }
  }
  }

  return (
    <div>
     
        <main>
          <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-3 d-flex flex-column align-items-center justify-content-center">
                    <div className="card mb-6">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h1 className="card-title text-center pb-0 fs-4">Login </h1>
                          <p className="text-center small">Enter your email & password to login</p>
                        </div>
                        <form className="row g-3 needs-validation" noValidate>
                          <div className="col-12">
                            <label htmlFor="yourUsername" className="form-label">Username</label>
                            <div className="input-group has-validation">
                              <span className="input-group-text" id="inputGroupPrepend">@</span>
                              <input
                                type="text"
                                name="username"
                                className="form-control"
                                id="yourUsername"
                                required
                                value={mail}
                                onChange={handleEmailChange}
                              />
                              
                              <div className="invalid-feedback">Please enter your username.</div>
                            </div>
                          </div>
                          {!validEmail && <p className="error-message">Adresse e-mail non valide</p>}
                          
                          <div className="col-12">
                          <div className='password-input'>
                            <label htmlFor="yourPassword" className="form-label">Password</label>
                            <div className="password-input-wrapper">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-control"
                                id="yourPassword"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <button
                                type="button"
                                onClick={handlePasswordVisibility}
                              >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                              </button>
                            </div>
                            <div className="invalid-feedback">Please enter your password!</div>
                            </div>
                          </div>

                          {message && <p className="error-message">{message}</p>}
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="remember"
                                value="true"
                                id="rememberMe"
                              />
                              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                              onClick={seConnecter} // Utilisez onClick au lieu de onSubmit
                            >
                              Login
                            </button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0">Don't have an account? <Link to="/logup">Create an account</Link></p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      
    </div>
  );
};

export default Connexion;
