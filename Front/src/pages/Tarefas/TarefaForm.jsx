// src/pages/Tarefas/TarefaForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

function TarefaForm() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: '',
    projetoId: '', // Campo para o ID do projeto
    concluida: false
  });
  const [projetos, setProjetos] = useState([]); // Para popular o dropdown de projetos
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const isEditMode = !!id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar todos os projetos para o dropdown
        const projetosResponse = await api.get('/Projetos');
        setProjetos(projetosResponse.data);

        if (isEditMode) {
          // Buscar dados da tarefa se estiver em modo de edição
          const tarefaResponse = await api.get(`/Tarefas/${id}`);
          setTarefa(tarefaResponse.data);
        }
        setLoading(false);
      } catch (err) {
        setApiError('Erro ao carregar dados. Verifique a conexão ou tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar dados para formulário de tarefa:', err);
      }
    };
    fetchData();
  }, [id, isEditMode]);

  const validate = () => {
    let tempErrors = {};
    if (!tarefa.titulo) tempErrors.titulo = "Título da tarefa é obrigatório.";
    if (!tarefa.projetoId) tempErrors.projetoId = "Selecione um projeto.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTarefa({
      ...tarefa,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    try {
      if (isEditMode) {
        await api.put(`/Tarefas/${id}`, tarefa);
        alert('Tarefa atualizada com sucesso!');
      } else {
        await api.post('/Tarefas', tarefa);
        alert('Tarefa adicionada com sucesso!');
      }
      navigate('/tarefas');
    } catch (err) {
      if (err.response && err.response.data) {
        const apiValidationErrors = err.response.data.errors;
        if (apiValidationErrors) {
          let formattedErrors = {};
          for (const key in apiValidationErrors) {
            const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
            formattedErrors[lowerCaseKey] = apiValidationErrors[key].join(', ');
          }
          setErrors(formattedErrors);
          setApiError('Erro de validação. Verifique os campos.');
        } else {
          setApiError('Erro ao salvar tarefa. Tente novamente.');
        }
      } else {
        setApiError('Erro de rede ou servidor. Tente novamente.');
      }
      console.error('Erro ao salvar tarefa:', err);
    }
  };

  if (loading) return <div>Carregando formulário...</div>;
  if (apiError && !isEditMode) return <div style={{ color: 'red' }}>{apiError}</div>;

  return (
    <div className="container">
      <h2>{isEditMode ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
      {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={tarefa.titulo}
            onChange={handleChange}
          />
          {errors.titulo && <div className="text-danger">{errors.titulo}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            className="form-control"
            id="descricao"
            name="descricao"
            value={tarefa.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="projetoId">Projeto:</label>
          <select
            className="form-control"
            id="projetoId"
            name="projetoId"
            value={tarefa.projetoId}
            onChange={handleChange}
          >
            <option value="">Selecione um projeto</option>
            {projetos.map(projeto => (
              <option key={projeto.projetoId} value={projeto.projetoId}>
                {projeto.nome} ({projeto.cliente ? projeto.cliente.nome : 'N/A'})
              </option>
            ))}
          </select>
          {errors.projetoId && <div className="text-danger">{errors.projetoId}</div>}
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="concluida"
            name="concluida"
            checked={tarefa.concluida}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="concluida">Concluída</label>
        </div>
        <button type="submit" className="btn btn-success">Salvar</button>
        <Link to="/tarefas" className="btn btn-secondary">Cancelar</Link>
      </form>
    </div>
  );
}

export default TarefaForm;