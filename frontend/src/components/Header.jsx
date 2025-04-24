import React from "react";
import styles from '../css/Header.module.css';
import headerIMG from '../img/Header.png';

function Header({ title, description, backgroundImage}) {

    return (
        <header
            className={styles.Header}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >


            <img src="../../Logo_Portal-Bruxa.svg" alt="Logo" style={{ height: '150px' }} />


            <h3 className={`fs-1 ${styles.title}`}>{title}</h3>
            {description &&
                < p className={`text-center fs-5 ${styles.description}`}>
                    {description}
                </p>
            }

            <button type="button" className={`btn ${styles.cursosBTN}`}>Conheça meus cursos<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2625 7.63636H13.4443V14H0.444336V0H6.35343V1.27273H1.62615V12.7273H12.2625V7.63636ZM13.4443 0V6.36364H12.2625V2.17756L6.76891 8.08381L5.93794 7.18892L11.4223 1.27273H7.53524V0H13.4443Z" fill="#FFFF00" />
            </svg>
            </button>

        </header >
    )
}

export default Header;