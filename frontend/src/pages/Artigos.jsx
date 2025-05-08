import { useParams } from 'react-router-dom';
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

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles');
                setArticles(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    

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













