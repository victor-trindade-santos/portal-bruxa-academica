import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import Card from '../components/Card';

import styles from '../css/Artigos.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import Container from '../components/Container'
import { truncateDescription } from '../utils/descriptionUtils';

function Artigos() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // 🔹 Pega a URL
    const queryParams = new URLSearchParams(location.search); // 🔍 Extrai a query string
    const categoria = queryParams.get('categoria'); // ✅ Pega o valor de "categoria"
    const termoBusca = queryParams.get('busca'); // 🔍 Novo


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles');
                const todosArtigos = response.data;

                // 🔍 Se houver filtro de categoria, aplica
                let filtrados = categoria
                    ? todosArtigos.filter(article => article.category?.toLowerCase() === categoria.toLowerCase())
                    : todosArtigos;

                // 🔎 Filtra por título se houver termo de busca
                if (termoBusca) {
                    const termo = termoBusca.toLowerCase();
                    filtrados = filtrados.filter(article => article.title?.toLowerCase().includes(termo));
                }


                // 📅 Ordena por data                    
                filtrados.sort((a, b) => {
                    const parseDate = (str) => {
                        if (!str) return new Date(0); // fallback para datas inválidas
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

        fetchArticles();
    }, [categoria, termoBusca]);

    // Função que será chamada ao clicar na lupa
    const handleSearch = (termoBusca) => {
        if (termoBusca && termoBusca.trim() !== '') {
            navigate(`/artigos?busca=${encodeURIComponent(termoBusca.trim())}`);
        }
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
                                    articles.map((article, index) => (
                                        <Card
                                            key={index}
                                            image={article.imageThumb}
                                            title={truncateDescription(article.title, 30)}
                                            description={truncateDescription(article.firstContent, 50)}
                                            className={styles.cardArtigoAlternativo}

                                            link={`/artigos/${article._id}`}
                                            category={article.category}
                                            type="artigo"
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
                                setArticles(results); // Ou qualquer outra lógica que quiser
                            }}
                        />

                        <Barra_Categoria />
                        <Sobre_Mim_Lateral />
                    </div>
                </div>
            </Container>
            <br />
        </>
    );
}

export default Artigos;