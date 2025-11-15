import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

// URL base da API da FIPE
const FIPE_BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

// Rota de teste
app.get('/api/hello', (req, res) => {
  res.json({ ok: true, msg: 'Hello Bootcamp!' });
});

// Rota 1: Busca TODAS as marcas
app.get('/api/marcas', async (req, res) => {
  try {
    const response = await axios.get(FIPE_BASE_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar marcas FIPE:', error.message);
    res.status(500).json({ ok: false, msg: 'Erro ao consultar a API externa (marcas).' });
  }
});

// Rota 2: Busca modelos de UMA marca específica
app.get('/api/modelos/:id', async (req, res) => {
  const { id } = req.params; // Pega o :id da URL (ex: "59")

  try {
    // Monta a URL correta (ex: .../marcas/59/modelos)
    const url = `${FIPE_BASE_URL}/${id}/modelos`;
    const response = await axios.get(url);
    res.json(response.data); // Retorna o JSON com { modelos: [...] }
  } catch (error) {
    console.error('Erro ao buscar modelos FIPE:', error.message);
    res.status(500).json({ ok: false, msg: 'Erro ao consultar a API externa (modelos).' });
  }
});

// Inicia o servidor
app.listen(3000, () => console.log('API on :3000 (com FIPE - Marcas e Modelos)'));