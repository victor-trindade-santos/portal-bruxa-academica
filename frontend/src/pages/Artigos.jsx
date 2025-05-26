// Artigos.jsx
import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'; // Importe useRef
import axios from '../services/api';
import Card from '../components/Card';

import styles from '../css/Artigos.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import Container from '../components/Container'
import { truncateDescription } from '../utils/descriptionUtils';
import { cleanFormDataArticle } from '../utils/formUtils.js';
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent'; // Importe o componente de exclusão

function Artigos() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoria = queryParams.get('categoria');
    const termoBusca = queryParams.get('busca');

    // Estado para o artigo a ser deletado (compartilhado com DeleteArticleComponent)
    const [formDataArticle, setFormDataArticle] = useState({ _id: '', title: '', description: '', category: '', image: '' });

    // **RE-ADICIONANDO ESTADO PARA O MODAL NO COMPONENTE PAI**
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    // Função para recarregar os artigos (movida para fora do useEffect para ser reutilizável)
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

    // Função que o Card chamará para iniciar o processo de exclusão
    // Esta função agora abre o modal diretamente no Artigos.jsx
    const handleInitiateDelete = (articleId) => {
        setFormDataArticle({ ...formDataArticle, _id: articleId }); // Preenche o ID do artigo a ser deletado
        setIsModalDeleteOpen(true); // Abre o modal no componente Artigos
    };

    // Função a ser chamada pelo DeleteArticleComponent após a exclusão bem-sucedida
    const onArticleDeletedSuccess = () => {
        fetchArticles(); // Recarrega a lista de artigos
        cleanFormDataArticle(setFormDataArticle); // Limpa o estado do formDataArticle
        setIsModalDeleteOpen(false); // Fecha o modal após a exclusão bem-sucedida
    };

    // Função para fechar o modal (chamada pelo DeleteArticleComponent se o usuário cancelar)
    const handleCloseDeleteModal = () => {
        setIsModalDeleteOpen(false);
        cleanFormDataArticle(setFormDataArticle);
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
                                            id={article._id}
                                            image={article.imageThumb}
                                            title={truncateDescription(article.title, 30)}
                                            description={truncateDescription(article.firstContent, 50)}
                                            className={styles.cardArtigoAlternativo}
                                            link={`/artigos/${article._id}`}
                                            category={article.category}
                                            type="artigo"
                                            onDeleteClick={handleInitiateDelete} // Passa a função para iniciar a exclusão
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
            <br />

            {/* Renderiza o DeleteArticleComponent condicionalmente com o estado do pai */}
            {isModalDeleteOpen && (
                <DeleteArticleComponent
                    formDataArticle={formDataArticle}
                    setFormDataArticle={setFormDataArticle}
                    setIsModalDeleteOpen={setIsModalDeleteOpen} // Passa a função para fechar o modal
                    onArticleDeleted={onArticleDeletedSuccess} // Passa a função de callback para recarregar artigos
                />
            )}
        </>
    );
}

export default Artigos;