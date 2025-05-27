const astrologyDescriptions = {
    sun: {
        Áries: { label: "Áries", description: "Signo de fogo. Energia, impulso e iniciativa. Tem espírito de liderança e costuma agir antes de pensar." },
        Touro: { label: "Touro", description: "Signo de terra. Prático, persistente, sensorial. Valoriza conforto, estabilidade e segurança." },
        Gêmeos: { label: "Gêmeos", description: "Signo de ar. Comunicativo, versátil, curioso. Gosta de trocar ideias e conhecer coisas novas." },
        Câncer: { label: "Câncer", description: "Signo de água. Emotivo, protetor, ligado à família. Tem forte memória e sensibilidade." },
        Leão: { label: "Leão", description: "Signo de fogo. Expressivo, confiante e generoso. Busca reconhecimento e tende a liderar." },
        Virgem: { label: "Virgem", description: "Signo de terra. Analítico, detalhista e útil. Gosta de organização e de se sentir produtivo." },
        Libra: { label: "Libra", description: "Signo de ar. Diplomático, estético e social. Busca equilíbrio nas relações e nas decisões." },
        Escorpião: { label: "Escorpião", description: "Signo de água. Intenso, misterioso e transformador. Lida com profundezas emocionais e verdades ocultas." },
        Sagitário: { label: "Sagitário", description: "Signo de fogo. Aventureiro, filosófico, entusiasta. Busca expansão mental e liberdade." },
        Capricórnio: { label: "Capricórnio", description: "Signo de terra. Ambicioso, disciplinado, realista. Preza responsabilidade e estrutura." },
        Aquário: { label: "Aquário", description: "Signo de ar. Inovador, progressista e independente. Valoriza ideias novas e coletividade." },
        Peixes: { label: "Peixes", description: "Signo de água. Sensível, imaginativo, compassivo. Vive com um pé no mundo emocional e outro no espiritual." }
    },
    moon: {
        Aries: { label: "Áries", description: "Emoções intensas e impulsivas. Reage rapidamente, mas não guarda rancor." },
        Touro: { label: "Touro", description: "Busca estabilidade e conforto emocional. É afetuoso e resistente a mudanças." },
        Gêmeos: { label: "Gêmeos", description: "Emoções oscilantes. Precisa de estímulo mental para se sentir emocionalmente conectado." },
        Câncer: { label: "Câncer", description: "Extremamente sensível e protetor. Se nutre de vínculos afetivos profundos." },
        Leão: { label: "Leão", description: "Expressivo e caloroso emocionalmente. Deseja ser admirado e reconhecido." },
        Virgem: { label: "Virgem", description: "Analisa os próprios sentimentos com racionalidade. Pode reprimir emoções." },
        Libra: { label: "Libra", description: "Procura equilíbrio e harmonia emocional. Sensível ao ambiente e às relações." },
        Escorpião: { label: "Escorpião", description: "Emoções profundas, intensas e controladoras. Tem dificuldade em confiar." },
        Sagitário: { label: "Sagitário", description: "Emoções otimistas e expansivas. Precisa de liberdade emocional e movimento." },
        Capricórnio: { label: "Capricórnio", description: "Controla os sentimentos. Aparenta frieza, mas sente com profundidade e lealdade." },
        Aquário: { label: "Aquário", description: "Emoções independentes e desapegadas. Valoriza liberdade e pensamento racional." },
        Peixes: { label: "Peixes", description: "Profundamente empático e imaginativo. Pode absorver emoções alheias com facilidade." }
    },
    ascendant: {
        Áries: { label: "Áries", description: "Aparência ousada e direta. Iniciativa, espontaneidade e competitividade visíveis." },
        Touro: { label: "Touro", description: "Postura tranquila, paciente e sensual. Costuma ser teimoso e confiável." },
        Gêmeos: { label: "Gêmeos", description: "Aparência comunicativa, curiosa e inquieta. Olhar atento e falante." },
        Câncer: { label: "Câncer", description: "Jeito acolhedor, tímido e protetor. Aparência emocional e receptiva." },
        Leão: { label: "Leão", description: "Postura confiante, expressiva e nobre. Costuma chamar atenção naturalmente." },
        Virgem: { label: "Virgem", description: "Aparência séria, reservada e atenta aos detalhes. Postura modesta." },
        Libra: { label: "Libra", description: "Encantador, diplomático e esteticamente cuidadoso. Busca agradar e criar harmonia." },
        Escorpião: { label: "Escorpião", description: "Olhar penetrante, postura intensa e reservada. Inspira respeito ou mistério." },
        Sagitário: { label: "Sagitário", description: "Aparência expansiva, entusiasta e otimista. Gesto aberto e sincero." },
        Capricórnio: { label: "Capricórnio", description: "Postura séria, madura e focada. Aparência reservada e pragmática." },
        Aquário: { label: "Aquário", description: "Postura original, excêntrica e livre. Transmite ideias diferentes e independência." },
        Peixes: { label: "Peixes", description: "Jeito sonhador, gentil e intuitivo. Aparência sensível, às vezes dispersa." }
    }
};

module.exports = astrologyDescriptions;