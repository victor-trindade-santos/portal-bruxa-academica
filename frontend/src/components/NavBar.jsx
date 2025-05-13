import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css';
import PerfilImg from '../img/perfil.png';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleNavbar = () => setIsMenuOpen(!isMenuOpen);
  const toggleEditMenu = (e) => {
    e.stopPropagation(); // Isso vai impedir que o clique no botão "Editar" feche o menu hamburguer.
    setIsEditMenuOpen(!isEditMenuOpen);
  };
  const closeNavbar = () => setIsMenuOpen(false);


  const isAdmin = user?.role === 'admin';

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
            {[
              { to: '/', label: 'Home' },
              { to: '/magia', label: 'MAGIA' },
              { to: '/numerologia', label: 'NUMEROLOGIA' },
              { to: '/tarot', label: 'TAROT' },
              { to: '/astrologia', label: 'ASTROLOGIA' },
              { to: '/artigos', label: 'ARTIGOS' },
            ].map((item) => (
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
                <li className="nav-item position-relative">
                  <button
                    className={`nav-link nav-link-custom ${isActive('/create-articles-d42f4c') ? 'active-link' : ''}`}
                    onClick={(e) => {
                      toggleEditMenu(e);
                    }}
                  >
                    EDITAR
                  </button>
                  {isEditMenuOpen && (
                    <ul className="dropdown-menu custom-dropdown-menu show">
                      <li>
                        <Link to="/create-articles-d42f4c" className="dropdown-item" onClick={closeNavbar}>
                          Editar Artigos
                        </Link>
                      </li>
                      <li>
                        <Link to="/edit-courses" className="dropdown-item" onClick={closeNavbar}>
                          Editar Cursos
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            {!user && (
              <li className="nav-item">
                <Link to="/login" className={`nav-link nav-link-custom ${isActive('/login') ? 'active-link' : ''}`} onClick={closeNavbar}>
                  Login
                </Link>
              </li>
            )}
          </ul>

          {user && (
            <li>
              <Link to="/profile" className={`nav-link nav-link-custom ${isActive('/profile') ? 'active-link' : ''}`} onClick={closeNavbar}>
                <div className="navbar-user-info">
                  <img src={PerfilImg} alt="Perfil" className="navbar-user-avatar" />
                  <span className="navbar-welcome-message">Bem-vindo(a), {user.username}</span>
                </div>
              </Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

