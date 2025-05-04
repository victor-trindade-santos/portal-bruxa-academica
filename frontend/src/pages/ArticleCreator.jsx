import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import styles from '../css/ArticleCreator.module.css'
import 'react-quill/dist/quill.snow.css'; // isso vai no topo do arquivo
import ReactQuill from 'react-quill';     // importação do componente
import BarraPesquisa from '../components/Barra_Pesquisa'

function ArticleCreator() {


  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    author: '',
    publicationDate: '',
    imageArticle: null,
    firstContent: '',
    subtitle: '',
    secondContent: '',
    imageThumb: null,
    category: '',
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  // Função para buscar artigos 
  const fetchArticles = async () => {
    try {
      const response = await axios.get('/articles'); // Busca todos os artigos
      setArticles(response.data);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    }
  };

  //função de data atual
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR"); // exemplo: "04/05/2025"
    setNewArticle((prev) => ({ ...prev, publicationDate: formattedDate }));
  }, []);

  const createArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newArticle.title);
    formData.append('author', newArticle.author);
    formData.append('publicationDate', newArticle.publicationDate);
    formData.append('firstContent', newArticle.firstContent);
    formData.append('subtitle', newArticle.subtitle);
    formData.append('secondContent', newArticle.secondContent);
    formData.append('category', newArticle.category);
    formData.append('imageThumb', newArticle.imageThumb); // Agora enviando o arquivo
    formData.append('imageArticle', newArticle.imageArticle); // Agora enviando o arquivo

    console.log(newArticle.publicationDate); // Verifique o valor de publicationDate

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    try {
      const response = await axios.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Ensure token is added to headers
        },
      });

      console.log('Artigo enviado ao backend com sucesso:', response.data);
      // Resetar o formulário
      setNewArticle({
        title: '',
        author: '',
        publicationDate: '',
        firstContent: '',
        subtitle: '',
        secondContent: '',
        category: '',
        imageThumb: null,
        imageArticle: null,
      });
    } catch (error) {
      console.error('Erro ao criar artigo:', error.response.data); // Log the response data
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
                  src={URL.createObjectURL(newArticle.imageArticle)}
                  alt="Prévia da imagem"
                  className={styles.imageArticle}
                />
              )}
              <ReactQuill
                theme="snow"
                value={newArticle.firstContent}
                onChange={(content) =>
                  setNewArticle({ ...newArticle, firstContent: content })
                }
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
                value={newArticle.secondContent}
                onChange={(content) => setNewArticle({ ...newArticle, secondContent: content })}
                modules={modules}
                placeholder="Digite aqui o conteúdo"
                className={`${styles.textArticle} custom-quill`} // Adicionando uma nova classe
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
                  src={URL.createObjectURL(newArticle.imageThumb)}
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
                <option value="numerologia">Numerologia</option>
                <option value="magia">Magia</option>
                <option value="astrologia">Astrologia</option>
                <option value="tarot">Tarot</option>
              </select>
              <button type="submit">Criar Artigo</button>
            </form>
          </div>
        </div>
        <div className={styles.colInsideRight}>
          <BarraPesquisa />
        </div>

        <h2>Lista de Artigos</h2>
        {articles.length === 0 ? (
          <p>Nenhum artigo disponível.</p>
        ) : (
          <ul>
            {articles.map((article) => (
              <li key={article._id}>
                <h3>{article.title}</h3>
                <p><strong>Categoria:</strong> {article.category}</p>
                {article.imageUrl && (
                  <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '200px' }} />
                )}
                <p>{article.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>


    </>

  );
}

export default ArticleCreator;
