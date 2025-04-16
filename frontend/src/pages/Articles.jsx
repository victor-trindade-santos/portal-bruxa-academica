import React, { useState } from 'react';
import axios from '../services/api'; 

function Articles() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    imageUrl: '',
    category: '', 
  });

  // Função para buscar artigos (caso necessário)
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
        </select>
        <button type="submit">Criar Artigo</button>
      </form>
    </div>
  );
}

export default Articles;
