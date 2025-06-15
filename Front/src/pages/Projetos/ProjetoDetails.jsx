// src/pages/Projetos/ProjetoDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function ProjetoDetails() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const response = await api.get(`/Projetos/${id}`);
        setProjeto(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Projeto não encontrado.');
        } else {
          setError('Erro ao carregar detalhes do projeto.');
        }
        setLoading(false);
        console.error('Erro ao buscar projeto:', err);
      }
    };

    fetchProjeto();
  }, [id]);

  if (loading) return <div>Carregando detalhes do projeto...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!projeto) return <div>Projeto não encontrado.</div>;

  return (
    <div className="container">
      <h2>Detalhes do Projeto</h2>
      <div>
        <p><strong>ID:</strong> {projeto.projetoId}</p>
        <p><strong>Nome:</strong> {projeto.nome}</p>
        <p><strong>Descrição:</strong> {projeto.descricao || 'N/A'}</p>
        <p><strong>Cliente:</strong> {projeto.cliente ? projeto.cliente.nome : 'N/A'}</p> {/* Exibe o nome do cliente */}
      </div>
      <Link to={`/projetos/edit/${projeto.projetoId}`} className="btn btn-warning">Editar</Link>
      <Link to="/projetos" className="btn btn-secondary">Voltar à Lista</Link>
    </div>
  );
}

export default ProjetoDetails;