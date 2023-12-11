import React from 'react';
import { useCart } from './cartContext';
import Button from '@mui/material/Button';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();


  const handleRemoveFromCart = (codBook) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { codBook } });
    toast("Livro removido do carrinho");
  };
  const handleRemoveAllCart = () => {
    dispatch({ type: 'RESET_CART' });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.currentPrice, 0).toFixed(2);
  };

  const handleFinalizarPedido = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast("Token não encontrado");
        return;
      }
  
      const decodedToken = jwtDecode(token);
  
  
      const produtos = cart.map(item => ({
        codBook: item.codBook,
        bookAttributes: {
          name: item.name,
          Autor: item.Autor,
          currentPrice: item.currentPrice,
          image: item.image
        },
      }));
  
      const response = await axios.post(
        'http://localhost:3333/api/cart',
        { produtos, cpf: decodedToken.cpf, orderTotal: calculateTotal() },
        {
          headers: {
            'Authorization': localStorage.getItem("token"),
          },
        }
      );
  
      if (response.data) {
        toast("Compra finalizada");
        handleRemoveAllCart();      
        setTimeout(() => {
          navigate('/FinalyOrder')

        }, 1000);
      } else {
        toast('Erro ao finalizar pedido');
      }
    } catch (err) {
      toast("Erro desconhecido");
    }
  };
  

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Carrinho de Compras</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div style={{ margin: 'auto', maxWidth: '600px' }}>
          <ul>
            {cart.map((item) => (
              <li key={item.codBook} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '200px', marginRight: '20px' }} />
                  <div>
                    <p>Nome: {item.name}</p>
                    <p>Preço: R$ {item.currentPrice}</p>
                    <Button variant="outlined" color="secondary" onClick={() => handleRemoveFromCart(item.codBook)}>
                      Remover do Carrinho
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px' }}>
            <p>Total: R$ {calculateTotal()}</p>
            <ToastContainer />
            <Button variant="contained" color="primary" onClick={handleFinalizarPedido}>
              Finalizar Pedido
            </Button>
          </div>
        </div>
      )}
      <Button variant="outlined" color="primary" onClick={() => navigate(-1)}>
        Voltar
      </Button>
    </div>
  );
};

export default Cart;
