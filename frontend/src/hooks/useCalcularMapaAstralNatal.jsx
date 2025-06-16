import { useState } from 'react';
import axios from '../services/api';

export function useCalcularMapaAstral() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [resposta, setResposta] = useState(null);

    const calcularMapa = async ({ birthDate, birthTime, birthCity }) => {
        setLoading(true);
        setErro(null);
        setResposta(null);

        try {
            const response = await axios.post('/mapaAstral/calcularMapaAstralNatal', {
                birthDate,
                birthTime,
                birthCity: birthCity.split('-')[0].trim()
            });

            console.log(birthDate + birthTime + birthCity.split('-')[0].trim());
            setResposta(response.data);
        } catch (err) {
            console.error('Erro no hook useCalcularMapaAstral:', err);
            setErro(err.response?.data?.error || err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return { calcularMapa, loading, erro, resposta };
}