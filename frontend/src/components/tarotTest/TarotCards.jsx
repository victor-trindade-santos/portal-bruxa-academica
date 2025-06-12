import React, { useState, useEffect } from 'react';
import '../../css/TarotCards.css';
import verso from '../../img/testTarot/verso.png';

const cards = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  label: `Carta ${i}`
}));

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function TarotCards({ onCardSelect }) {
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    const randomized = shuffleArray(cards);
    setShuffledCards(randomized);
  }, []);

  const handleClick = (card) => {
    onCardSelect(card);
  };

  return (
    <div>
      <div className="starot-cards-container">
        {shuffledCards.map((card) => (
          <div
            key={card.id}
            className="tarot-card"
            onClick={() => handleClick(card)}
            tabIndex={0}
            role="button"
          >
            <img src={verso} alt="Carta de tarô" className="tarot-card-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarotCards;
