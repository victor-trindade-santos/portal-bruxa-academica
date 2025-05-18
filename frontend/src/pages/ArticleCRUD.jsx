import styles from '../css/ArticleCRUD.module.css'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../utils/quillEditor';
import SearchBar from '../components/Barra_Pesquisa.jsx'
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent.jsx';
import CreateArticleComponent from '../components/articleCRUDComponents/CreateArticleComponent.jsx';
import UpdateArticleComponent from '../components/articleCRUDComponents/UpdateArticleComponent.jsx';
import CleanArticleComponent from '../components/articleCRUDComponents/CleanArticleComponent.jsx';
import ViewArticleComponent from '../components/articleCRUDComponents/ViewArticleComponent.jsx';


function ArticleCRUD({ formDataArticle, setFormDataArticle }) {

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
              {/* TÍTULO */}
              <p className={styles.fieldDescription}><strong>Adicione um título *</strong> — Digite o título principal do artigo.</p>
              <input
                type="text"
                placeholder="Digite o título do Artigo"
                value={formDataArticle.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className={styles.titleArticle}
              />

              {/* AUTOR */}
              <p className={styles.fieldDescription}><strong>Nome do autor(a) *</strong> — Informe quem é o responsável pela autoria do artigo.</p>
              <input
                type="text"
                placeholder="Digite o nome do autor(a)"
                value={formDataArticle.author}
                onChange={(e) => handleChange('author', e.target.value)}
                required
                className={styles.textAuthor}
              />

              {/* DATA DE PUBLICAÇÃO */}
              <p className={styles.fieldDescription}><strong>Data de publicação</strong> — Data em que o artigo foi publicado (campo somente leitura).</p>
              <input
                type="text"
                placeholder="Data de publicação"
                value={formDataArticle.publicationDate}
                readOnly
                className={styles.textPublicationDate}
              />

              {/* PRIMEIRO CONTEÚDO */}
              <p className={styles.fieldDescription}><strong>Resumo ou introdução *</strong> — Digite um pequeno resumo ou introdução para o artigo.</p>
              <input
                type="text"
                placeholder="Digite o resumo ou introdução do Artigo"
                value={formDataArticle.firstContent}
                onChange={(e) => handleChange('firstContent', e.target.value)}
                required
                className={styles.textResume}
              />

              {/* CATEGORIA */}
              <p className={styles.fieldDescription}><strong>Categoria do artigo *</strong> — Escolha uma categoria que melhor descreva o tema do artigo.</p>
              <select
                value={formDataArticle.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
                className={styles.selectCategory}
              >
                <option value="">Escolha uma categoria</option>
                <option value="Numerologia">Numerologia</option>
                <option value="Magia">Magia</option>
                <option value="Astrologia">Astrologia</option>
                <option value="Tarot">Tarot</option>
              </select>

              {/* IMAGEM DA CAPA */}
              <p className={styles.fieldDescription}><strong>Imagem da capa / Thumbnail</strong> — Selecione uma imagem para ilustrar o artigo.</p>
              <label htmlFor="imageUpload" className={styles.fileInputLabel}>
                Selecionar imagem da capa
              </label>

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className={styles.fileInput}
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
                  src={
                    formDataArticle.imageThumb instanceof File
                      ? URL.createObjectURL(formDataArticle.imageThumb)
                      : formDataArticle.imageThumb
                  }
                  alt="Prévia da imagem"
                  className={styles.imageArticle}
                />
              )}


              {/* SEGUNDO CONTEÚDO RICH TEXT */}
              <p className={styles.fieldDescription}><strong>Conteúdo principal</strong> — Digite o conteúdo principal do artigo usando o editor abaixo.</p>
              <ReactQuill
                theme="snow"
                value={formDataArticle.secondContent}
                onChange={(value) => handleChange('secondContent', value)}
              />

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