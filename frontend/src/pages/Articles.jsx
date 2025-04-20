import React, { useState, useEffect } from 'react';
import axios from '../services/api'; 

function Articles() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    imageUrl: '',
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

  // Função para criar um novo artigo
  const createArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/articles', newArticle); // Envia os dados ao backend
      console.log('Artigo criado:', response.data);
      fetchArticles(); // Atualiza a lista após criar
      setNewArticle({ title: '', content: '', imageUrl: '', category: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Erro ao criar artigo:', error);
    }
  };

  return (
    <div>
      <h1>Criar Artigos</h1>
      <form onSubmit={createArticle}>
        <input
          type="text"
          placeholder="Título"
          value={newArticle.title}
          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Conteúdo"
          value={newArticle.content}
          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          required
        ></textarea>
        <input
          type="text"
          placeholder="URL da Imagem"
          value={newArticle.imageUrl}
          onChange={(e) => setNewArticle({ ...newArticle, imageUrl: e.target.value })}
        />
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
  );
}

export default Articles;
