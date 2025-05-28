// src/components/articleCRUDComponents/DeleteArticleComponent.jsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { cleanFormDataArticle } from '../../utils/formUtils.js';
import DeleteModal from "../modal/ArticleModal.jsx"; // Seu modal de confirmação
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css"; // Estilos do botão interno

// Usamos forwardRef para permitir que o componente pai (Artigos.jsx)
// acesse métodos internos (como abrir o modal) através de uma ref.
const DeleteArticleComponent = forwardRef(
    ({ formDataArticle, setFormDataArticle, onArticleDeleted, buttonText, buttonClass, hideButton = false }, ref) => {
        // isModalDeleteOpen AGORA É O ESTADO PRINCIPAL PARA AMBAS AS FUNCIONALIDADES.
        const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

        // useImperativeHandle expõe métodos internos para o componente pai que o referencia.
        // Isso é usado especificamente pela página Artigos.jsx para abrir o modal via ref do Card.
        useImperativeHandle(ref, () => ({
            handleOpenModal: () => {
                console.log("DeleteArticleComponent (via ref): Abrindo o modal de exclusão...");
                setIsModalDeleteOpen(true);
            }
        }));

        // Função para abrir o modal quando o botão interno for clicado.
        // Esta função é para o caso de ArticleCRUD.jsx usar o botão diretamente.
        const handleOpenModalInternal = () => {
            console.log("DeleteArticleComponent (interno): Abrindo o modal de exclusão...");
            setIsModalDeleteOpen(true);
        };

        // Função para fechar o modal.
        // Usada tanto pelo modal de confirmação quanto pela lógica interna.
        const handleCloseModal = () => {
            console.log("DeleteArticleComponent: Fechando o modal de exclusão...");
            setIsModalDeleteOpen(false);
            // Limpa o formDataArticle SOMENTE SE setFormDataArticle for fornecido
            // (Isso será útil em ArticleCRUD, mas não em Artigos que gerencia o ID diretamente)
            if (setFormDataArticle) {
                cleanFormDataArticle(setFormDataArticle);
            }
        };

        const handleDelete = async () => {
            // Pega o articleId do formDataArticle (para ArticleCRUD) ou de uma prop separada (para Artigos)
            // Por simplicidade, vamos usar formDataArticle._id como antes.
            // Se você quiser ser mais explícito, pode passar `articleIdToDelete` como prop.
            const articleId = formDataArticle._id; // Assume que formDataArticle._id sempre terá o ID

            if (!articleId) {
                console.error("DeleteArticleComponent: Não foi possível excluir. ID do artigo não encontrado.");
                alert("Erro: ID do artigo não encontrado para exclusão.");
                return;
            }

            console.log(`DeleteArticleComponent: Iniciando a exclusão do artigo com ID: ${articleId}`);

            try {
                // Certifique-se de que a URL está correta (axios já gerencia a base url)
                const response = await fetch(`http://localhost:5000/articles/${articleId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log("DeleteArticleComponent: Resposta da API:", response);

                if (response.ok) {
                    console.log(`DeleteArticleComponent: Artigo com ID ${articleId} excluído com sucesso!`);
                    alert('❌ Artigo excluído com sucesso');
                    setIsModalDeleteOpen(false); // Fecha o modal de exclusão
                    
                    if (setFormDataArticle) { // Limpa o formDataArticle, se aplicável
                        cleanFormDataArticle(setFormDataArticle);
                    }

                    // Notifica o componente pai (Artigos.jsx ou ArticleCRUD.jsx) que um artigo foi excluído.
                    if (onArticleDeleted) {
                        onArticleDeleted();
                    }

                } else {
                    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
                    console.error("DeleteArticleComponent: Erro ao excluir o artigo. Status:", response.status, "Detalhes:", errorData);
                    alert(`Erro ao excluir o artigo: ${errorData.message || response.statusText}`);
                }
            } catch (error) {
                console.error("DeleteArticleComponent: Erro ao tentar excluir o artigo:", error);
                alert("Ocorreu um erro ao tentar excluir o artigo.");
            }
        };

        return (
            <>
                {/* Renderiza o botão interno APENAS SE 'hideButton' for falso */}
                {!hideButton && (
                    <button
                        onClick={handleOpenModalInternal}
                        className={`${styles.componentButton} ${buttonClass}`}
                    >
                        <i className={`bi bi-trash3 ${styles.buttonIcon}`}></i>
                        {buttonText} {/* Texto passado via props */}
                    </button>
                )}

                {isModalDeleteOpen && ( // O modal é renderizado quando isModalDeleteOpen é true
                    <DeleteModal
                        message="Tem certeza que deseja excluir este artigo?"
                        onConfirm={handleDelete}
                        onCancel={handleCloseModal}
                    />
                )}
            </>
        );
    }
);

export default DeleteArticleComponent;