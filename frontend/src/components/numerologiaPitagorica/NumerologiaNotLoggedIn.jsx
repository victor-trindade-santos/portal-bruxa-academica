import { Link } from "react-router-dom";

export const NumerologiaNotLoggedIn = () => {
    return (
        <div>

            <h2>Teste de Numerologia Pitagórica</h2>

            <p>
                A numerologia pitagórica revela aspectos da sua personalidade a partir da sua data de nascimento.
                Cadastre-se gratuitamente para descobrir o seu número e entender seu significado!
            </p>

            <Link to="/register">
                <button>
                    Cadastrar
                </button>
            </Link>

        </div>
    );
};