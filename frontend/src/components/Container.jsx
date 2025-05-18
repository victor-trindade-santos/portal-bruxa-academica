import React from 'react';
import '../css/Container.css'; // ou use um módulo css se preferir

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
