import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import styles from '../css/Home.module.css';

import tarot from '../img/carousel_home_slide_tarot.png';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';

function Tarot() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=tarot');
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
            title: "Introdução ao Tarô",
            description: "Conheça os arcanos e comece sua jornada com as cartas.",
            category: "#Tarô",
            duration: "🕒2h"
        },
        {
            image: courseImage2,
            title: "Leitura Intuitiva",
            description: "Aprenda a interpretar o Tarô com sensibilidade e conexão espiritual.",
            category: "#Tarô",
            duration: "🕒3h"
        }
    ];

    return (
        <>
            <HeroSection
                image={tarot}
                title="🃏 O Universo do Tarô"
                description="Desvende os mistérios das cartas e conecte-se com a sabedoria ancestral."
            />

            <div className={styles.courseSection}>
                <h2 className={styles.h2}>Cursos de Tarô</h2>
                <p className={styles.sectionDescription}>&#9733;Aprenda a interpretar os arcanos e orientar com consciência.&#9733;</p>
                <div className={styles.cardContainer}>
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
                <h2 className={styles.h2}>Artigos de Tarô</h2>
                <p className={styles.sectionDescription}>&#9733;Interprete cartas, spreads e simbolismos profundos.&#9733;</p>
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Carregando artigos...</p>
                    ) : articles.length === 0 ? (
                        <p>Nenhum artigo encontrado.</p>
                    ) : (
                        articles.map((article, index) => (
                            <Card
                                key={index}
                                image={article.imageUrl || courseImage1}
                                title={article.title}
                                description={article.content}
                                link={`/artigos/${article._id}`}
                                category={article.category || "#Tarô"}
                                type="artigo"
                            />
                        ))
                    )}
                </div>
            </div>
            <br />
        </>
    );
}

export default Tarot;
