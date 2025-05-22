    import React, { useState, useEffect } from 'react';
    import styles from '../../css/Perfil.module.css';
    import VerificationMapaAstral from '../modal/VerificationMapaAstral';

    // const MapaAstral = () => {
    //     const [showModal, setShowModal] = useState(false);
    //     const [userData, setUserData] = useState({});


    //     const handleOpenModal = () => {
    //         console.log('🟡 Abrindo o modal de verificação de dados para o mapa astral..');
    //         setShowModal(true);
    //     };

    //     const handleVerificationMapaAstralConfirm = () => {
    //         console.log('🧹 Confirmado. Aqui você pode gerar o mapa astral.');
    //         setShowModal(false);
    //         // Aqui você pode chamar a função para gerar o mapa astral de verdade
    //     };

    //     const handleCancel = () => {
    //         console.log('🚫 Ação de geração de mapa astral cancelada.');
    //         setShowModal(false);
    //     };

    //     return (
    //         <>
    //             <div className={`card p-4 ${styles.resumoSigno}`}>
    //                 <div>
    //                     <h6 className={`fw-bold ${styles.titResumo}`}>Seu Signo</h6>
    //                     <p className={`mb-0 ${styles.resumo}`}>
    //                         Descubra o que o seu seu signo tem a dizer sobre você! Adicione mais algumas informações para analisarmos seu signo!
    //                     </p>
    //                 </div>
    //                 <hr />
    //                 <button onClick={handleOpenModal}>
    //                     Analisar Signo
    //                 </button>


    //             </div>

    //             {showModal && (
    //                 <VerificationMapaAstral
    //                     message="Precisamos de alguns dados para continuar..."
    //                     onCancel={handleCancel}
    //                     userData={userData}
    //                     setUserData={setUserData}
    //                     requiredFields={["birthDate"]}
    //                 />


    //             )}
    //         </>
    //     );
    // };

    // export default MapaAstral;

const signosData = [
  {
    nome: "Áries",
    elemento: "Fogo",
    planetaRegente: "Marte",
    luaSignificado:
      "A Lua em Áries confere uma resposta emocional rápida e direta, trazendo coragem e uma necessidade de independência.",
    planetaRegenteDescricao:
      "Marte é o planeta da ação, energia e iniciativa. Pessoas regidas por Marte tendem a ser corajosas, impulsivas e líderes naturais.",
    descricaoPersonalidade:
      "Áries é conhecido por ser aventureiro, confiante e cheio de energia. Gosta de desafios e tem espírito competitivo."
  },
  {
    nome: "Touro",
    elemento: "Terra",
    planetaRegente: "Vênus",
    luaSignificado:
      "A Lua em Touro traz estabilidade emocional, um forte apego ao conforto e à segurança, além de uma natureza paciente.",
    planetaRegenteDescricao:
      "Vênus é o planeta do amor, beleza e harmonia. Quem é regido por Vênus valoriza relacionamentos estáveis, prazer e o mundo material.",
    descricaoPersonalidade:
      "Taurinos são práticos, leais e gostam de desfrutar as coisas boas da vida. Possuem grande determinação e paciência."
  },
  {
    nome: "Gêmeos",
    elemento: "Ar",
    planetaRegente: "Mercúrio",
    luaSignificado:
      "A Lua em Gêmeos traz uma mente ágil e emocionalmente comunicativa, buscando constante estímulo intelectual.",
    planetaRegenteDescricao:
      "Mercúrio rege a comunicação, o raciocínio e a versatilidade. Pessoas de Gêmeos são curiosas, adaptáveis e sociáveis.",
    descricaoPersonalidade:
      "Gêmeos são comunicativos, inteligentes e gostam de variedade. Possuem um espírito jovem e são excelentes em se adaptar."
  },
  {
    nome: "Câncer",
    elemento: "Água",
    planetaRegente: "Lua",
    luaSignificado:
      "A Lua é o regente natural de Câncer, intensificando as emoções, a sensibilidade e o instinto protetor.",
    planetaRegenteDescricao:
      "A Lua governa as emoções e o inconsciente. Cancerianos são profundamente intuitivos, cuidadosos e valorizam a família.",
    descricaoPersonalidade:
      "Câncer é carinhoso, protetor e emocionalmente profundo. Valoriza laços familiares e a segurança emocional."
  },
  {
    nome: "Leão",
    elemento: "Fogo",
    planetaRegente: "Sol",
    luaSignificado:
      "A Lua em Leão confere uma forte necessidade de reconhecimento emocional e uma natureza calorosa e generosa.",
    planetaRegenteDescricao:
      "O Sol simboliza a identidade, vitalidade e liderança. Leoninos são confiantes, criativos e gostam de estar no centro das atenções.",
    descricaoPersonalidade:
      "Leão é carismático, apaixonado e cheio de energia. Gosta de liderar e inspirar os outros."
  },
  {
    nome: "Virgem",
    elemento: "Terra",
    planetaRegente: "Mercúrio",
    luaSignificado:
      "A Lua em Virgem traz uma mente analítica às emoções, com uma necessidade de ordem e perfeição nos sentimentos.",
    planetaRegenteDescricao:
      "Mercúrio rege o pensamento crítico e a comunicação. Virginianos são detalhistas, práticos e com grande senso de responsabilidade.",
    descricaoPersonalidade:
      "Virgem é meticuloso, organizado e busca constantemente melhorar a si mesmo e o ambiente ao seu redor."
  },
  {
    nome: "Libra",
    elemento: "Ar",
    planetaRegente: "Vênus",
    luaSignificado:
      "A Lua em Libra enfatiza a busca por equilíbrio emocional e harmonia nas relações pessoais.",
    planetaRegenteDescricao:
      "Vênus rege o amor, a beleza e o equilíbrio. Librianos são diplomáticos, encantadores e valorizam a justiça e a parceria.",
    descricaoPersonalidade:
      "Libra é sociável, justo e apreciador da arte e da beleza. Busca sempre a paz e o entendimento."
  },
  {
    nome: "Escorpião",
    elemento: "Água",
    planetaRegente: "Plutão",
    luaSignificado:
      "A Lua em Escorpião intensifica as emoções profundas e a capacidade de transformação interna.",
    planetaRegenteDescricao:
      "Plutão representa transformação, poder e renascimento. Escorpianos são intensos, determinados e misteriosos.",
    descricaoPersonalidade:
      "Escorpião é apaixonado, reservado e dotado de grande força emocional e intuição."
  },
  {
    nome: "Sagitário",
    elemento: "Fogo",
    planetaRegente: "Júpiter",
    luaSignificado:
      "A Lua em Sagitário traz um otimismo emocional e uma necessidade de liberdade e aventura.",
    planetaRegenteDescricao:
      "Júpiter é o planeta da expansão, sorte e filosofia. Sagitarianos são aventureiros, otimistas e gostam de explorar o mundo.",
    descricaoPersonalidade:
      "Sagitário é entusiasta, honesto e cheio de energia. Busca o conhecimento e novas experiências."
  },
  {
    nome: "Capricórnio",
    elemento: "Terra",
    planetaRegente: "Saturno",
    luaSignificado:
      "A Lua em Capricórnio confere disciplina emocional e uma necessidade de segurança através do trabalho e conquistas.",
    planetaRegenteDescricao:
      "Saturno rege a responsabilidade, a disciplina e a estrutura. Capricornianos são focados, práticos e perseverantes.",
    descricaoPersonalidade:
      "Capricórnio é determinado, ambicioso e sabe trabalhar duro para alcançar seus objetivos."
  },
  {
    nome: "Aquário",
    elemento: "Ar",
    planetaRegente: "Urano",
    luaSignificado:
      "A Lua em Aquário traz uma necessidade emocional por liberdade e inovação, fazendo com que a pessoa valorize amizades e conexões intelectuais.",
    planetaRegenteDescricao:
      "Urano representa a revolução, a inovação e a originalidade. Quem é regido por Urano tende a ser visionário, independente e atraído por mudanças.",
    descricaoPersonalidade:
      "Pessoas de Aquário geralmente são criativas, independentes, intelectuais e gostam de ideias inovadoras. Valorizam a liberdade e tendem a ser originais e um pouco imprevisíveis."
  },
  {
    nome: "Peixes",
    elemento: "Água",
    planetaRegente: "Netuno",
    luaSignificado:
      "A Lua em Peixes intensifica a sensibilidade emocional, fazendo com que a pessoa seja muito empática e intuitiva.",
    planetaRegenteDescricao:
      "Netuno é o planeta dos sonhos, da espiritualidade e da imaginação. Quem é regido por Netuno tende a ser sonhador, compassivo e artístico.",
    descricaoPersonalidade:
      "Pessoas de Peixes são intuitivas, emotivas e compassivas, com forte conexão com o mundo espiritual e artístico."
  },
];

// Função para calcular signo pela data
function getSigno(birthDate) {
  const date = new Date(birthDate);
  if (isNaN(date)) return null;
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return signosData.find(s => s.nome === "Áries");
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return signosData.find(s => s.nome === "Touro");
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return signosData.find(s => s.nome === "Gêmeos");
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return signosData.find(s => s.nome === "Câncer");
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return signosData.find(s => s.nome === "Leão");
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return signosData.find(s => s.nome === "Virgem");
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return signosData.find(s => s.nome === "Libra");
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return signosData.find(s => s.nome === "Escorpião");
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return signosData.find(s => s.nome === "Sagitário");
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return signosData.find(s => s.nome === "Capricórnio");
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return signosData.find(s => s.nome === "Aquário");
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return signosData.find(s => s.nome === "Peixes");

  return null;
}

const MapaAstral = () => {
  const [showModal, setShowModal] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [signo, setSigno] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedBirthDate = localStorage.getItem('birthDate');
    const savedSigno = localStorage.getItem('signo');

    if (savedBirthDate) setBirthDate(savedBirthDate);
    if (savedSigno) setSigno(JSON.parse(savedSigno));
  }, []);

  const handleOpenModal = () => {
    setError('');
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!birthDate) {
      setError('Por favor, preencha a data de nascimento.');
      return;
    }

    const signoEncontrado = getSigno(birthDate);
    if (!signoEncontrado) {
      setError('Data inválida para determinar signo.');
      return;
    }

    setSigno(signoEncontrado);
    setShowModal(false);

    localStorage.setItem('birthDate', birthDate);
    localStorage.setItem('signo', JSON.stringify(signoEncontrado));
  };

  const handleCancel = () => {
    setError('');
    setShowModal(false);
  };

  return (
    <>
      <div className={`card p-4 ${styles.resumoSigno}`}>
        {!signo ? (
          <>
            <h6 className={`fw-bold ${styles.titResumo}`}>Seu Signo</h6>
            <p className={`mb-0 ${styles.resumo}`}>
              Descubra o que o seu signo tem a dizer sobre você! Adicione sua data de nascimento para que possamos analisar seu signo.
            </p>
            <button onClick={handleOpenModal} className={styles.editarBtn}>
              Analisar Signo
            </button>
          </>
        ) : (
          <>
            <div className="mb-3 d-flex align-items-center">
              <i className={`bi bi-stars fs-4 me-2 mt-0 ${styles.nome}`}></i>
              <p className={`mb-0 fw-bold mt-0 ${styles.nomeInfo}`}>Seu signo:</p>
              <p className={`mb-0 ms-1 ${styles.dado}`}>{signo.nome}</p>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <i className={`bi bi-wind fs-4 me-2 mt-0 ${styles.nome}`}></i>
              <p className={`mb-0 mt-0 fw-bold ${styles.nomeInfo}`}>Elemento:</p>
              <p className={`mb-0 ms-1 ${styles.dado}`}>{signo.elemento}</p>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <i className={`bi bi-globe-americas fs-4 me-2 mt-0 ${styles.nomeInfo}`}></i>
              <p className={`mb-0 mt-0 fw-bold ${styles.nomeInfo}`}>Planeta Regente:</p>
              <p className={`mb-0 ms-1 ${styles.dado}`}>{signo.planetaRegente}</p>
            </div>
<div className="mb-3">
  <div className="d-flex align-items-center mb-1">
    <i className={`bi bi-moon fs-4 me-2 ${styles.nomeInfo}`}></i>
    <p className={`mb-0 fw-bold ${styles.nomeInfo}`}>Significado da Lua:</p>
  </div>
  <p className={`mb-0 ms-4 ${styles.dado}`}>{signo.luaSignificado}</p>
</div>

<div className="mb-3">
  <div className="d-flex align-items-center mb-1">
    <i className={`bi bi-star fs-4 me-2 ${styles.nomeInfo}`}></i>
    <p className={`mb-0 fw-bold ${styles.nomeInfo}`}>Descrição do Planeta Regente:</p>
  </div>
  <p className={`mb-0 ms-4 ${styles.dado}`}>{signo.planetaRegenteDescricao}</p>
</div>

            <hr />
            <div>
              <h6 className={`fw-bold ${styles.titResumo}`}>Resumo de personalidade:</h6>
              <p className={`mb-0 ${styles.resumo}`}>{signo.descricaoPersonalidade}</p>
            </div>
            <button onClick={handleOpenModal} className={styles.editarBtn}>
              Editar Data de Nascimento
            </button>
          </>
        )}
      </div>

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Informe sua Data de Nascimento</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="date"
                  className="form-control"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapaAstral;