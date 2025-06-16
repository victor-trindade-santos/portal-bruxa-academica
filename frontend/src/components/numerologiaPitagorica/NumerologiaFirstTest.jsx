import { useState } from "react";
import { NumerologiaModal } from "./NumerologiaModal";
import styles from '../../css/Numerologia.module.css';
import '../../css/TarotCards.css'


export const NumerologiaFirstTest = ({ userData, atualizarUserData }) => {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }


    return (
        <>
            <div>
                <h2 className={styles.sectionTitle}>Teste de Numerologia Pitagórica</h2>

                <p className={styles.textDescription}>
                    A numerologia pitagórica é um sistema simbólico que utiliza a data de nascimento
                    para revelar aspectos profundos da personalidade, talentos naturais e desafios de vida.
                    Ao realizar o teste, você descobrirá seu número pessoal e o significado por trás dele.
                </p>

                <button className="componentButton" onClick={toggleModal}>
                    Realizar teste
                </button>
            </div>

            {showModal && (
                <NumerologiaModal
                    onCancel={toggleModal}
                    userData={userData}
                    atualizarUserData={atualizarUserData}
                />
            )}
        </>
    )
}