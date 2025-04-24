import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 👈 importa o provider
import Home from './pages/Home';
import Articles from './pages/Articles';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Magia from './pages/Magia';
import Tarot from './pages/Tarot';
import Numerologia from './pages/Numerologia';
import Astrologia from './pages/Astrologia';
import Cursos from './pages/Cursos';
import Login from './pages/Login';
import Register from './pages/Register';
import Article_Pages from './pages/Articles_Pages'; // Importando o novo componente

const App = () => (
  <AuthProvider> 
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-articles-d42f4c" element={<Articles />} />
        <Route path="/magia" element={<Magia />} />
        <Route path="/tarot" element={<Tarot />} />
        <Route path="/numerologia" element={<Numerologia />} />
        <Route path="/astrologia" element={<Astrologia />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Adicionando a rota para a página do artigo */}
        <Route path="/artigos/:id" element={<Article_Pages />} />
      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);

export default App;
