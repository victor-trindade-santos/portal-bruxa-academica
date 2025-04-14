import globo from '../img/globo.jpg'
import galaxia from '../img/galaxia.jpg'
import carta from '../img/carta.jpg'
import styles from '../css/Carousel.module.css'

function Carousel() {

    return(
        <div className = {styles.carouselContainer}>
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
    
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
    
            <div className="carousel-inner">
              <div className={`carousel-item active ${styles.carouselItem}`}>
                <img src= {globo} className={`d-block w-100 ${styles.carouselItemImg}`} alt="Imagem 1"/>
              </div>
              <div className={`carousel-item active ${styles.carouselItem}`}>
                <img src= {galaxia} className={`d-block w-100 ${styles.carouselItemImg}`} alt="Imagem 2"/>
              </div>
              <div className={`carousel-item active ${styles.carouselItem}`}>   
                <img src= {carta} className={`d-block w-100 ${styles.carouselItemImg}`} alt="Imagem 3"/>
              </div>
            </div>
            
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
    )
}

export default Carousel;