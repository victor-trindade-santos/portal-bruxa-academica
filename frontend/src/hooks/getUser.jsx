import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';

export const getUser = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/auth/me');
            setUserData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Erro ao carregar dados do usuário');
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