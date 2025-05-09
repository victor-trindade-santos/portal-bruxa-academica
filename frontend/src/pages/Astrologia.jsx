import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import styles from '../css/Home.module.css';

import astrologia from '../img/carousel_home_slide_astrologia.png';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';

function Astrologia() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=astrologia');
                setArticles(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const courses = [
        {
            image: courseImage1,
            title: "Astrologia para Iniciantes",
            description: "Entenda os signos, casas e planetas na astrologia natal.",
            category: "#Astrologia",
            duration: "🕒2h"
        },
        {
            image: courseImage2,
            title: "Trânsitos e Previsões",
            description: "Aprenda a interpretar os trânsitos astrológicos e fazer previsões.",
            category: "#Astrologia",
            duration: "🕒3h"
        }
    ];

    return (
        <>
            <HeroSection
                image={astrologia}
                title="🌌 Astrologia e o Cosmos"
                description="Descubra como os astros influenciam sua jornada e seu destino."
            />

            <div className={styles.courseSection}>
                <h2 className={styles.h2}>Cursos de Astrologia</h2>
                <p className={styles.sectionDescription}>&#9733;Do mapa natal às previsões, domine os segredos do céu.&#9733;</p>
                <div className={styles.cardContainerCourse}>
                    {courses.map((course, index) => (
                        <Card
                            key={index}
                            image={course.image}
                            title={course.title}
                            description={course.description}
                            category={course.category}
                            duration={course.duration}
                            type="curso"
                        />
                    ))}
                </div>
            </div>

            <div className={styles.articleSection}>
                <h2 className={styles.h2}>Artigos de Astrologia</h2>
                <p className={styles.sectionDescription}>&#9733;Aprofunde-se na sabedoria dos astros e do zodíaco.&#9733;</p>
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
                                image={article.imageThumb || courseImage1}
                                title={article.title}
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
            <br />
        </>
    );
}

export default Astrologia;
