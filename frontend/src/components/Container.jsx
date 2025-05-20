import React from 'react';
import '../css/Container.css'; // mantendo seu CSS atual

const Container = ({ children, paddingTop }) => {
  return (
    <div
      className="container"
      style={{ paddingTop: paddingTop || undefined }} 
      // se não passar paddingTop, style não adiciona nada
    >
      {children}
    </div>
  );
};

export default Container;
