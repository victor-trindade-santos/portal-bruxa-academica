import React from "react";
import styles from "../../css/modal/Modal.module.css"; // Certifique-se de que o caminho esteja correto

const AlertModal = ({ message, onClose }) => {
  console.log("[AlertModal] Modal de alerta aberto");

  return (
<div className={styles.modalOverlay}>
  <div className={styles.modalContent}>
    <div className={styles.labelAlert}>{message}</div>
    <div className={styles.buttonGroupSolo}>
      <button onClick={onClose} className={styles.alertButton}>OK</button>
    </div>
  </div>
</div>

  );
};

export default AlertModal;
