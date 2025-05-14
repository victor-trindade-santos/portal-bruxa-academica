import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../css/Login.module.css';
import RegisterInput from '../components/RegisterInput'

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificação de idade
    const today = new Date();
    const birthDate = new Date(values.birthDate);

    // Calcula a idade
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const isBirthdayPassedThisYear = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
    const realAge = isBirthdayPassedThisYear ? age : age - 1;

    if (birthDate > today) {
      setError("A data de nascimento não pode ser no futuro.");
      alert("Você precisa ter pelo menos 5 anos para se cadastrar.");
      return;
    }

    if (realAge < 5) {
      setError("Você precisa ter pelo menos 5 anos para se cadastrar.");
      alert("Você precisa ter pelo menos 5 anos para se cadastrar.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          fullName: values.fullName,
          birthDate: values.birthDate,
          birthTime: values.birthTime,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando...');
        setError('');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      else {
        setError(data.message || 'Erro no cadastro.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      console.error(err);
    }
  };

  const inputs = [
    {
      id: 0,
      name: "fullName",
      type: "text",
      placeholder: "Nome Completo",
      errorMessage: "Nome completo é obrigatório.",
      label: "Nome Completo",
      required: true,
    },
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username deve ter entre 3 e 16 caracteres e não deve haver nenhum caracter especial!",
      label: "Username",
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
    {
      id: 5,
      name: "birthDate",
      type: "date",
      placeholder: "Data de Nascimento",
      errorMessage: "Data de nascimento é obrigatória.",
      label: "Data de Nascimento",
      required: true,
    },
    {
      id: 6,
      name: "birthTime",
      type: "time",
      placeholder: "Hora de Nascimento",
      errorMessage: "Hora de nascimento é obrigatória.",
      label: "Hora de Nascimento",
      required: true,
    }
  ];

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formBox}>
        <div className={styles.title}>Cadastro</div>
        <form onSubmit={handleRegister}>
          {inputs.map((input) => (
            <RegisterInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}

          {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
          {success && <p style={{ color: 'rgba(250, 226, 10, 0.801)', marginTop: '0.5rem' }}>{success}</p>}

          <button type="submit" className={styles.button}>Cadastrar</button>
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Já possui uma conta? <Link to="/login" style={{ color: '#e0b3ff' }}>Entre</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
