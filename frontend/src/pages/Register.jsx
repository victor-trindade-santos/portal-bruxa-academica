import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../css/Login.module.css';
import RegisterInput from '../components/RegisterInput'
import api from '../services/api.js'
function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', {
          username: values.username,
          email: values.email,
          password: values.password,
          fullName: values.fullName,
      });

 const data = response.data;
 
     if (response.status === 201) {
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      setError('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(data.message || 'Erro no cadastro.');
    }

    } catch (err) {
    if (err.response) {
      setError(err.response.data.message || 'Erro no cadastro.');
    } else {
      setError('Erro ao conectar com o servidor.');
    }
    console.error(err);
  }
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Nome de Usuário",
      errorMessage: "Nome de Usuário deve ter entre 3 e 16 caracteres e não deve haver nenhum caracter especial!",
      label: "Nome de Usuário",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Deve ser um email válido!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Senha",
      errorMessage: "A senha deve ter de 8 a 20 caracteres e deve incluir pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial(ex: @)!",
      pattern: `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      label: "Senha",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirmar Senha",
      errorMessage: "Senhas não conferem!",
      pattern: values.password,
      label: "Confirmar Senha",
      required: true,
    },
  ];

  return (
    <div className="pageContentWithoutHero">
      <div className={styles.loginContainer}>
        <div className={styles.formBox}>
          <div className={styles.title}>Cadastro</div>
          <form onSubmit={handleRegister}>
            {inputs.map((input) => (
              <RegisterInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
            ))}

            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
            {success && <p style={{ color: 'rgba(250, 226, 10, 0.801)', marginTop: '0.5rem' }}>{success}</p>}
            <p></p>
            <button type="submit" className={styles.componentButton}>Cadastrar</button>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              Já possui uma conta? <Link to="/login" style={{ color: '#e0b3ff' }}>Entre</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
