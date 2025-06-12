// src/pages/Tarot.jsx
import React, { useState, useEffect, useContext, useRef } from 'react'; // Importe useContext e useRef
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import axios from '../services/api';

import Tiragem from '../components/tarotTest/TarotTest';
import ResultTiragem from '../components/tarotTest/ResultTarotTest';
import Card from '../components/Card';
import styles from '../css/Tarot.module.css';
import Container from '../components/Container';
import tarot from '../img/tarot.jpeg';
import { truncateDescription } from '../utils/descriptionUtils';
import { AuthContext } from '../context/AuthContext'; // Importe o AuthContext

// Importe o DeleteArticleComponent
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent';

function Tarot() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para o modal de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Embora não seja usado diretamente para renderização condicional aqui, pode ser útil para depuração
    const [articleToDeleteId, setArticleToDeleteId] = useState(null);
    // Este formDataArticle será usado apenas para passar o _id para o DeleteArticleComponent
    const [formDataArticle, setFormDataArticle] = useState({ _id: '' });

    const { user } = useContext(AuthContext); // Use o AuthContext
    const isAdmin = user?.role === 'admin'; // Verifique se o usuário é admin
    const navigate = useNavigate(); // Inicialize useNavigate

    // Ref para o DeleteArticleComponent (para chamar handleOpenModal)
    const deleteArticleModalRef = useRef(null);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/articles?category=tarot');
            const sorted = response.data.sort(
                (a, b) => {
                    const parseDate = (str) => {
                        if (!str) return new Date(0);
                        const [dia, mes, ano] = str.split('/');
                        // Garante o formato YYYY-MM-DD para Date
                        return new Date(`${ano}-${mes}-${dia}`);
                    };
                    return parseDate(b.publicationDate) - parseDate(a.publicationDate);
                }
            );
            setArticles(sorted.slice(0, 4));
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar artigos:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // --- Funções para Gerenciamento de Artigos (Editar/Deletar) ---

    // Função para iniciar a edição
    const handleEditArticle = (articleId) => {
        console.log("Tarot: Botão de editar clicado para o ID:", articleId);
        navigate(`/create-articles-d42f4c`, { state: { articleId: articleId } });
    };

    // Função para iniciar o processo de exclusão (chamada pelo Card)
    const handleInitiateDelete = (articleId) => {
        console.log("Tarot: handleInitiateDelete chamado com ID:", articleId);
        setArticleToDeleteId(articleId); // Armazena o ID do artigo a ser deletado
        setFormDataArticle(prev => ({ // Atualiza formDataArticle para o modal
            ...prev,
            _id: articleId
        }));

        // Abre o modal de exclusão via ref
        if (deleteArticleModalRef.current) {
            deleteArticleModalRef.current.handleOpenModal();
        } else {
            console.warn("Tarot: deleteArticleModalRef.current ainda é null. O componente DeleteArticleComponent pode não ter sido montado ainda.");
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


    return (
        <>
            <Container>
                <div className="pageContentWithoutHero">
                    <div className={styles.tarotIntroSection}>
                        <h2 className={styles.sectionTitle}>Tarot</h2>

                        <div className={styles.introWithImage}>
                            <img
                                src={tarot}
                                alt="Cartas de Tarô"
                                className={styles.introImage}
                            />
                            <p className={styles.tarotDescription}>
                                O Tarô é um sistema simbólico composto por cartas que auxiliam na reflexão, autoconhecimento e orientação espiritual, revelando aspectos ocultos da vida.
                            </p>
                        </div>

                        <div className={styles.tarotSubtopics}>
                            <div className={styles.subtopic}>
                                <h3>O que é o Tarô?</h3>
                                <p>
                                    O Tarô é um oráculo composto por 78 cartas que representam arquétipos e etapas da jornada humana, usado para interpretação simbólica e aconselhamento.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Arcanos Maiores e Menores</h3>
                                <p>
                                    Os Arcanos Maiores tratam de grandes lições espirituais, enquanto os Menores abordam situações cotidianas, organizados em quatro naipes.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Uso do Tarô</h3>
                                <p>
                                    Utilizado para orientação, meditação e insights, o Tarô não prevê o futuro de forma fixa, mas auxilia na tomada de decisões e clareza emocional.
                                </p>
                            </div>
                        </div>
                    </div>
                    {user && (
                         <Tiragem />
                    )}

                    <div className={styles.articleSection}>
                        <h2 className={styles.sectionTitle}>Artigos de Tarô</h2>
                        <p className={styles.sectionDescription}>&#9733;Explore o universo simbólico do Tarô com nossos artigos.&#9733;</p>
                        {loading ? (
                            <p>Carregando artigos...</p>
                        ) : articles.length === 0 ? (
                            <div className={styles.emptyWrapper}>
                                <p>Nenhum artigo encontrado. Volte mais tarde para mais conteúdos</p>
                            </div>
                        ) : (
                            <div className={styles.cardContainer}>
                                {articles.map((article) => ( // Removi 'index' se _id já é único e usado como key
                                    <Card
                                        key={article._id} // Use _id como key
                                        _id={article._id} // Passe o _id para o Card
                                        image={article.imageThumb}
                                        title={truncateDescription(article.title, 20)}
                                        description={truncateDescription(article.firstContent, 65)}
                                        link={`/artigos/${article._id}`}
                                        category={article.category || "#Tarot"}
                                        type="artigo"
                                        // Passe as funções de callback para o Card se for admin
                                        onEditClick={isAdmin ? handleEditArticle : undefined}
                                        onDeleteClick={isAdmin ? handleInitiateDelete : undefined}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
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

export default Tarot;