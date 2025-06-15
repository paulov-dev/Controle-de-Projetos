// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home/Home.jsx';

// Importações das páginas de Clientes
import ClienteList from './pages/Clientes/ClienteList.jsx';
import ClienteDetails from './pages/Clientes/ClienteDetails.jsx';
import ClienteForm from './pages/Clientes/ClienteForm.jsx';

// Importações das páginas de Projetos
import ProjetoList from './pages/Projetos/ProjetoList.jsx';
import ProjetoDetails from './pages/Projetos/ProjetoDetails.jsx';
import ProjetoForm from './pages/Projetos/ProjetoForm.jsx';

// Importações das páginas de Tarefas
import TarefaList from './pages/Tarefas/TarefaList.jsx';
import TarefaDetails from './pages/Tarefas/TarefaDetails.jsx';
import TarefaForm from './pages/Tarefas/TarefaForm.jsx';

import './index.css'; 


function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Rotas de Clientes */}
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/clientes/new" element={<ClienteForm />} />
          <Route path="/clientes/:id" element={<ClienteDetails />} />
          <Route path="/clientes/edit/:id" element={<ClienteForm />} />

          {/* Rotas de Projetos */}
          <Route path="/projetos" element={<ProjetoList />} />
          <Route path="/projetos/new" element={<ProjetoForm />} />
          <Route path="/projetos/:id" element={<ProjetoDetails />} />
          <Route path="/projetos/edit/:id" element={<ProjetoForm />} />

          {/* Rotas de Tarefas */}
          <Route path="/tarefas" element={<TarefaList />} />
          <Route path="/tarefas/new" element={<TarefaForm />} />
          <Route path="/tarefas/:id" element={<TarefaDetails />} />
          <Route path="/tarefas/edit/:id" element={<TarefaForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;