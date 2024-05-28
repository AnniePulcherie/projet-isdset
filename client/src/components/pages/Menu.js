import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/menu.css';
import {
  faSignInAlt,
  faSignOut,
  faUser,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import { clearUser } from '../../app/userSlice';
import { Container, Nav, Navbar } from 'react-bootstrap';
import myLogo from '../../assets/img/myLogo.png';


const Menu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
 
  
 

  const listeMenu =[
    {
      id:1,
      lien :'/accueil',
      nom :'Accueil'
    },
    {
      id:2,
      lien :'/formation',
      nom :'Formation'
    },
    {
      id:3,
      lien :'/inscription',
      nom :'inscription'
    },
    {
      id:4,
      lien :'/filiere',
      nom :'filiere'
    },
    {
      id:5,
      lien :'/contact',
      nom :'contact'
    },
    {
      id:6,
      lien :'/apropos',
      nom :'A propos'
    },
    
  ]
  // Fonction de déconnexion
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login'); // Utilisez la fonction navigate pour la redirection
  };

 

  return (
    
      <Navbar className=" fixed-top menu header" expand="lg">
        <Container>
          <Navbar.Brand className="brand">
          
            <img src={myLogo} alt="logo" className="logoISDset" /> 
          
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='ms-auto menu-menu'>
              { listeMenu.map((liste)=>(
                  <NavLink to={liste.lien} className="nav-link liste-items menu-txt" key={liste.id}>
                    {liste.nom}
                  </NavLink>
              ))}
              {user ? (
                <div className="right">
                  <button className="menu-txt btn btn-sm">
                    <NavLink to={`/${user.role}/${user.id}`}>
                      <FontAwesomeIcon icon={faUser} /> {user.nom}
                    </NavLink>
                  </button>
                  <button className="menu-log btn btn-sm menu-logout" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOut} />
                  </button>
                </div>
              ) : (
                <div className="navbar-nav ">
                  <button onClick={()=>navigate("/login")} className="login">
                    <FontAwesomeIcon icon={faSignInAlt} /> Log in
                  </button>
                  <button onClick={()=>navigate("/logup")} className="login">
                    <FontAwesomeIcon icon={faUserAlt} /> Log up
                  </button>
                </div>
              )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    
  );
};

export default Menu;
