import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Container from '../components/Container';
import { jsPDF } from 'jspdf';
import styles from '../css/Graficos.module.css'
import axios from '../services/api';

function Graficos() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/grafico/user-stats');
        
        // Ajustando dados para o gráfico (ex: 2025-05 → Mai/25)
        const formatado = response.data.map(item => {
            const [year, month] = item._id.split('-'); // divide '2025-03' em ['2025', '03']
            const date = new Date(Number(year), Number(month) - 1); // ajusta o mês

            return {
                mes: date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
                total: item.total
            };
        });

        setData(formatado);
      } catch (err) {
        console.error(err);
        setErro(err.response?.data?.message || 'Erro ao carregar os dados');
      }
    };

    fetchData();
  }, []);

  const gerarRelatorio = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Usuários Cadastrados', 14, 22);

    doc.setFontSize(12);
    doc.text('Mês       | Usuários', 14, 32);

    data.forEach((item, index) => {
        const y = 40 + index * 8;
        doc.text(`${item.mes} | ${item.total}`, 14, y);
    });

    doc.save('relatorio-usuarios.pdf');
  };

  return (
    <Container>
      <div style={{ width: '100%', padding: '1rem', marginTop: 70 }}>
        <div className={styles.headerGrafico}>
          <h2>Usuários cadastrados por mês</h2>
          <button onClick={gerarRelatorio} className={styles.btnRelatorio}>
            Gerar Relatório PDF
          </button>
        </div>
        {erro && <p>{erro}</p>}
        {!erro && (
          <>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ width: '100%', height: 400, marginTop: '2rem' }}>
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default Graficos;