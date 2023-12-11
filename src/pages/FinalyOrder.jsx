import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinalyOrder = () => {
  const navigate = useNavigate();

  const handleNavigateToApp = () => {
    navigate('/App');
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Pedido Finalizado</h2>
      <p>Retire em nossa loja em 2h úteis ou aguarde entrega em sua residência.</p>

      <button onClick={handleNavigateToApp} className="btn btn-primary mt-3">
        Página Inicial
      </button>
    </div>
  );
};

export default FinalyOrder;
