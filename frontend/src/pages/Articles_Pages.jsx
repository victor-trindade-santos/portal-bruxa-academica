import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../services/api';
import styles from '../css/ArticlePage.module.css'; // ajuste o caminho se necessário
import Barra_Pesquisa from '../components/Barra_Pesquisa';
import Barra_Categoria from '../components/Barra_Categoria';
import Sobre_Mim_Lateral from '../components/Sobre_MIm_Lateral';
import ArticlesTemplate from '../components/ArticlesTemplate';

function Article_Pages() {

  return (
    <>
        <div className={`row ${styles.rowPrincipal}`}>
          <div className={styles.colInsideLeft}>
            <ArticlesTemplate />
          </div>
          <div className={styles.colInsideRight}>
            <Barra_Pesquisa />
            <Barra_Categoria />
            <Sobre_Mim_Lateral />
          </div>
        </div>
        <br />
    </>
  );
}

export default Article_Pages;
