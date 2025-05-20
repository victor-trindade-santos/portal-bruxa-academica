import React, { useEffect, useState } from 'react';

const CitySearch = ({ onSelect }) => {
  const [cidades, setCidades] = useState([]); // array de objetos { nome, uf }
  const [filtro, setFiltro] = useState('');
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios')
      .then((res) => res.json())
      .then((data) => {
        // Mapear só nome e UF (SP fixo aqui)
        const lista = data.map((cidade) => ({
          nome: cidade.nome,
          uf: 'SP', // como filtramos SP, pode fixar aqui
        }));
        setCidades(lista);
        setCidadesFiltradas(lista);
      });
  }, []);

  const handleFiltro = (e) => {
    const valor = e.target.value.toLowerCase();
    setFiltro(valor);

    const filtradas = cidades.filter((cidade) =>
      cidade.nome.toLowerCase().includes(valor)
    );
    setCidadesFiltradas(filtradas);
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

        {filtro.length > 0 && (
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
            {cidadesFiltradas.map(({ nome, uf }) => (
              <li
                key={nome}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const selected = { name: nome, state: uf };
                  setFiltro(`${nome} - ${uf}`);
                  setCidadesFiltradas([]);
                  if (typeof onSelect === 'function') {
                    onSelect(selected);
                  }
                }}
              >
                {nome} - {uf}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
