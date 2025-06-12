import React from "react";
import styles from "../../css/modal/Modal.module.css";

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  console.log("[ConfirmationModal] aberto");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.label} >Sua carta foi selecionada, deseja confirmar?</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>Confirmar</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
