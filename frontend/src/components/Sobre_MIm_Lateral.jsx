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
                ✦ Márcia Silva ✦
            </h1>
            <h1 className={styles.description}>
                Professora de RH na FATEC da Zona Leste, e astróloga nas horas vagas 
            </h1>
        </div>
    )
}

export default Sobre_Mim_Lateral;