import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api.js';
import styles from '../css/Login.module.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [error, setError] = useState('');

  
   const handleLogin = async (e) => {
  e.preventDefault();

  try { 
    const response = await axios.post('/auth/login', { username, password });

    const data = response.data;
    console.log('Resposta do login:', data);

    if (response.status === 200) {
      localStorage.setItem('token', data.token);

      login({
        username: data.username,
        email: data.email,
        role: data.role,
        birthDate: data.birthDate,
        token: data.token,
      });

      navigate('/');
    } else {
      setError(data.message || 'Erro no login.');
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    if (error.response) {
      // If server responded with an error message
      setError(error.response.data.message || 'Erro no login.');
    } else {
      setError('Erro ao conectar com o servidor.');
    }
  }
};

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formBox}>
        <div className={styles.title}>Login</div>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className={styles.label}>Nome de Usuário</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Digite o nome de usuário..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className={styles.label}>Senha</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Digite a sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}

          <p style={{ marginTop: '0.3rem', textAlign: 'left', marginBottom: '1rem' }}>
            <Link to="/forgot-password" style={{ color: '#5B079B' }}>Esqueceu sua senha?</Link>
          </p>

          <button type="submit" className={styles.componentButton}>Entrar</button>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Não tem conta? <Link to="/register" style={{ color: '#5B079B' }}>Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
