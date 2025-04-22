import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Novo estado para o e-mail
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('As senhas não coincidem.');
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // Incluindo o e-mail aqui
      });

      const data = await response.json();
      if (response.status === 201) {
        navigate('/login');
      } else {
        setError(data.message || 'Erro no cadastro.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      console.error(err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formBox}>
        <div className={styles.title}>Cadastro</div>
        <form onSubmit={handleRegister}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Escolha um username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email" className={styles.label}>E-mail</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className={styles.label}>Senha</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p style={{ color: 'salmon', marginTop: '0.5rem' }}>{error}</p>}

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
