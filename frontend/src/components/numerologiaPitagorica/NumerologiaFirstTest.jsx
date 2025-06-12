import { useState } from "react";
import { NumerologiaModal } from "./NumerologiaModal";


export const NumerologiaFirstTest = ({userData}) => {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }


    return (
        <>
            <div>
                <h2>Teste de Numerologia Pitagórica</h2>

                <p>
                    A numerologia pitagórica é um sistema simbólico que utiliza a data de nascimento
                    para revelar aspectos profundos da personalidade, talentos naturais e desafios de vida.
                    Ao realizar o teste, você descobrirá seu número pessoal e o significado por trás dele.
                </p>

                <button onClick={toggleModal}>
                    Realizar teste
                </button>
            </div>

            {showModal && (
                <NumerologiaModal onCancel={toggleModal} userData={userData} />
            )}
        </>
    )
}