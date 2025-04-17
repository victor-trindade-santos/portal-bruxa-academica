import Card from '../components/Card';
import courseImage1 from '../img/card_tipo1.jpg';
import courseImage2 from '../img/Card-tipo2(fundo).jpg';

function Numerologia() {

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

    return(
        <>
          <h1> Numerologia </h1>
          <div className = "container">
                <div className = "row g-4">
                    {courses.map((course, index) => (
                        <div key = {index} className = "col-12 col-sm-6 col-md-4">
                            <Card
                                image = {course.image}
                                title = {course.title}
                                description= {course.description}
                                link = {course.link}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Numerologia;