import { NumerologiaLoggedIn } from "./numerologiaLoggedIn";
import { NumerologiaNotLoggedIn } from "./numerologiaNotLoggedIn";
import { getUser } from "../../hooks/getUser";

export const NumerologiaSection = () => {
    const { user, loading, error } = getUser();

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p >Erro: {error}</p>;
    }

    return (
        <div>
            {user ? <NumerologiaLoggedIn userData={user} /> : <NumerologiaNotLoggedIn />}
        </div>
    );
};

export default NumerologiaSection;