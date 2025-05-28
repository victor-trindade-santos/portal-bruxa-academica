// src/pages/Magia.jsx
import React, { useState, useEffect, useContext, useRef } from 'react'; // Importe useContext e useRef
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import axios from '../services/api';

import Card from '../components/Card';
import styles from '../css/Magia.module.css';
import Container from '../components/Container';
import magia from '../img/magia.jpeg';
import { truncateDescription } from '../utils/descriptionUtils';
import { AuthContext } from '../context/AuthContext'; // Importe o AuthContext

// Importe o DeleteArticleComponent
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent';

function Magia() {
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
            const response = await axios.get('/articles?category=magia');
            const sorted = response.data.sort(
                (a, b) => {
                    const parseDate = (str) => {
                        if (!str) return new Date(0);
                        const [dia, mes, ano] = str.split('/');
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
        console.log("Magia: Botão de editar clicado para o ID:", articleId);
        navigate(`/create-articles-d42f4c`, { state: { articleId: articleId } });
    };

    // Função para iniciar o processo de exclusão (chamada pelo Card)
    const handleInitiateDelete = (articleId) => {
        console.log("Magia: handleInitiateDelete chamado com ID:", articleId);
        setArticleToDeleteId(articleId); // Armazena o ID do artigo a ser deletado
        setFormDataArticle(prev => ({ // Atualiza formDataArticle para o modal
            ...prev,
            _id: articleId
        }));

        // Abre o modal de exclusão via ref
        if (deleteArticleModalRef.current) {
            deleteArticleModalRef.current.handleOpenModal();
        } else {
            console.warn("Magia: deleteArticleModalRef.current ainda é null. O componente DeleteArticleComponent pode não ter sido montado ainda.");
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
                    <div className={styles.magiaIntroSection}>
                        <h2 className={styles.sectionTitle}>Magia</h2>

                        <div className={styles.introWithImage}>
                            <img
                                src={magia}
                                alt="Representação de magia"
                                className={styles.introImage}
                            />
                            <p className={styles.magiaDescription}>
                                A magia é a arte de influenciar energias e realidades através da vontade, símbolos e rituais. Ela conecta o visível e o invisível para transformar aspectos da vida cotidiana.
                            </p>
                        </div>

                        <div className={styles.magiaSubtopics}>
                            <div className={styles.subtopic}>
                                <h3>O que é magia?</h3>
                                <p>
                                    Magia é uma prática ancestral que utiliza rituais, objetos simbólicos e intenções para canalizar forças sutis com o objetivo de provocar mudanças.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Tipos de magia</h3>
                                <p>
                                    Existem diversos tipos, como magia natural, cerimonial, simpática e do caos, cada uma com suas técnicas e filosofias.
                                </p>
                            </div>

                            <div className={styles.subtopic}>
                                <h3>Aplicações mágicas</h3>
                                <p>
                                    A magia pode ser usada para proteção, cura, prosperidade, amor e crescimento espiritual, sempre com responsabilidade e ética.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.articleSection}>
                        <h2 className={styles.sectionTitle}>Artigos de Magia</h2>
                        <p className={styles.sectionDescription}>&#9733;Aprofunde seus conhecimentos com conteúdos exclusivos.&#9733;</p>
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
                                        category={article.category || "#Magia"}
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

export default Magia;