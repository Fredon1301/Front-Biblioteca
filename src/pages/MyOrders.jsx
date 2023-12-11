import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cart/cartContext';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';

const MyOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const { dispatch } = useCart();

  const searchMyOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast('Token não encontrado');
        return;
      }
      const decodedToken = jwtDecode(token);

      const response = await axios.get(
        `http://localhost:3333/api/cart/search?cpf=${decodedToken.cpf}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      if (response.data) {
        setSearchResults(response.data);
      } else {
        toast('Não foi possível carregar seus pedidos');
      }
    } catch (error) {
      console.error('Erro ao pesquisar pedidos:', error);
    }
  };

  const handleNavigateToApp = () => {
    navigate('/App');
  };

  useEffect(() => {
    searchMyOrders();
  }, []);

  return (
    <div className="container mt-3">
      <ul className="list-group">
        
        {searchResults.map((cart) => (
            
            
          <li key={cart.cpf} className="list-group-item">
            <h5>Pedido para o CPF: {cart.cpf}</h5>
            <strong>Data do pedido:</strong>{' '}
            {format(new Date(cart.createdAt), 'dd/MM/yyyy HH:mm:ss')}
            <br/>
            <strong>Valor total do pedido:</strong> {cart.orderTotal}
            {cart.produtos.map((produto) => (
              <div key={produto.codBook} className="mb-3">
                <img
                  src={produto.bookAttributes.image}
                  alt={produto.bookAttributes.name}
                  style={{ width: '100px', marginRight: '20px' }}
                />
                <br />
                <strong>Título:</strong> {produto.bookAttributes.name}
                <br />
                <strong>Autor:</strong> {produto.bookAttributes.Autor}
                <br />
                <strong>Preço: R$</strong> {produto.bookAttributes.currentPrice}
                <br />
                <strong>Código do livro:</strong> {produto.codBook} <br />
              </div>
            ))}
          </li>
        ))}
      </ul>

      <button onClick={handleNavigateToApp} className="btn btn-secondary mt-3">
        Página Inicial
      </button>
      <ToastContainer />
    </div>
  );
};

export default MyOrders;
