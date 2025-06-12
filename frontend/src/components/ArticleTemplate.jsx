import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import styles from "../css/ArticleTemplate.module.css";
import 'react-quill/dist/quill.snow.css';

const ArticleTemplate = ({ articleId, articleData }) => {
  const { articleId: routeId } = useParams();
  const effectiveId = articleId || routeId;

  const [article, setArticle] = useState(articleData || null);
  const [loading, setLoading] = useState(!articleData && !!effectiveId);
  const [fontSize, setFontSize] = useState(16); // Estado para controlar o tamanho da fonte inicial

  const minFontSize = 14; // Tamanho mínimo da fonte
  const maxFontSize = 24; // Tamanho máximo da fonte
  const step = 2; // Incremento/decremento do tamanho da fonte

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
  }, [articleId, articleData, effectiveId]);

  useEffect(() => {
    if (article) {
      console.log('Conteúdo atual no estado:', article.firstContent);
    }
  }, [article]);

  // Funções para aumentar e diminuir a fonte
  const increaseFontSize = () => {
    setFontSize((prevSize) => Math.min(prevSize + step, maxFontSize));
  };

  const decreaseFontSize = () => {
    // CORREÇÃO AQUI: Usamos Math.max para garantir que não vá abaixo do mínimo
    setFontSize((prevSize) => Math.max(prevSize - step, minFontSize));
  };

  return (
    <div className={styles.sectionArticle}>
      <div className={styles.fontSizeControls}>
        <button onClick={decreaseFontSize} disabled={fontSize === minFontSize}>A-</button>
        <button onClick={increaseFontSize} disabled={fontSize === maxFontSize}>A+</button>
      </div>

      {article ? (
        <>
          <h1 className={styles.titleArticle} style={{ fontSize: `${fontSize * 1.5}px` }}>{article.title}</h1>
          <p className={styles.textResume} style={{ fontSize: `${fontSize}px` }}>{article.firstContent}</p>
          <p className={styles.textAuthor} style={{ fontSize: `${fontSize * 0.9}px` }}>Por: {article.author}</p>
<p className={styles.textPublicationDate} style={{ fontSize: `${fontSize * 0.9}px` }}>
  Data de Publicação:{' '}
  {article.publicationDate &&
    new Date(article.publicationDate).toLocaleDateString('pt-BR')}
</p>
          <div
            className={`ql-editor ${styles.textArticle}`}
            dangerouslySetInnerHTML={{ __html: article.secondContent }}
            style={{ fontSize: `${fontSize}px` }}
          />
        </>
      ) : (
        <div>Artigo não encontrado</div>
      )}
    </div>
  );
};

export default ArticleTemplate;