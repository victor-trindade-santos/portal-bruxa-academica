import { useEffect, useState } from "react";
import { NumerologiaFirstTest } from "./NumerologiaFirstTest";
import { NumerologiaData } from "./NumerologiaData";

export const NumerologiaLoggedIn = ({ userData }) => {
    const [user, setUser] = useState(userData);

    const atualizarUserData = (novosDados) => {
        setUser(prev => ({ ...prev, ...novosDados }));
    };

    return (
        <>
            {!user.lifePathNumber 
              ? <NumerologiaFirstTest userData={user} atualizarUserData={atualizarUserData} /> 
              : <NumerologiaData userData={user} atualizarUserData={atualizarUserData} />}
        </>
    );
};