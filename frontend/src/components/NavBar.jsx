import React from 'react';
import styles from '../css/Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${styles.navLink}`} href="#">HOME</a>
            </li>
            <li className="nav-item">
              <Link to = "/magia" className={`nav-link ${styles.navLink}`}>MAGIA</Link>'  
            </li>
            <li className="nav-item">
              <a className={`nav-link ${styles.navLink}`} href="#">NUMEROLOGIA</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${styles.navLink}`} href="#">TARÔ</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${styles.navLink}`} href="#">ASTROLOGIA</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${styles.navLink}`} href="#">CURSOS</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
