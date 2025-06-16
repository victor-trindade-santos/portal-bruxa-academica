// src/pages/Home.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe useNavigate
import axios from '../services/api'; // Importe axios para as chamadas de API

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
import prof from '../img/marcia_silva.jpeg';
import { AuthContext } from '../context/AuthContext';

// Importe o DeleteArticleComponent
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent';

function Home() {
    // Estado para os artigos
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para o modal de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [articleToDeleteId, setArticleToDeleteId] = useState(null);
    // Este formDataArticle será usado apenas para passar o _id para o DeleteArticleComponent
    const [formDataArticle, setFormDataArticle] = useState({ _id: '' });

    const { user } = useContext(AuthContext);
    const isAdmin = user?.role === 'admin';
    const navigate = useNavigate();

    // Ref para o DeleteArticleComponent (para chamar handleOpenModal)
    const deleteArticleModalRef = useRef(null);

    // Função para buscar os artigos
    const fetchArticles = async () => {
        try {
            const response = await axios.get('/articles');
            const todosArtigos = response.data;

            const categorias = ['Astrologia', 'Tarot', 'Numerologia', 'Magia'];
            // Para cada categoria, pega o primeiro artigo que bate com ela
            const artigosFiltrados = categorias
                .map(cat => todosArtigos.find(article => article.category === cat))
                .filter(Boolean); // remove undefined caso não encontre artigo da categoria

            setArticles(artigosFiltrados);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Busca os artigos da API ao carregar o componente
    useEffect(() => {
        fetchArticles();
    }, []);

    // --- Funções para Gerenciamento de Artigos (Editar/Deletar) ---

    // Função para iniciar a edição
    const handleEditArticle = (articleId) => {
        console.log("Home: Botão de editar clicado para o ID:", articleId);
        navigate(`/create-articles-d42f4c`, { state: { articleId: articleId } });
    };

    // Função para iniciar o processo de exclusão (chamada pelo Card)
    const handleInitiateDelete = (articleId) => {
        console.log("Home: handleInitiateDelete chamado com ID:", articleId);
        setArticleToDeleteId(articleId); // Armazena o ID do artigo a ser deletado
        setFormDataArticle(prev => ({ // Atualiza formDataArticle para o modal
            ...prev,
            _id: articleId
        }));

        // Abre o modal de exclusão via ref
        if (deleteArticleModalRef.current) {
            deleteArticleModalRef.current.handleOpenModal();
        } else {
            console.warn("Home: deleteArticleModalRef.current ainda é null. O componente DeleteArticleComponent pode não ter sido montado ainda.");
        }
    };

    // Função para confirmar a exclusão (passada para o DeleteArticleComponent)
    const handleConfirmDelete = async () => {
        // A lógica de deleção será tratada pelo DeleteArticleComponent internamente
        // após a confirmação. O que importa é que o DeleteArticleComponent chamará
        // onArticleDeleted (que será fetchArticles) quando a exclusão for bem-sucedida.
        setShowDeleteModal(false); // Fecha o modal (após a lógica no DeleteArticleComponent)
        setArticleToDeleteId(null); // Limpa o ID
    };

    // Função para cancelar a exclusão (passada para o DeleteArticleComponent)
    const handleCancelDelete = () => {
        setShowDeleteModal(false); // Fecha o modal
        setArticleToDeleteId(null); // Limpa o ID
    };

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
            {isAdmin ? (
                <Container>
                    <div className="pageContentWithoutHero">
                        <div className={styles.adminWelcome}>
                            <h1>Bem-vindo(a) ao painel administrativo, {user.username}!</h1>
                            <p>Gerencie seus artigos, cursos e conteúdos com facilidade.</p>
                            <Link to="/grafico-usuarios">
                                <button type="button" className={styles.btnGrafico}>
                                    Ver Gráficos e Relatórios
                                </button>
                            </Link>
                        </div>


                    </div>
                </Container>
            ) : (
                <HeroSection image={home} isLogged={!!user} />
            )}

            {/* Seção de Artigos */}
            <Container>
                <div className={styles.articleSection}>
                    <h2 className={styles.sectionTitle}>Artigos e Ensinamentos</h2>
                    <p className={styles.sectionDescription}>
                        ★ Aprofunde-se no seu autoconhecimento e descubra novos caminhos ★
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
                            {articles.map((article) => (
                                <Card
                                    key={article._id} // Use _id como key, pois é único
                                    _id={article._id} // Passe o _id para o Card
                                    image={article.imageThumb}
                                    title={truncateDescription(article.title, 20)}
                                    description={truncateDescription(article.firstContent, 55)}
                                    link={`/artigos/${article._id}`}
                                    category={`#${article.category}`}
                                    type="artigo"
                                    // Passe as funções de callback para o Card
                                    onEditClick={handleEditArticle}
                                    onDeleteClick={handleInitiateDelete}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.viewMoreButton}>
                        <Link to={"/artigos"} className={styles.viewMoreLink}>
                            Ver Mais Artigos
                        </Link>
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
                <p className={styles.sectionDescription}>★ Aprenda, conecte-se e floresça no seu caminho mágico ★</p>

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

            {/* Renderiza o DeleteArticleComponent aqui, mas com hideButton=true */}
            <DeleteArticleComponent
                ref={deleteArticleModalRef} // A ref é passada aqui
                formDataArticle={formDataArticle} // Passe o formDataArticle para que o modal pegue o _id
                // setFormDataArticle={setFormDataArticle} // Não é necessário aqui se você só passa o _id
                onArticleDeleted={fetchArticles} // Callback para recarregar artigos após a exclusão
                hideButton={true} // O botão interno do DeleteArticleComponent não será renderizado
            />
        </>
    );
}

export default Home;