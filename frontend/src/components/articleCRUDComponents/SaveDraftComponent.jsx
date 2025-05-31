import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import LoadingModal from '../modal/LoadingModal.jsx';
import ArticleModal from '../modal/ArticleModal.jsx';
import AlertModal from '../modal/AlertModal.jsx'; // ✅ Adicionado
import styles from '../../css/ArticleCRUD.module.css';

const SaveDraftComponent = ({
  formDataArticle,
  setFormDataArticle,
  buttonText,
  buttonIcon,
  buttonClass,
  confirmMessage = "Deseja salvar como rascunho?",
  loadingMessageSave = "💾 Salvando rascunho...",
  loadingMessageUpdate = "🔄 Atualizando rascunho..."
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Novo: controle de alert
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    if (!isLoading && alertMessage) {
      setShowAlertModal(true);
    }
  }, [isLoading, alertMessage]);

  const handleConfirmClick = () => {
    if (!formDataArticle.title?.toString().trim()) {
      setAlertMessage('❗ Por favor, adicione um título para salvar o rascunho.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleSaveDraft = async () => {
    const formData = new FormData();

    for (const key in formDataArticle) {
      const value = formDataArticle[key];
      if (key === '_id') continue;

      if (key === 'imageThumb') {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string' && value.trim() !== '') {
          formData.append(key, value);
        } else {
          formData.append(key, '');
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      } else {
        formData.append(key, '');
      }
    }

    formData.set('isDraft', 'true');
    formData.delete('publicationDate');

    try {
      setIsConfirmModalOpen(false);

      if (formDataArticle._id) {
        setLoadingMessage(loadingMessageUpdate);
      } else {
        setLoadingMessage(loadingMessageSave);
      }

      setIsLoading(true);
      const token = localStorage.getItem('token');
      let response;
      let successMessage;

      if (formDataArticle._id) {
        response = await axios.put(`/articles/${formDataArticle._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        successMessage = `✅ Rascunho atualizado com sucesso!`;
      } else {
        response = await axios.post('/articles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        successMessage = `✅ Rascunho salvo com sucesso!`;
      }

      setAlertMessage(successMessage);

      setFormDataArticle(prev => ({
        ...prev,
        _id: response.data._id,
        title: response.data.title,
        author: response.data.author,
        firstContent: response.data.firstContent,
        secondContent: response.data.secondContent,
        category: response.data.category,
        imageThumb: response.data.imageThumb,
        isDraft: response.data.isDraft,
        publicationDate: response.data.publicationDate || '',
      }));
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Erro desconhecido.";
      setAlertMessage(`❌ Erro ao salvar/atualizar rascunho: ${message}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <>
      <button
        onClick={handleConfirmClick}
        className={`${styles.componentButton} ${buttonClass}`}
      >
        {buttonIcon}
        {buttonText}
      </button>

      {isConfirmModalOpen && (
        <ArticleModal
          message={confirmMessage}
          onConfirm={handleSaveDraft}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}

      {isLoading && <LoadingModal message={loadingMessage} />}

      {showAlertModal && (
        <AlertModal
          message={alertMessage}
          onClose={() => {
            setAlertMessage("");
            setShowAlertModal(false);
          }}
        />
      )}
    </>
  );
};

export default SaveDraftComponent;
