import Card from '../components/Card';
import Carousel from '../components/Carousel';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';
import Carousel_Home from '../components/Carousel_Home';
import Video from '../components/Video';
import VideoAstrologia from '../video/video1.jsx';
import VideoTarot from '../video/video2.jsx';
import VideoNumerologia from '../video/video3.jsx';
import styles from '../css/Home.module.css'
import HeaderIMG from '../img/Header.png';

import Header from '../components/Header';

function Home() {
    const card_video1 = [
        {
            video: VideoAstrologia,
            title: "Interpretando o Mapa Astral",
            description: "Aprenda a ler seu mapa astral de forma simples, entendendo signos, casas e planetas.",
            subtitle: "Astrologia",
            url: "https://www.youtube.com/watch?v=SMureUD4h_c"
        }
    ]

    const card_video2 = [
        {
            video: VideoTarot,
            title: "Interpretando a Tiragem",
            description: "Aprenda a interpretar sua tiragem de forma simples, entendendo simbolos e interpretações.",
            subtitle: "Tarot",
            url: "https://www.youtube.com/watch?v=9sOm-oZNFNc",
            color: "#2B089C"
        }
    ]

    const card_video3 = [
        {
            video: VideoNumerologia,
            title: "Interpretando os Números",
            description: "Descubra seu potencial e seja quem você nasceu para ser, viva sua melhor versão e transforme a sua vida! Você merece todo sucesso que o destino guardou para você! Invista na sua felicidade! Faça como as grandes celebridades e empresários de sucesso, faça o seu Mapa Numerológico!",
            subtitle: "Numerologia",
            url: "https://www.youtube.com/watch?v=fb8M1kflxCs",
            color: "#8C089C"
        }
    ]

    const courses = [
        {
            image: courseImage1,
            title: "Curso 1",
            description: "Descrição do curso 1"
        },
        {
            image: courseImage2,
            title: "Curso 2",
            description: "Descrição do curso 2"
        },
        {
            image: courseImage1,
            title: "Curso 3",
            description: "Descrição do curso 3"
        },
        {
            image: courseImage2,
            title: "Curso 4",
            description: "Descrição do curso 4"
        }
    ]



    return (
        <>
            <Carousel_Home />
            <div className={styles.sectionDivider}></div>
            <h1 className={styles.h1}>Astrologia: descubra como funciona </h1>
            <p className={styles.p}>Entenda a ciência e magia por trás dessa arte mística</p>
            {card_video1.map((videoCard, index) => (
                <div key={index}>
                    <Video
                        video={videoCard.video}
                        title={videoCard.title}
                        description={videoCard.description}
                        subtitle={videoCard.subtitle}
                        url={videoCard.url}
                        color={videoCard.color}
                    />
                </div>
            ))}
            <div className={styles.sectionDivider}></div>
            <h1 className={styles.h1}>Tarot: descubra os segredos de uma boa tiragem </h1>
            <p className={styles.p}>Aprenda a fazer uma tiragem precisa</p>
            {card_video2.map((videoCard, index) => (
                <div key={index}>
                    <Video
                        video={videoCard.video}
                        title={videoCard.title}
                        description={videoCard.description}
                        subtitle={videoCard.subtitle}
                        url={videoCard.url}
                        color={videoCard.color}
                    />
                </div>
            ))}
            {/* <Carousel /> */}
            <div className={styles.sectionDivider}></div>
            <h1 className={styles.h1}>Numerologia: veja o que os números tem a te dizer</h1>
            <p className={styles.p}>Aprenda a calcular sua sorte</p>
            {card_video3.map((videoCard, index) => (
                <div key={index}>
                    <Video
                        video={videoCard.video}
                        title={videoCard.title}
                        description={videoCard.description}
                        subtitle={videoCard.subtitle}
                        url={videoCard.url}
                        color={videoCard.color}
                    />
                </div>
            ))}
        </>
    )
}

export default Home;