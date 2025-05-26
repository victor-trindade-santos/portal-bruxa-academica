// Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Card.module.css';
import { truncateDescription } from '../utils/descriptionUtils';

// O Card deve receber apenas o 'id' e a função 'onDeleteClick'
function Card({ image, title, description, link, category, duration, type, className, id, onDeleteClick }) {

  let truncatedDescription;

  if (description !== null && description !== undefined) {
    truncatedDescription = truncateDescription(description, 100);
  } else {
    truncatedDescription = truncateDescription("");
  }

  const isArtigo = type === 'artigo';
  const isCurso = type === 'curso';

  // A função para lidar com o clique no botão de exclusão
  const handleDeleteButtonClick = () => {
    // Agora, Card apenas chama onDeleteClick passando o ID do artigo.
    // O componente pai (Artigos.jsx) será responsável por usar este ID para
    // preencher o formDataArticle e abrir o modal.
    onDeleteClick(id);
  };

  return (
    <div className={`${isArtigo ? styles.cardArtigo : styles.cardCustom} ${className || ''}`}>
      <div className={isArtigo ? styles.articleImageWrapper : styles.courseImageWrapper}>
        <img
          src={image}
          alt="Imagem do Card"
          className={styles.cardImg}
        />
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

        <p className={isArtigo ? styles.artigoText : styles.cardText} dangerouslySetInnerHTML={{ __html: truncatedDescription }} />

        {isArtigo && link && (
          <div className={styles.btnCard}>
            <a href={link} className={styles.artigoBtn}>Saiba Mais</a>

            <button className={styles.editButton}>
              <i className="bi bi-pencil"></i>
            </button>
            {/* O onClick agora chama handleDeleteButtonClick */}
            <button className={styles.deleteButton} onClick={handleDeleteButtonClick}>
              <i className="bi bi-trash"></i>
            </button>
          </div>

        )}
      </div>
    </div>
  );

}

export default Card;