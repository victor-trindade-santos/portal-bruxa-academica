import { useEffect, useState } from 'react';

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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={filtro}
          onChange={handleFiltro}
          placeholder="Buscar cidade..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />

        {filtro.length > 0 && cidadesFiltradas.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              maxHeight: '200px',
              overflowY: 'auto',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '0 0 8px 8px',
              margin: 0,
              paddingLeft: '10px',
              paddingRight: '10px',
              zIndex: 1000,
              listStyle: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            {cidadesFiltradas.map((cidade) => (
              <li
                key={cidade.nome}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                }}
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