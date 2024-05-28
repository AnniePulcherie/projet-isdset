import React, { useState } from 'react';
import axios from 'axios';
import { Link,Navigate, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const CreateAcount = () => {
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);
    const [nom,setNom] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setVlidEmail] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const apiURL = process.env.REACT_APP_API_USER_URL;
    const [message, setMessage] = useState('');
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    const handleChange = (e)=>{
        setMail(e.target.value);
        if(validator.isEmail(mail)){
            setVlidEmail(true);
        }else{
            setVlidEmail(false);
        }
        
    }

    const creerCompte = async(e) =>{
        e.preventDefault();
        console.log(nom,mail,password);
        try {
            console.log(nom, mail,password);
            const response = await axios.post(`${apiURL}user/signup`, 
            {   
                nom: nom,
                email : mail,
                password:password
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            console.log('Données envoyées avec succès', response.data);
            // Après avoir obtenu le token depuis la réponse Axios
            navigate('/login');
            
            // Réinitialisez l'état du formulaire ici
          } catch (error) {
            console.log(error);
             setMessage(" le pseudo ou le mail sont deja pris, choisisser un autre " );
             console.log(error.response.data.errors[0].message)
            console.error('Erreur lors de l\'envoi des données', error);
            console.error('Code HTTP d\'erreur :', error.response.status);
            console.error('Message d\'erreur :', error.response.statusText);
          }
        };
    

    return (
        <div className='formulaire'>
        {isRegistered ? (
        <Navigate to="/accueil" />
        ) :(
            <main>
          <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-3 d-flex flex-column align-items-center justify-content-center">
                    <div className="card mb-6">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h1 className="card-title text-center pb-0 fs-4">S'inscrire </h1>
                          {message && <p className="error-message">{message}</p>}
                        </div>
                        <form className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                            <label htmlFor="yourUsername" className="form-label">Pseudo</label>
                            <div className="input-group has-validation">
                              
                              <input
                                type="text"
                                name="nom"
                                className="form-control"
                                id="yourUsername"
                                required
                                value={nom}
                                onChange={(e)=>{setNom(e.target.value)}}
                              />
                              
                              <div className="invalid-feedback">Please enter your username.</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="yourUsername" className="form-label">Email</label>
                            <div className="input-group has-validation">
                              <span className="input-group-text" id="inputGroupPrepend">@</span>
                              <input
                                type="text"
                                name="mail"
                                className="form-control"
                                id="yourUsername"
                                required
                                value={mail}
                                onChange={handleChange}
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
                              onClick={creerCompte} // Utilisez onClick au lieu de onSubmit
                            >
                              Creer un compte
                            </button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0"> Have you an account? <Link to="/login">Se connecter</Link></p>
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
        )}
        </div>
    );
}
export default CreateAcount;