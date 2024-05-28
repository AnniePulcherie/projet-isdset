import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';
import { selectIsSidebarOpen, toggleSidebar } from '../../app/sidebarSlice';
import myLogo from '../../assets/img/myLogo.png'

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const navigate = useNavigate();
    // Fonction pour basculer le sidebar
    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
        console.log(isSidebarOpen); // Dispatchez l'action pour basculer le sidebar
  };
    return (
        <div>
        {!user ? (navigate('/login')):(
            <header id="header"
            className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to={'/accueil'} className="logo d-flex align-items-center">
                        <img src={myLogo} alt="" width='100px' height='100%'/>
                        
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn"
                        onClick={handleToggleSidebar} // Ajoutez cette ligne pour basculer le sidebar
                        ></i>
                </div>

                
            </header>
        )}
        </div>
    );
};

export default Header;
