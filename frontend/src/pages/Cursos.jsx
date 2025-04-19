import Card from '../components/Card';
import MagiaIMG from '../img/magia.png';
import Header from '../components/Header';
import articleImage from '../img/artigofoto.jpg';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';
import styles from '../css/Magia.module.css';

function Cursos() {

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
            <div>
                <Header
                    title="Cursos"
                    backgroundImage={MagiaIMG}
                    description="Conhecimentos místicos que transcendem o comum."
                />
                <div className={styles.sectionDivider}></div>
                <div className="container">
                    <div className="row g-4">
                        {courses.map((course, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4">
                                <Card
                                    image={course.image}
                                    title={course.title}
                                    description={course.description}
                                    link={course.link}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cursos;