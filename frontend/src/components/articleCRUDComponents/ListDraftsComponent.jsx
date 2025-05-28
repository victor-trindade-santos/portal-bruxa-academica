// src/components/articleCRUDComponents/ListDraftsComponent.jsx

import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../services/api';
import styles from "../../css/articleCRUDComponents/ListDraftsComponent.module.css";
import ArticleModal from "../modal/ArticleModal";

// Adicione editingArticleId como uma prop
const ListDraftsComponent = ({ setFormDataArticle, editingArticleId }) => {
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [draftToDelete, setDraftToDelete] = useState(null);

    const fetchDrafts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/articles/drafts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // FILTRA O RASCUNHO QUE ESTÁ SENDO EDITADO ATUALMENTE
            // Se editingArticleId existe, filtra o rascunho com esse ID da lista.
            const filteredDrafts = editingArticleId
                ? response.data.filter(draft => draft._id !== editingArticleId)
                : response.data;

            setDrafts(filteredDrafts);
            console.log('🟢 Rascunhos carregados com sucesso:', filteredDrafts);
        } catch (err) {
            console.error('❌ Erro ao carregar rascunhos:', err);
            setError('Erro ao carregar rascunhos. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    }, [editingArticleId]); // Adicione editingArticleId como dependência

    useEffect(() => {
        fetchDrafts();
    }, [fetchDrafts]);

    const handleContinueEditing = (draft) => {
        console.log('✏️ Continuando edição do rascunho:', draft.title);
        setFormDataArticle({
            _id: draft._id,
            title: draft.title || '',
            author: draft.author || '',
            publicationDate: draft.publicationDate || '',
            firstContent: draft.firstContent || '',
            secondContent: draft.secondContent || '',
            imageThumb: draft.imageThumb || '',
            category: draft.category || '',
            isDraft: draft.isDraft,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (draft) => {
        setDraftToDelete(draft);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!draftToDelete) return;

        console.log('🗑️ Excluindo rascunho:', draftToDelete.title);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/articles/${draftToDelete._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert(`✅ Rascunho "${draftToDelete.title}" excluído com sucesso!`);
            fetchDrafts(); // Atualiza a lista de rascunhos após a exclusão
        } catch (err) {
            console.error('❌ Erro ao excluir rascunho:', err);
            alert('Erro ao excluir rascunho. Verifique o console para mais detalhes.');
        } finally {
            setShowDeleteModal(false);
            setDraftToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        console.log('🔴 Exclusão de rascunho cancelada.');
        setShowDeleteModal(false);
        setDraftToDelete(null);
    };

    if (loading) {
        return <div className={styles.loadingMessage}>Carregando rascunhos...</div>;
    }

    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    return (
        <div className={styles.listDraftsContainer}>
            <h3 className={styles.sectionTitle}>Continue Editando</h3>
            {drafts.length === 0 ? (
                // Mensagem personalizada quando não há rascunhos OU nenhum outro rascunho
                <p className={styles.noDraftsMessage}>
                    {editingArticleId ? 'Nenhum outro rascunho encontrado.' : 'Nenhum rascunho encontrado.'}
                </p>
            ) : (
                <ul className={styles.draftsList}>
                    {drafts.map((draft) => (
                        <li key={draft._id} className={styles.draftItem}>
                            <h3 className={styles.draftTitle}>{draft.title || 'Sem Título'}</h3>
                            <p className={styles.draftDate}>
                                Criado em: {new Date(draft.createdAt).toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                            <div className={styles.draftActions}>
                                <button
                                    onClick={() => handleContinueEditing(draft)}
                                    className={styles.editButton}
                                >
                                    <i className={`bi bi-feather ${styles.buttonIcon}`}></i>
                                    Continuar Editando
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(draft)}
                                    className={styles.deleteButton}
                                >
                                    <i className={`bi bi-trash3 ${styles.buttonIcon}`}></i>
                                    Excluir Rascunho
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {showDeleteModal && (
                <ArticleModal
                    message={`Tem certeza que deseja excluir o rascunho "${draftToDelete?.title || 'Sem Título'}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default ListDraftsComponent;