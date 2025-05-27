import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { cleanFormDataArticle } from '../../utils/formUtils.js'; // Ajuste o caminho conforme necessário
import DeleteModal from "../modal/ArticleModal.jsx";
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

// Usamos forwardRef para permitir que o componente pai (Artigos.jsx)
// acesse métodos internos (como abrir o modal) através de uma ref.
const DeleteArticleComponent = forwardRef(({ formDataArticle, setFormDataArticle, onArticleDeleted }, ref) => {
    // isModalDeleteOpen AGORA É O ESTADO PRINCIPAL PARA AMBAS AS FUNCIONALIDADES.
    // Se o componente for usado com a ref (pelo Card/Artigos),
    // a função exposta via useImperativeHandle o alterará.
    // Se for usado sem a ref (pelo ArticleCRUD),
    // o botão interno (se descomentado) o alterará.
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
        cleanFormDataArticle(setFormDataArticle); // Limpa o formDataArticle
    };

    const handleDelete = async () => {
        const articleId = formDataArticle._id;

        if (!articleId) {
            console.log("DeleteArticleComponent: Não foi possível excluir. ID do artigo não encontrado.");
            alert("Erro: ID do artigo não encontrado para exclusão.");
            return;
        }

        console.log(`DeleteArticleComponent: Iniciando a exclusão do artigo com ID: ${articleId}`);

        try {
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
                cleanFormDataArticle(setFormDataArticle); // Limpa o formDataArticle

                // Notifica o componente pai (Artigos.jsx) que um artigo foi excluído.
                // Esta prop só será passada por Artigos.jsx.
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
            {/* ESTE BOTÃO SERÁ USADO PELA PÁGINA 'ARTICLECRUD.JSX'
                Se você o descomentar, ele permitirá a funcionalidade original. */}
            <button onClick={handleOpenModalInternal} className={styles.componentButton}>
                Excluir Artigo
            </button>

            {isModalDeleteOpen && ( // O modal é renderizado quando isModalDeleteOpen é true
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