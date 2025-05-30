import { useEffect, useState } from 'react';
import styles from '../../css/articleCRUDComponents/ArticleCRUDComponent.module.css';

const CitySearch = ({ onSelect, selectedValue = '' }) => {
  const [cidades, setCidades] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios')
      .then((res) => res.json())
      .then((data) => {
        const lista = data.map((cidade) => ({
          nome: cidade.nome,
          uf: 'SP',
        }));
        setCidades(lista);
        setCidadesFiltradas(lista);
      });
  }, []);

  useEffect(() => {
    if (selectedValue) {
      setFiltro(selectedValue);
    }
  }, [selectedValue]);

  const handleFiltro = (e) => {
    const valor = e.target.value;
    setFiltro(valor);

    const filtradas = cidades.filter((cidade) =>
      cidade.nome.toLowerCase().includes(valor.toLowerCase())
    );
    setCidadesFiltradas(filtradas);
  };

  const handleSelect = (cidade) => {
    const nomeFormatado = `${cidade.nome} - ${cidade.uf}`;
    setFiltro(nomeFormatado);
    setCidadesFiltradas([]);
    if (typeof onSelect === 'function') {
      onSelect(cidade);
    }
  };


 return (
    // A div mais externa do CitySearch. Se o CitySearch *inteiro* precisar ser empurrado
    // para a direita no layout flex, a classe com margin-left: auto seria aplicada aqui
    // (ou em um wrapper em volta de <CitySearch />).
    <div > {/* Estilos do container do CitySearch */}
<div style={{ position: 'relative' }}>
  <input
    type="text"
    value={filtro}
    onChange={handleFiltro}
    placeholder="Buscar cidade..."
    className={styles.input}
  />
  {filtro.length > 0 && cidadesFiltradas.length > 0 && (
    <ul className={styles.cityList}>
      {cidadesFiltradas.map((cidade) => (
        <li
          key={cidade.nome}
          onClick={() => handleSelect(cidade)}
        >
          {cidade.nome} - {cidade.uf}
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default CitySearch;