import styles from '../css/ArticleTemplate.module.css'
import image from '../img/imageArticle.png'

function ArticleTemplate() {
    return (
        <div className={styles.sectionArticle}>
            <h1 className={styles.titleArticle}>
                Astrologia e Tarot: Uma Integração de Saberes
            </h1>

            <p className={styles.textAuthor}>Por:{ }</p>

            <p className={styles.textPublicationDate}>Data de Publicação:{ }</p>

            <img src={image} className={styles.imageArticle} />

            {/* <div>
                {newArticle.firstContent.split('\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                ))}
            </div>

            <div>
                {newArticle.secondContent.split('\n').map((para, idx) => (
                    <p key={`second-${idx}`}>{para}</p>
                ))}
            </div> */}

            <p className={styles.textArticle}>
                A astrologia e o tarot são dois sistemas simbólicos milenares que, embora distintos em suas origens e métodos, compartilham o propósito de oferecer compreensão sobre os ciclos da vida e os caminhos da alma. A astrologia, baseada na observação dos astros e sua influência sobre a Terra, fornece uma estrutura cósmica que descreve tendências, características e eventos através do mapa natal e dos trânsitos planetários. O tarot, por sua vez, utiliza um conjunto de cartas ricas em arquétipos para refletir o inconsciente e revelar possibilidades futuras, funcionando como um espelho simbólico da psique humana.
                <br />
                Tópicos:
                <br />- Astrologia e tarot são sistemas antigos de sabedoria simbólica.
                <br />- Ambos ajudam na compreensão da vida e do autoconhecimento.
                <br />- A astrologia se baseia nos astros; o tarot, nos arquétipos das cartas.
            </p>

            <h2 className={styles.subtitleArticle}> Uma Leitura Mais Rica e Holística</h2>

            <p className={styles.textArticle}>
                A integração entre esses dois saberes amplia a profundidade das leituras, permitindo uma análise mais completa e sensível das questões pessoais e coletivas. Um arcano do tarot, por exemplo, pode ser associado a um planeta, signo ou casa astrológica, o que enriquece sua interpretação com camadas adicionais de significado. Essa abordagem combinada favorece uma compreensão mais holística, em que os símbolos se entrelaçam e dialogam, promovendo insights mais amplos sobre os dilemas, potenciais e desafios que cada indivíduo enfrenta em sua jornada.
                <br />
                Tópicos:
                <br />
                - A integração enriquece as leituras e amplia a percepção.
                <br />
                - Cartas do tarot podem ser associadas a signos, planetas e casas.
                <br />
                - O resultado é uma leitura simbólica mais profunda e completa.
            </p>

            {/* <hr className={styles.dividerArticle} /> */}
        </div>
    )
}

export default ArticleTemplate;