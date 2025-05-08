import React, { useState, useEffect } from 'react';
import axios from '../services/api'; 

import Card from '../components/Card';
import HeroSection from '../components/HeroSection';
import styles from '../css/Home.module.css';

import magia from '../img/carousel_home_slide_magia.png'; 
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';

function Magia() {
    const [articles, setArticles] = useState([]); // Estado para armazenar os artigos
    const [loading, setLoading] = useState(true); // Estado de carregamento

    // Fetch dos artigos
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles?category=magia'); // A URL da API
                setArticles(response.data); // Armazenar os artigos no estado
                setLoading(false); // Desmarcar o carregamento
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
                setLoading(false); // Desmarcar o carregamento mesmo em erro
            }
        };

        fetchArticles();
    }, []); // O efeito será executado apenas uma vez ao montar o componente

    const courses = [
        {
            image: courseImage1,
            title: "Magia Natural",
            description: "Curso completo sobre a utilização de elementos naturais em rituais mágicos.",
            category: "#Magia",
            duration: "🕒4h"
        },
        {
            image: courseImage2,
            title: "Rituais da Lua",
            description: "Aprenda a sincronizar suas práticas com as fases da Lua para potencializar resultados.",
            category: "#Magia",
            duration: "🕒3h"
        },
        {
            image: courseImage1,
            title: "Simbolismo Mágico",
            description: "Entenda os significados dos principais símbolos mágicos e como aplicá-los em feitiços.",
            category: "#Magia",
            duration: "🕒2h"
        }
    ];

    return (
        <>
            <HeroSection
                image={magia}
                title="✨ Magia & Encantamentos"
                description="Adentre o universo mágico e desperte a bruxa que existe em você. Aprenda, transforme e manifeste!"
            />

            {/* Seção de Cursos */}
            <div className={styles.courseSection}>
                <h2 className={styles.h2}>Cursos de Magia</h2>
                <p className={styles.sectionDescription}>&#9733; Potencialize sua prática com ensinamentos mágicos &#9733;</p>
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

            {/* Seção de Artigos */}
            <div className={styles.articleSection}>
                <h2 className={styles.h2}>Artigos de Magia</h2>
                <p className={styles.sectionDescription}>&#9733; Descubra técnicas, símbolos e rituais ancestrais &#9733;</p>
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
                                category={article.category || "#Magia"}
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

export default Magia;
