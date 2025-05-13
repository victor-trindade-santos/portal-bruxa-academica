import React, { useState } from 'react';
import CleanModal from '../modal/ArticleModal';
import { cleanFormDataArticle } from '../../utils/formUtils.js'; // Ajuste o caminho se necessário
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css'

const CleanArticleComponent = ({ setFormDataArticle }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    console.log('🟡 Abrindo modal de limpeza do formulário...');
    setShowModal(true);
  };

  const handleConfirmClean = () => {
    console.log('🧹 Limpando formulário...');
    cleanFormDataArticle(setFormDataArticle);
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('🚫 Ação de limpeza cancelada.');
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleOpenModal} className={styles.componentButton}>
        Limpar Formulário
      </button>

      {showModal && (
        <CleanModal
          message="Tem certeza que deseja limpar o formulário?"
          onConfirm={handleConfirmClean}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default CleanArticleComponent;
