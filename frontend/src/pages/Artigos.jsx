import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import Card from '../components/Card';

import styles from '../css/Artigos.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';

function Article_Pages() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // 🔹 Pega a URL
    const queryParams = new URLSearchParams(location.search); // 🔍 Extrai a query string
    const categoria = queryParams.get('categoria'); // ✅ Pega o valor de "categoria"

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles');
                const todosArtigos = response.data;

                // 🔍 Se houver filtro de categoria, aplica
                const filtrados = categoria
                ? todosArtigos.filter(article => article.category?.toLowerCase() === categoria.toLowerCase())
                : todosArtigos;
            

                filtrados.sort((a, b) => {
                    if (!a.publicationDate || !b.publicationDate) return 0;
                    const [diaA, mesA, anoA] = a.publicationDate.split('/');
                    const [diaB, mesB, anoB] = b.publicationDate.split('/');
                    const dataA = new Date(`${anoA}-${mesA}-${diaA}`);
                    const dataB = new Date(`${anoB}-${mesB}-${diaB}`);
                    return dataB - dataA;
                });
                
                setArticles(filtrados);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, [categoria]);

    

    return (
        <>
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
                                        title={article.title}
                                        description={article.firstContent}
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
                    <Barra_Pesquisa />
                    <Barra_Categoria />
                    <Sobre_Mim_Lateral />
                </div>
            </div>
            <br />
        </>
    );
}

export default Article_Pages;













