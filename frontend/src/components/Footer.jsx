import styles from '../css/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="../../Logo_Portal-Bruxa.svg" alt="Logo" className={styles.footerLogo} />
      <p className={styles.copyright}>&copy; 2025 Portal Bruxa Acadêmica.</p>
      <div className={styles.socialIcons}>
        <a href="#" className={styles.socialIcon}>
          <FontAwesomeIcon icon={faInstagram} className="fs-2" />
        </a>
        <a href="#" className={styles.socialIcon}>
          <FontAwesomeIcon icon={faYoutube} className="fs-2" />
        </a>
        <a href="#" className={styles.socialIcon}>
          <FontAwesomeIcon icon={faXTwitter} className="fs-2" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
