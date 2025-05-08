import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from '../css/ArticlePage.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import ArticleTemplate from '../components/ArticleTemplate'; 
import BreadCrumb from '../components/BreadCrumb';

function Article_Pages() {
  const { id } = useParams(); // captura o ID do artigo

  const location = useLocation(); // Captura a localização atual da URL
  const queryParams = new URLSearchParams(location.search);
  const rawCategory = queryParams.get('categoria'); // Obtém o valor da categoria da URL

  // Formata a categoria com a primeira letra maiúscula
  const formatCategory = (category) => {
    if (!category) return ''; // Caso não exista categoria
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const category = formatCategory(rawCategory); // Aqui formatamos a categoria

  const previewMode = localStorage.getItem("previewMode") === "true";
  const articleTemporaryData = previewMode
    ? JSON.parse(localStorage.getItem("articlePreview"))
    : null;

  const [articleData, setArticleData] = useState(null);

  console.log("🔹 Dados da pré-visualização:", articleTemporaryData);
  console.log("ID sendo passado para ArticleTemplate:", id);
  console.log("Categoria capturada da URL:", category); // Verifique se a categoria está sendo capturada corretamente

  useEffect(() => {
    // Limpa o modo preview depois que o componente monta
    if (previewMode) {
      localStorage.removeItem("previewMode");
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
        })
        .catch(err => console.error("Erro ao buscar artigo:", err));
    }
  }, [id, previewMode]);  

  return (
    <>
      <div className={`row ${styles.rowPrincipal}`}>
        <div className={styles.colInsideLeft}>
          {/* Exibe o breadcrumb com base na categoria e no título do artigo */}
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
          {/* Envia articleTemporaryData se existir, senão envia o ID */}
          <ArticleTemplate
            {...(articleTemporaryData
              ? { articleData: articleTemporaryData }
              : articleData
                ? { articleData }
                : { articleId: id })}
          />
        </div>
        <div className={styles.colInsideRight}>
          <Barra_Pesquisa />
          <Barra_Categoria />
          <Sobre_Mim_Lateral />
        </div>
      </div>
      <br />
    </>
  );
}

export default Article_Pages;
