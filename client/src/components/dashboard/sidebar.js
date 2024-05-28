import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { clearUser } from '../../app/userSlice';
import '../../assets/css/sidebar.css';
const Sidebar = () => {
    const user = useSelector((state) => state.user);
    const sidebar = useSelector((state) => state.sidebar);
    console.log(sidebar);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(clearUser);
        navigate('/login'); // Utilisez la fonction navigate pour la redirection
      };
    return (
        <div>
        {!user ?(<Navigate to='/accueil' />):(
            <aside id="sidebar" className={`${sidebar ? 'sidebar' : 'sidebar-open'}`}>
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link to={`/admin/${user.id}`}>
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/admin/${user.id}/formation`} className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse">
                            <i className="bi bi-menu-button-wide"></i>
                            <span>Formations</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/admin/${user.id}/filiere`} className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
                            <i className="bi bi-layout-text-window-reverse"></i>
                            <span>Filière</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/admin/${user.id}/ue`} className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
                            <i className="bi bi-layout-text-window-reverse"></i>
                            <span>Unité d'enseignement</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/admin/${user.id}/module`} className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                            <i className="bi bi-journal-text"></i>
                            <span>Module</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to={`/admin/${user.id}/paiementRecu`} className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                            <i className="bi bi-journal-text"></i>
                            <span>Paiement reçu</span>
                        </NavLink>
                    </li>
                    
                    
                    <li className="nav-item">
                        <NavLink to='/logup' className="nav-link collapsed">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Registre</span>
                        </NavLink>
                    </li>

                    <li className="nav-item nav-link collapsed" onClick={handleLogout}>
                         
                            <FontAwesomeIcon icon={faSignOut} />
                            <span style={{ cursor: 'pointer' }}>LogOut</span>
                        
                    </li>
                </ul>
            </aside>
        )}
        </div>
    );
};

export default Sidebar;
