import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../services/api';
import styles from '../css/ArticlePage.module.css'; // ajuste o caminho se necessário

function Article_Pages() {
  const { id } = useParams(); // substitui useRouter do Next.js
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar o artigo com base no ID
  const fetchArticle = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token enviado:', token);  // Log do token enviado
      console.log('ID do artigo:', id); // Log do ID para garantir que está correto

      const response = await axios.get(`/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Adiciona o token no cabeçalho
        },
      });

      setArticle(response.data);
    } catch (error) {
      console.error('Erro ao buscar artigo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usando useEffect para chamar a função de buscar o artigo assim que o ID for definido
  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]); // O efeito será acionado sempre que o `id` mudar

  // Condições de carregamento e erro
  if (loading) return <p>Carregando artigo...</p>;
  if (!article) return <p>Artigo não encontrado.</p>;

  return (
    <div className={styles.articleContainer}>
      <h1>{article.title}</h1>
      <img
        src={article.imageUrl || '/default-article.jpg'}
        alt={article.title}
        className={styles.articleImage}
      />
      <div className={styles.articleContent}>
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default Article_Pages;
