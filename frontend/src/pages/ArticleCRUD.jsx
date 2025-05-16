import styles from '../css/ArticleCRUD.module.css'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import SearchBar from '../components/Barra_Pesquisa.jsx'
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent.jsx';
import CreateArticleComponent from '../components/articleCRUDComponents/CreateArticleComponent.jsx';
import UpdateArticleComponent from '../components/articleCRUDComponents/UpdateArticleComponent.jsx';
import CleanArticleComponent from '../components/articleCRUDComponents/CleanArticleComponent.jsx';
import ViewArticleComponent from '../components/articleCRUDComponents/ViewArticleComponent.jsx';


function ArticleCRUD({ formDataArticle, setFormDataArticle }) {
  //São as funcionalidades do editor de texto do REACT QUILL como negrito, hiperlink etc
  const modules = {
toolbar: [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote'],
  ['link']
]
  };

  //Para atualizar os dados do FormDataArticle
  const handleChange = (field, value) => {
    setFormDataArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <>
      <div className={`row ${styles.rowPrincipal}`}>
        <h1 className={styles.sectionTitle}>Criar Artigos</h1>
        <div className={styles.colInsideLeft}>
          <div className={styles.sectionArticle}>
            <div>
              <input
                type="text"
                placeholder="Digite o título do Artigo"
                value={formDataArticle.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className={styles.titleArticle}
              />
              <input
                type="text"
                placeholder="Digite o nome do autor(a)"
                value={formDataArticle.author}
                onChange={(e) => handleChange('author', e.target.value)}
                required
                className={styles.textAuthor}
              />
              <input
                type="text"
                placeholder="Data de publicação"
                value={formDataArticle.publicationDate}
                readOnly
                className={styles.textPublicationDate}
              />
              <h1 className={styles.textArticle}>Selecione a imagem do Artigo</h1>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormDataArticle(prev => ({
                      ...prev,
                      imageArticle: file
                    }));
                  }
                }}
              />
              {formDataArticle.imageArticle && (
                <img
                  src={formDataArticle.imageArticle instanceof File
                    ? URL.createObjectURL(formDataArticle.imageArticle) // Exibe o arquivo carregado
                    : formDataArticle.imageArticle // Exibe a URL se for do backend
                  }
                  alt="Prévia da imagem"
                  className={styles.imageArticle}
                />
              )}
              <ReactQuill
                theme="snow"
                value={formDataArticle.firstContent}
                onChange={(value) => handleChange('firstContent', value)}
                modules={modules}
              />
              <input
                type="text"
                placeholder="Digite o subtítulo do Artigo"
                value={formDataArticle.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                required
                className={styles.subtitleArticle}
              />
              <ReactQuill
                theme="snow"
                value={formDataArticle.secondContent}
                onChange={(value) => handleChange('secondContent', value)}
                modules={modules}
              />
              <h1 className={styles.textArticle}>Selecione a image da capa do artigo/thumbnail</h1>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormDataArticle(prev => ({
                      ...prev,
                      imageThumb: file
                    }));
                  }
                }}
              />
              {formDataArticle.imageThumb && (
                <img
                  src={formDataArticle.imageThumb instanceof File
                    ? URL.createObjectURL(formDataArticle.imageThumb) // Exibe o arquivo carregado
                    : formDataArticle.imageThumb // Exibe a URL se for do backend
                  }
                  alt="Prévia da imagem"
                  className={styles.imageArticle}
                />
              )}
              <h1 className={styles.textArticle}>Selecione a categoria do artigo</h1>
              <select
                value={formDataArticle.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
              >
                <option value="">Escolha uma categoria</option>
                <option value="Numerologia">Numerologia</option>
                <option value="Magia">Magia</option>
                <option value="Astrologia">Astrologia</option>
                <option value="Tarot">Tarot</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.colInsideRight}>

          <SearchBar
            onSelectArticle={(selectedArticle) => {
              console.log('🟢 Artigo selecionado na SearchBar:', selectedArticle);
              setFormDataArticle({
                _id: selectedArticle._id, // ID necessário para a atualização
                title: selectedArticle.title,
                author: selectedArticle.author,
                publicationDate: selectedArticle.publicationDate,
                imageArticle: selectedArticle.imageArticle, // Pode ser File ou URL
                firstContent: selectedArticle.firstContent,
                subtitle: selectedArticle.subtitle,
                secondContent: selectedArticle.secondContent,
                imageThumb: selectedArticle.imageThumb,
                category: selectedArticle.category,
              });
            }}
          />

          <CreateArticleComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
          />

          <CleanArticleComponent
            setFormDataArticle={setFormDataArticle}
          />

          <ViewArticleComponent
            formDataArticle={formDataArticle}
          />

          {formDataArticle._id && (
            <>
              <UpdateArticleComponent
                formDataArticle={formDataArticle}
                setFormDataArticle={setFormDataArticle}
              />

              <DeleteArticleComponent
                formDataArticle={formDataArticle}
                setFormDataArticle={setFormDataArticle}
              />
            </>
          )}
          
        </div>
      </div>
    </>
  );
}

export default ArticleCRUD;