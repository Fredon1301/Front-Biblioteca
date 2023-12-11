import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App.jsx';
import PesquisarLivros from './pages/PesquisarLivros.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import Book from './pages/Book.jsx';
import Cart from './pages/cart/Cart.jsx';
import { CartProvider } from './pages/cart/cartContext.jsx';
import FinalyOrder from './pages/FinalyOrder.jsx';
import MyOrders from './pages/MyOrders.jsx';


const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <CartProvider>
      <Routes>
        <Route path="/Login" element={<Login/>} />
        <Route path="/pesquisarLivros" element={<PesquisarLivros />} />
        <Route path="/App" element={<App/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Book" element={<Book/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/FinalyOrder" element={<FinalyOrder/>} />
        <Route path="/MyOrders" element={<MyOrders/>} />
      </Routes>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
