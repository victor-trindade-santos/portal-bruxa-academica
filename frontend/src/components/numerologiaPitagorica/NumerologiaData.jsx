import React, { useState } from 'react';
import styles from '../../css/Perfil.module.css';
import numerologiaData from '../../data/numerologiaData';

import { NumerologiaModal } from './NumerologiaModal';

export const NumerologiaData = ({ userData }) => {
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    const lifePathNumber = userData?.lifePathNumber;
    const numerologia = numerologiaData[lifePathNumber];

    if (!numerologia) {
        return (
            <div className={`card p-4 ${styles.resumoSigno}`}>
                <p className={styles.dado}>Número de caminho de vida não identificado.</p>
            </div>
        );
    }

    return (
        <>
            <div className={`card p-4 ${styles.resumoSigno}`}>
                <center><h3 className={`fw-bold mb-3 ${styles.nomeNumero}`}>Número: {lifePathNumber}</h3></center>
                <h4 className={`fw-semibold ${styles.nomeInfo}`}>{numerologia.titulo}</h4>
                <p className={styles.dado}>{numerologia.descricao}</p>

                <div className="mt-3">
                    <p className={`fw-bold ${styles.nomeInfo}`}>Desafios:</p>
                    <p className={styles.dado}>{numerologia.desafios}</p>
                </div>

                <div className="mt-3">
                    <p className={`fw-bold ${styles.nomeInfo}`}>Afinidades:</p>
<ul className={styles.dado} style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
  {numerologia.afinidades.map((item, index) => (
    <li key={index} style={{ color: '#333' }}>
<span style={{ color: '#4f0b82', fontSize: '25px' }}>• </span>
{item}
    </li>
  ))}
</ul>

                </div>

                <div className="mt-3">
                    <p className={`fw-bold ${styles.nomeInfo}`}>Conselho:</p>
                    <p className={styles.dado}>{numerologia.conselho}</p>
                </div>

                <center>
                    <button className={styles.componentButton} onClick={toggleModal}>
                        Editar
                    </button>
                </center>
            </div>

            {showModal && (
                <NumerologiaModal onCancel={toggleModal} userData={userData} />
            )}
        </>
    );
};