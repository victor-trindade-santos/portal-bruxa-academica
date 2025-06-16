import React from "react";
import styles from "../../css/modal/Modal.module.css";

const LoadingModal = ({ message }) => {
  console.log("[LoadingModal] Modal de loading exibido");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.label}>{message || "⏳ Carregando..."}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
