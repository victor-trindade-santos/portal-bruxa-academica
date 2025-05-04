import styles from '../css/Barra_Categoria.module.css'
import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionamento após logout

function Barra_Categoria() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Categorias</h1>
            <h1 className={styles.option}>
                <Link to="/" className={styles.navLink}>✦ Astrologia</Link>
            </h1>           
            <h1 className={styles.option}><Link to="/" className={styles.navLink} >✦ Numerologia</Link></h1>
            <h1 className={styles.option}><Link to="/" className={styles.navLink}>✦ Tarologia</Link></h1>
            <h1 className={styles.option}><Link to="/" className={styles.navLink} >✦ Magia</Link></h1>
        </div>
    )
}

export default Barra_Categoria;