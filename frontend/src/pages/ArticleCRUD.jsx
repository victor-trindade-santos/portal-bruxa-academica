import React, { useEffect } from 'react'; // ✅ Importe useEffect
import { useLocation } from 'react-router-dom'; // ✅ Importe useLocation
import axios from '../services/api'; // Certifique-se de ter seu axios configurado

import styles from '../css/ArticleCRUD.module.css'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../utils/quillEditor';
import SearchBar from '../components/Barra_Pesquisa.jsx'
import DeleteArticleComponent from '../components/articleCRUDComponents/DeleteArticleComponent.jsx';
import CreateArticleComponent from '../components/articleCRUDComponents/CreateArticleComponent.jsx';
import UpdateArticleComponent from '../components/articleCRUDComponents/UpdateArticleComponent.jsx';
import CleanArticleComponent from '../components/articleCRUDComponents/CleanArticleComponent.jsx';
import ViewArticleComponent from '../components/articleCRUDComponents/ViewArticleComponent.jsx';
import Container from '../components/Container.jsx'


function ArticleCRUD({ formDataArticle, setFormDataArticle }) {
  const location = useLocation(); 

  //Para atualizar os dados do FormDataArticle
  const handleChange = (field, value) => {
    setFormDataArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ Novo useEffect para carregar o artigo quando a página for acessada via edição
  useEffect(() => {
    // Verifica se há um articleId no estado da navegação
    if (location.state && location.state.articleId) {
      const articleId = location.state.articleId;
      console.log("ArticleCRUD: ID do artigo recebido para edição:", articleId);

      const fetchArticleToEdit = async () => {
        try {
          const response = await axios.get(`/articles/${articleId}`); // Ajuste sua rota de API se necessário
          const articleData = response.data;
          console.log("ArticleCRUD: Dados do artigo para edição:", articleData);

          // Preenche o formDataArticle com os dados do artigo
          setFormDataArticle({
            _id: articleData._id,
            title: articleData.title || '',
            author: articleData.author || '',
            publicationDate: articleData.publicationDate || '',
            firstContent: articleData.firstContent || '',
            category: articleData.category || '',
            imageThumb: articleData.imageThumb || '', // Se a imagem for uma URL ou dado que React pode renderizar
            secondContent: articleData.secondContent || '',
            // Adicione aqui outros campos que possam existir no seu artigo
            // Certifique-se de que o nome da propriedade corresponda ao que sua API retorna
          });
        } catch (error) {
          console.error('ArticleCRUD: Erro ao buscar artigo para edição:', error);
          // Opcional: Notifique o usuário sobre o erro
        }
      };

      fetchArticleToEdit();

      // Opcional: Limpar o estado de navegação após o uso para evitar recarregamento indesejado
      // ou para que a próxima visita à página não traga o ID antigo.
      // CUIDADO: Isso pode remover o ID antes que você o use em operações de update!
      // Considere limpá-lo apenas após um save ou clean explícito.
      // window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state, setFormDataArticle]); // Dependências do useEffect

  return (
    <>
    <Container>
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
                value={formDataArticle.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                required
                className={styles.titleArticle}
              />

              {/* AUTOR */}
              <p className={styles.fieldDescription}><strong>Nome do autor(a) *</strong> — Informe quem é o responsável pela autoria do artigo.</p>
              <input
                type="text"
                placeholder="Digite o nome do autor(a)"
                value={formDataArticle.author || ''}
                onChange={(e) => handleChange('author', e.target.value)}
                required
                className={styles.textAuthor}
              />

              {/* DATA DE PUBLICAÇÃO */}
              <p className={styles.fieldDescription}><strong>Data de publicação</strong> — Data em que o artigo foi publicado (campo somente leitura).</p>
              <input
                type="text"
                placeholder="Data de publicação"
                value={formDataArticle.publicationDate || ''}
                readOnly
                className={styles.textPublicationDate}
              />

              {/* PRIMEIRO CONTEÚDO */}
              <p className={styles.fieldDescription}><strong>Resumo ou introdução *</strong> — Digite um pequeno resumo ou introdução para o artigo.</p>
              <input
                type="text"
                placeholder="Digite o resumo ou introdução do Artigo"
                value={formDataArticle.firstContent || ''}
                onChange={(e) => handleChange('firstContent', e.target.value)}
                required
                className={styles.textResume}
              />

              {/* CATEGORIA */}
              <p className={styles.fieldDescription}><strong>Categoria do artigo *</strong> — Escolha uma categoria que melhor descreva o tema do artigo.</p>
              <select
                value={formDataArticle.category || ''}
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
                value={formDataArticle.secondContent || ''}
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
      </Container>
    </>
  );
}

export default ArticleCRUD;