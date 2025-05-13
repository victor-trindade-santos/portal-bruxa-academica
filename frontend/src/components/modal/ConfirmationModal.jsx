import React from "react";
import styles from "../../css/modal/Modal.module.css"; // Certifique-se de que o caminho esteja correto

function ConfirmationModal({ isOpen, message, onClose }) {
  // Evita renderizar se não estiver visível
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{message}</h3>
        <button onClick={onClose
          
        } className={styles.closeButton}>Fechar</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
