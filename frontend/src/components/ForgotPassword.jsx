import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [token, setToken] = useState('');
    const [validatingCode, setValidatingCode] = useState(false);

    const navigate = useNavigate();

    const handleSendCode = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/forgot-password', { email });
            console.log('Resposta backend:', res.data.message);

            // Ajuste aqui
            if (res.data.message.toLowerCase().includes('código enviado')) {
                setCodeSent(true);
                setMessage('Código enviado! Verifique seu email.');
            } else {
                setMessage(res.data.message);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setMessage('Nenhum usuário cadastrado com este email.');
            } else {
                setMessage('Erro ao solicitar recuperação.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleValidateCode = async (e) => {
        e.preventDefault();
        setMessage('');
        if (!token) {
            setMessage('Digite o código recebido.');
            return;
        }

        setValidatingCode(true);
        try {
            const res = await axios.post('http://localhost:5000/api/validate-reset-token', { email, token });
            if (res.data.valid) {
                navigate(`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
            } else {
                setMessage('Código inválido ou expirado.');
            }
        } catch (error) {
            setMessage('Erro ao validar código.');
        } finally {
            setValidatingCode(false);
        }
    };

    return (
<div className={styles.loginContainer}>
    <div className={styles.formBox}>
        <div className={styles.title}>Recuperar Senha</div>

        {!codeSent ? (
            <form onSubmit={handleSendCode}>
                <label className={styles.label}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    required
                    className={styles.input}
                />
                <button type="submit" disabled={loading} className={styles.componentButton}>
                    {loading ? 'Enviando...' : 'Enviar Código'}
                </button>
            </form>
        ) : (
            <form onSubmit={handleValidateCode}>
                <label className={styles.label}>Código</label>
                <input
                    type="text"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="Digite o código recebido"
                    required
                    className={styles.input}
                />
                <button type="submit" disabled={validatingCode} className={styles.componentButton}>
                    {validatingCode ? 'Validando...' : 'Validar Código'}
                </button>
            </form>
        )}

        {message && <p style={{ marginTop: '1rem', textAlign: 'center', color: '#5B079B' }}>{message}</p>}
    </div>
</div>

    );
}

export default ForgotPassword;
