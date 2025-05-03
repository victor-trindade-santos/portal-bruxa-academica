import styles from '../css/HeroSection.module.css';

function HeroSection({ image, title, description }) {
  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          ↓ Role para acessar os conteúdos do portal ↓
        </div>
      </div>

    </div>
  );
}

export default HeroSection;
