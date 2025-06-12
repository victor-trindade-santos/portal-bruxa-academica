import { useEffect, useState } from "react";
import { useCalculoPitagorico } from "../../hooks/useCalculoPitagorico";

import { NumerologiaFirstTest } from "./NumerologiaFirstTest";
import { NumerologiaData } from "./NumerologiaData";

export const NumerologiaLoggedIn = ({ userData }) => {


    useEffect(() => {

        console.log(userData)

    }, [userData])

    return (
        <>
            {!userData.lifePathNumber ? <NumerologiaFirstTest userData={userData} /> : <NumerologiaData userData={userData} />}

        </>
    );
};