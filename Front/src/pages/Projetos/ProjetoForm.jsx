// src/pages/Projetos/ProjetoForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

function ProjetoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState({
    nome: '',
    descricao: '',
    clienteId: '' // Campo para o ID do cliente
  });
  const [clientes, setClientes] = useState([]); // Para popular o dropdown de clientes
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const isEditMode = !!id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar todos os clientes para o dropdown
        const clientesResponse = await api.get('/Clientes');
        setClientes(clientesResponse.data);

        if (isEditMode) {
          // Buscar dados do projeto se estiver em modo de edição
          const projetoResponse = await api.get(`/Projetos/${id}`);
          setProjeto(projetoResponse.data);
        }
        setLoading(false);
      } catch (err) {
        setApiError('Erro ao carregar dados. Verifique a conexão ou tente novamente.');
        setLoading(false);
        console.error('Erro ao buscar dados para formulário de projeto:', err);
      }
    };
    fetchData();
  }, [id, isEditMode]);

  const validate = () => {
    let tempErrors = {};
    if (!projeto.nome) tempErrors.nome = "Nome do projeto é obrigatório.";
    if (!projeto.clienteId) tempErrors.clienteId = "Selecione um cliente.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjeto({ ...projeto, [name]: value });
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
        await api.put(`/Projetos/${id}`, projeto);
        alert('Projeto atualizado com sucesso!');
      } else {
        await api.post('/Projetos', projeto);
        alert('Projeto adicionado com sucesso!');
      }
      navigate('/projetos');
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
          setApiError('Erro ao salvar projeto. Tente novamente.');
        }
      } else {
        setApiError('Erro de rede ou servidor. Tente novamente.');
      }
      console.error('Erro ao salvar projeto:', err);
    }
  };

  if (loading) return <div>Carregando formulário...</div>;
  if (apiError && !isEditMode) return <div style={{ color: 'red' }}>{apiError}</div>;

  return (
    <div className="container">
      <h2>{isEditMode ? 'Editar Projeto' : 'Adicionar Projeto'}</h2>
      {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Projeto:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={projeto.nome}
            onChange={handleChange}
          />
          {errors.nome && <div className="text-danger">{errors.nome}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            className="form-control"
            id="descricao"
            name="descricao"
            value={projeto.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="clienteId">Cliente:</label>
          <select
            className="form-control"
            id="clienteId"
            name="clienteId"
            value={projeto.clienteId}
            onChange={handleChange}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.clienteId} value={cliente.clienteId}>
                {cliente.nome}
              </option>
            ))}
          </select>
          {errors.clienteId && <div className="text-danger">{errors.clienteId}</div>}
        </div>
        <button type="submit" className="btn btn-success">Salvar</button>
        <Link to="/projetos" className="btn btn-secondary">Cancelar</Link>
      </form>
    </div>
  );
}

export default ProjetoForm;