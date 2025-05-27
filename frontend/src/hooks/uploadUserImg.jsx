import { useState } from 'react';
 

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

            const response = await fetch('http://localhost:5000/auth/uploadProfileImg', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro no upload da imagem');
            }

            const data = await response.json();
            setIsUploading(false);
            return data.profileImage;
        } catch (err) {
            console.error('Erro no upload:', err);
            setError(err.message);
            setIsUploading(false);
            return false;
        }
    };

    return { uploadImage, isUploading, error };
};