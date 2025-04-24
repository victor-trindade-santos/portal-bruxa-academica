import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Card.module.css'; 
import { truncateDescription } from '../utils/descriptionUtils';

function Card({ image, title, description, link }) {
  const truncatedDescription = truncateDescription(description, 100);

  return (
    <div className={`card ${styles.cardCustom}`}>
      <img src={image} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
      <div className={styles.cardImgOverlayCustom}>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{truncatedDescription}</p>
        <Link to={link} className={styles.btnLink}>
          <button className={styles.btnCard}>Saiba Mais</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
