export const possuiDadosDeMapaAstral = (user) => {
    return (
        user?.birthDate &&
        user?.birthTime &&
        user?.birthCity &&
        user?.sunSign &&
        user?.moonSign &&
        user?.ascendantSign
    );
};
