import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from 'react-use-cart';
import { StateProvider } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './styles/muiTheme';
import { ThemeProvider } from '@mui/material/styles'; 

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <StateProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StateProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
