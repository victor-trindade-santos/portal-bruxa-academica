export const cleanFormDataArticle = (setFormDataArticle) => {
  console.log("[formUtils] Limpando formDataArticle...");
  setFormDataArticle({
    id: null,
    title: '',
    author: '',
    publicationDate: new Date().toLocaleDateString("pt-BR"),
    imageArticle: null,
    firstContent: '',
    subtitle: '',
    secondContent: '',
    imageThumb: null,
    category: '',
  });
};
