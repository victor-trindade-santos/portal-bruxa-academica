import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css';
import PerfilImg from '../img/perfil.png';
import Container from './Container';
import ThemeToggleButton from './ThemeToggleButton';
import { getUser } from '../hooks/getUser';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { user: userDetails, loading, refresh } = getUser();

  const isActive = (path) => location.pathname === path;
  const toggleNavbar = () => setIsMenuOpen(!isMenuOpen);
  const closeNavbar = () => setIsMenuOpen(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    closeNavbar();
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && isMenuOpen) {
        closeNavbar();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <Container>
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

        <Link to="/" className="navbar-brand navbar-brand-custom">
          <img src="/logo_portal_bruxa.svg" alt="Logo" className="navbar-brand-img" />
        </Link>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">

            {[
              { to: '/', label: 'HOME' },
              { to: '/magia', label: 'MAGIA' },
              { to: '/numerologia', label: 'NUMEROLOGIA' },
              { to: '/tarot', label: 'TAROT' },
              { to: '/astrologia', label: 'ASTROLOGIA' },
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

            {/* ARTIGOS */}
            <li className={`nav-item ${isAdmin ? 'dropdown' : ''}`}>
              {isAdmin ? (
                <>
                  <div
                    className={`nav-link nav-link-custom dropdown-toggle ${isActive('/artigos') ? 'active-link' : ''}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ARTIGOS
                  </div>
                  <ul className="dropdown-menu custom-dropdown-menu">
                    <li>
                      <Link to="/artigos" className="dropdown-item" onClick={closeNavbar}>
                        Visualizar Artigos
                      </Link>
                    </li>
                    <li>
                      <Link to="/create-articles-d42f4c" className="dropdown-item" onClick={closeNavbar}>
                        Criar Artigo
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <Link
                  to="/artigos"
                  className={`nav-link nav-link-custom ${isActive('/artigos') ? 'active-link' : ''}`}
                  onClick={closeNavbar}
                >
                  ARTIGOS
                </Link>
              )}
            </li>

            {/* CURSOS */}
            <li className={`nav-item ${isAdmin ? 'dropdown' : ''}`}>
              {isAdmin ? (
                <>
                  <div
                    className={`nav-link nav-link-custom dropdown-toggle ${isActive('/cursos') ? 'active-link' : ''}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    CURSOS
                  </div>
                  <ul className="dropdown-menu custom-dropdown-menu">
                    <li>
                      <Link to="/cursos" className="dropdown-item" onClick={closeNavbar}>
                        Visualizar Cursos
                      </Link>
                    </li>
                    <li>
                      <Link to="/create-courses" className="dropdown-item" onClick={closeNavbar}>
                        Criar Curso
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <Link
                  to="/cursos"
                  className={`nav-link nav-link-custom ${isActive('/cursos') ? 'active-link' : ''}`}
                  onClick={closeNavbar}
                >
                  CURSOS
                </Link>
              )}
            </li>

            {/* Login ou Logout */}
            {!user ? (
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link nav-link-custom ${isActive('/login') ? 'active-link' : ''}`}
                  onClick={closeNavbar}
                >
                  LOGIN
                </Link>
              </li>
            ) : isAdmin ? (
              <li className="nav-item">
                <button
                  className="nav-link nav-link-custom logout-button"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            ) : null}

            {/* Botão de tema sempre visível */}
            {(!user || isAdmin) && (
              <li className="nav-item themeButton">
                <ThemeToggleButton />
              </li>
            )}
          </ul>

          <div className="push-right">
            {/* Mostrar perfil só se NÃO for admin */}
            {user && !isAdmin && (
              <Link
                to="/profile"
                className={`nav-link-custom navbar-user-link ${isActive('/profile') ? 'active-link' : ''}`}
                onClick={closeNavbar}
              >
                <div className="navbar-welcome-message">Bem-vindo(a), {user.username}!</div>
                <img src={userDetails?.profileImage  || PerfilImg} alt="Perfil" className="navbar-user-avatar" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
