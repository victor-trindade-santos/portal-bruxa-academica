import { useState, useEffect } from 'react';
import styles from '../css/Barra_Pesquisa.module.css';
import lupa from '../assets/magnifying-glass.svg';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

function Barra_Pesquisa({ onSelectArticle, reloadTrigger }) {  // Aceita a prop onSelectArticle
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

    // ✅ Roda uma vez ao carregar
    useEffect(() => {
        fetchArticles();
    }, []);

    // ✅ Roda toda vez que reloadTrigger mudar
    useEffect(() => {
        fetchArticles(); // Atualiza os artigos após exclusão, criação, etc.
    }, [reloadTrigger]);


    const handleSuggestionClick = (article) => {
        if (onSelectArticle) {
            onSelectArticle(article); // Preenche os campos na edição
        }
        setQuery(article.title); // Preenche o campo de pesquisa com o título do artigo
        setShowDropdown(false); // Fecha a lista de sugestões
    };

    // Atualiza as sugestões conforme o usuário digita
    useEffect(() => {
        if (query.trim() === '') {
            setFilteredArticles([]);
        } else {
            const filtered = allArticles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredArticles(filtered.slice(0, 3)); // Exibe no máximo 3 sugestões
        }
    }, [query, allArticles]);

    const handleSearch = () => {
        if (query.trim() === '') {
            const recentArticles = [...allArticles]
                .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
                .slice(0, 5);

            setFilteredArticles(recentArticles);
        } else {
            const filtered = allArticles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase())
            );


            const selectedArticle = filtered[0]; // Pega o primeiro resultado

            if (selectedArticle && onSelectArticle) {
                onSelectArticle(selectedArticle); // ✅ Preenche o formulário
                setQuery(selectedArticle.title); // ✅ Atualiza o campo
                setShowDropdown(false); // Fecha sugestões
            }

            setFilteredArticles(filtered.slice(0, 5));
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

            {/* Exibe sugestões enquanto o usuário digita */}
            {showDropdown && filteredArticles.length > 0 && (
                <ul className={styles.suggestions}>
                    {filteredArticles.map((article) => (
                        <li
                            key={article._id}
                            onClick={() => {
                                if (onSelectArticle) {
                                    onSelectArticle(article); // 🔁 Preenche todos os campos, inclusive o ID
                                }
                                setQuery(article.title);
                                setShowDropdown(false);
                            }}
                            className={styles.suggestionItem}
                        >
                            {article.title}
                        </li>
                    ))}

                </ul>
            )}

            {/* Se não houver sugestões, exibe a opção de ir para a página de resultados */}
            {query.trim() && !filteredArticles.length && (
                <div className={styles.noSuggestions}>
                    <p>Nenhum artigo encontrado. <span onClick={handleSearch} className={styles.viewMore}>Ver mais resultados</span></p>
                </div>
            )}
        </div>
    );
}

export default Barra_Pesquisa;
