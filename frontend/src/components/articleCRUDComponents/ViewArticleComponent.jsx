import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

const ViewArticleComponent = ({ formDataArticle }) => {

  const handlePreview = () => {
    console.log('👁️ Visualizando prévia do artigo com os dados:');
    console.log(formDataArticle);

      // Salva os dados para visualização
    localStorage.setItem("previewMode", "true");
    localStorage.setItem("articlePreview", JSON.stringify(formDataArticle));
    
    // Abre em nova aba
    window.open('/preview-article', '_blank');
  };

  return (
    <button onClick={handlePreview} className={styles.componentButton}>
      Visualizar Artigo
    </button>
  );
};

export default ViewArticleComponent;