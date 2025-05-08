import { useState, useEffect } from 'react';
import styles from '../css/Barra_Pesquisa.module.css';
import lupa from '../../public/magnifying-glass.svg';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';


function Barra_Pesquisa({ onSelectArticle }) {
    const [query, setQuery] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null); // <--- novo estado
    const navigate = useNavigate();


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/articles');
                setAllArticles(response.data);
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredArticles(allArticles.slice(-5).reverse());
        } else {
            const filtered = allArticles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredArticles(filtered.slice(0, 5));
        }
    }, [query, allArticles]);

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Digite o nome do artigo"
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedArticle(null); // reseta seleção se digitado manualmente
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                />
                <button
                    className={styles.searchButton}
                    type="button"
                    onClick={() => {
                        if (selectedArticle) {
                            // Se estiver em modo formulário
                            onSelectArticle && onSelectArticle(selectedArticle);
                        } else if (query.trim() !== '') {
                            // Se não houver artigo selecionado mas há texto digitado, vai para artigos filtrados
                            navigate(`/artigos?busca=${encodeURIComponent(query.trim())}`);
                        }
                    }}
                >
                    <img src={lupa} alt="Ícone de busca" className={styles.searchIcon} />
                </button>
            </div>

            {/* Sugestões fora do inputWrapper, mas dentro do searchContainer */}
            {showDropdown && filteredArticles.length > 0 && (
                <ul className={styles.suggestions}>
                    {filteredArticles.map((article) => (
                        <li
                            key={article._id}
                            onMouseDown={() => {
                                setQuery(article.title); // atualiza o campo
                                setSelectedArticle(article); // define o artigo selecionado
                            }}
                            className={styles.suggestionItem}
                        >
                            {article.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Barra_Pesquisa;
