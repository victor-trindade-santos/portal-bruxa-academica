import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import styles from '../css/Magia.module.css'; 
import Container from '../components/Container';
import magia from '../img/magia.jpeg'
import { truncateDescription } from '../utils/descriptionUtils';

function Magia() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=magia');
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
                    <div className={styles.magiaIntroSection}>
                        <h2 className={styles.sectionTitle}>Magia</h2>

                        <div className={styles.introWithImage}>
                            <img
                                src={magia}
                                alt="Representação de magia"
                                className={styles.introImage}
                            />
                            <p className={styles.magiaDescription}>
                                A magia é a arte de influenciar energias e realidades através da vontade, símbolos e rituais. Ela conecta o visível e o invisível para transformar aspectos da vida cotidiana.
                            </p>
                        </div>

                        <div className={styles.magiaSubtopics}>
                            <div className={styles.subtopic}>
                                <h3>O que é magia?</h3>
                                <p>
                                    Magia é uma prática ancestral que utiliza rituais, objetos simbólicos e intenções para canalizar forças sutis com o objetivo de provocar mudanças.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Tipos de magia</h3>
                                <p>
                                    Existem diversos tipos, como magia natural, cerimonial, simpática e do caos, cada uma com suas técnicas e filosofias.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Aplicações mágicas</h3>
                                <p>
                                    A magia pode ser usada para proteção, cura, prosperidade, amor e crescimento espiritual, sempre com responsabilidade e ética.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.articleSection}>
                        <h2 className={styles.sectionTitle}>Artigos de Magia</h2>
                        <p className={styles.sectionDescription}>&#9733;Aprofunde seus conhecimentos com conteúdos exclusivos.&#9733;</p>
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
                                        category={article.category || "#Magia"}
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

export default Magia;
