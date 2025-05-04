import React, { useState, useEffect } from 'react';
import axios from '../services/api'

import Header from '../components/Header';
import Card from '../components/Card';

import MagiaIMG from '../img/magia.png';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';
import articleImage from '../img/artigofoto.jpg';

import styles from '../css/Magia.module.css';



function Numerologia() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await axios.get('/articles?category=numerologia');
          setArticles(response.data);
        } catch (error) {
          console.error('Erro ao buscar artigos:', error);
        }
      };
  
      fetchArticles();
    }, []);

    const courses = [
        { 
            image: courseImage1, 
            title: "Curso 1", 
            description: "Descrição do curso 1" 
        },
        { 
            image: courseImage2, 
            title: "Curso 2", 
            description: "Descrição do curso 2" 
        },
        { 
            image: courseImage1, 
            title: "Curso 3", 
            description: "Descrição do curso 3" 
        },
        { 
            image: courseImage2, 
            title: "Curso 4", 
            description: "Descrição do curso 4" 
        },
        { 
            image: courseImage1, 
            title: "Curso 4", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae laboriosam temporibus" 
        }
    ];

    return(
        <div>
            <Header 
                title = "Numerologia"
                backgroundImage= {MagiaIMG}
                description= "Explore o mundo da numerologia"
            />
            <section className = {styles.articlesSection}>
                <h2 className = {`fs-1 ${styles.articlesTitle}`} >Artigos recentes</h2>
                    <div className = {styles.articlesCards}>
                    {articles.length === 0 ? (
                        <div className= "emptyMessageContainer">
                            <p className="emptyMessage">
                                Nenhum artigo encontrado. Volte mais tarde para mais conteúdos místicos! 🔮
                            </p>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <Card
                            key={article._id}
                            image={article.imageThumb || articleImage}
                            title={article.title}
                            description={article.firstContent} 
                            link={`/artigos/${article._id}`} 
                            />
                        ))
                    )}
                    </div>
            </section>

            <div className={styles.sectionDivider}></div>

            <section className = {styles.coursesSection}>
                <h2 className = {`fs-1 ${styles.coursesTitle}`}>Confira meus Cursos</h2>
                <p className = {`fs-4 ${styles.coursesQuote}`}>
                    <span>"Conhecimentos místicos que transcendem o comum."</span>
                </p>
                <div className = "container">
                    <div className = "row g-4">
                        {courses.map((course, index) => (
                            <div key = {index} className = "col-12 col-sm-6 col-md-4">
                                <Card
                                    image = {course.image}
                                    title = {course.title}
                                    description= {course.description}
                                    link = {course.link}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Numerologia;