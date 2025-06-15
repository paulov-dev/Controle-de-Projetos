// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Controle de Projetos</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/clientes" className="nav-link">Clientes</Link>
        </li>
        <li className="nav-item">
          <Link to="/projetos" className="nav-link">Projetos</Link>
        </li>
        <li className="nav-item">
          <Link to="/tarefas" className="nav-link">Tarefas</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;