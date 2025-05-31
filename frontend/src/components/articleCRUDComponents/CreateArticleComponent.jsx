import React, { useState, useEffect } from 'react';
import CreateModal from "../modal/ArticleModal";
import LoadingModal from "../modal/LoadingModal";
import AlertModal from "../modal/AlertModal";
import { cleanFormDataArticle } from '../../utils/formUtils.js';
import axios from '../../services/api';
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css';

const CreateArticleComponent = ({ formDataArticle, setFormDataArticle, buttonText, buttonIcon, buttonClass }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const [alertMessage, setAlertMessage] = useState(""); // ✅ mensagem de alerta
    const [showAlertModal, setShowAlertModal] = useState(false); // ✅ exibe alerta

    const fieldLabels = {
        title: 'Título',
        author: 'Autor',
        publicationDate: 'Data de Publicação',
        firstContent: 'Resumo',
        secondContent: 'Conteúdo do Artigo',
        category: 'Categoria',
        imageThumb: 'Imagem do Card/Thumbnail'
    };

    const handleSubmit = async () => {
        console.log('📌 Iniciando processo de Publicação...');

        const requiredFields = ['title', 'author', 'firstContent', 'secondContent', 'category'];
        const missingFields = requiredFields.filter(
            field => !formDataArticle[field]?.toString().trim()
        );

        if (!formDataArticle.imageThumb ||
            (!(formDataArticle.imageThumb instanceof File) && typeof formDataArticle.imageThumb !== 'string') ||
            (typeof formDataArticle.imageThumb === 'string' && !formDataArticle.imageThumb.trim())) {
            missingFields.push('imageThumb');
        }

        if (missingFields.length > 0) {
            const readableFields = missingFields.map(field => `- ${fieldLabels[field] || field}`);
            setAlertMessage(`❌ Os seguintes campos são obrigatórios e não foram preenchidos corretamente para publicar:\n${readableFields.join('\n')}`);
            return;
        }

        const formData = new FormData();
        for (const key in formDataArticle) {
            const value = formDataArticle[key];
            if (key === '_id') continue;
            if (key === 'imageThumb') {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'string' && value.trim() !== '') {
                    formData.append(key, value);
                }
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        }

        formData.set('isDraft', 'false');

        if (!formDataArticle.publicationDate || formDataArticle.isDraft) {
            formData.set('publicationDate', new Date().toISOString());
        }

        try {
            setIsLoading(true);
            setLoadingMessage("📤 Publicando artigo... Por favor, aguarde.");

            const token = localStorage.getItem('token');
            let response;
            let successMessage;
            let title;

            if (formDataArticle._id) {
                response = await axios.put(`/articles/${formDataArticle._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                title = response?.data?.title || formDataArticle.title || 'Título Desconhecido';
                successMessage = `✅ Artigo "${title}" atualizado e publicado com sucesso!`;
            } else {
                response = await axios.post('/articles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                title = response?.data?.title || formDataArticle.title || 'Título Desconhecido';
                successMessage = `✅ Artigo "${title}" publicado com sucesso!`;
            }

            cleanFormDataArticle(setFormDataArticle);
            setAlertMessage(successMessage);
        } catch (error) {
            console.error('❌ Erro na operação de publicação:', error);
            setAlertMessage(`❌ Erro ao publicar artigo: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
            setLoadingMessage("");
        }
    };

    // ✅ Exibe o alerta automaticamente após o loading terminar
    useEffect(() => {
        if (!isLoading && alertMessage) {
            setShowAlertModal(true);
        }
    }, [isLoading, alertMessage]);

    const handleOpenModal = () => {
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

    // ✅ Função para renderizar mensagens com quebra de linha
    const renderAlertMessage = (message) => {
        return message.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className={`${styles.componentButton} ${buttonClass}`}
            >
                {buttonIcon}
                {buttonText}
            </button>

            {showModal && (
                <CreateModal
                    message="Tem certeza que deseja publicar este artigo?"
                    onConfirm={handleConfirmCreate}
                    onCancel={handleCancelCreate}
                />
            )}

            {isLoading && <LoadingModal message={loadingMessage} />}

            {showAlertModal && (
                <AlertModal
                    message={renderAlertMessage(alertMessage)}
                    onClose={() => {
                        setShowAlertModal(false);
                        setAlertMessage("");
                    }}
                />
            )}
        </div>
    );
};

export default CreateArticleComponent;
