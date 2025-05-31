import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { cleanFormDataArticle } from '../../utils/formUtils.js';
import DeleteModal from "../modal/ArticleModal.jsx";
import LoadingModal from "../modal/LoadingModal.jsx";
import AlertModal from "../modal/AlertModal.jsx";
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

const DeleteArticleComponent = forwardRef((
  {
    formDataArticle,
    setFormDataArticle,
    onArticleDeleted,
    onAlert, // Novo: função para disparar alert externo
    buttonText,
    buttonClass,
    hideButton = false
  },
  ref
) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");

  useEffect(() => {
    setArticleTitle(formDataArticle?.title || "Sem título");
  }, [formDataArticle]);

  useImperativeHandle(ref, () => ({
    handleOpenModal: () => {
      setIsModalDeleteOpen(true);
    }
  }));

  const handleOpenModalInternal = () => {
    setIsModalDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalDeleteOpen(false);
    if (setFormDataArticle) {
      cleanFormDataArticle(setFormDataArticle);
    }
  };

  const handleAlert = (message) => {
    if (onAlert) {
      onAlert(message); // Usar modal externo
    } else {
      setAlertMessage(message); // Fallback para modal interno
      setShowAlertModal(true);
    }
  };

  const handleDelete = async () => {
    const articleId = formDataArticle?._id;

    if (!articleId) {
      handleAlert("❌ Erro: ID do artigo não encontrado para exclusão.");
      setIsModalDeleteOpen(false);
      return;
    }

    setIsModalDeleteOpen(false);
    setIsLoading(true);
    setLoadingMessage("🗑️ Excluindo artigo... Aguarde.");

    try {
      const response = await fetch(`http://localhost:5000/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        handleAlert(`✅ Artigo ou Rascunho "${articleTitle}" excluído com sucesso!`);
        if (setFormDataArticle) cleanFormDataArticle(setFormDataArticle);
        if (onArticleDeleted) onArticleDeleted();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        handleAlert(`Erro ao excluir o artigo: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      handleAlert("Ocorreu um erro ao tentar excluir o artigo.");
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <>
      {!hideButton && (
        <button
          onClick={handleOpenModalInternal}
          className={`${styles.componentButton} ${buttonClass}`}
        >
          <i className={`bi bi-trash3 ${styles.buttonIcon}`}></i>
          {buttonText}
        </button>
      )}

      {isModalDeleteOpen && (
        <DeleteModal
          message={`Tem certeza que deseja excluir o artigo "${articleTitle}"?`}
          onConfirm={handleDelete}
          onCancel={handleCloseModal}
        />
      )}

      {isLoading && <LoadingModal message={loadingMessage} />}

      {!onAlert && showAlertModal && (
        <AlertModal
          message={alertMessage}
          onClose={() => {
            setShowAlertModal(false);
            setAlertMessage("");
          }}
        />
      )}
    </>
  );
});

export default DeleteArticleComponent;
