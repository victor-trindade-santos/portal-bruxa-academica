import style from "../css/Video.module.css"
import { truncateDescription } from '../utils/descriptionUtils';
import imgMoldura from '../img/moldura_card_videos.png'
import React from 'react';


function Video({ video, title, description, subtitle,url,color }) {

    const truncatedDescription = truncateDescription(description, 100);

    const handleRedirect = () => {
        window.open(url, '_blank');
      };
    

    return (
        <div className={`row g-0 justify-content-center ${style.colCustom}`}>
            <div className={`col-12 col-md-6 ${style.colLeft}`} {...(color ? { style: { backgroundColor: color } } : {})}>
                <img src={imgMoldura} className={style.molduraImg} alt="Moldura" />
                <div className={style.contentWrapper}>
                    <h5 className={style.subtitle}>{subtitle}</h5>
                    <h3 className={style.title}>{title}</h3>
                    <p className={`card-text ${style.description}`}>{truncatedDescription}</p>
                    <button className={style.btnCustom} onClick={handleRedirect}>
                        Saiba Mais
                    </button>
                </div>
            </div>
            <div className={`col-12 col-md-6 ${style.colRight}`}>
                {/* Contêiner com a proporção 16:9 para o vídeo */}
                <div className="videoWrapper">
                    {video && React.createElement(video)}
                </div>            </div>
        </div>

    )
}

export default Video;