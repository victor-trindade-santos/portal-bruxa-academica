import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const getUser = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/auth/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar dados do usuário');
            }

            const data = await response.json();
            setUserData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateUserData = (newData) => {
        setUserData(prev => ({ ...prev, ...newData }));
    };

    useEffect(() => {
        if (user) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [user]);

    return {
        user: userData,
        loading,
        error,
        refresh: fetchUserData,
        updateUserData
    };
};