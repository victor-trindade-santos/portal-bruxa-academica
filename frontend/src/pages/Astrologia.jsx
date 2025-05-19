import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import styles from '../css/Astrologia.module.css';
import Container from '../components/Container';
import astrologia from '../img/astrologia.png';
import { truncateDescription } from '../utils/descriptionUtils';

function Astrologia() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=astrologia');
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
                    <div className={styles.astrologiaIntroSection}>
                        <h2 className={styles.sectionTitle}>Astrologia</h2>

                        <div className={styles.introWithImage}>
                            <img
                                src={astrologia}
                                alt="Símbolos astrológicos"
                                className={styles.introImage}
                            />
                            <p className={styles.astrologiaDescription}>
                                A Astrologia é o estudo simbólico dos astros e sua influência nos ciclos da vida humana, oferecendo uma visão profunda sobre personalidade, destino e sincronicidades.
                            </p>
                        </div>

                        <div className={styles.astrologiaSubtopics}>
                            <div className={styles.subtopic}>
                                <h3>O que é Astrologia?</h3>
                                <p>
                                    Astrologia é uma prática milenar que interpreta a posição dos planetas e signos no momento do nascimento, revelando traços da personalidade e tendências de vida.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Mapa Astral</h3>
                                <p>
                                    O mapa astral é uma representação do céu no momento do nascimento e mostra aspectos como Sol, Lua, Ascendente e casas astrológicas.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Aplicações</h3>
                                <p>
                                    A Astrologia pode ser usada para autoconhecimento, relacionamento, carreira e momentos de tomada de decisão com mais consciência.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.articleSection}>
                        <h2 className={styles.sectionTitle}>Artigos de Astrologia</h2>
                        <p className={styles.sectionDescription}>&#9733;Descubra os segredos dos astros com conteúdos exclusivos.&#9733;</p>
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
                                        link={`/articles/${article._id}`}
                                        category={article.category || "#Astrologia"}
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

export default Astrologia;
