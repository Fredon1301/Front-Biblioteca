import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cart/cartContext';
import { ToastContainer, toast } from 'react-toastify';

const PesquisarLivros = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();


  const { dispatch } = useCart();

  const handleAddToCart = async (book) => {
    
   
      dispatch({ type: 'ADD_TO_CART', payload: { ...book, quantity: 1 } });
      toast('Livro adicionado ao carrinho!');
  
     
    
  };
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/api/book/search?name=${searchQuery}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao pesquisar livros:', error);
    }
  };

  const handleNavigateToApp = () => {
    navigate('/App');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Pesquisar Livros</h2>
      <div className="mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          placeholder="Procure pelo nome"
        />
      </div>
      <button onClick={handleSearch} className="btn btn-primary mb-3">
        Pesquisar
      </button>

      <ul className="list-group">
        {searchResults.map((book) => (
          <li key={book.codBook} className="list-group-item">
            <img src={book.image} alt={book.name} style={{ width: '100px', marginRight: '20px' }} />
            <br />
            <strong>Título:</strong> {book.name}<br />
            <strong>Autor:</strong> {book.Autor}<br />
            <strong>Preço: R$</strong> {book.currentPrice}<br />
            <strong>Código do livro:</strong> {book.codBook} <br/>
            <button onClick={() => handleAddToCart(book)}>Adicionar ao carrinho</button>
          </li>
        ))}
      </ul>

      <button onClick={handleNavigateToApp} className="btn btn-secondary mt-3">
        Página Inicial
      </button>
      <ToastContainer/>
    </div>
  );
};

export default PesquisarLivros;
