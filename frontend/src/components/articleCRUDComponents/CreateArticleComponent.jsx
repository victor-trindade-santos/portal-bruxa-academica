import React, { useState } from 'react';
import CreateModal from "../modal/ArticleModal";
import { cleanFormDataArticle } from '../../utils/formUtils.js'; // ajuste o caminho conforme necessário
import axios from '../../services/api';
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css'

// O componente agora recebe as props de texto, ícone e classe do botão
const CreateArticleComponent = ({ formDataArticle, setFormDataArticle, buttonText, buttonIcon, buttonClass }) => {
    const [showModal, setShowModal] = useState(false);

    // Renomeando os campos do artigo para ficar mais fácil do usuário identificar quais campos não estão devidamente preenchidos
    const fieldLabels = {
        title: 'Título',
        author: 'Autor',
        publicationDate: 'Data de Publicação', // Este campo será preenchido automaticamente ao publicar
        firstContent: 'Resumo',
        secondContent: 'Conteúdo do Artigo',
        category: 'Categoria',
        imageThumb: 'Imagem do Card/Thumbnail'
    };

    const handleSubmit = async () => {
        console.log('📌 Iniciando processo de Publicação...');

        const requiredFields = [
            'title',
            'author',
            'firstContent',
            'secondContent',
            'category'
        ];

        const missingFields = requiredFields.filter(
            field => !formDataArticle[field]?.toString().trim()
        );

        // A imagem agora é verificada de forma mais robusta
        if (!formDataArticle.imageThumb ||
            (!(formDataArticle.imageThumb instanceof File) && typeof formDataArticle.imageThumb !== 'string') ||
            (typeof formDataArticle.imageThumb === 'string' && !formDataArticle.imageThumb.trim())) {
            missingFields.push('imageThumb');
        }

        if (missingFields.length > 0) {
            const readableFields = missingFields.map(field => `- ${fieldLabels[field] || field}`);
            alert(`❌ Os seguintes campos são obrigatórios e não foram preenchidos corretamente para publicar:\n${readableFields.join('\n')}`);
            console.warn(`⚠️ Campos ausentes para publicação: ${readableFields.join(', ')}`);
            return;
        }

        const formData = new FormData();

        // Adiciona todos os campos do formDataArticle ao FormData, exceto o _id para POST inicial
        // Para PUT, o _id será usado na URL
        for (const key in formDataArticle) {
            const value = formDataArticle[key];
            if (key === '_id') {
                continue; // Não anexe _id ao FormData, ele vai na URL para PUT
            }
            if (key === 'imageThumb') {
                if (value instanceof File) {
                    console.log(`📁 ${key} é um arquivo válido, anexando...`);
                    formData.append(key, value);
                } else if (typeof value === 'string' && value.trim() !== '') {
                    console.log(`🌐 ${key} é uma URL já existente, anexando para PUT...`);
                    // Se for uma string (URL de imagem existente), e não estiver vazia, adicione ao FormData.
                    // A sua API deve saber como lidar com a URL ou manter a imagem existente se não houver um novo File.
                    formData.append(key, value); // O nome da chave deve ser o mesmo que o backend espera para a URL de imagem
                } else {
                    console.warn(`⚠️ ${key} (imagem) não está definido corretamente ou está vazio.`);
                }
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        }

        // SEMPRE defina isDraft como false ao publicar
        formData.set('isDraft', 'false');

        // Adiciona a data de publicação atual se for um rascunho sendo publicado
        // ou um novo artigo. Se for um artigo já publicado, a API deve manter a data.
        if (!formDataArticle.publicationDate || formDataArticle.isDraft) {
            formData.set('publicationDate', new Date().toISOString());
        }


        try {
            console.log('📤 Enviando dados para o backend...');
            for (let pair of formData.entries()) {
                console.log(`🔎 Campo: ${pair[0]} → Valor:`, pair[1],
                    pair[1] instanceof File ? `(arquivo: ${pair[1].name})` : '');
            }

            const token = localStorage.getItem('token');
            let response;
            let successMessage;

            if (formDataArticle._id) {
                // Se existe _id, estamos atualizando (seja um rascunho virando artigo ou um artigo atualizando)
                response = await axios.put(`/articles/${formDataArticle._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                successMessage = `✅ Artigo "${response.data.title}" atualizado e publicado com sucesso!`;
            } else {
                // Se não existe _id, estamos criando um novo artigo
                response = await axios.post('/articles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                successMessage = `✅ Artigo "${response.data.title}" publicado com sucesso!`;
            }

            console.log('✅ Operação de publicação bem-sucedida:', response.data);
            alert(successMessage);
            cleanFormDataArticle(setFormDataArticle); // Limpa o formulário após a publicação
        } catch (error) {
            console.error('❌ Erro na operação de publicação:', error);
            alert(`Erro ao publicar artigo: ${error.response?.data?.message || error.message}. Verifique o console para mais detalhes.`);
        }
    };

    const handleOpenModal = () => {
        console.log('🟡 Abrindo modal de confirmação...');
        setShowModal(true);
    };

    const handleConfirmCreate = () => {
        setShowModal(false);
        handleSubmit();
    };

    const handleCancelCreate = () => {
        console.log('🔴 Operação de publicação cancelada pelo usuário.');
        setShowModal(false);
    };

    return (
        <div>
            {/* O botão agora usa as props passadas do ArticleActionButtons */}
            <button
                onClick={handleOpenModal}
                className={`${styles.componentButton} ${buttonClass}`}
            >
                {buttonIcon} {/* Ícone passado via props */}
                {buttonText} {/* Texto passado via props */}
            </button>
            {showModal && (
                <CreateModal
                    message="Tem certeza que deseja publicar este artigo?" // Mensagem mais genérica para "publicar"
                    onConfirm={handleConfirmCreate}
                    onCancel={handleCancelCreate}
                />
            )}
        </div>
    );
}

export default CreateArticleComponent;