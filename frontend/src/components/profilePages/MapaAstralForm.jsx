import { useState } from 'react';
import styles from '../../css/Perfil.module.css';
import VerificationMapaAstral from '../modal/VerificationMapaAstral';

const MapaAstralForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});

  const handleOpenModal = () => {
    console.log('🟡 Abrindo o modal de verificação de dados para o mapa astral..');
    setShowModal(true);
  };


  const handleCancel = () => {
    console.log('🚫 Ação de geração de mapa astral cancelada.');
    setShowModal(false);
  };

  return (
    <>
      <div className={`card p-4 ${styles.resumoSigno}`}>
        <div>
          <h6 className={`fw-bold ${styles.titResumo}`}>Mapa Astral</h6>
          <p className={`mb-0 ${styles.resumo}`}>
            Descubra o que o seu mapa astral tem a dizer sobre você! Adicione mais algumas informações para gerar o seu mapa astral!
          </p>
        </div>
        <hr />
        <center>
        <button className={styles.componentButton} onClick={handleOpenModal}>
          Gerar Mapa Astral
        </button>
        </center>

      </div>

      {showModal && (
        <VerificationMapaAstral
          message="Precisamos de alguns dados para continuar..."
          onCancel={handleCancel}
          userData={userData}
          setUserData={setUserData}
          requiredFields={["birthDate", "birthCity", "birthTime"]}
        />
      )}
    </>
  );
};

export default MapaAstralForm;