import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import styles from '../css/ArticleCreator.module.css'
import 'react-quill/dist/quill.snow.css'; 
import ReactQuill from 'react-quill';   
import Barra_Pesquisa from '../components/Barra_Pesquisa'
import DeleteModal from '../components/Modal/DeleteModal.jsx';

function ArticleCreator() {

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  //limpar os formulários
  const today = new Date();
  const formattedDate = today.toLocaleDateString("pt-BR");
  const [newArticle, setNewArticle] = useState({
    id: null,
    title: '',
    author: '',
    publicationDate: formattedDate,
    imageArticle: null,
    firstContent: '',
    subtitle: '',
    secondContent: '',
    imageThumb: null,
    category: '',
  });

  const [firstContent, setFirstContent] = useState('');
  const [secondContent, setSecondContent] = useState('');

  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articles');
      setArticles(response.data);  // Certifique-se de que 'data' contém um array de artigos
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  //Visualizar o artigo
  //Verificando se a imagem é um arquivo ou URL

  const imageThumbTemporary = newArticle.imageThumb instanceof File
    ? URL.createObjectURL(newArticle.imageThumb) // Se for arquivo, cria um URL temporário
    : newArticle.imageThumb || ""; // Se for URL, mantém a URL original vinda do banco ou não tiver nada

  const imageArticleTemporary = newArticle.imageArticle instanceof File
    ? URL.createObjectURL(newArticle.imageArticle)
    : newArticle.imageArticle || ""; // Se for URL, mantém a URL original vinda do banco ou não tiver nada

  //Dados do artigo preenchidos pelo usuário coloquei a possiblidade dele deixar algum dado em branco ou não

  const articleTemporaryData = {
    title: newArticle.title || "",
    author: newArticle.author || "",
    publicationDate: newArticle.publicationDate || "",
    firstContent: firstContent || "",
    subtitle: newArticle.subtitle || "",
    secondContent: secondContent || "",
    category: newArticle.category || "",
    imageThumb: imageThumbTemporary,
    imageArticle: imageArticleTemporary,
  };

  //criando uma constante para enviar os dados temporários cadastrados para o ArticleTemplate
  const handlePreview = () => {
    localStorage.setItem("articlePreview", JSON.stringify(articleTemporaryData)); // ✅ Salva os dados temporariamente
  localStorage.setItem("previewMode", "true"); // 🔹 Flag para indicar pré-visualização
    window.open("/article-preview", "_blank"); //✅ Abre a pré-visualização em uma nova guia
  };
  console.log("🔹 Enviando dados para a pré-visualização:", articleTemporaryData);

  //Excluir o artigo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const openDeleteModal = (articleId) => {
    setArticleToDelete(articleId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setArticleToDelete(null);
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await fetch(`http://localhost:5000/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Se você estiver usando token de autenticação
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Atualiza a lista de artigos, removendo o excluído
        setArticles(articles.filter((article) => article._id !== articleId));
      } else {
        const errorData = await response.json();
        console.error('Erro ao excluir artigo:', errorData);
      }
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
    }
  };  

  //atualizar o artigo
  const updateArticle = async () => {
    if (!newArticle.id) {
      console.error("Nenhum artigo selecionado para atualização!");
      return;
    }

    console.log('Dados do artigo para atualizar:', newArticle);

    console.log("Iniciando atualização do artigo...");
    console.log("ID do artigo:", newArticle.id);

    const updatedData = new FormData();
    updatedData.append('title', newArticle.title);
    updatedData.append('author', newArticle.author);
    updatedData.append('publicationDate', newArticle.publicationDate);
    updatedData.append('subtitle', newArticle.subtitle);
    updatedData.append('category', newArticle.category);

    updatedData.append('firstContent', firstContent);
    updatedData.append('secondContent', secondContent);

    if (newArticle.imageArticle instanceof File) {
      console.log("imageArticle capturado no updateArticle:", newArticle.imageArticle);
      updatedData.append('imageArticle', newArticle.imageArticle);
    } else if (newArticle.imageArticle) {
      console.log("imageArticle capturado no updateArticle como uma URL:", newArticle.imageArticle);
      updatedData.append('imageArticle', newArticle.imageArticle);
    }

    if (newArticle.imageThumb instanceof File) {
      console.log("imageThumb capturado no updateArticle:", newArticle.imageThumb);
      updatedData.append('imageThumb', newArticle.imageThumb);
    } else if (newArticle.imageThumb) {
      console.log("imageThumb capturado no updateArticle como uma URL:", newArticle.imageThumb);
      updatedData.append('imageThumb', newArticle.imageThumb);
    }

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    // Inspecionar os dados que estão sendo enviados ao backend
    for (let pair of updatedData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.put(`/articles/${newArticle.id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      setNewArticle({
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
      setFirstContent(''); // Reseta o primeiro editor
      setSecondContent(''); // Reseta o segundo editor

      console.log("Artigo enviado para o backend para ser atualizado, resposta do servidor", response.data);
    } catch (error) {
      console.error("Erro ao atualizar o artigo:", error.response?.data || error.message);
    }
  }

  //criar o artigo
  const createArticle = async (e) => {
    e.preventDefault();

    console.log('Dados do artigo:', newArticle);

    const formData = new FormData();
    formData.append('title', newArticle.title);
    formData.append('author', newArticle.author);
    formData.append('publicationDate', newArticle.publicationDate);
    formData.append('subtitle', newArticle.subtitle);
    formData.append('category', newArticle.category);

    console.log('firstContent:', firstContent);
console.log('secondContent:', secondContent);

    // Pegando os valores dos editores individualmente
    formData.append('firstContent', firstContent);
    formData.append('secondContent', secondContent);

    // Verifica se é um arquivo e, se for, envia o arquivo
    if (newArticle.imageThumb instanceof File) {
      console.log('Imagem Thumb capturada:', newArticle.imageThumb);
      formData.append('imageThumb', newArticle.imageThumb);
    } else if (newArticle.imageThumb) {
      console.log('Imagem Thumb como URL:', newArticle.imageThumb);
      formData.append('imageThumb', newArticle.imageThumb); // Se for URL
    }

    // Verifica se é um arquivo e, se for, envia o arquivo
    if (newArticle.imageArticle instanceof File) {
      console.log('Imagem Article capturada:', newArticle.imageArticle);
      formData.append('imageArticle', newArticle.imageArticle);
    } else if (newArticle.imageArticle) {
      console.log('Imagem Article como URL:', newArticle.imageArticle);
      formData.append('imageArticle', newArticle.imageArticle);
    }

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    // Inspecionar os dados que estão sendo enviados ao backend
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Artigo enviado ao backend com sucesso:', response.data);

      setNewArticle({
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
      setFirstContent(''); // Reseta o primeiro editor
      setSecondContent(''); // Reseta o segundo editor

    } catch (error) {
      console.error('Erro ao criar artigo:', error.response.data);
    }
  };

  return (
    <>
      <div className={`row ${styles.rowPrincipal}`}>
        <h1>Criar Artigos</h1>
        <div className={styles.colInsideLeft}>
          <div className={styles.sectionArticle}>
            <form onSubmit={createArticle}>
              <input
                type="text"
                placeholder="Digite o título do Artigo"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                required
                className={styles.titleArticle}
              />
              <input
                type="text"
                placeholder="Digite o nome do autor(a)"
                value={newArticle.author}
                onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                required
                className={styles.textAuthor}
              />
              <input
                type="text"
                placeholder="Data de publicação"
                value={newArticle.publicationDate}
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
                    setNewArticle({ ...newArticle, imageArticle: file });
                  }
                }}
              />
              {newArticle.imageArticle && (
                <img
                  src={newArticle.imageArticle instanceof File
                    ? URL.createObjectURL(newArticle.imageArticle) // Exibe o arquivo carregado
                    : newArticle.imageArticle // Exibe a URL se for do backend
                  }
                  alt="Prévia da imagem"
                  className={styles.imageArticle}
                />
              )}
              <ReactQuill
                theme="snow"
                value={firstContent}
                onChange={setFirstContent}
                modules={modules}
                placeholder="Digite aqui o conteúdo"
                className={styles.textArticle}
              />

              <input
                type="text"
                placeholder="Digite o subtitulo do Artigo"
                value={newArticle.subtitle}
                onChange={(e) => setNewArticle({ ...newArticle, subtitle: e.target.value })}
                required
                className={styles.subtitleArticle}
              />
              <ReactQuill
                theme="snow"
                value={secondContent}
                onChange={setSecondContent}
                modules={modules}
                placeholder="Digite aqui o conteúdo"
                className={styles.textArticle}
              />
              <h1 className={styles.textArticle}>Selecione a image da capa do artigo/thumbnail</h1>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewArticle({ ...newArticle, imageThumb: file });
                  }
                }}
              />
              {newArticle.imageThumb && (
                <img
                  src={newArticle.imageThumb instanceof File
                    ? URL.createObjectURL(newArticle.imageThumb) // Exibe o arquivo carregado
                    : newArticle.imageThumb // Exibe a URL se for do backend
                  }
                  alt="Prévia da imagem"
                  className={styles.imageArticle}
                />
              )}
              <h1 className={styles.textArticle}>Selecione a categoria do artigo</h1>
              <select
                value={newArticle.category}
                onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                required
              >
                <option value="">Escolha uma categoria</option>
                <option value="Numerologia">Numerologia</option>
                <option value="Magia">Magia</option>
                <option value="Astrologia">Astrologia</option>
                <option value="Tarot">Tarot</option>
              </select>
            </form>

          </div>
        </div>

        <div className={styles.colInsideRight}>
          <Barra_Pesquisa
            onSelectArticle={(article) => {
              console.log('Artigo selecionado:', article);  // Verifique os dados do artigo

              setNewArticle({
                id: article._id,
                title: article.title || '',
                subtitle: article.subtitle || '',  // Se não tiver, deixe em branco
                author: article.author || '',      // Se não tiver, deixe em branco
                publicationDate: article.publicationDate || '',  // Se não tiver, deixe em branco
                imageArticle: article.imageUrl || '',  // Aqui está a imagem
                category: article.category || '',  // Categoria
                imageThumb: article.imageThumb || '',  // Imagem de capa (thumbnail)
              });

              // Preenche o conteúdo com o campo 'content' retornado
              setFirstContent(article.content || '');  // Preenchendo o conteúdo
              setSecondContent(article.content || ''); // Preenchendo o segundo conteúdo com o mesmo conteúdo
            }}
          />

          {!newArticle.id && (
            <button
              type="button"
              onClick={createArticle}
              className={styles.updateButton}
            >
              Criar Artigo
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setNewArticle({
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
              setFirstContent(''); // Reseta o primeiro editor
              setSecondContent(''); // Reseta o segundo editor
            }}
            className={styles.updateButton}
          >
            Limpar Formulário
          </button>

          {/* Botão fora do form */}
          {newArticle.id && (
            <button
              type="button"
              onClick={updateArticle}
              className={styles.updateButton}
            >
              Atualizar Artigo
            </button>
          )}

          <button
            type="button"
            onClick={handlePreview}
            className={styles.updateButton}
          >
            Visualizar Artigo
          </button>

          <br />

          {/* {newArticle.id && (
            <button
              type="button"
              onClick={() => {
                console.log('Botão Excluir Artigo clicado.');
                setIsModalDeleteOpen(true); // Abre o modal ao clicar no botão
              }}
              className={styles.updateButton}
            >
              Excluir Artigo
            </button>
          )} */}

          {/* Passamos a prop onConfirm (e não isConfirm) conforme a interface do DeleteModal */}
          <h2>Lista de Artigos</h2>
          {articles.length === 0 ? (
            <p>Nenhum artigo disponível.</p>
          ) : (
            <ul>
              {articles.map((article) => (
                <li key={article._id}>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <button onClick={() => openDeleteModal(article._id)}>Excluir</button>
                </li>
              ))}
            </ul>
          )}

          {/* Modal de confirmação de exclusão */}
          <DeleteModal
            isOpen={isModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteArticle}
            articleId={articleToDelete} // Passa o ID do artigo para exclusão
          />
        </div>
      </div>
    </>
  );
}

export default ArticleCreator;