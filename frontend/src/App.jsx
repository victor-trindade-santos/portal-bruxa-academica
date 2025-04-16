import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Magia from './pages/Magia';
import Tarot from './pages/Tarot';
import Numerologia from './pages/Numerologia';
import Astrologia from './pages/Astrologia';
import Cursos from './pages/Cursos';

const App = () => (
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
    </Routes>
    <Footer />
  </Router>
);

export default App;
