import React from 'react';
import styles from '../css/Card.module.css'; 
import { truncateDescription } from '../utils/descriptionUtils';

function Card( { image, title, description, link } ) {
  const truncatedDescription = truncateDescription(description, 100);

  return (

            <div className={`card ${styles.cardCustom}`}>
              <img src={image} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{truncatedDescription}</p>
                <button className={styles.btnCard}>
                  <a href = {link} className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
  );
}

export default Card;
