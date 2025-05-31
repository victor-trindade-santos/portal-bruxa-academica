import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { cleanFormDataArticle } from '../../utils/formUtils';
import UpdateModal from "../modal/ArticleModal";
import LoadingModal from '../modal/LoadingModal';
import AlertModal from '../modal/AlertModal';
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

const UpdateArticleComponent = ({ formDataArticle, setFormDataArticle, buttonText, buttonIcon, buttonClass }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlertModal, setShowAlertModal] = useState(false);

  const fieldLabels = {
    title: 'Título',
    author: 'Autor',
    publicationDate: 'Data de Publicação',
    firstContent: 'Resumo',
    secondContent: 'Conteúdo do Artigo',
    category: 'Categoria',
    imageThumb: 'Imagem do Card/Thumbnail'
  };

  const handleUpdate = async () => {
    const updatedArticle = formDataArticle;
    const requiredFields = ['_id', 'title', 'author', 'publicationDate', 'firstContent', 'secondContent', 'category'];

    const missingFields = requiredFields.filter(
      field => !formDataArticle[field]?.toString().trim()
    );

    if (
      !formDataArticle.imageThumb ||
      !(formDataArticle.imageThumb instanceof File || typeof formDataArticle.imageThumb === 'string')
    ) {
      missingFields.push('imageThumb');
    }

    if (missingFields.length > 0) {
      const readableFields = missingFields.map(field => `- ${fieldLabels[field] || field}`);
      setAlertMessage(`❌ Os seguintes campos são obrigatórios e não foram preenchidos corretamente:\n${readableFields.join('\n')}`);
      return;
    }

    const formData = new FormData();
    for (const key in updatedArticle) {
      const value = updatedArticle[key];
      if (key === 'imageThumb') {
        if (value instanceof File || typeof value === 'string') {
          formData.append(key, value);
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    try {
      setIsLoading(true);
      setLoadingMessage('🔄 Atualizando artigo...');

      const token = localStorage.getItem('token');
      await axios.put(`/articles/${updatedArticle._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      const articleTitle = updatedArticle.title || 'Sem Título';
      setAlertMessage(`✅ O artigo "${articleTitle}" foi atualizado com sucesso!`);

      setTimeout(() => {
        cleanFormDataArticle(setFormDataArticle);
      }, 100);

    } catch (error) {
      console.error('❌ Erro ao atualizar artigo:', error);
      setAlertMessage('❌ Erro ao atualizar artigo. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  useEffect(() => {
    if (!isLoading && alertMessage) {
      setShowAlertModal(true);
    }
  }, [isLoading, alertMessage]);

  const handleOpenModal = () => setShowModal(true);
  const handleConfirmUpdate = () => {
    setShowModal(false);
    handleUpdate();
  };
  const handleCancelUpdate = () => setShowModal(false);

  const renderAlertMessage = (message) => {
    return message.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className={`${styles.componentButton} ${buttonClass}`}
      >
        {buttonIcon}
        {buttonText}
      </button>

      {showModal && (
        <UpdateModal
          message="Tem certeza que deseja atualizar este artigo?"
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelUpdate}
        />
      )}

      {isLoading && <LoadingModal message={loadingMessage} />}

      {showAlertModal && (
        <AlertModal
          message={renderAlertMessage(alertMessage)}
          onClose={() => {
            setShowAlertModal(false);
            setAlertMessage('');
          }}
        />
      )}
    </div>
  );
};

export default UpdateArticleComponent;
