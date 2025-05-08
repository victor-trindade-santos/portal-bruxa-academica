
import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css';
import PerfilImg from '../img/perfil.png'

function Navbar() {
  const navbarCollapseRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 


  const isActive = (path) => location.pathname === path;

  const closeNavbar = () => {
    if (navbarCollapseRef.current.  List.contains('show')) {
      navbarCollapseRef.current.classList.remove('show');
    }
  };

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };
 
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid container-fluid-custom">
        <Link to="/" className="navbar-brand navbar-brand-custom">
          <img src="../../Logo_Portal-Bruxa.svg" alt="Logo" className="navbar-brand-img" />
        </Link>
        <button
          className="navbar-toggler navbar-toggler-custom"
          type="button"
          onClick={toggleNavbar} 
          aria-controls="navbarSupportedContent"
          aria-expanded={isMenuOpen ? 'true' : 'false'} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {[{ to: '/', label: 'Home' }, { to: '/magia', label: 'MAGIA' }, { to: '/numerologia', label: 'NUMEROLOGIA' }, { to: '/tarot', label: 'TAROT' }, { to: '/astrologia', label: 'ASTROLOGIA' }].map((item) => (
              <li className="nav-item" key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link nav-link-custom ${isActive(item.to) ? 'active-link' : ''}`}
                  onClick={closeNavbar}
                >
                  {item.label}
                </Link>
              </li>
            ))}


            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to="/cursos" className={`nav-link nav-link-custom ${isActive('/cursos') ? 'active-link' : ''}`} onClick={closeNavbar}>
                    CURSOS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-articles-d42f4c" className={`nav-link nav-link-custom ${isActive('/create-articles-d42f4c') ? 'active-link' : ''}`} onClick={closeNavbar}>
                    ARTIGOS
                  </Link>
                </li>
              </>
            )}

            {!user ? (
              <li className="nav-item">
                <Link to="/login" className={`nav-link nav-link-custom ${isActive('/login') ? 'active-link' : ''}`} onClick={closeNavbar}>
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/profile" className={`nav-link nav-link-custom ${isActive('/profile') ? 'active-link' : ''}`} onClick={closeNavbar}>
                    Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link nav-link-custom btn-logout">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className="navbar-user-info">
            <span className="navbar-welcome-message">
              Bem-vindo, João
            </span>
            <img src={PerfilImg} alt="Perfil" className="navbar-user-avatar" />
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

