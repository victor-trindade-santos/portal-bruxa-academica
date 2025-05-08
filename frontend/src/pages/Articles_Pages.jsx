import React, { useEffect } from 'react'; // ✅ precisa importar useEffect
import { useParams } from 'react-router-dom';
import styles from '../css/ArticlePage.module.css';
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import ArticleTemplate from '../components/ArticleTemplate'; // nome corrigido

function Article_Pages() {
  const { id } = useParams(); // captura o ID do artigo
  const previewMode = localStorage.getItem("previewMode") === "true";
  const articleTemporaryData = previewMode
    ? JSON.parse(localStorage.getItem("articlePreview"))
    : null;
  console.log("🔹 Dados da pré-visualização:", articleTemporaryData);
  console.log("ID sendo passado para ArticleTemplate:", id);


  useEffect(() => {
    // 🔹 Limpa o modo preview depois que o componente monta
    if (previewMode) {
      localStorage.removeItem("previewMode");
    }
  }, []);

  return (
    <>
      <div className={`row ${styles.rowPrincipal}`}>
        <div className={styles.colInsideLeft}>
          {/* ✅ Envia articleTemporaryData se existir, senão envia o ID */}
          <ArticleTemplate {...(articleTemporaryData ? { articleData: articleTemporaryData } : { articleId: id })} />
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
