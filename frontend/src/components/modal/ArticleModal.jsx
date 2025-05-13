import React from "react";
import styles from "../../css/modal/Modal.module.css";

const ArticleModal = ({ message, onConfirm, onCancel }) => {
  console.log("[ArticleModal] Modal aberto");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>Confirmar</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
