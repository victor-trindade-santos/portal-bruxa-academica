import { useState } from 'react';

export function useCalcularMapaAstral() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [resposta, setResposta] = useState(null);

    const calcularMapa = async ({ birthDate, birthTime, birthCity }) => {
        setLoading(true);
        setErro(null);
        setResposta(null);


        try {
            const response = await fetch('http://localhost:5000/mapaAstral/calcularMapaAstralNatal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    birthDate,
                    birthTime,
                    birthCity: birthCity.split('-')[0].trim()
                }),
            });

            console.log(birthDate + birthTime + birthCity.split('-')[0].trim())

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || 'Erro ao calcular mapa astral');
            }

            setResposta(data);
        } catch (err) {
            console.error('Erro no hook useCalcularMapaAstral:', err);
            setErro(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    return { calcularMapa, loading, erro, resposta };
}