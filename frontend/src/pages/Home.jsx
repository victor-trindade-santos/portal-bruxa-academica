import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Video from '../components/Video';
import VideoAstrologia from '../video/video1.jsx';
import VideoTarot from '../video/video2.jsx';
import VideoNumerologia from '../video/video3.jsx';
import styles from '../css/Home.module.css';

import HeroSection from '../components/HeroSection.jsx';
import home from '../img/heroSection_home.png';
import Container from '../components/Container.jsx';
import { truncateDescription } from '../utils/descriptionUtils';
import prof from '../img/foto_Marcia.jpg'

function Home() {
    // Estado para os artigos
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Busca os artigos da API ao carregar o componente
    useEffect(() => {
        fetch('http://localhost:5000/articles')  // sua rota real da API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar artigos');
                }
                return response.json();
            })
            .then(data => {
                const categorias = ['Astrologia', 'Tarot', 'Numerologia', 'Magia'];
                // Para cada categoria, pega o primeiro artigo que bate com ela
                const artigosFiltrados = categorias
                    .map(cat => data.find(article => article.category === cat))
                    .filter(Boolean); // remove undefined caso não encontre artigo da categoria
                setArticles(artigosFiltrados);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Dados estáticos dos vídeos (mantidos iguais)
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
            color: "#2B089C"
        }
    ];

    return (
        <>
            <HeroSection image={home} />

            {/* Seção de Artigos */}
            <Container>
                <div className={styles.articleSection}>
                    <h2 className={styles.sectionTitle}>Artigos e Ensinamentos</h2>
                    <p className={styles.sectionDescription}>
                        &#9733; Aprofunde-se no seu autoconhecimento e descubra novos caminhos &#9733;
                    </p>

                    {loading ? (
                        <p>Carregando artigos...</p>
                    ) : error ? (
                        <p>Erro: {error}</p>
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
                                    link={`/artigos/${article._id}`}
                                    category={`#${article.category}`}
                                    type="artigo"
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.viewMoreButton}>
                        <a href="/artigos" className={styles.viewMoreLink}>Ver Mais Artigos</a>
                    </div>
                </div>

            </Container>

            {/* Professora */}
            <Container>
                <div className={styles.aboutSection}>
                    <div className={styles.aboutContent}>
                        <img src={prof} alt="Márcia" className={styles.aboutPhoto} />
                        <div className={styles.aboutText}>
                            <p className={styles.aboutLabel}>Sobre mim</p>
                            <h3 className={styles.aboutName}>Márcia Silva</h3>
                            <p className={styles.aboutDescription}>
                                Professora dedicada e apaixonada pelo ensino, ela encontra na astrologia um hobby inspirador. Sempre em busca de conhecimento, investe em cursos e pesquisa artigos para aprofundar sua conexão com os mistérios do cosmos, trazendo essa sabedoria para o seu dia a dia e compartilhando com seus alunos e leitores.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>


            {/* Vídeos */}
            <Container>
                <h2 className={styles.sectionTitle}>Círculo Místico: Vídeos e Ensinamentos</h2>
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
            </Container>

            <br />
            <br />
        </>
    );
}

export default Home;
