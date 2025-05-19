import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import ArticleCRUD from './pages/ArticleCRUD';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Magia from './pages/Magia';
import Tarot from './pages/Tarot';
import Numerologia from './pages/Numerologia';
import Artigos from './pages/Artigos';
import Astrologia from './pages/Astrologia';
import Cursos from './pages/Cursos';
import Login from './pages/Login';
import Register from './pages/Register';
import Article_Pages from './pages/Article_Pages';
import Perfil from './pages/Perfil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  //Os dados do formulário do Artigo que precisam ser definidos no App.jsx para lidar com os componentes do CreateArticle
  const [formDataArticle, setFormDataArticle] = useState({
    _id: null,
    title: '',
    author: '',
    publicationDate: new Date().toLocaleDateString("pt-BR"),
    imageArticle: null,
    firstContent: '',
    subtitle: '',
    secondContent: '',
    imageThumb: null,
    category: ''
  });

  return (
    <AuthProvider>
      <Router>
        <div className="layout">
          <NavBar />
          <main className="main-content">
          <ToastContainer
            closeButton={false}  // Desabilita o botão de fechar
            autoClose={6000}     // Tempo para o toast desaparecer
            position="top-right" // Posição do toast na tela
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-articles-d42f4c" element={
              <ArticleCRUD
                formDataArticle={formDataArticle}
                setFormDataArticle={setFormDataArticle}
              />}
            />
            <Route path="/magia" element={<Magia />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/numerologia" element={<Numerologia />} />
            <Route path="/astrologia" element={<Astrologia />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Adicionando a rota para a página do artigo */}
            <Route path="/artigos/:id" element={<Article_Pages />} />
            <Route path="/preview-article" element={<Article_Pages />} />
            <Route path="/profile" element={<Perfil />} />


          </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
