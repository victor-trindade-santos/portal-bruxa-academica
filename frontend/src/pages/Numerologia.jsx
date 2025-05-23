import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import styles from '../css/Numerologia.module.css'; 
import Container from '../components/Container';
import numerologia from '../img/numerologia.jpeg';
import { truncateDescription } from '../utils/descriptionUtils';

function Numerologia() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=numerologia');
                const sorted = response.data.sort(
                    (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
                );
                setArticles(sorted.slice(0, 4));
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
            <Container>
                <div className="pageContentWithoutHero">
                    <div className={styles.numerologiaIntroSection}>
                        <h2 className={styles.sectionTitle}>Numerologia</h2>

                        <div className={styles.introWithImage}>
                            <img
                                src={numerologia}
                                alt="Representação de numerologia"
                                className={styles.introImage}
                            />
                            <p className={styles.numerologiaDescription}>
                                A numerologia estuda os significados ocultos dos números e como eles influenciam nossa vida. Por meio dela, é possível compreender aspectos da personalidade e do destino.
                            </p>
                        </div>

                        <div className={styles.numerologiaSubtopics}>
                            <div className={styles.subtopic}>
                                <h3>O que é numerologia?</h3>
                                <p>
                                    É uma ciência esotérica que analisa números relacionados ao nome e à data de nascimento para revelar características pessoais e caminhos de vida.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Tipos de numerologia</h3>
                                <p>
                                    As vertentes mais conhecidas incluem a numerologia pitagórica, cabalística e tântrica, cada uma com métodos específicos de interpretação.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Aplicações práticas</h3>
                                <p>
                                    A numerologia pode auxiliar na escolha de datas, nomes, decisões profissionais e autoconhecimento profundo.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.articleSection}>
                        <h2 className={styles.sectionTitle}>Artigos de Numerologia</h2>
                        <p className={styles.sectionDescription}>&#9733;Explore o poder dos números através de nossos conteúdos.&#9733;</p>
                        {loading ? (
                            <p>Carregando artigos...</p>
                        ) : articles.length === 0 ? (
                            <div className={styles.emptyWrapper}>
                                <p>Nenhum artigo encontrado. Volte mais tarde para mais conteúdos</p>
                            </div>
                        ) : (
                            <div className={styles.cardContainer}>
                                {articles.map((article, index) => (
                                    <Card
                                        key={index}
                                        image={article.imageThumb}
                                        title={truncateDescription(article.title, 30)}
                                        description={article.firstContent}
                                        id={article._id}
                                        link={`/artigos/${article._id}`}
                                        category={article.category || "#Numerologia"}
                                        type="artigo"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
            <br />
        </>
    );
}

export default Numerologia;
