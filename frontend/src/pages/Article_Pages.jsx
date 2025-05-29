import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from '../css/ArticlePage.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import ArticleTemplate from '../components/ArticleTemplate';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Card from '../components/Card'; 
import { truncateDescription } from '../utils/descriptionUtils';

function Article_Pages() {
  const { id } = useParams();
  const location = useLocation();
  const previewDataFromLocation = location.state?.articleData;

  const queryParams = new URLSearchParams(location.search);
  const rawCategory = queryParams.get('categoria');

  const formatCategory = (category) => {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const category = formatCategory(rawCategory);

  const previewMode = localStorage.getItem("previewMode") === "true";
  const previewDataFromLocalStorage = previewMode
    ? JSON.parse(localStorage.getItem("articlePreview"))
    : null;

  const articleTemporaryData = previewDataFromLocation || previewDataFromLocalStorage;

  const [articleData, setArticleData] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    if (previewMode) {
      localStorage.removeItem("previewMode");
      localStorage.removeItem("articlePreview");
    }
  }, []);

  useEffect(() => {
    if (!previewMode && id) {
      fetch(`http://localhost:5000/articles/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Erro na requisição: ' + res.statusText);
          }
          return res.json();
        })
        .then(data => {
          setArticleData(data);

          // Depois que pegar o artigo, busca relacionados pela categoria do artigo
          if (data.category) {
            fetch(`http://localhost:5000/articles?category=${data.category}`)
              .then(res => res.json())
              .then(related => {
                // Filtra para não mostrar o artigo atual
                const filtered = related.filter(a => a._id !== id);
                setRelatedArticles(filtered);
              })
              .catch(err => console.error('Erro ao buscar artigos relacionados:', err));
          }
        })
        .catch(err => console.error("Erro ao buscar artigo:", err));
    }
  }, [id, previewMode]);

  return (
    <>
      <Container>
        <div className={`row ${styles.rowPrincipal}`}>
          <div className={styles.colInsideLeft}>
            <BreadCrumb
              articleTitle={
                articleTemporaryData?.title ||
                articleData?.title ||
                "Carregando..."
              }
              categoryName={
                articleTemporaryData?.category ||
                articleData?.category ||
                category || "Categoria"
              }
            />
            <ArticleTemplate
              {...(articleTemporaryData
                ? { articleData: articleTemporaryData }
                : articleData
                  ? { articleData }
                  : { articleId: id })}
            />

            {/* Seção de Artigos Relacionados */}
            {relatedArticles.length > 0 && (
              <section className={styles.relatedSection}>
                <h2>Artigos Relacionados</h2>
                <div className={styles.relatedContainer}>
                  {relatedArticles.map(article => (
                    <Card
                      key={article._id}
                      image={article.imageThumb}
                      title={truncateDescription(article.title, 15)}
                      description={truncateDescription(article.firstContent, 40)}
                      link={`/artigos/${article._id}`}
                      category={`#${article.category}`}
                      type="artigo"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className={styles.colInsideRight}>
            <Barra_Pesquisa />
            <Barra_Categoria />
            <Sobre_Mim_Lateral />
          </div>
        </div>
      </Container>
      <br />
    </>
  );
}

export default Article_Pages;
