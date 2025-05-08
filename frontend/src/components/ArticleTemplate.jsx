import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // ✅ correto
import axios from '../services/api'; // ✅ este é o axios configurado
import styles from "../css/ArticleTemplate.module.css";

const ArticleTemplate = ({ articleId, articleData }) => {
  const { articleId: routeId } = useParams(); // renomeia o parâmetro da rota

  const effectiveId = articleId || routeId; // prioridade para o prop

  const [article, setArticle] = useState(articleData || null);
  const [loading, setLoading] = useState(!articleData && !!effectiveId);

  useEffect(() => {
    console.log('articleData:', articleData, 'articleId:', effectiveId);

    if (!articleData && effectiveId){
    // 🔹 Se não houver dados diretos, busca no banco pelo ID
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/${effectiveId}`);
        setArticle(response.data);
        console.log('Dados recebidos do backend:', response.data);
        console.log('Conteúdo atual no estado:', article.firstContent);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar artigo:', error);
        setLoading(false);
      }
    };
    

    fetchArticle();
  }
  }, [articleId, articleData]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!article) {
    return <div>Artigo não encontrado</div>;
  }


  return (
    <div className={styles.sectionArticle}>
      <h1 className={styles.titleArticle}>
        {article.title}
      </h1>
      <p className={styles.textAuthor}>Por: {article.author}</p>
      <p className={styles.textPublicationDate}>Data de Publicação: {article.publicationDate}</p>
      <img src={article.imageArticle} className={styles.imageArticle} alt={article.title} />
      <p className={styles.textArticle} dangerouslySetInnerHTML={{__html: article.firstContent}} />
      <h2 className={styles.subtitleArticle}> {article.subtitle} </h2>
      <p className={styles.textArticle} dangerouslySetInnerHTML={{__html: article.secondContent}} />
    </div>
  );
};

export default ArticleTemplate;
