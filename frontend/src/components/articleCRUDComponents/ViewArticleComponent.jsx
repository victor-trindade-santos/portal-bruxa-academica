import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";

const ViewArticleComponent = ({ formDataArticle, buttonText, buttonIcon, buttonClass }) => {

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
    <button
       onClick={handlePreview} 
      className={`${styles.componentButton} ${buttonClass}`}
    >
      {buttonIcon} {/* Ícone passado via props */}
      {buttonText} {/* Texto passado via props */}
    </button>
  );
};

export default ViewArticleComponent;