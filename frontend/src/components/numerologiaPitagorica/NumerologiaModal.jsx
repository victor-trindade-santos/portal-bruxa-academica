import { useState } from "react";
import { useCalculoPitagorico } from "../../hooks/useCalculoPitagorico";
import styles from "../../css/modal/Modal.module.css";

export const NumerologiaModal = ({ onCancel, userData, atualizarUserData }) => {
    const [birthDate, setBirthDate] = useState(userData?.birthDate || '');
    const { resultado, loading, error, calcular } = useCalculoPitagorico();

    const handleSubmit = async () => {
        if (birthDate) {
            const numeroCalculado = await calcular(birthDate);

            if (numeroCalculado) {
                console.log("teste");
                atualizarUserData({
                    birthDate: birthDate,
                    lifePathNumber: numeroCalculado
                });
                onCancel();
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>Precisamos de alguns dados</p>

                <div className="mb-3 d-flex align-items-center">
                    <i className={`bi bi-stars fs-4 me-2 mt-0`}></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.label}`}>Data de Nascimento:</p>
                    <input
                        type="date"
                        className={styles.input}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className={styles.confirmButton} disabled={loading}>
                        {loading ? 'Calculando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};