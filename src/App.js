import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import "./styles/app.sass"

import Page from './components/Page';
import Catalog from './pages/Catalog';
import Checkout  from './pages/Checkout';
import Product from './pages/Product';
import ThankYou from './pages/ThankYou';
import ExternalDLLCheck from './pages/ExternalDLLCheck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page><Catalog /></Page>} />
        <Route path="/catalog" element={<Page><Catalog /></Page>} />
        <Route path="/checkout" element={<Page><Checkout /></Page>} />
        <Route path="/product" element={<Page><Product /></Page>} />
        <Route path="/thankyou" element={<Page><ThankYou /></Page>} />
        <Route path="/external-dll-check" element={<ExternalDLLCheck />} />
      </Routes>
    </Router>
  );
}

export default App;
