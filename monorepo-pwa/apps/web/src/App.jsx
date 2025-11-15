import { useState, useEffect } from 'react';
import './App.css';

// ESTA É A MUDANÇA (Passo 11)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  // Estados de dados
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  // Estados de UI (Controle de fluxo)
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efeito 1: Busca as MARCAS (só roda 1 vez)
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/marcas`);
        if (!response.ok) throw new Error('Falha ao buscar marcas');
        const data = await response.json();
        setMarcas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMarcas();
  }, []);

  // Efeito 2: Busca os MODELOS (roda toda vez que 'marcaSelecionada' mudar)
  useEffect(() => {
    if (!marcaSelecionada) {
      setModelos([]); // Limpa os modelos se nenhuma marca estiver selecionada
      return;
    }

    const fetchModelos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/modelos/${marcaSelecionada.codigo}`);
        if (!response.ok) throw new Error('Falha ao buscar modelos');
        const data = await response.json();
        setModelos(data.modelos); // A API da FIPE retorna { modelos: [...] }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModelos();
  }, [marcaSelecionada]); // Dependência: Roda quando 'marcaSelecionada' muda

  // --- Funções de Clique ---
  const handleMarcaClick = (marca) => {
    setMarcaSelecionada(marca); // Salva o objeto da marca (nome e codigo)
    setError(null); // Limpa erros antigos
  };

  const handleVoltar = () => {
    setMarcaSelecionada(null); // Volta para a tela de marcas
    setError(null); // Limpa erros antigos
  };

  // --- Renderização ---
  if (error) {
    return <div className="App-container"><h1>Erro: {error}</h1></div>;
  }

  // Tela 2: Mostrando Modelos
  if (marcaSelecionada) {
    return (
      <div className="App-container">
        <button onClick={handleVoltar} className="back-button">
          &larr; Voltar para Marcas
        </button>
        <h1>{marcaSelecionada.nome}</h1>

        {loading && <p>Carregando modelos...</p>}

        <div className="card-list">
          <h2>Modelos</h2>
          <ul>
            {modelos.map((modelo) => (
              <li key={modelo.codigo}>
                {modelo.nome} (Código: {modelo.codigo})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Tela 1: Mostrando Marcas (Inicial)
  return (
    <div className="App-container">
      <h1>Consulta Tabela FIPE</h1>

      {loading && <p>Carregando marcas...</p>}

      <div className="card-list">
        <h2>Marcas de Carros</h2>
        <ul>
          {marcas.map((marca) => (
            <li 
              key={marca.codigo} 
              onClick={() => handleMarcaClick(marca)}
              className="list-item-clickable"
            >
              {marca.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;