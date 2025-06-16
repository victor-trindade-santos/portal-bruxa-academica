import React, { useState } from 'react';
import api from '../services/api'; // substitui o axios direto
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../css/Login.module.css';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const token = queryParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validatePassword(newPassword)) {
            setError('A senha deve ter de 8 a 20 caracteres e conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('As senhas não conferem.');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/api/reset-password', {
                email,
                token,
                newPassword,
            });

            if (res.status === 200 && res.data.message?.toLowerCase().includes("sucesso")) {
                setSuccess('Senha atualizada com sucesso! Redirecionando...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(res.data.message || 'Erro ao atualizar senha.');
            }
        } catch (err) {
            setError('Erro ao atualizar senha.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formBox}>
                <div className={styles.title}>Redefinir Senha</div>

                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Nova Senha</label>
                    <input
                        type="password"
                        placeholder="Nova senha"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <label className={styles.label}>Confirmar Nova Senha</label>
                    <input
                        type="password"
                        placeholder="Confirme a nova senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className={styles.input}
                    />

                    {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
                    {success && <p style={{ color: 'green', marginTop: '0.5rem' }}>{success}</p>}

                    <button type="submit" disabled={loading} className={styles.componentButton}>
                        {loading ? 'Atualizando...' : 'Atualizar Senha'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
