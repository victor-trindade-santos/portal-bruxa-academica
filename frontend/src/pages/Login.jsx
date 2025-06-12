import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
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
      const response = await fetch('https://portal-bruxa-academica.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Resposta do login:', data); // Verifique o que está retornando
  
      if (response.status === 200) {
        // Salva o token no localStorage
        localStorage.setItem('token', data.token);  // Salva o token
  
        // Chama o login com as informações recebidas
        login({
          username: data.username,
          email: data.email,
          role: data.role,
          birthDate: data.birthDate,
          token: data.token,
        });
  
        // Redireciona após o login bem-sucedido
        navigate('/');
      } else {
        console.error('Erro no login:', data.message);
        setError(data.message || 'Erro no login.');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor.');
      console.error('Erro ao conectar com o servidor:', error);
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
          <p></p>
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
