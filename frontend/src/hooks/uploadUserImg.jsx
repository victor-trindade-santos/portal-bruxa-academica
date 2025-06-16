import { useState } from 'react';
import axios from '../services/api';

export const useProfileImageUpload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadImage = async (file) => {
        if (!file) {
            setError('Nenhuma imagem selecionada');
            return false;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('profileImg', file);

            const response = await axios.post('/auth/uploadProfileImg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setIsUploading(false);
            return response.data.profileImage;
        } catch (err) {
            console.error('Erro no upload:', err);
            setError(err.response?.data?.message || err.message || 'Erro no upload da imagem');
            setIsUploading(false);
            return false;
        }
    };

    return { uploadImage, isUploading, error };
};