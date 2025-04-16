import React, { useRef } from 'react';
import styles from '../css/Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const navbarCollapseRef = useRef(null);

  const closeNavbar = () => {
    if (navbarCollapseRef.current.classList.contains('show')) {
      navbarCollapseRef.current.classList.remove('show');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className={`container-fluid ${styles.containerFluid}`}>
        <a className={`navbar-brand ${styles.navbarBrand}`} href="#">Logo</a>
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
        <div 
          className="collapse navbar-collapse" 
          id="navbarSupportedContent"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/magia" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>MAGIA</Link>
            </li>
            <li className="nav-item">
              <Link to="/numerologia" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>NUMEROLOGIA</Link>
            </li>
            <li className="nav-item">
              <Link to="/tarot" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>TARÔ</Link>
            </li>
            <li className="nav-item">
              <Link to="/astrologia" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>ASTROLOGIA</Link>
            </li>
            <li className="nav-item">
              <Link to="/cursos" className={`nav-link ${styles.navLink}`} onClick={closeNavbar}>CURSOS</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
