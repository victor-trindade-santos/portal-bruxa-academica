import React from "react";
import styles from '../css/Header.module.css';

function Header({ title, backgroundImage, description }){
    return (
        <header
            className = {styles.Header}
            style = { { backgroundImage: `url(${backgroundImage})`} }
        >
            <h1 className = {styles.title}>{title}</h1>
            {description && 
                <p className={styles.description}>{description}</p>
            }
        </header>
    )
}

export default Header;