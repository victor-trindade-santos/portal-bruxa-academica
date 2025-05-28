// Artigos.jsx
import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from '../services/api';
import Card from '../components/Card';

import styles from '../css/Artigos.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import Container from '../components/Container'
import { truncateDescription } from '../utils/descriptionUtils';
import { cleanFormDataArticle } from '../utils/formUtils.js';
// Importe o DeleteArticleComponent
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent';

function Artigos() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoria = queryParams.get('categoria');
    const termoBusca = queryParams.get('busca');

    // Estado para controlar a visibilidade do modal de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Estado para armazenar o ID do artigo a ser deletado
    const [articleToDeleteId, setArticleToDeleteId] = useState(null);

    // O formDataArticle agora será atualizado apenas para passar o ID para o modal
    const [formDataArticle, setFormDataArticle] = useState({ _id: '', title: '', description: '', category: '', image: '' });

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/articles');
            const todosArtigos = response.data;

            let filtrados = categoria
                ? todosArtigos.filter(article => article.category?.toLowerCase() === categoria.toLowerCase())
                : todosArtigos;

            if (termoBusca) {
                const termo = termoBusca.toLowerCase();
                filtrados = filtrados.filter(article => article.title?.toLowerCase().includes(termo));
            }

            filtrados.sort((a, b) => {
                const parseDate = (str) => {
                    if (!str) return new Date(0);
                    const [dia, mes, ano] = str.split('/');
                    return new Date(`${ano}-${mes}-${dia}`);
                };
                return parseDate(b.publicationDate) - parseDate(a.publicationDate);
            });

            setArticles(filtrados);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar artigos:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [categoria, termoBusca]);
  // Declare a ref para o DeleteArticleComponent
    const deleteArticleModalRef = useRef(null); 

    // Função que o Card chamará para iniciar o processo de exclusão
    const handleInitiateDelete = (articleId) => {
        console.log("Artigos: handleInitiateDelete chamado com ID:", articleId);
        // Atualize o formDataArticle no pai para que o modal tenha o ID correto
        setFormDataArticle(prev => ({
            ...prev,
            _id: articleId // Define o _id do artigo a ser deletado no estado
        }));
        
        // Chame o método exposto pelo DeleteArticleComponent via ref
        if (deleteArticleModalRef.current) {
            deleteArticleModalRef.current.handleOpenModal();
        } else {
            console.warn("Artigos: deleteArticleModalRef.current é null.");
        }
    };

    // Função para confirmar a exclusão (será passada para o DeleteArticleComponent)
    const handleConfirmDelete = async () => {
        if (!articleToDeleteId) return;

        try {
            await axios.delete(`/articles/${articleToDeleteId}`);
            console.log(`Artigo com ID ${articleToDeleteId} deletado com sucesso!`);
            fetchArticles(); // Recarrega a lista de artigos após a exclusão
            setShowDeleteModal(false); // Fecha o modal
            setArticleToDeleteId(null); // Limpa o ID
            // cleanFormDataArticle(setFormDataArticle); // Opcional, se você quiser limpar o formDataArticle
        } catch (error) {
            console.error("Erro ao deletar artigo:", error);
            // Tratar o erro, talvez mostrar uma mensagem para o usuário
        }
    };

    // Função para cancelar a exclusão (será passada para o DeleteArticleComponent)
    const handleCancelDelete = () => {
        setShowDeleteModal(false); // Fecha o modal
        setArticleToDeleteId(null); // Limpa o ID
    };

    return (
        <>
            <Container>
                <div className="pageContentWithoutHero"></div>
                <div className={`row ${styles.rowPrincipal}`}>
                    <div className={styles.colInsideLeft}>
                        <div className={styles.articleSection}>
                            <div className={styles.cardContainer}>
                                {loading ? (
                                    <p>Carregando artigos...</p>
                                ) : articles.length === 0 ? (
                                    <p>Nenhum artigo encontrado. Volte mais tarde para mais conteúdos</p>
                                ) : (
                                    articles.map((article) => (
                                        <Card
                                            key={article._id}
                                            _id={article._id}
                                            image={article.imageThumb}
                                            title={truncateDescription(article.title, 30)}
                                            description={truncateDescription(article.firstContent, 50)}
                                            className={styles.cardArtigoAlternativo}
                                            link={`/artigos/${article._id}`}
                                            category={article.category}
                                            type="artigo"
                                            onDeleteClick={handleInitiateDelete} // Passa a função para o Card
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.colInsideRight}>
                        <Barra_Pesquisa
                            onSearch={(results) => {
                                console.log("🟡 Artigos filtrados:", results);
                                setArticles(results);
                            }}
                        />
                        <Barra_Categoria />
                        <Sobre_Mim_Lateral />
                    </div>
                </div>
            </Container>

            {/* O DeleteArticleComponent é renderizado aqui */}
           <DeleteArticleComponent
                ref={deleteArticleModalRef} // A ref é passada aqui
                formDataArticle={formDataArticle} // Passe o formDataArticle para que o modal pegue o _id
                setFormDataArticle={setFormDataArticle} // Passe o setFormDataArticle para limpar após deletar
                onArticleDeleted={fetchArticles} // Callback para recarregar artigos
                hideButton={true} // <-- ESSA É A CHAVE! O botão interno não será renderizado
            />

            <br />
        </>
    );
}

export default Artigos;