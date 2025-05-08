import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/BreadCrumb.module.css'; 

const BreadCrumb = ({ articleTitle, categoryName }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <Link to="/">Home</Link> {'>'} 
      <Link to="/artigos"> Artigos </Link> {'>'}
      <Link to={`/artigos?categoria=${categoryName}`}>{categoryName}</Link> {'>'} 
      <span>{articleTitle}</span>
    </div>
  );
};

export default BreadCrumb;
