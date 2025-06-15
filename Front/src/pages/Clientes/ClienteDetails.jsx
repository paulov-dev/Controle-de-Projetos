// src/pages/Clientes/ClienteDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function ClienteDetails() {
  const { id } = useParams(); // Pega o ID da URL
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/Clientes/${id}`);
        setCliente(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Cliente não encontrado.');
        } else {
          setError('Erro ao carregar detalhes do cliente.');
        }
        setLoading(false);
        console.error('Erro ao buscar cliente:', err);
      }
    };

    fetchCliente();
  }, [id]); // Recarrega se o ID na URL mudar

  if (loading) return <div>Carregando detalhes do cliente...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!cliente) return <div>Cliente não encontrado.</div>;

  return (
    <div className="container">
      <h2>Detalhes do Cliente</h2>
      <div>
        <p><strong>ID:</strong> {cliente.clienteId}</p>
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>Endereço:</strong> {cliente.endereco || 'N/A'}</p>
        <p><strong>Cidade:</strong> {cliente.cidade || 'N/A'}</p>
      </div>
      <Link to={`/clientes/edit/${cliente.clienteId}`} className="btn btn-warning">Editar</Link>
      <Link to="/clientes" className="btn btn-secondary">Voltar à Lista</Link>
    </div>
  );
}

export default ClienteDetails;