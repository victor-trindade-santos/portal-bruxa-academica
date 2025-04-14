import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-articles-d42f4c" element={<Articles />} />
    </Routes>
    <Carousel />
    <Footer />
  </Router>
);

export default App;
