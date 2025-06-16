import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import TarotCards from './TarotCards';
import ResultTarotTest from './ResultTarotTest';
import LoadingModal from './LoadingModal';
import Container from '../Container';
import '../../css/TarotCards.css'

function TarotTest() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null); // guarda a carta escolhida
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const handleConfirm = () => {
        // fecha modal de confirmação
        setIsModalOpen(false);

        // mostra loading
        setIsLoading(true);

        // depois de 2 segundos, mostra resultado
        setTimeout(() => {
            setIsLoading(false);
            setShowResult(true);
        }, 1500);
    };

    const handleCancel = () => {
        console.log('Ação cancelada.');
        setIsModalOpen(false);
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
        console.log('Carta selecionada:', card.label);
    };

    const handleGoBack = () => {
        setShowResult(false);
        setSelectedCard(null); // opcional: limpa a seleção
    };

    if (showResult) {
        return <ResultTarotTest selectedCard={selectedCard} onGoBack={handleGoBack} />;
    }
    return (
        <Container>
            <div>
                <h2 style={{
                    color: '#4f0b82',
                    fontSize: '28px',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    Teste de Tiragem
                </h2>


                <TarotCards onCardSelect={handleCardSelect} />
                <br /><br />
                <center>
                    {/* Botão de confirmar (desabilitado até selecionar carta) */}
<button
  onClick={openModal}
  disabled={!selectedCard}
  className={`componentButton ${!selectedCard ? 'disabled' : ''}`}
>
  Selecionar carta
</button>

                </center>

                {/* Modal */}
                {isModalOpen && (
                    <ConfirmationModal
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}

                {isLoading && <LoadingModal message="🔮 Revelando sua carta..." />}

            </div>
        </Container>
    );
}

export default TarotTest;
