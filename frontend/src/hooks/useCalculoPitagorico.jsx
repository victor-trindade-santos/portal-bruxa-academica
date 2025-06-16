import { useState, useCallback } from 'react';
import axios from '../services/api';


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

            const response = await axios.post('/numerologia/calculoPitagorico', {
                birthDate
            });

            const data = response.data;
            setResultado(data.numero);

            return data.numero;

        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { resultado, loading, error, calcular };
};
