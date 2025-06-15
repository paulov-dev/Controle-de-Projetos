// src/pages/Home.jsx
import React from 'react';

function Home() {
  return (
    <div className="container text-center">
      <h2>Bem-vindo ao Sistema de Controle de Projetos!</h2>
      <p>Utilize a navegação acima para gerenciar Clientes, Projetos e Tarefas.</p>
      <img src="https://via.placeholder.com/600x400?text=Gerenciamento+de+Projetos" alt="Gerenciamento de Projetos" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
    </div>
  );
}

export default Home;