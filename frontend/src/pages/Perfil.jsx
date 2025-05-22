import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../css/Perfil.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import userImagem from '../img/perfil.png';
import aquarius from '../img/aquarius.png'
import MapaAstral from '../components/profilePages/MapaAstral';
import ThemeToggleButton from '../components/ThemeToggleButton';

// GAMBIARRA
import { saveProfileImage, getProfileImage } from '../utils/profileImage.js';

const Perfil = () => {
    const [menuSelecionado, setMenuSelecionado] = useState('signo'); // já começa com "Seu Signo" selecionado
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    const handleMenuClick = (item) => {
        setMenuSelecionado(item);
    };

    if (!user) return <div>Usuário não encontrado</div>

    return (
        <div className={`container text-center ${styles.margem}`}>
            <div className="row">
                <div className="col-12 col-lg-4 mb-4">
                    <div className={styles.perfilCard}>
                        <div className={styles.avatarContainer}>
                            <img
                                src={getProfileImage() || userImagem}
                                alt="Avatar"
                                className={styles.avatar}
                                onClick={() => fileInputRef.current?.click()}
                                style={{ cursor: 'pointer' }}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => saveProfileImage(e.target.files[0], () => window.location.reload())}
                                style={{ display: 'none' }}
                            />

                            <img src={aquarius} alt="Signo" className={styles.signIcon} />
                            <div className={styles.themeButtonWrapper}>
                                <ThemeToggleButton />
                            </div>
                        </div>
                        <h5 className={styles.nome}>{user.username}</h5>
                        <p className={styles.info}>{user.birthDate}</p>
                        <p className={styles.info}>{user.email}</p>
                        {/* <button className={styles.editarBtn}>Editar perfil</button> */}
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            Sair da conta
                        </button>
                    </div>


                    <div
                        className={styles.sidebar}
                    >
                        <button
                            onClick={() => handleMenuClick('signo')}
                            className={`${styles.menuItem} ${menuSelecionado === 'signo' ? styles.selected : ''}`}
                        >
                            <i className={`bi bi-stars ${styles.icon}`}></i>
                            <p className={styles.textoBotao}>Seu Signo</p>
                        </button>

                        <button
                            onClick={() => handleMenuClick('mapa')}
                            className={`${styles.menuItem} ${menuSelecionado === 'mapa' ? styles.selected : ''}`}
                        >
                            <i className={`bi bi-moon-stars ${styles.icon}`}></i>
                            <p className={styles.textoBotao}>Mapa Astral</p>
                        </button>

                        <button
                            onClick={() => handleMenuClick('artigos')}
                            className={`${styles.menuItem} ${menuSelecionado === 'artigos' ? styles.selected : ''}`}
                        >
                            <i className={`bi bi-file-earmark-text ${styles.icon}`}></i>
                            <p className={styles.textoBotao}>Histórico de Artigos</p>
                        </button>

                        <button
                            onClick={() => handleMenuClick('tiragem')}
                            className={`${styles.menuItem} ${menuSelecionado === 'tiragem' ? styles.selected : ''}`}
                        >
                            <i className={`bi bi-journal-bookmark ${styles.icon}`}></i>
                            <p className={styles.textoBotao}>Histórico de Tiragem</p>
                        </button>

                    </div>



                </div>

                {/* Conteúdo da direita */}
                <div className="col-12 col-lg-8">
                    {menuSelecionado === 'mapa' && (
                        <div className={`card p-4 ${styles.resumoSigno}`}>
                            <div className="mb-3 d-flex align-items-center">
                                <i className={`bi bi-stars fs-4 me-2 mt-0 ${styles.nome}`}></i>
                                <p className={`mb-0 fw-bold mt-0 ${styles.nomeInfo}`}>Seu signo:</p>
                                <p className={`mb-0 ms-1 ${styles.dado}`}>Aquário</p>
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <i className={`bi bi-wind fs-4 me-2 mt-0 ${styles.nome}`}></i>
                                <p className={`mb-0 mt-0 fw-bold ${styles.nomeInfo}`}>Elemento:</p>
                                <p className={`mb-0 ms-1 ${styles.dado}`}>Ar</p>
                            </div>
                            <div className="mb-3 d-flex align-items-center">
                                <i className={`bi bi-globe-americas fs-4 me-2 mt-0 ${styles.nomeInfo}`}></i>
                                <p className={`mb-0 mt-0 fw-bold ${styles.nomeInfo}`}>Planeta Regente:</p>
                                <p className={`mb-0 ms-1 ${styles.dado}`}>Urano</p>
                            </div>
                            <hr />
                            <div>
                                <h6 className={`fw-bold ${styles.titResumo}`}>Resumo de personalidade:</h6>
                                <p className={`mb-0 ${styles.resumo}`}>
                                    Pessoas de Aquário geralmente são criativas, independentes,
                                    intelectuais e gostam de ideias inovadoras. Valorizam a liberdade e
                                    tendem a ser originais e um pouco imprevisíveis.
                                </p>
                            </div>
                        </div>
                    )}
                    {menuSelecionado === 'signo' && (
                        <MapaAstral
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;