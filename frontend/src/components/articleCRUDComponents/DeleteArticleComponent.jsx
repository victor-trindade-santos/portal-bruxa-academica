import React, { useState } from 'react';
import { cleanFormDataArticle } from '../../utils/formUtils.js'; // ajuste o caminho conforme necessário
import DeleteModal from "../modal/ArticleModal.jsx";
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

function DeleteArticleComponent({ formDataArticle, setFormDataArticle }) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // Função para abrir o modal
  const handleOpenModal = () => {
    console.log("Abrindo o modal de exclusão...");
    setIsModalDeleteOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    console.log("Fechando o modal de exclusão...");
    setIsModalDeleteOpen(false);
  };

  const handleDelete = async () => {
    const articleId = formDataArticle._id;

    if (!articleId) {
      console.log("Não foi possível excluir. ID do artigo não encontrado.");
      return;
    }

    console.log(`Iniciando a exclusão do artigo com ID: ${articleId}`);

    try {
      const response = await fetch(`http://localhost:5000/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      // Log da resposta
      console.log("Resposta da API:", response);

      if (response.ok) {
        console.log(`Artigo com ID ${articleId} excluído com sucesso!`);
        alert('❌ Artigo excluído com sucesso')
        setIsModalDeleteOpen(false); // Fecha o modal de exclusão
        // Após criar, deletar ou atualizar com sucesso:
        cleanFormDataArticle(setFormDataArticle);
      } else {
        console.log("Erro ao excluir o artigo. Status:", response.status);
      }
    } catch (error) {
      console.log("Erro ao tentar excluir o artigo:", error);
    }
  };

  return (
    <>
      <button onClick={handleOpenModal} className={styles.componentButton}>
        Excluir Artigo
      </button>

      {isModalDeleteOpen && (
        <DeleteModal
          message="Tem certeza que deseja excluir este artigo?"
          onConfirm={handleDelete}  // Chama a função de exclusão se confirmado
          onCancel={handleCloseModal} // Fecha o modal se cancelar
        />
      )}


    </>
  );
}

export default DeleteArticleComponent;
