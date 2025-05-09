import { useState, useEffect } from "react";
import styles from "../../css/modal/DeleteModal.module.css";

const DeleteModal = ({ isOpen, onClose, onConfirm, articleId }) => {
  // Limpa os campos sempre que o modal for aberto
  useEffect(() => {
    if (isOpen) {
      // Nada para resetar agora, pois só estamos confirmando a exclusão
    }
  }, [isOpen]);

  // Evita renderizar se não estiver visível
  if (!isOpen) return null;

  const handleDelete = () => {
    // Passa o ID do artigo para a função onConfirm para excluir
    onConfirm(articleId);
    onClose();  // Fecha o modal
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <h2 id="modal-title">Deseja realmente excluir este artigo?</h2>

        <div className={styles.buttonGroup}>
          <button onClick={handleDelete}>Sim, excluir</button>
          <button onClick={onClose}>Não, cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
