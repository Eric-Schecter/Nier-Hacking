import React from 'react';
import { render } from 'react-dom';
import Home from './component/Home';

const renderAll = () => {
  render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>,
    document.getElementById('target'),
  );
};
renderAll();
