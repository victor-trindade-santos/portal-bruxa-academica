import Card from '../components/Card';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';
import React from 'react';
import Header from '../components/Header';
import MagiaIMG from '../img/magia.png';
import articleImage from '../img/artigofoto.jpg';
import styles from '../css/Magia.module.css';

function Tarot() {

 
    const articles = [
        {
            image: articleImage,
            title: "Introdução à Magia", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae laboriosam temporibus consectetur consequatur similique totam autem alias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia mollitia nisi dolores sequi accusamus dolor totam aliquid voluptate nobis. Sapiente nemo ullam modi facere nisi quisquam voluptatum illum neque non."
        },
        {
            image: articleImage,
            title: "Como lançar feitiços", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae "
        },
        {
            image: articleImage,
            title: "A história da magia", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae laboriosam temporibus"
        },
        {
            image: articleImage,
            title: "A história da magia", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae laboriosam temporibus"
        },
        {
            image: articleImage,
            title: "A história da magia", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae laboriosam temporibus"
        },
        {
            image: articleImage,
            title: "A história da magia", 
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quae laboriosam temporibus"
        }
    ];

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
                title = "Tarot"
                backgroundImage= {MagiaIMG}
                description= "Explore o mundo do tarot"
            />
            <section className = {styles.articlesSection}>
                <h2 className = {styles.articlesTitle} >Artigos recentes</h2>
                    <div className = {styles.articlesCards}>
                        {articles.map((article, index) => (
                            <Card 
                                key={index}
                                image={article.image}
                                title={article.title}
                                description={article.description}
                                link={article.link}
                            />
                        ))}
                    </div>
            </section>

            <div className={styles.sectionDivider}></div>

            <section className = {styles.coursesSection}>
                <h2 className = {styles.coursesTitle}>Confira meus Cursos</h2>
                <p className = {styles.coursesQuote}>
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

export default Tarot;