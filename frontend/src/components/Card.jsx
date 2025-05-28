// Card.jsx
import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/Card.module.css';
import { truncateDescription } from '../utils/descriptionUtils';
import { AuthContext } from '../context/AuthContext';

// O Card deve receber o '_id' e a função 'onDeleteClick'
function Card({ image, title, description, link, category, duration, type, className, _id, onDeleteClick }) { // ✅ Aqui está correto: recebendo '_id'
  const { user, logout } = useContext(AuthContext);

  const isAdmin = user?.role === 'admin';

  const navigate = useNavigate();

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
    // ✅ Use '_id' aqui, pois é a prop que você está recebendo
    console.log("Card: Botão de exclusão clicado para o ID:", _id);
    onDeleteClick(_id);
  };

  // ✅ Nova função para lidar com o clique no botão de editar
  const handleEditButtonClick = () => {
    console.log("Card: Botão de editar clicado para o ID:", _id);
    // Navega para a página ArticleCRUD e passa o _id como um parâmetro de estado
    // Isso é mais seguro do que passar na URL se os dados forem grandes ou sensíveis.
    navigate(`/create-articles-d42f4c`, { state: { articleId: _id } });
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

            {isAdmin && (
              <>
                {/* ✅ O onClick agora chama handleEditButtonClick */}
                <button className={styles.editButton} onClick={handleEditButtonClick}>
                  <i className={`bi bi-feather ${styles.icon}`}></i>
                </button>
                {/* O onClick agora chama handleDeleteButtonClick */}
                <button className={styles.deleteButton} onClick={handleDeleteButtonClick}>
                  <i className={`bi bi-trash3 ${styles.icon}`}></i>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;