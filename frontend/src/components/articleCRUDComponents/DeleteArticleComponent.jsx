import React, { useState, useImperativeHandle, forwardRef } from 'react'; // Importe useImperativeHandle e forwardRef
import { cleanFormDataArticle } from '../../utils/formUtils.js'; // ajuste o caminho conforme necessário
import DeleteModal from "../modal/ArticleModal.jsx";
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

// Use forwardRef para que o componente pai possa acessar funções internas
const DeleteArticleComponent = forwardRef(({ formDataArticle, setFormDataArticle, onArticleDeleted }, ref) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    // Expose handleOpenModal to the parent component via ref
    useImperativeHandle(ref, () => ({
        handleOpenModal: () => {
            console.log("Abrindo o modal de exclusão (via ref)...");
            setIsModalDeleteOpen(true);
        }
    }));

    // Função para fechar o modal
    const handleCloseModal = () => {
        console.log("Fechando o modal de exclusão...");
        setIsModalDeleteOpen(false);
        cleanFormDataArticle(setFormDataArticle); // Limpa o formDataArticle
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

            console.log("Resposta da API:", response);

            if (response.ok) {
                console.log(`Artigo com ID ${articleId} excluído com sucesso!`);
                alert('❌ Artigo excluído com sucesso');
                setIsModalDeleteOpen(false); // Fecha o modal de exclusão
                cleanFormDataArticle(setFormDataArticle); // Limpa o formDataArticle

                // Notifica o componente pai que um artigo foi excluído
                if (onArticleDeleted) {
                    onArticleDeleted();
                }

            } else {
                console.log("Erro ao excluir o artigo. Status:", response.status);
            }
        } catch (error) {
            console.log("Erro ao tentar excluir o artigo:", error);
        }
    };

    return (
        <>
            {/* O botão "Excluir Artigo" original pode ser mantido se este componente for usado isoladamente,
                mas para a integração com o Card, ele não será acionado diretamente por aqui. */}
            {/* <button onClick={handleOpenModal} className={styles.componentButton}>
                Excluir Artigo
            </button> */}

            {isModalDeleteOpen && (
                <DeleteModal
                    message="Tem certeza que deseja excluir este artigo?"
                    onConfirm={handleDelete}
                    onCancel={handleCloseModal}
                />
            )}
        </>
    );
});

export default DeleteArticleComponent;