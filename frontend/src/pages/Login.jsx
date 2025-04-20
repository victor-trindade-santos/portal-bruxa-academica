import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // substitui useHistory
import { AuthContext } from '../context/AuthContext';
import styles from '../css/Login.module.css'; // importando os estilos

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // substitui useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });      

      const data = await response.json();
      if (response.status === 200) {
        login({
          username: data.username,
          role: data.role,
          token: data.token,
        });

        // Redireciona usando navigate
        navigate('/');
      } else {
        console.error('Erro no login:', data.message);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formBox}>
        <div className={styles.title}>Login</div>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
