import { Link } from "react-router-dom";
import styles from '../../css/Numerologia.module.css';
import '../../css/TarotCards.css'


export const NumerologiaNotLoggedIn = () => {
    return (
        <div>

            <h2 className={styles.sectionTitle}>Teste de Numerologia Pitagórica</h2>

            <p className={styles.sectionDescription}>
                A numerologia pitagórica revela aspectos da sua personalidade a partir da sua data de nascimento.
                Cadastre-se gratuitamente para descobrir o seu número e entender seu significado!
            </p>

            <Link to="/register">
                <button className="componentButton">
                    Cadastrar
                </button>
            </Link>

        </div>
    );
};