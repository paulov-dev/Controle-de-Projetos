// src/pages/Projetos/ProjetoList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';

function ProjetoList() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjetos();
  }, []);

  const fetchProjetos = async () => {
    try {
      // Inclui o cliente para exibição (a API já retorna com Include)
      const response = await api.get('/Projetos');
      setProjetos(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar projetos. Tente novamente mais tarde.');
      setLoading(false);
      console.error('Erro ao buscar projetos:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await api.delete(`/Projetos/${id}`);
        setProjetos(projetos.filter(projeto => projeto.projetoId !== id));
      } catch (err) {
        setError('Erro ao excluir projeto.');
        console.error('Erro ao excluir projeto:', err);
      }
    }
  };

  if (loading) return <div>Carregando projetos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container">
      <h2>Projetos</h2>
      <Link to="/projetos/new" className="btn btn-primary">Adicionar Projeto</Link>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cliente</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map(projeto => (
              <tr key={projeto.projetoId}>
                <td>{projeto.projetoId}</td>
                <td>{projeto.nome}</td>
                <td>{projeto.cliente ? projeto.cliente.nome : 'N/A'}</td> {/* Exibe o nome do cliente */}
                <td>{projeto.descricao || 'N/A'}</td>
                <td>
                  <Link to={`/projetos/${projeto.projetoId}`} className="btn btn-info btn-sm">Ver</Link>
                  <Link to={`/projetos/edit/${projeto.projetoId}`} className="btn btn-warning btn-sm">Editar</Link>
                  <button onClick={() => handleDelete(projeto.projetoId)} className="btn btn-danger btn-sm">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProjetoList;