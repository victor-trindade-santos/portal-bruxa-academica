import React from 'react';
import { useNavigate } from 'react-router-dom';
import card0 from '../../img/testTarot/0.jpg';
import card1 from '../../img/testTarot/1.jpg';
import card2 from '../../img/testTarot/2.jpg';
import card3 from '../../img/testTarot/3.jpg';
import card4 from '../../img/testTarot/4.jpg';
import card5 from '../../img/testTarot/5.jpg';
import card6 from '../../img/testTarot/6.jpg';
import card7 from '../../img/testTarot/7.jpg';
import card8 from '../../img/testTarot/8.jpg';
import card9 from '../../img/testTarot/9.jpg';
import card10 from '../../img/testTarot/10.jpg';
import card11 from '../../img/testTarot/11.jpg';
import card12 from '../../img/testTarot/12.jpg';
import card13 from '../../img/testTarot/13.jpg';
import card14 from '../../img/testTarot/14.jpg';
import card15 from '../../img/testTarot/15.jpg';
import card16 from '../../img/testTarot/16.jpg';
import card17 from '../../img/testTarot/17.jpg';
import card18 from '../../img/testTarot/18.jpg';
import card19 from '../../img/testTarot/19.jpg';
import card20 from '../../img/testTarot/20.jpg';
import card21 from '../../img/testTarot/21.jpg';
import '../../css/TarotCards.css'

function ResultTarotTest({ selectedCard, onGoBack }) {
  const navigate = useNavigate();

 const cardData = {
  'Carta 0': {
    title: 'O Louco',
    description: [
      'O Louco marca o início de uma jornada, cheia de espontaneidade, liberdade e um espírito aventureiro. Ele representa a pureza de um novo começo, livre das restrições do passado.',
      'Essa carta nos convida a confiar no universo e a abraçar o desconhecido sem garantias. É um chamado para o salto de fé, pois das experiências mais arriscadas nascem os maiores aprendizados.',
    ],
    image: card0,
  },
  'Carta 1': {
    title: 'O Mago',
    description: [
      'O Mago simboliza poder pessoal, iniciativa e habilidade de transformar ideias em realidade. Ele domina os quatro elementos — fogo, água, ar e terra — como instrumentos de criação.',
      'Quando essa carta aparece, indica que você possui todos os recursos internos e externos para atingir seus objetivos. Basta agir com foco, intenção clara e autoconfiança.',
    ],
    image: card1,
  },
  'Carta 2': {
    title: 'A Sacerdotisa',
    description: [
      'A Sacerdotisa é a guardiã do inconsciente, dos mistérios e do conhecimento interior. Ela representa intuição, silêncio e sabedoria que brota do âmago.',
      'Essa carta pede para que você desacelere, ouça seus sonhos e preste atenção aos sinais sutis. Muitas respostas não estão na lógica, mas no seu sentir interior.',
    ],
    image: card2,
  },
  'Carta 3': {
    title: 'A Imperatriz',
    description: [
      'A Imperatriz representa abundância, fertilidade e conexão com a natureza. Ela traz conforto, beleza e um senso de criação e crescimento.',
      'Ela nos lembra da importância do autocuidado, do amor e da recepção. Essa carta exalta a energia maternal, a criatividade frutífera e a celebração da vida.',
    ],
    image: card3,
  },
  'Carta 4': {
    title: 'O Imperador',
    description: [
      'O Imperador simboliza autoridade, estrutura, ordem e liderança. Ele é a figura patriarcal que traz estabilidade e regras.',
      'Quando surge, indica a necessidade de disciplina, planejamento e firmeza. Ele incentiva a construção de pilares sólidos e proteção contra o caos.',
    ],
    image: card4,
  },
  'Carta 5': {
    title: 'O Hierofante',
    description: [
      'O Hierofante é o mestre espiritual, guardião da tradição e dos ensinamentos coletivos. Ele representa fé, moral e orientação ética.',
      'Essa carta convida a buscar a sabedoria em rituais, instituições ou mentores. Ela indica valorizar o aprendizado formal e as conexões com algo maior que nós.',
    ],
    image: card5,
  },
  'Carta 6': {
    title: 'Os Enamorados',
    description: [
      'Os Enamorados representam amor, união, escolhas profundas e harmonia entre opostos. Eles falam de ligação emocional intensa.',
      'Essa carta pode indicar uma decisão importante no amor ou valores pessoais. Ela pede que você escolha com o coração e assuma responsabilidade pelas suas opções.',
    ],
    image: card6,
  },
  'Carta 7': {
    title: 'O Carro',
    description: [
      'O Carro simboliza determinação, controle e vitória pessoal. Ele representa a força de vontade que avança, mesmo diante de obstáculos.',
      'Ao aparecer, encoraja a manter o foco e disciplinar suas emoções e ações. A carta indica progresso e conquista por meio do equilíbrio entre força e direção.',
    ],
    image: card7,
  },
  'Carta 8': {
    title: 'A Força',
    description: [
      'A Força representa coragem, compaixão e domínio dos instintos. Ela mostra que a verdadeira bravura vem do controle gentil das emoções.',
      'Essa carta reforça que, mesmo diante de desafios, você tem a capacidade de enfrentar com paciência e ternura, transformando conflitos em força interna.',
    ],
    image: card8,
  },
  'Carta 9': {
    title: 'O Eremita',
    description: [
      'O Eremita simboliza introspecção, sabedoria interior e busca espiritual. Ele indica necessidade de pausa e reflexões profundas.',
      'Essa carta pede que você se afaste do barulho externo para ouvir seu guia interno. A jornada é silenciosa, sem pressa, em busca de verdades profundas.',
    ],
    image: card9,
  },
  'Carta 10': {
    title: 'A Roda da Fortuna',
    description: [
      'A Roda da Fortuna representa ciclos de vida, sorte, destino e impermanência. Ela traz a ideia de mudanças constantes.',
      'Essa carta lembra que nada é fixo — ante os altos vêm os baixos. Ela incentiva você a se adaptar, aprender com os ciclos e aproveitar as oportunidades.',
    ],
    image: card10,
  },
  'Carta 11': {
    title: 'A Justiça',
    description: [
      'A Justiça simboliza equilíbrio, verdade, integridade e responsabilidade. Ela traz à tona a necessidade de decisões justas e consequências.',
      'Essa carta pede que você aja com imparcialidade, honestidade e clareza. Avalie suas ações e esteja aberto às implicações de seus atos.',
    ],
    image: card11,
  },
  'Carta 12': {
    title: 'O Enforcado',
    description: [
      'O Enforcado representa sacrifício voluntário, rendição e nova perspectiva. Ele simboliza pausa e reflexão necessária.',
      'Essa carta convida a soltar velhas visões e aceitar situações em suspenso. Ela lembra que, às vezes, mudar o olhar resolve o impasse.',
    ],
    image: card12,
  },
  'Carta 13': {
    title: 'A Morte',
    description: [
      'A Morte simboliza transformação profunda, fim de ciclos e renascimento. Ela não é fim absoluto, mas renovação.',
      'Essa carta convida a deixar ir o que já não serve e preparar espaço para o novo. A qualquer fim segue um novo recomeço, mais maduras escolhas.',
    ],
    image: card13,
  },
  'Carta 14': {
    title: 'A Temperança',
    description: [
      'A Temperança representa equilíbrio, moderação e cura. Ela sugere união harmoniosa entre diferentes aspectos da vida.',
      'Essa carta pede que se encontre a medida certa, sem excessos. Ela incentiva paciência, integração e fluidez entre passado e futuro.',
    ],
    image: card14,
  },
  'Carta 15': {
    title: 'O Diabo',
    description: [
      'O Diabo simboliza apego, vícios, medo e padrões autodestrutivos. Ele expõe a ilusão da escravidão emocional.',
      'Essa carta nos alerta para zonas de sombra, onde nossos desejos nos aprisionam. Ela chama à consciência e à libertação dessas correntes.',
    ],
    image: card15,
  },
  'Carta 16': {
    title: 'A Torre',
    description: [
      'A Torre representa rupturas súbitas, crises e revelações chocantes. Ela derruba estruturas falsas.',
      'Essa carta, apesar de traumática, libera antigas verdades e gera espaço para reconstruir com sabedoria e autenticidade.',
    ],
    image: card16,
  },
  'Carta 17': {
    title: 'A Estrela',
    description: [
      'A Estrela simboliza esperança, inspiração, serenidade e guia espiritual. Ela traz paz após turbulências.',
      'Essa carta renova a fé e reconecta com o brilho interior. Ela diz que há luz ao final do túnel e que seu caminho tem propósito.',
    ],
    image: card17,
  },
  'Carta 18': {
    title: 'A Lua',
    description: [
      'A Lua representa mistério, ilusão, intuição e medo inconsciente. Ela revela cenários nebulosos e confusos.',
      'Essa carta pede atenção aos seus sonhos, intenções ocultas e aspectos internos. Ela revela que nem tudo é o que parece.',
    ],
    image: card18,
  },
  'Carta 19': {
    title: 'O Sol',
    description: [
      'O Sol simboliza sucesso, alegria, clareza e vitalidade. É luz plena após a escuridão.',
      'Essa carta anuncia momentos felizes, energia renovada e certeza. Ela convida a celebrar conquistas e seguir com otimismo.',
    ],
    image: card19,
  },
  'Carta 20': {
    title: 'O Julgamento',
    description: [
      'O Julgamento simboliza renascimento, avaliação e transformação interior. É o momento de prestar contas.',
      'Essa carta pede que você se liberte do passado e incorpore aprendizados. Ela anuncia chamada para uma nova vida com propósito e consciência.',
    ],
    image: card20,
  },
  'Carta 21': {
    title: 'O Mundo',
    description: [
      'O Mundo representa realização, conclusão de um ciclo e integração. É o ápice da jornada.',
      'Essa carta celebra a plenitude e a conexão com o todo. Ela indica sucesso, reconhecimento e preparação para um novo começo.',
    ],
    image: card21,
  },
};


  const data = cardData[selectedCard?.label];

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
 <h2 style={{ color: '#4f0b82', fontSize: '28px', textAlign: 'center' }}>
  Resultado do Tarot
</h2>
<div className="card-container">
  <img
    src={data?.image}
    alt={data?.title}
    className="card-image"
  />

  <div className="card-content">
    <h2>{data?.title || 'Carta não encontrada'}</h2>
    {data?.description?.map((para, idx) => (
      <p key={idx}>{para}</p>
    ))}
  </div>
</div>
      <br />

      <button
        onClick={onGoBack}
className={"componentButton"}      >
        Voltar
      </button>

    </div>
  );
}

export default ResultTarotTest;
