import React from 'react';
import styles from '../css/Card.module.css'; 

function Card( { image, title, description, link } ) {
  return (
      // <div className="container my-5">
        // <div className="row justify-content-center g-4">
          // <div className="col-12 col-md-4">
            <div className={`card ${styles.cardCustom}`}>
              <img src={image} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <button className={styles.btnCard}>
                  <a href = {link} className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
          // </div>
        // </div>
      // </div>
  );
}

export default Card;
