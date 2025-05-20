import React, { useEffect, useState } from 'react';

const userService = ({ userId, field }) => {
  const [dado, setDado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/auth/${userId}`);
        if (!res.ok) throw new Error('Erro ao buscar usuário');
        const usuario = await res.json();

        // Busca o campo requisitado dinamicamente
        if (field in usuario) {
          setDado(usuario[field]);
        } else {
          setErro(`Campo "${field}" não encontrado`);
        }
      } catch (err) {
        setErro(err.message);
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

export default userService;
