import globo from '../img/globo.jpg';
import galaxia from '../img/galaxia.jpg';
import carta from '../img/carta.jpg';
import styles from '../css/Carousel_Home.module.css';
import bruxa from '../img/carousel_home_slide1.jpg'
import astrologia from '../img/carousel_home_slide_astrologia.png'
import numerologia from '../img/carousel_home_slide_numerologia.png'
import magia from '../img/carousel_home_slide_magia.png'
import tarot from '../img/carousel_home_slide_tarot2.png'

function Carousel_Home() {
  return (

    <div id="carouselExampleDark" class="carousel carousel-dark slide">
      <div className={`carousel-indicators ${styles.carouselIndicators}`}>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div className="carousel-inner">
        {/* Primeiro slide com GIF + overlay */}
        <div className={`carousel-item active ${styles.carouselItemCustom}`}>
          <img src={astrologia} className={`d-block w-100 ${styles.carouselImage}`} alt="Slide 1" />
          <div className={styles.overlayAstrologia}>
            <div className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}>
              <h5 className={styles.carouselTitle}>Portal Bruxa Acadêmica</h5>
              <p className={styles.carouselDescription}>
                "Explore os mistérios do universo, conecte-se com a energia dos astros<br />
                e descubra a magia que habita dentro de você..."
              </p>
            </div>
          </div>
        </div>

        {/* Segundo slide */}
        <div className={`carousel-item ${styles.carouselItemCustom}`}>
          <img src={numerologia} className={`d-block w-100 ${styles.carouselImage}`} alt="Slide 2" />
          <div className={styles.overlayNumerologia}>
            <div className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}>
              <h5 className={styles.carouselTitle}>Second slide label</h5>
              <p className={styles.carouselDescription}>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
        </div>

        {/* Terceiro slide */}
        <div className={`carousel-item ${styles.carouselItemCustom}`}>
          <img src={magia} className={`d-block w-100 ${styles.carouselImage}`} alt="Slide 3" />
          <div className={styles.overlayMagia}>
            <div className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}>
              <h5 className={styles.carouselTitle}>Second slide label</h5>
              <p className={styles.carouselDescription}>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
        </div>

          {/* Quarto slide */}
          <div className={`carousel-item ${styles.carouselItemCustom}`}>
          <img src={tarot} className={`d-block w-100 ${styles.carouselImage}`} alt="Slide 4" />
          <div className={styles.overlayTarot}>
            <div className={`carousel-caption d-none d-md-block ${styles.carouselCaption}`}>
              <h5 className={styles.carouselTitle}>Second slide label</h5>
              <p className={styles.carouselDescription}>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
        </div>
</div>
      


      <button
        className={`carousel-control-prev ${styles.carouselBtn}`}
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className={`carousel-control-next ${styles.carouselBtn}`}
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

  )
}

export default Carousel_Home;