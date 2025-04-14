import React from 'react';
import card from '../img/card_tipo1.jpg';
import card2 from '../img/Card-tipo2(fundo).jpg';
import styles from '../css/Card.module.css'; 

function Card() {
  return (
      <div className="container my-5">
        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-4">
            <div className={`card ${styles.cardCustom}`}>
              <img src={card} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">Título do Card</h5>
                <p className="card-text">Descrição curta ou legenda.</p>
                <button className={styles.btnCard}>
                  <a href="#" className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className={`card ${styles.cardCustom}`}>
              <img src={card2} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">Título do Card</h5>
                <p className="card-text">Descrição curta ou legenda.</p>
                <button className={styles.btnCard}>
                  <a href="#" className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className={`card ${styles.cardCustom}`}>
              <img src={card} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">Título do Card</h5>
                <p className="card-text">Descrição curta ou legenda.</p>
                <button className={styles.btnCard}>
                  <a href="#" className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className={`card ${styles.cardCustom}`}>
              <img src={card2} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">Título do Card</h5>
                <p className="card-text">Descrição curta ou legenda.</p>
                <button className={styles.btnCard}>
                  <a href="#" className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className={`card ${styles.cardCustom}`}>
              <img src={card} className={`card-img ${styles.cardImg}`} alt="Imagem do Card" />
              <div className={styles.cardImgOverlayCustom}>
                <h5 className="card-title">Título do Card</h5>
                <p className="card-text">Descrição curta ou legenda.</p>
                <button className={styles.btnCard}>
                  <a href="#" className={styles.btnLink}>Saiba Mais</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Card;
