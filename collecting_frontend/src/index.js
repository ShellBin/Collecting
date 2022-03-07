import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//适配 iOS 浏览器
const convertStyle = () => {
    document.getElementById('App').style.setProperty('height', `${window.innerHeight}px`);
}
window.addEventListener("resize", convertStyle);
window.addEventListener("DOMContentLoaded", convertStyle);
