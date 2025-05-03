import React from 'react';
import Card from '../components/Card';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';
import Video from '../components/Video';
import VideoAstrologia from '../video/video1.jsx';
import VideoTarot from '../video/video2.jsx';
import VideoNumerologia from '../video/video3.jsx';
import styles from '../css/Home.module.css';

import HeroSection from '../components/HeroSection.jsx';
import astrologia from '../img/carousel_home_slide_astrologia.png';

function Home() {

    const articles = [
        {
            image: courseImage1,
            title: "Artigo 1",
            description: "Descubra como a astrologia pode impactar sua vida. Aprenda sobre os diferentes aspectos do mapa astral.",
            category: "#Astrologia",
            url: "/artigo1"
        },
        {
            image: courseImage2,
            title: "Artigo 2",
            description: "Entenda os fundamentos do tarot e como ele pode ser uma ferramenta poderosa para autoconhecimento.",
            category: "#Tarot",
            url: "/artigo2"
        },
        {
            image: courseImage1,
            title: "Artigo 3",
            description: "Explore a numerologia e como os números podem influenciar suas escolhas e seu destino.",
            category: "#Numerologia",
            url: "/artigo3"
        },
        {
            image: courseImage2,
            title: "Artigo 4",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: "#Tarot",
            url: "/artigo2"
        },
        {
            image: courseImage2,
            title: "Artigo 2",
            description: "Entenda os fundamentos do tarot e como ele pode ser uma ferramenta poderosa para autoconhecimento.",
            category: "#Tarot",
            url: "/artigo2"
        }
    ];

    const card_video1 = [
        {
            video: VideoAstrologia,
            title: "Interpretando o Mapa Astral",
            description: "Aprenda a ler seu mapa astral de forma simples, entendendo signos, casas e planetas.",
            subtitle: "Astrologia",
            url: "https://www.youtube.com/watch?v=SMureUD4h_c"
        }
    ];

    const card_video2 = [
        {
            video: VideoTarot,
            title: "Interpretando a Tiragem",
            description: "Aprenda a interpretar sua tiragem de forma simples, entendendo simbolos e interpretações.",
            subtitle: "Tarot",
            url: "https://www.youtube.com/watch?v=9sOm-oZNFNc",
            color: "#2B089C"
        }
    ];

    const card_video3 = [
        {
            video: VideoNumerologia,
            title: "Interpretando os Números",
            description: "Descubra seu potencial e seja quem você nasceu para ser, viva sua melhor versão e transforme a sua vida! Você merece todo sucesso que o destino guardou para você! Invista na sua felicidade! Faça como as grandes celebridades e empresários de sucesso, faça o seu Mapa Numerológico!",
            subtitle: "Numerologia",
            url: "https://www.youtube.com/watch?v=fb8M1kflxCs",
            color: "#8C089C"
        }
    ];

    const courses = [
        {
            image: courseImage1,
            title: "Curso 1",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: "#Astrologia",
            duration: "🕒2h"
        },
        {
            image: courseImage2,
            title: "Curso 2",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: "#Taro",
            duration: "🕒3h"
        },
        {
            image: courseImage1,
            title: "Curso 3",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            category: "#Magia",
            duration: "🕒5h"
        },
        {
            image: courseImage2,
            title: "Curso 4",
            description: "Descrição do curso 4",
            category: "#Numerologia",
            duration: "🕒4h"
        }
    ];

    return (
        <>
            <HeroSection
                image={astrologia}
                title="🧙‍♀️ Portal Bruxa Acadêmica"
                description="Explore os mistérios do universo, conecte-se com a energia dos astros e descubra a magia que habita dentro de você..."
            />

            {/* Seção de Cursos */}
            <div className={styles.courseSection}>
                <h2 className={styles.h2}>Confira meus Cursos</h2>
                <p className={styles.sectionDescription}>&#9733; Aprofunde seus conhecimentos em magia e espiritualidade &#9733;</p>
                <div className={styles.cardContainer}>
                    {courses.slice(0, 3).map((course, index) => (
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

                <div className={styles.viewMoreButton}>
                    <a href="/cursos" className={styles.viewMoreLink}>Ver Mais Cursos</a>
                </div>
            </div>

            {/* Seção de Artigos */}
            <div className={styles.articleSection}>
                <h2 className={styles.h2}>Artigos e Ensinamentos</h2>
                <p className={styles.sectionDescription}>&#9733; Aprofunde-se no seu autoconhecimento e descubra novos caminhos &#9733;</p>
                <div className={styles.cardContainer}>
                    {articles.slice(0,4).map((article, index) => (
                    <Card 
                        key={index} 
                        image={article.image} 
                        title={article.title} 
                        description={article.description} 
                        link={article.url} 
                        category={article.category} 
                        type="artigo" 
                    />
                    ))}
                </div>

                <div className={styles.viewMoreButton}>
                    <a href="/artigos" className={styles.viewMoreLink}>Ver Mais Artigos</a>
                </div>

            </div>


            <h2 className={styles.h2}>Círculo Místico: Vídeos e Ensinamentos</h2>
            <p className={styles.sectionDescription}>&#9733; Aprenda, conecte-se e floresça no seu caminho mágico &#9733;</p>
            {card_video1.map((videoCard, index) => (
                <div key={index}>
                    <Video
                        video={videoCard.video}
                        title={videoCard.title}
                        description={videoCard.description}
                        subtitle={videoCard.subtitle}
                        url={videoCard.url}
                        color={videoCard.color}
                    />
                </div>
            ))}
            <div className={styles.sectionDivider}></div>

            {card_video2.map((videoCard, index) => (
                <div key={index}>
                    <Video
                        video={videoCard.video}
                        title={videoCard.title}
                        description={videoCard.description}
                        subtitle={videoCard.subtitle}
                        url={videoCard.url}
                        color={videoCard.color}
                    />
                </div>
            ))}
            <div className={styles.sectionDivider}></div>

            {card_video3.map((videoCard, index) => (
                <div key={index}>
                    <Video
                        video={videoCard.video}
                        title={videoCard.title}
                        description={videoCard.description}
                        subtitle={videoCard.subtitle}
                        url={videoCard.url}
                        color={videoCard.color}
                    />
                </div>
            ))}

            <br></br>
            <br></br>
        </>
    );
}

export default Home;
