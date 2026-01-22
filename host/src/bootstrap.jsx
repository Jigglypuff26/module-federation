// Важно: загружаем полифиллы для Angular перед всем остальным
// Порядок важен: сначала reflect-metadata, затем zone.js
import 'reflect-metadata';
import 'zone.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('🚀 Host bootstrap: Zone.js loaded =', typeof Zone !== 'undefined');
console.log('🚀 Host bootstrap: Reflect.metadata loaded =', typeof Reflect !== 'undefined' && typeof Reflect.getMetadata === 'function');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
