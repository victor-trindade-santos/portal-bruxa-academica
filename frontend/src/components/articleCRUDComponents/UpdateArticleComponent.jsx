import React, { useState } from 'react';
import axios from '../../services/api';
import { cleanFormDataArticle } from '../../utils/formUtils';
import UpdateModal from "../modal/ArticleModal";
import styles from "../../css/articleCRUDComponents/ArticleCRUDComponent.module.css";


const UpdateArticleComponent = ({ formDataArticle, setFormDataArticle }) => {
  const [showModal, setShowModal] = useState(false);

  //Renomeando os campos do artigo para ficar mais fácil do usuário identificar quais campos não estão devidamente preenchidos
  const fieldLabels = {
    _id: 'id',
    title: 'Título',
    author: 'Autor',
    publicationDate: 'Data de Publicação',
    firstContent: 'Primeiro Parágrafo',
    subtitle: 'Subtítulo',
    secondContent: 'Segundo Parágrafo',
    category: 'Categoria',
    imageArticle: 'Imagem do Artigo',
    imageThumb: 'Imagem do Card/Thumbnail'
  };

  const handleUpdate = async () => {
    console.log('🔍 ID atual no formDataArticle:', formDataArticle._id);
    const updatedArticle = formDataArticle;

    console.log('🟡 Iniciando validação dos campos...');

    const requiredFields = [
      '_id',
      'title',
      'author',
      'publicationDate',
      'firstContent',
      'subtitle',
      'secondContent',
      'category'
    ];

    const missingFields = requiredFields.filter(
      field => !formDataArticle[field]?.toString().trim()
    );

    // Verificações específicas para imagens
    if (
      !formDataArticle.imageArticle ||
      !(formDataArticle.imageArticle instanceof File || typeof formDataArticle.imageArticle === 'string')
    ) {
      missingFields.push('imageArticle');
    }

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

    for (const key in updatedArticle) {
      const value = updatedArticle[key];

      if (key === 'imageArticle' || key === 'imageThumb') {
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
      console.log('📤 Enviando dados para o backend (update)...');
      for (let pair of formData.entries()) {
        console.log(`🔎 Campo: ${pair[0]} → Valor:`, pair[1],
          pair[1] instanceof File ? `(arquivo: ${pair[1].name})` : '');
      }

      const token = localStorage.getItem('token');
      const response = await axios.put(`/articles/${updatedArticle._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('✅ Artigo atualizado com sucesso:', response.data);
      alert('✅ Artigo atualizado com sucesso:')
      cleanFormDataArticle(setFormDataArticle);
    } catch (error) {
      console.error('❌ Erro ao atualizar artigo:', error);
      alert('Erro ao atualizar artigo. Verifique o console para mais detalhes.');
    }
  };

  const handleOpenModal = () => {
    console.log('🟡 Abrindo modal de confirmação para atualização...');
    setShowModal(true);
  };

  const handleConfirmUpdate = () => {
    setShowModal(false);
    handleUpdate();
  };

  const handleCancelUpdate = () => {
    console.log('🔴 Atualização cancelada pelo usuário.');
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className={styles.componentButton}>
        Atualizar Artigo
      </button>
      {showModal && (
        <UpdateModal
          message="Tem certeza que deseja atualizar este artigo?"
          onConfirm={handleConfirmUpdate}
          onCancel={handleCancelUpdate}
        />
      )}
    </div>
  );
};

export default UpdateArticleComponent;