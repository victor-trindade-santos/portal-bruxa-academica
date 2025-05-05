import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Card.module.css';
import { truncateDescription } from '../utils/descriptionUtils';

function Card({ image, title, description, link, category, duration, type }) {
  const truncatedDescription = truncateDescription(description, 100);

  const isArtigo = type === 'artigo';
  const isCurso = type === 'curso';

  return (
    <div className={`${isArtigo ? styles.cardArtigo : styles.cardCustom}`}>
      {/* Container da imagem */}
      <div className={isArtigo ? styles.articleImageWrapper : styles.courseImageWrapper}>
        <img
          src={image}
          alt="Imagem do Card"
          className={styles.cardImg}
        />
        
        {/* Exibindo a categoria sobre a imagem, apenas para artigos */}
        {isArtigo && (
          <div className={styles.articleCategory}>{category}</div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h5 className={isArtigo ? styles.artigoTitle : styles.cardTitle}>{title}</h5>

        {isCurso && (
          <div className={styles.cardInfoRow}>
            <div className={styles.categoryTag}>{category}</div>
            <div className={styles.duration}>{duration}</div>
          </div>
        )}

        <p className={isArtigo ? styles.artigoText : styles.cardText}>
          {truncatedDescription}
        </p>

        {isArtigo && link && (
          <div className={styles.btnCard}>
            <a href={link} className={styles.artigoBtn}>Saiba Mais</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
