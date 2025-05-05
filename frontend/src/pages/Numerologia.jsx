import React, { useState, useEffect } from 'react';
import axios from '../services/api';

import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import styles from '../css/Home.module.css';

import numerologia from '../img/carousel_home_slide_numerologia.png';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';



function Numerologia() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=numerologia');
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
            title: "Numerologia Básica",
            description: "Aprenda os fundamentos da numerologia e como aplicá-la no dia a dia.",
            category: "#Numerologia",
            duration: "🕒2h"
        },
        {
            image: courseImage2,
            title: "Mapa Numerológico",
            description: "Crie e interprete mapas numerológicos completos para autoconhecimento.",
            category: "#Numerologia",
            duration: "🕒3h"
        }
    ];

    return (
        <>
            <HeroSection
                image={numerologia}
                title="🔢 Numerologia Mística"
                description="Descubra os segredos por trás dos números que guiam sua vida e destino."
            />

            <div className={styles.courseSection}>
                <h2 className={styles.h2}>Cursos de Numerologia</h2>
                <p className={styles.sectionDescription}>&#9733;Explore o poder dos números na sua jornada espiritual.&#9733;</p>
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
                <h2 className={styles.h2}>Artigos de Numerologia</h2>
                <p className={styles.sectionDescription}>&#9733;Aprofunde seus conhecimentos com conteúdos exclusivos.&#9733;</p>
                <div className={styles.cardContainer}>
                    {loading ? (
                        <p>Carregando artigos...</p>
                    ) : articles.length === 0 ? (
                        <p>Nenhum artigo encontrado. Volte mais tarde para mais conteúdos</p>
                    ) : (
                        articles.map((article, index) => (
                            <Card
                                key={index}
                                image={article.imageUrl || courseImage1}
                                title={article.title}
                                description={article.content}
                                link={`/artigos/${article._id}`}
                                category={article.category || "#Numerologia"}
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

export default Numerologia;
