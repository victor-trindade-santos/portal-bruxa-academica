import React, { useState } from 'react';
import CreateModal from "../modal/ArticleModal";
import { cleanFormDataArticle } from '../../utils/formUtils.js'; // ajuste o caminho conforme necessário
import axios from '../../services/api';
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";


const CreateArticleComponent = ({ formDataArticle, setFormDataArticle }) => {
    const [showModal, setShowModal] = useState(false);

    //Renomeando os campos do artigo para ficar mais fácil do usuário identificar quais campos não estão devidamente preenchidos
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
        console.log('📌 Iniciando validação do formulário...');

        const requiredFields = [
            'title',
            'author',
            'publicationDate',
            'firstContent',
            'secondContent',
            'category'
        ];

        const missingFields = requiredFields.filter(
            field => !formDataArticle[field]?.toString().trim()
        );

        if (
            !formDataArticle.imageThumb ||
            !(formDataArticle.imageThumb instanceof File || typeof formDataArticle.imageThumb === 'string')
        ) {
            missingFields.push('imageThumb');
        }

        if (missingFields.length > 0) {
            const readableFields = missingFields.map(field => `- ${fieldLabels[field] || field}`);
            alert(`❌ Os seguintes campos são obrigatórios e não foram preenchidos corretamente:\n${readableFields.join('\n')}`);
            console.warn(`⚠️ Campos ausentes: ${readableFields.join(', ')}`);
            return;
        }
        const formData = new FormData();

        for (const key in formDataArticle) {
            const value = formDataArticle[key];

            if ( key === 'imageThumb') {
                if (value instanceof File) {
                    console.log(`📁 ${key} é um arquivo válido, anexando...`);
                    formData.append(key, value);
                } else if (typeof value === 'string') {
                    console.log(`🌐 ${key} é uma URL já existente, anexando...`);
                    formData.append(key, value);
                } else {
                    console.warn(`⚠️ ${key} não está definido corretamente.`);
                }
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        }

        try {
            console.log('📤 Enviando dados para o backend...');
            for (let pair of formData.entries()) {
                console.log(`🔎 Campo: ${pair[0]} → Valor:`, pair[1],
                    pair[1] instanceof File ? `(arquivo: ${pair[1].name})` : '');
            }
            const token = localStorage.getItem('token');
            const response = await axios.post('/articles', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('✅ Artigo criado com sucesso:', response.data);
            alert('✅ Artigo criado com sucesso');
            cleanFormDataArticle(setFormDataArticle);
        } catch (error) {
            console.error('❌ Erro ao criar artigo:', error);
            alert('Erro ao criar artigo. Verifique o console para mais detalhes.');
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
        console.log('🔴 Criação cancelada pelo usuário.');
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={handleOpenModal} className={styles.componentButton}>
                Criar Artigo
            </button>
            {showModal && (
                <CreateModal
                    message="Tem certeza que deseja criar este artigo?"
                    onConfirm={handleConfirmCreate}
                    onCancel={handleCancelCreate}
                />
            )}
        </div>
    );
}

export default CreateArticleComponent;