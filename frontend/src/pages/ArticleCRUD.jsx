import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../services/api';

import styles from '../css/ArticleCRUD.module.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from '../utils/quillEditor';
import SearchBar from '../components/Barra_Pesquisa.jsx';
import ListDraftsComponent from '../components/articleCRUDComponents/ListDraftsComponent.jsx';
import ArticleActionButtons from '../components/articleCRUDComponents/ArticleActionButtons.jsx'; // Continua importando o componente de botões
import Container from '../components/Container.jsx';


function ArticleCRUD({ formDataArticle, setFormDataArticle }) {
  const location = useLocation();

  const getPageTitle = () => {
    // Se não há _id, é um novo artigo/rascunho
    if (!formDataArticle._id) {
      return "Criar Artigo ou Rascunho";
    }
    // Se tem _id e é um rascunho
    if (formDataArticle._id && formDataArticle.isDraft) {
      return "Atualizar ou Publicar Rascunho";
    }
    // Se tem _id e NÃO é um rascunho (é um artigo publicado)
    if (formDataArticle._id && !formDataArticle.isDraft) {
      return "Atualizar Artigo Publicado";
    }
    // Fallback (caso raro, mas para garantir)
    return "Gerenciar Artigos";
  };

  const handleChange = (field, value) => {
    setFormDataArticle(prev => ({
      ...prev,
      [field]: (field === 'category' && value === '') ? '' : value
    }));
  };

  useEffect(() => {
    if (location.state && location.state.articleId) {
      const articleId = location.state.articleId;
      console.log("ArticleCRUD: ID do artigo recebido para edição:", articleId);

      const fetchArticleToEdit = async () => {
        try {
          const response = await axios.get(`/articles/${articleId}`);
          const articleData = response.data;
          console.log("ArticleCRUD: Dados do artigo para edição:", articleData);

          setFormDataArticle({
            _id: articleData._id,
            title: articleData.title || '',
            author: articleData.author || '',
            publicationDate: articleData.publicationDate || '',
            firstContent: articleData.firstContent || '',
            category: articleData.category || '',
            imageThumb: articleData.imageThumb || '',
            secondContent: articleData.secondContent || '',
            isDraft: articleData.isDraft,
          });
        } catch (error) {
          console.error('ArticleCRUD: Erro ao buscar artigo para edição:', error);
        }
      };

      fetchArticleToEdit();
    }
  }, [location.state, setFormDataArticle]);

  return (
    <>
      <Container>
        <div className={`row ${styles.rowPrincipal}`}>
          <div className={styles.colInsideLeft}>

            <div className={styles.sectionArticle}>
              <h2 className={styles.sectionTitle}>{getPageTitle()}</h2>
              <hr className={styles.titleDivider} />
              <div>

                <p className={styles.fieldDescription}><strong>Adicione um título *</strong> — Digite o título principal do artigo.</p>
                <input
                  type="text"
                  placeholder="Digite o título do Artigo"
                  value={formDataArticle.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                  className={styles.formInput} // <-- CLASSE PADRONIZADA AQUI
                />

                <p className={styles.fieldDescription}><strong>Nome do autor(a) *</strong> — Informe quem é o responsável pela autoria do artigo.</p>
                <input
                  type="text"
                  placeholder="Digite o nome do autor(a)"
                  value={formDataArticle.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  required
                  className={styles.formInput} // <-- CLASSE PADRONIZADA AQUI
                />

                <p className={styles.fieldDescription}>
                  <strong>Data de publicação</strong> — Data e hora em que o artigo foi publicado (campo somente leitura).
                  {formDataArticle.isDraft && formDataArticle._id ? ' (Rascunho não publicado)' : ''}
                </p>
                <input
                  type="text"
                  placeholder="Ainda não publicado"
                  value={formDataArticle.publicationDate
                    ? new Date(formDataArticle.publicationDate).toLocaleString('pt-BR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })
                    : 'Ainda não publicado'
                  }
                  readOnly
                  className={`${styles.formInput} ${styles.formInputSmall}`}
                />

                <p className={styles.fieldDescription}><strong>Resumo ou introdução *</strong> — Digite um pequeno resumo ou introdução para o artigo.</p>
                <input
                  type="text"
                  placeholder="Digite o resumo ou introdução do Artigo"
                  value={formDataArticle.firstContent || ''}
                  onChange={(e) => handleChange('firstContent', e.target.value)}
                  required
                  className={styles.formInput} // <-- CLASSE PADRONIZADA AQUI
                />

                <p className={styles.fieldDescription}><strong>Categoria do artigo *</strong> — Escolha uma categoria que melhor descreva o tema do artigo.</p>
                <select
                  value={formDataArticle.category || ''}
                  onChange={(e) => handleChange('category', e.target.value)}
                  required
                  className={`${styles.formInput} ${styles.formInputSmall}`}
                >
                  <option value="">Escolha uma categoria</option>
                  <option value="Numerologia">Numerologia</option>
                  <option value="Magia">Magia</option>
                  <option value="Astrologia">Astrologia</option>
                  <option value="Tarot">Tarot</option>
                </select>




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

                        {/* Contêiner para imagem e botão */}
                        {formDataArticle.imageThumb && (
                            <div className={styles.imagePreviewContainer}>
                                <img
                                    src={
                                        formDataArticle.imageThumb instanceof File
                                            ? URL.createObjectURL(formDataArticle.imageThumb)
                                            : formDataArticle.imageThumb
                                    }
                                    alt="Prévia da imagem"
                                    className={styles.imageArticle}
                                />
                                {/* CONDIÇÃO DO BOTÃO ALTERADA AQUI: */}
                                <button // O typeof é removido, basta verificar se imageThumb existe
                                    onClick={() => handleChange('imageThumb', '')}
                                    className={styles.deleteButton}
                                >
                                    <i className={`bi bi-x ${styles.deleteIcon}`}></i>
                                </button>
                            </div>
                        )}

                <p className={styles.fieldDescription}><strong>Conteúdo principal</strong> — Digite o conteúdo principal do artigo usando o editor abaixo.</p>
                <p></p>
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
                  _id: selectedArticle._id,
                  title: selectedArticle.title,
                  author: selectedArticle.author,
                  publicationDate: selectedArticle.publicationDate,
                  firstContent: selectedArticle.firstContent,
                  secondContent: selectedArticle.secondContent,
                  imageThumb: selectedArticle.imageThumb,
                  category: selectedArticle.category,
                  isDraft: selectedArticle.isDraft,
                });
              }}
            />
            <p></p>
            {/* Renderiza os botões de ação dinamicamente */}
            <ArticleActionButtons
              formDataArticle={formDataArticle}
              setFormDataArticle={setFormDataArticle}
            />

            {/* NOVO COMPONENTE DE LISTAGEM DE RASCUNHOS */}
            <ListDraftsComponent
              setFormDataArticle={setFormDataArticle}
              editingArticleId={formDataArticle._id}
            />
          </div>
        </div>
        <p></p>
      </Container>
    </>
  );
}

export default ArticleCRUD;