// src/pages/Clientes/ClienteForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
  
function ClienteForm() {
  const { id } = useParams(); // Pode ser undefined se for para criar
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: '',
    endereco: '', 
    cidade: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const isEditMode = !!id; // True se houver um ID na URL (modo de edição)

  useEffect(() => {
    if (isEditMode) {
      const fetchCliente = async () => {
        try {
          const response = await api.get(`/Clientes/${id}`);
          setCliente(response.data);
          setLoading(false);
        } catch (err) {
          setApiError('Erro ao carregar cliente para edição.');
          setLoading(false);
          console.error('Erro ao buscar cliente para edição:', err);
        }
      };
      fetchCliente();
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  const validate = () => {
    let tempErrors = {};
    if (!cliente.nome) tempErrors.nome = "Nome é obrigatório.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
    // Limpa o erro ao digitar
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null); // Limpa erros anteriores da API

    if (!validate()) {
      return; // Para a submissão se a validação falhar
    }

    try {
      if (isEditMode) {
        await api.put(`/Clientes/${id}`, cliente);
        alert('Cliente atualizado com sucesso!');
      } else {
        await api.post('/Clientes', cliente);
        alert('Cliente adicionado com sucesso!');
      }
      navigate('/clientes'); // Redireciona para a lista de clientes
    } catch (err) {
      if (err.response && err.response.data) {
        // Se a API retornar erros de validação do ModelState
        const apiValidationErrors = err.response.data.errors;
        if (apiValidationErrors) {
          let formattedErrors = {};
          for (const key in apiValidationErrors) {
            formattedErrors[key.toLowerCase()] = apiValidationErrors[key].join(', ');
          }
          setErrors(formattedErrors);
          setApiError('Erro de validação. Verifique os campos.');
        } else {
          setApiError('Erro ao salvar cliente. Tente novamente.');
        }
      } else {
        setApiError('Erro de rede ou servidor. Tente novamente.');
      }
      console.error('Erro ao salvar cliente:', err);
    }
  };

  if (loading) return <div>Carregando formulário...</div>;
  if (apiError && !isEditMode) return <div style={{ color: 'red' }}>{apiError}</div>; // Mostrar erro para nova criação

  return (
    <div className="container">
      <h2>{isEditMode ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
      {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
          />
          {errors.nome && <div className="text-danger">{errors.nome}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            name="endereco"
            value={cliente.endereco}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            name="cidade"
            value={cliente.cidade}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Salvar</button>
        <Link to="/clientes" className="btn btn-secondary">Cancelar</Link>
      </form>
    </div>
  );
}

export default ClienteForm;