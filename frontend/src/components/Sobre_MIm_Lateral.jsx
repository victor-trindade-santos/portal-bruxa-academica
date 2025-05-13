import styles from '../css/Sobre_Mim_Lateral.module.css'
import perfil from '../img/profile.png'


function Sobre_Mim_Lateral() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Sobre Mim
            </h1>
            <img src={perfil} className={styles.imageProfile} />
            <h1 className={styles.nameTitle}>
                ✦ Márcia Sobrenome ✦
            </h1>
            <h1 className={styles.description}>
                Breve descrição Breve descrição Breve Descrição Breve Descrição Breve Descri
            </h1>
        </div>
    )
}

export default Sobre_Mim_Lateral;