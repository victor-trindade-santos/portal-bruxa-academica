import styles from '../css/Barra_Pesquisa.module.css'
import lupa from '../../public/magnifying-glass.svg'

function Barra_Pesquisa() {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Digite o nome do artigo"
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} type="button">
                    <img src={lupa} alt="Ícone de busca" className={styles.searchIcon} />
                </button>

            </div>
        </div>
    )
}

export default Barra_Pesquisa;