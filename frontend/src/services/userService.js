import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const UserService = ({ userId, field }) => {
  const [dado, setDado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/auth/${userId}`);
        
        // Busca o campo requisitado dinamicamente
        if (field in response.data) {
          setDado(response.data[field]);
        } else {
          setErro(`Campo "${field}" não encontrado`);
        }
      } catch (err) {
        setErro(err.response?.data?.message || err.message || 'Erro ao buscar usuário');
      } finally {
        setLoading(false);
      }
    };

    if (userId && field) {
      fetchUser();
    }
  }, [userId, field]);

  if (loading) return <span>Carregando...</span>;
  if (erro) return <span style={{ color: 'red' }}>{erro}</span>;
  return <span>{dado}</span>;
};

export default UserService;