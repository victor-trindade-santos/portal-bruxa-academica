import React from 'react';
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css'; // Usaremos os estilos existentes

// Importe os componentes de ação dos artigos
import CreateArticleComponent from './CreateArticleComponent';
import UpdateArticleComponent from './UpdateArticleComponent';
import CleanArticleComponent from './CleanArticleComponent';
import ViewArticleComponent from './ViewArticleComponent';
import SaveDraftComponent from './SaveDraftComponent';
import DeleteArticleComponent from './DeleteArticleComponent';

// Importe os ícones do Bootstrap Icons
// Certifique-se de ter 'react-icons' instalado: npm install react-icons
import {
    BsCloudUpload as IconPublish, // Ícone para publicar
    BsArrowRepeat as IconUpdate, // Ícone para atualizar
    BsSave as IconSaveDraft, // Ícone para salvar/atualizar rascunho
    BsEraser as IconClean, // Ícone para limpar
    BsEye as IconView, // Ícone para visualizar (artigo ou rascunho)
} from 'react-icons/bs';


const ArticleActionButtons = ({ formDataArticle, setFormDataArticle }) => {
    // Determine o estado atual do formulário
    const isEditingExistingArticle = formDataArticle._id && !formDataArticle.isDraft; // Artigo existente E Publicado
    const isEditingExistingDraft = formDataArticle._id && formDataArticle.isDraft;     // Rascunho existente
    const isCreatingNew = !formDataArticle._id;                                      // Artigo do zero

    return (
        <div className={styles.actionButtonsContainer}>
            {/* Cenário 1: Artigo Publicado Selecionado */}
            {isEditingExistingArticle && (
                <>
                    <UpdateArticleComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Atualizar Artigo"
                        buttonIcon={<IconUpdate className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico roxo
                    />
                    <ViewArticleComponent
                        formDataArticle={formDataArticle}
                        buttonText="Visualizar Artigo"
                        buttonIcon={<IconView className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <CleanArticleComponent
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Limpar Formulário"
                        buttonIcon={<IconClean className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <DeleteArticleComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Excluir Artigo"
                        buttonClass={`${styles.componentButton} ${styles.deleteButton}`} // Adiciona o estilo de exclusão
                    />
                </>
            )}

            {/* Cenário 2: Editando um Rascunho Selecionado */}
            {isEditingExistingDraft && (
                <>
                    <CreateArticleComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Publicar Artigo" // Mudou de "Publicar" para "Publicar Artigo"
                        buttonIcon={<IconPublish className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico roxo
                    />
                    <SaveDraftComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Atualizar Rascunho"
                        buttonIcon={<IconSaveDraft className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <ViewArticleComponent
                        formDataArticle={formDataArticle}
                        buttonText="Visualizar Rascunho"
                        buttonIcon={<IconView className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <CleanArticleComponent
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Limpar Formulário"
                        buttonIcon={<IconClean className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <DeleteArticleComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Excluir Rascunho"
                        buttonClass={`${styles.componentButton} ${styles.deleteButton}`} // Adiciona o estilo de exclusão
                    />
                </>
            )}

            {/* Cenário 3: Criando um Artigo do Zero */}
            {isCreatingNew && (
                <>
                    <CreateArticleComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Publicar Artigo"
                        buttonIcon={<IconPublish className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico roxo
                    />
                    <SaveDraftComponent
                        formDataArticle={formDataArticle}
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Salvar Como Rascunho"
                        buttonIcon={<IconSaveDraft className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <CleanArticleComponent
                        setFormDataArticle={setFormDataArticle}
                        buttonText="Limpar Formulário"
                        buttonIcon={<IconClean className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                    <ViewArticleComponent
                        formDataArticle={formDataArticle}
                        buttonText="Visualizar Artigo"
                        buttonIcon={<IconView className={styles.buttonIcon} />}
                        buttonClass={styles.componentButton} // Usa o estilo genérico
                    />
                </>
            )}
        </div>
    );
};

export default ArticleActionButtons;