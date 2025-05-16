import { useState, useEffect } from 'react';
import styles from '../css/Barra_Pesquisa.module.css';
import lupa from '../assets/magnifying-glass.svg';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

function Barra_Pesquisa({ onSelectArticle, reloadTrigger, onSearch }) {
    const [query, setQuery] = useState('');
    const [allArticles, setAllArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/articles');
            setAllArticles(response.data);
        } catch (error) {
            console.error('Erro ao buscar artigos:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [reloadTrigger]);

    const handleSuggestionClick = (article) => {
        if (onSelectArticle) {
            onSelectArticle(article);
        }
        setQuery(article.title);
        setShowDropdown(false);
    };

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredArticles([]);
        } else {
            const filtered = allArticles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredArticles(filtered.slice(0, 3));
        }
    }, [query, allArticles]);

    const handleSearch = () => {
        const trimmedQuery = query.trim();

        if (trimmedQuery === '') {
            const recentArticles = [...allArticles]
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
                .slice(0, 5);

            setFilteredArticles(recentArticles);

            // 🔽 Se tiver função externa, passa resultados
            if (onSearch) {
                onSearch(recentArticles);
            }

        } else {
            const filtered = allArticles.filter(article =>
                article.title.toLowerCase().includes(trimmedQuery.toLowerCase())
            );

            setFilteredArticles(filtered.slice(0, 5));

            if (onSelectArticle && filtered[0]) {
                onSelectArticle(filtered[0]);
                setQuery(filtered[0].title);
                setShowDropdown(false);
            }

            // 🔽 Passa os resultados para o pai
            if (onSearch) {
                onSearch(filtered);
            }
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Digite o nome do artigo"
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                />
                <button
                    className={styles.searchButton}
                    type="button"
                    onClick={handleSearch}
                >
                    <img src={lupa} alt="Ícone de busca" className={styles.searchIcon} />
                </button>
            </div>

            {/* Sugestões enquanto digita */}
            {showDropdown && filteredArticles.length > 0 && (
                <ul className={styles.suggestions}>
                    {filteredArticles.map((article) => (
                        <li
                            key={article._id}
                            onClick={() => handleSuggestionClick(article)}
                            className={styles.suggestionItem}
                        >
                            {article.title}
                        </li>
                    ))}
                </ul>
            )}

            {/* Nenhuma sugestão encontrada */}
            {query.trim() && !filteredArticles.length && (
                <div className={styles.noSuggestions}>
                    <p>Nenhum artigo encontrado. <span onClick={handleSearch} className={styles.viewMore}>Ver mais resultados</span></p>
                </div>
            )}
        </div>
    );
}


export default Barra_Pesquisa;
