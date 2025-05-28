import React, { useState } from 'react';
import styles from '../../css/Perfil.module.css';
import VerificationMapaAstral from '../modal/VerificationMapaAstral';

const MapaAstralPreenchido = ({
    sunSign,
    sunDescription,
    moonSign,
    moonDescription,
    ascendantSign,
    ascendantDescription,
    mapaCalculadoEm,
}) => {

    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({});


    function toggleModal() {
        setShowModal(!showModal);
    }



    return (

        <>

            <div className={`card p-4 ${styles.resumoSigno}`}>
                <div className="mb-3 d-flex align-items-center">
                    <i className={`bi bi-sun fs-4 me-2 mt-0 ${styles.nome}`}></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.nomeInfo}`}>Signo Solar:</p>
                    <p className={`mb-0 ms-1 ${styles.dado}`}>{sunSign || 'N/A'}</p>
                </div>
                <p className={`ms-4 mb-3 ${styles.dado}`}>{sunDescription || 'Sem descrição.'}</p>

                <div className="mb-3 d-flex align-items-center">
                    <i className={`bi bi-moon fs-4 me-2 mt-0 ${styles.nome}`}></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.nomeInfo}`}>Signo Lunar:</p>
                    <p className={`mb-0 ms-1 ${styles.dado}`}>{moonSign || 'N/A'}</p>
                </div>
                <p className={`ms-4 mb-3 ${styles.dado}`}>{moonDescription || 'Sem descrição.'}</p>

                <div className="mb-3 d-flex align-items-center">
                    <i className={`bi bi-arrow-up-circle fs-4 me-2 mt-0 ${styles.nome}`}></i>
                    <p className={`mb-0 fw-bold mt-0 ${styles.nomeInfo}`}>Ascendente:</p>
                    <p className={`mb-0 ms-1 ${styles.dado}`}>{ascendantSign || 'N/A'}</p>
                </div>
                <p className={`ms-4 mb-3 ${styles.dado}`}>{ascendantDescription || 'Sem descrição.'}</p>

                <button className={styles.logoutBtn} onClick={toggleModal}>
                    Editar
                </button>

                {mapaCalculadoEm && (
                    <p className={`text-muted mt-3 ${styles.dado}`} style={{ fontSize: '0.9em' }}>
                        Mapa calculado em: {new Date(mapaCalculadoEm).toLocaleString()}
                    </p>
                )}
            </div>


            {showModal && (
                <VerificationMapaAstral
                    message="Precisamos de alguns dados para continuar..."
                    onCancel={toggleModal}
                    userData={userData}
                    setUserData={setUserData}
                    requiredFields={["birthDate", "birthCity", "birthTime"]}
                />
            )}
        </>
    );
};

export default MapaAstralPreenchido;
