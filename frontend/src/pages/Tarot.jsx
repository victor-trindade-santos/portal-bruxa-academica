import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import styles from '../css/Tarot.module.css'; 
import Container from '../components/Container';
import tarot from '../img/tarot.png';
import { truncateDescription } from '../utils/descriptionUtils';

function Tarot() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=tarot');
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
                    <div className={styles.tarotIntroSection}>
                        <h2 className={styles.sectionTitle}>Tarot</h2>

                        <div className={styles.introWithImage}>
                            <img
                                src={tarot}
                                alt="Cartas de Tarô"
                                className={styles.introImage}
                            />
                            <p className={styles.tarotDescription}>
                                O Tarô é um sistema simbólico composto por cartas que auxiliam na reflexão, autoconhecimento e orientação espiritual, revelando aspectos ocultos da vida.
                            </p>
                        </div>

                        <div className={styles.tarotSubtopics}>
                            <div className={styles.subtopic}>
                                <h3>O que é o Tarô?</h3>
                                <p>
                                    O Tarô é um oráculo composto por 78 cartas que representam arquétipos e etapas da jornada humana, usado para interpretação simbólica e aconselhamento.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Arcanos Maiores e Menores</h3>
                                <p>
                                    Os Arcanos Maiores tratam de grandes lições espirituais, enquanto os Menores abordam situações cotidianas, organizados em quatro naipes.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Uso do Tarô</h3>
                                <p>
                                    Utilizado para orientação, meditação e insights, o Tarô não prevê o futuro de forma fixa, mas auxilia na tomada de decisões e clareza emocional.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.articleSection}>
                        <h2 className={styles.sectionTitle}>Artigos de Tarô</h2>
                        <p className={styles.sectionDescription}>&#9733;Explore o universo simbólico do Tarô com nossos artigos.&#9733;</p>
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
                                        category={article.category || "#Tarot"}
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

export default Tarot;
