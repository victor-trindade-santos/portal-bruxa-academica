import Container from '../components/Container';
import styles from '../css/Cursos.module.css';

function Cursos() {
    const hasCourses = false; // Para futuro controle

    return (
        <>
            {!hasCourses && (
                <div className={styles.noCoursesWrapper}>
                    <div className={styles.noCoursesInner}>
                        <h2 className={`fs-2 ${styles.noCoursesTitle}`}>Cursos em breve!</h2>
                        <p className={styles.paragrafo}>
                            Estamos preparando conteúdos especiais para você que quer mergulhar nos conhecimentos místicos.
                            Fique de olho! Em breve teremos cursos incríveis para expandir seu saber.
                        </p>
                    </div>
                </div>
            )}

            <Container paddingTop="40px">
                <div className={styles.sectionDivider}></div>
                <div className="container">
                    <section className={styles.coursesSection}>
                        {hasCourses ? (
                            <>
                                <h2 className={`fs-1 ${styles.coursesTitle}`}>Confira meus Cursos Disponíveis</h2>
                                {/* Aqui renderizaria os cards, mas no momento não há */}
                            </>
                        ) : (
                            <>
                                <section className={styles.comingSoonCourse}>
                                    <h3>Curso: Introdução à Magia Ancestral</h3>
                                    <p className={styles.paragrafo}>
                                        Aprenda os fundamentos das práticas mágicas antigas, com exercícios simples e eficazes para o dia a dia.
                                        Descubra como conectar-se com as energias da natureza e transformar sua realidade.
                                    </p>
                                    <p className={styles.note}>
                                        (Em breve mais detalhes e inscrições abertas!)
                                    </p>
                                </section>

                                <section className={styles.comingSoonCourse}>
                                    <h3>Curso: Fundamentos da Numerologia</h3>
                                    <p className={styles.paragrafo}>
                                        Explore o significado dos números em sua vida e como aplicá-los para obter autoconhecimento e harmonia.
                                        Técnicas práticas para interpretar números e suas influências diárias.
                                    </p>
                                    <p className={styles.note}>
                                        (Em breve mais detalhes e inscrições abertas!)
                                    </p>
                                </section>

                                <section className={styles.comingSoonCourse}>
                                    <h3>Curso: Astrologia para Iniciantes</h3>
                                    <p className={styles.paragrafo}>
                                        Aprenda os princípios básicos da astrologia, mapas astrais e como interpretar os signos para guiar sua jornada pessoal.
                                        Conheça os planetas, casas e aspectos que influenciam sua personalidade.
                                    </p>
                                    <p className={styles.note}>
                                        (Em breve mais detalhes e inscrições abertas!)
                                    </p>
                                </section>

                                <section className={styles.comingSoonCourse}>
                                    <h3>Curso: Tarô e suas Cartas</h3>
                                    <p className={styles.paragrafo}>
                                        Descubra o poder simbólico do Tarô, como realizar leituras e conectar-se com sua intuição para decisões mais conscientes.
                                        Passos práticos para interpretar as cartas com clareza e segurança.
                                    </p>
                                    <p className={styles.note}>
                                        (Em breve mais detalhes e inscrições abertas!)
                                    </p>
                                </section>
                            </>
                        )}
                    </section>
                </div>
            </Container>
        </>
    );
}

export default Cursos;
