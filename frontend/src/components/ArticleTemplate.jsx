import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // ✅ correto
import axios from '../services/api'; // ✅ este é o axios configurado
import styles from "../css/ArticleTemplate.module.css";
import 'react-quill/dist/quill.snow.css';

const ArticleTemplate = ({ articleId, articleData }) => {
  const { articleId: routeId } = useParams(); // renomeia o parâmetro da rota

  const effectiveId = articleId || routeId; // prioridade para o prop

  const [article, setArticle] = useState(articleData || null);
  const [loading, setLoading] = useState(!articleData && !!effectiveId);

  useEffect(() => {
    console.log('articleData:', articleData, 'articleId:', effectiveId);

    if (!articleData && effectiveId) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`/articles/${effectiveId}`);
          setArticle(response.data);
          console.log('Dados recebidos do backend:', response.data);
          setLoading(false);
        } catch (error) {
          console.error('Erro ao buscar artigo:', error);
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [articleId, articleData]);

  useEffect(() => {
    if (article) {
      console.log('Conteúdo atual no estado:', article.firstContent);
    }
  }, [article]);

  return (
    <div className={styles.sectionArticle}>
      {article ? (
        <>
          <h1 className={styles.titleArticle}>{article.title}</h1>
          <p className={styles.textResume}>{article.firstContent}</p>
          <p className={styles.textAuthor}>Por: {article.author}</p>
          <p className={styles.textPublicationDate}>Data de Publicação: {article.publicationDate}</p>
          <div className={`ql-editor ${styles.textArticle}`} dangerouslySetInnerHTML={{ __html: article.secondContent }} />
        </>
      ) : (
        <div>Artigo não encontrado</div>
      )}
    </div>
  );

};

export default ArticleTemplate;
