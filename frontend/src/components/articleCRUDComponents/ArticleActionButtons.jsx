import React, { useState } from 'react';
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css';

import CreateArticleComponent from './CreateArticleComponent';
import UpdateArticleComponent from './UpdateArticleComponent';
import CleanArticleComponent from './CleanArticleComponent';
import ViewArticleComponent from './ViewArticleComponent';
import SaveDraftComponent from './SaveDraftComponent';
import DeleteArticleComponent from './DeleteArticleComponent';

import AlertModal from '../modal/AlertModal';

import {
  BsCloudUpload as IconPublish,
  BsArrowRepeat as IconUpdate,
  BsSave as IconSaveDraft,
  BsEraser as IconClean,
  BsEye as IconView,
} from 'react-icons/bs';

const ArticleActionButtons = ({ formDataArticle, setFormDataArticle }) => {
  const isEditingExistingArticle = formDataArticle._id && !formDataArticle.isDraft;
  const isEditingExistingDraft = formDataArticle._id && formDataArticle.isDraft;
  const isCreatingNew = !formDataArticle._id;

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const showAlertModal = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleArticleDeleted = () => {
    setFormDataArticle({
      _id: '',
      title: '',
      author: '',
      publicationDate: '',
      firstContent: '',
      secondContent: '',
      imageThumb: '',
      category: '',
      isDraft: false,
    });
  };

  return (
    <div className={styles.actionButtonsContainer}>
      {isEditingExistingArticle && (
        <>
          <UpdateArticleComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Atualizar Artigo"
            buttonIcon={<IconUpdate className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
            onAlert={showAlertModal} // ✅ Atualização feita aqui
          />
          <ViewArticleComponent
            formDataArticle={formDataArticle}
            buttonText="Visualizar Artigo"
            buttonIcon={<IconView className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <CleanArticleComponent
            setFormDataArticle={setFormDataArticle}
            buttonText="Limpar Formulário"
            buttonIcon={<IconClean className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <DeleteArticleComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Excluir Artigo"
            buttonClass={`${styles.componentButton} ${styles.deleteButton}`}
            onArticleDeleted={handleArticleDeleted}
            onAlert={showAlertModal}
          />
        </>
      )}

      {isEditingExistingDraft && (
        <>
          <CreateArticleComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Publicar Artigo"
            buttonIcon={<IconPublish className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <SaveDraftComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Atualizar Rascunho"
            buttonIcon={<IconSaveDraft className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
            confirmMessage="Tem certeza que deseja atualizar este rascunho?"
            loadingMessageSave="💾 Salvando rascunho..."
            loadingMessageUpdate="🔄 Atualizando rascunho..."
          />
          <ViewArticleComponent
            formDataArticle={formDataArticle}
            buttonText="Visualizar Rascunho"
            buttonIcon={<IconView className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <CleanArticleComponent
            setFormDataArticle={setFormDataArticle}
            buttonText="Limpar Formulário"
            buttonIcon={<IconClean className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <DeleteArticleComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Excluir Rascunho"
            buttonClass={`${styles.componentButton} ${styles.deleteButton}`}
            onArticleDeleted={handleArticleDeleted}
            onAlert={showAlertModal}
          />
        </>
      )}

      {isCreatingNew && (
        <>
          <CreateArticleComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Publicar Artigo"
            buttonIcon={<IconPublish className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <SaveDraftComponent
            formDataArticle={formDataArticle}
            setFormDataArticle={setFormDataArticle}
            buttonText="Salvar Como Rascunho"
            buttonIcon={<IconSaveDraft className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
            confirmMessage="Deseja salvar como rascunho?"
            loadingMessageSave="💾 Salvando rascunho..."
            loadingMessageUpdate="🔄 Atualizando rascunho..."
          />
          <CleanArticleComponent
            setFormDataArticle={setFormDataArticle}
            buttonText="Limpar Formulário"
            buttonIcon={<IconClean className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
          <ViewArticleComponent
            formDataArticle={formDataArticle}
            buttonText="Visualizar Artigo"
            buttonIcon={<IconView className={styles.buttonIcon} />}
            buttonClass={styles.componentButton}
          />
        </>
      )}

      {showAlert && (
        <AlertModal
          message={alertMessage}
          onClose={() => {
            setShowAlert(false);
            setAlertMessage('');
          }}
        />
      )}
    </div>
  );
};

export default ArticleActionButtons;
