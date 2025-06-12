import { useState, useCallback } from 'react';

export const useCalculoPitagorico = () => {
    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calcular = useCallback(async (birthDate) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Usuário não autenticado');

            const response = await fetch('http://localhost:5000/numerologia/calculoPitagorico', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ birthDate }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || 'Erro ao calcular número');
            }

            const data = await response.json();
            setResultado(data.numero);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    }, []);

    return { resultado, loading, error, calcular };
};