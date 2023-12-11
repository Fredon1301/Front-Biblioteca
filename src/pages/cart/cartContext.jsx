import React, { createContext, useContext, useReducer } from 'react';


const initialState = [];


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':

      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.codBook !== action.payload.codBook);

    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};


