import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionamento após logout
import { AuthContext } from '../context/AuthContext';
import styles from '../css/Navbar.module.css';

function Navbar() {
  const navbarCollapseRef = useRef(null);
  const { user, logout } = useContext(AuthContext);  // Usando a função de logout do contexto
  const navigate = useNavigate();  // Para redirecionar após o logout

  const closeNavbar = () => {
    if (navbarCollapseRef.current.classList.contains('show')) {
      navbarCollapseRef.current.classList.remove('show');
    }
  };

  // Verificando se o usuário tem a role de 'admin'
  const isAdmin = user?.role === 'admin';
  console.log('Usuário na Navbar:', user);

  // Função para realizar o logout
  const handleLogout = () => {
    logout();  // Chama a função logout do contexto
    navigate('/login');  // Redireciona para a página de login após o logout
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className={`container-fluid ${styles.containerFluid}`}>
        <Link to="/" className={`navbar-brand ${styles.navbarBrand}`}>
          <img src="../../Logo_Portal-Bruxa.svg" alt="Logo" className={`navbar-brand ${styles.navbarBrand}`} />
        </Link>
        <button 
          className={`navbar-toggler ${styles.navbarToggler}`} 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarCollapseRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>Home</Link></li>
            <li className="nav-item"><Link to="/magia" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>MAGIA</Link></li>
            <li className="nav-item"><Link to="/numerologia" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>NUMEROLOGIA</Link></li>
            <li className="nav-item"><Link to="/tarot" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>TAROT</Link></li>
            <li className="nav-item"><Link to="/astrologia" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>ASTROLOGIA</Link></li>
            
            {isAdmin && (
              <>
                <li className="nav-item"><Link to="/cursos" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>CURSOS</Link></li>
                <li className="nav-item"><Link to="/create-articles-d42f4c" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>ARTIGOS</Link></li>
              </>
            )}

            {!user ? (
              <li className="nav-item"><Link to="/login" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>Login</Link></li>
            ) : (
              <>
                <li className="nav-item"><Link to="/profile" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>Perfil</Link></li>
                <li className="nav-item">
                  
                  <button onClick={handleLogout} className={`nav-link ${styles.navLink}`}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
