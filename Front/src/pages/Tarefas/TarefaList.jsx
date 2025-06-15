// src/pages/Tarefas/TarefaList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function TarefaList() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      // A API já retorna com Include(p => p.Projeto).ThenInclude(p => p.Cliente)
      const response = await api.get('/Tarefas');
      setTarefas(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar tarefas. Tente novamente mais tarde.');
      setLoading(false);
      console.error('Erro ao buscar tarefas:', err);
    }
  };

  const handleToggleConcluida = async (tarefa) => {
    const updatedTarefa = { ...tarefa, concluida: !tarefa.concluida };
    try {
      await api.put(`/Tarefas/${tarefa.tarefaId}`, updatedTarefa);
      setTarefas(tarefas.map(t => t.tarefaId === tarefa.tarefaId ? updatedTarefa : t));
    } catch (err) {
      setError('Erro ao atualizar status da tarefa.');
      console.error('Erro ao atualizar tarefa:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await api.delete(`/Tarefas/${id}`);
        setTarefas(tarefas.filter(tarefa => tarefa.tarefaId !== id));
      } catch (err) {
        setError('Erro ao excluir tarefa.');
        console.error('Erro ao excluir tarefa:', err);
      }
    }
  };

  if (loading) return <div>Carregando tarefas...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container">
      <h2>Tarefas</h2>
      <Link to="/tarefas/new" className="btn btn-primary">Adicionar Tarefa</Link>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Projeto</th>
              <th>Cliente</th>
              <th>Concluída</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map(tarefa => (
              <tr key={tarefa.tarefaId}>
                <td>{tarefa.tarefaId}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.projeto ? tarefa.projeto.nome : 'N/A'}</td>
                <td>{tarefa.projeto && tarefa.projeto.cliente ? tarefa.projeto.cliente.nome : 'N/A'}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={tarefa.concluida}
                    onChange={() => handleToggleConcluida(tarefa)}
                  />
                </td>
                <td>
                  <Link to={`/tarefas/${tarefa.tarefaId}`} className="btn btn-info btn-sm">Ver</Link>
                  <Link to={`/tarefas/edit/${tarefa.tarefaId}`} className="btn btn-warning btn-sm">Editar</Link>
                  <button onClick={() => handleDelete(tarefa.tarefaId)} className="btn btn-danger btn-sm">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TarefaList;