// src/pages/Tarefas/TarefaDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function TarefaDetails() {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTarefa = async () => {
      try {
        const response = await api.get(`/Tarefas/${id}`);
        setTarefa(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Tarefa não encontrada.');
        } else {
          setError('Erro ao carregar detalhes da tarefa.');
        }
        setLoading(false);
        console.error('Erro ao buscar tarefa:', err);
      }
    };

    fetchTarefa();
  }, [id]);

  if (loading) return <div>Carregando detalhes da tarefa...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!tarefa) return <div>Tarefa não encontrada.</div>;

  return (
    <div className="container">
      <h2>Detalhes da Tarefa</h2>
      <div>
        <p><strong>ID:</strong> {tarefa.tarefaId}</p>
        <p><strong>Título:</strong> {tarefa.titulo}</p>
        <p><strong>Descrição:</strong> {tarefa.descricao || 'N/A'}</p>
        <p><strong>Projeto:</strong> {tarefa.projeto ? tarefa.projeto.nome : 'N/A'}</p>
        <p><strong>Cliente do Projeto:</strong> {tarefa.projeto && tarefa.projeto.cliente ? tarefa.projeto.cliente.nome : 'N/A'}</p>
        <p><strong>Concluída:</strong> {tarefa.concluida ? 'Sim' : 'Não'}</p>
      </div>
      <Link to={`/tarefas/edit/${tarefa.tarefaId}`} className="btn btn-warning">Editar</Link>
      <Link to="/tarefas" className="btn btn-secondary">Voltar à Lista</Link>
    </div>
  );
}

export default TarefaDetails;