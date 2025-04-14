import styles from '../css/Footer.module.css';

function Footer() {
    
  return (
    <footer className={styles.footerImg}>
      <div className={`container ${styles.footerDest}`}>
        <div className="row">
          <div className={`col col-lg-3 ${styles.ajuste}`}>
            <h3>Links Úteis</h3>
            <ul className={styles.listUnstyled}>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Termos de Uso</a></li>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Políticas de Privacidade</a></li>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Cookies</a></li>
            </ul>
          </div>
          <div className="col">
            <h3>Informações</h3>
            <ul className={styles.listUnstyled}>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>SAQ</a></li>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Blog</a></li>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Suporte</a></li>
            </ul>
          </div>
          <div className="col">
            <h3>Contatos</h3>
            <ul className={styles.listUnstyled}>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Sobre nós</a></li>
              <li><a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}>Entre em contato</a></li>
            </ul>
          </div>
          <div className="col col-lg-4">
            <h3>Redes Sociais</h3>
            <div>
              <a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}><i className="bi bi-instagram fs-2 me-3"></i></a>
              <a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}><i className="bi bi-youtube fs-2 me-3"></i></a>
              <a href="#" className={`${styles.textDecorationNone} ${styles.textLight}`}><i className="bi bi-twitter fs-2"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
