// src/components/articleCRUDComponents/SaveDraftComponent.jsx

import React from 'react';
import axios from '../../services/api';
// Importe os estilos corretos
import styles from '../../css/ArticleCRUD.module.css'; // Ou o caminho para seu componentButton.module.css

const SaveDraftComponent = ({ formDataArticle, setFormDataArticle, buttonText, buttonIcon, buttonClass }) => {

    const handleSaveDraft = async () => {
        // Para um rascunho, talvez o TÍTULO seja o único campo "obrigatório" mínimo.
        // Isso permite salvar o progresso mesmo que o artigo esteja incompleto.
        if (!formDataArticle.title?.toString().trim()) {
            alert('Por favor, adicione um título para salvar o rascunho. Os outros campos podem ficar vazios.');
            console.warn('⚠️ Tentativa de salvar rascunho sem título.');
            return;
        }

        const formData = new FormData();

        // Itera sobre todos os campos do formDataArticle
        for (const key in formDataArticle) {
            const value = formDataArticle[key];

            // Ignora o _id ao anexar ao FormData, pois ele vai na URL para PUT
            if (key === '_id') {
                continue;
            }

            // Lidar com a imagem separadamente
            if (key === 'imageThumb') {
                if (value instanceof File) {
                    // Se for um novo arquivo, anexa
                    formData.append(key, value);
                } else if (typeof value === 'string' && value.trim() !== '') {
                    // Se for uma URL de imagem existente (e não vazia), anexa
                    formData.append(key, value);
                } else if (value === '' || value === null) {
                    // Se a imagem foi REMOVIDA (campo vazio), você precisa avisar o backend
                    // O backend precisará de uma forma de interpretar 'imagem vazia'
                    // Uma forma comum é enviar uma string vazia ou um valor específico
                    formData.append(key, ''); // Envia uma string vazia para indicar remoção
                }
            } else if (value !== null && value !== undefined) {
                // Para outros campos, se o valor NÃO FOR null/undefined, anexa
                // Se o campo for uma string VAZIA, ele será anexado como string vazia,
                // o que é o comportamento desejado para rascunhos.
                formData.append(key, value);
            } else if (value === null) {
                // Caso queira explicitamente enviar null para o backend para campos que você limpou e que espera null.
                // Isso depende da sua API. Se a API espera string vazia para campos "limpos", a linha anterior já resolve.
                formData.append(key, ''); // Alternativa: formData.append(key, 'null'); ou formData.append(key, null);
            }
        }

        // SEMPRE DEFINIR isDraft como true ao salvar/atualizar rascunho
        formData.set('isDraft', 'true');

        // Remova a data de publicação ao salvar como rascunho, se houver
        // Rascunhos não têm data de publicação até serem efetivamente publicados.
        // Seu backend deve ser capaz de lidar com a ausência ou com um valor nulo/vazio.
        formData.delete('publicationDate'); // Remove a data de publicação, se existir

        try {
            const token = localStorage.getItem('token');
            let response;
            let successMessage;

            if (formDataArticle._id) {
                // Se formDataArticle._id existe, estamos ATUALIZANDO um rascunho existente
                console.log('🔄 Atualizando rascunho existente...');
                response = await axios.put(`/articles/${formDataArticle._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                successMessage = `✅ Rascunho "${response.data.title || 'sem título'}" atualizado com sucesso!`;
            } else {
                // Se formDataArticle._id NÃO existe, estamos CRIANDO um novo rascunho
                console.log('✨ Criando novo rascunho...');
                response = await axios.post('/articles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                successMessage = `✅ Rascunho "${response.data.title || 'sem título'}" salvo com sucesso!`;
            }

            console.log('🟢 Sucesso ao salvar/atualizar rascunho:', response.data);
            alert(successMessage);

            // Atualiza o formDataArticle com os dados mais recentes do rascunho salvo,
            // especialmente o _id se for um novo rascunho.
            setFormDataArticle(prev => ({
                ...prev,
                _id: response.data._id,
                title: response.data.title, // Atualiza o título caso tenha sido salvo com trim()
                author: response.data.author,
                firstContent: response.data.firstContent,
                secondContent: response.data.secondContent,
                category: response.data.category,
                imageThumb: response.data.imageThumb, // A URL da imagem salva
                isDraft: response.data.isDraft, // Deve ser true
                publicationDate: response.data.publicationDate || '', // Deve ser vazio ou null
            }));

        } catch (error) {
            console.error('❌ Erro ao salvar/atualizar rascunho:', error);
            alert(`Erro ao salvar/atualizar rascunho: ${error.response?.data?.message || error.message}. Verifique o console para mais detalhes.`);
        }
    };

    return (
        <button
            onClick={handleSaveDraft}
            className={`${styles.componentButton} ${buttonClass}`}
        >
            {buttonIcon}
            {buttonText}
        </button>
    );
};

export default SaveDraftComponent;