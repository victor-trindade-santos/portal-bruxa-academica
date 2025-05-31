import styles from '../css/HeroSection.module.css';
import { Link } from 'react-router-dom'; 

function HeroSection({ image, isLogged }) {
  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.title}>Faça seu mapa astral</h1>
          <p className={styles.description}>
            Descubra o que os astros revelam sobre você.<br />
            Seu mapa astral completo pode transformar sua visão de si mesmo e do mundo.
          </p>

          {isLogged ? (
            <Link to="/profile" className={styles.button}>
              Ir
            </Link>
          ) : (
            <Link to="/register" className={styles.button}>
              Cadastre-se agora
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
