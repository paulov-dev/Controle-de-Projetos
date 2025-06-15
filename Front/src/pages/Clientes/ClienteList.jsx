// src/pages/Clientes/ClienteList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/Clientes');
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar clientes. Tente novamente mais tarde.');
      setLoading(false);
      console.error('Erro ao buscar clientes:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/Clientes/${id}`);
        setClientes(clientes.filter(cliente => cliente.clienteId !== id));
      } catch (err) {
        setError('Erro ao excluir cliente.');
        console.error('Erro ao excluir cliente:', err);
      }
    }
  };

  if (loading) return <div>Carregando clientes...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container">
      <h2>Clientes</h2>
      <Link to="/clientes/new" className="btn btn-primary">Adicionar Cliente</Link>
      {clientes.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.clienteId}>
                <td>{cliente.clienteId}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.endereco || 'N/A'}</td>
                <td>{cliente.cidade || 'N/A'}</td>
                <td>
                  <Link to={`/clientes/${cliente.clienteId}`} className="btn btn-info btn-sm">Ver</Link>
                  <Link to={`/clientes/edit/${cliente.clienteId}`} className="btn btn-warning btn-sm">Editar</Link>
                  <button onClick={() => handleDelete(cliente.clienteId)} className="btn btn-danger btn-sm">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClienteList;