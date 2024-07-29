const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let produtos = [];
let proximoId = 1;


app.post('/produtos', (request, response) => {
  const { nome, preco, categoria } = request.body;
  if (!nome || !preco || !categoria) {
    return response.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' });
  }
  
  const produto = { id: proximoId++, nome, preco, categoria };
  produtos.push(produto);
  response.status(201).json(produto);
});


app.get('/produtos', (request, response) => {
  response.status(200).json(produtos);
});


app.get('/produtos/:id', (request, response) => {
  const produto = produtos.find(p => p.id === parseInt(request.params.id));
  if (!produto) {
    return response.status(404).json({ error: 'Produto não encontrado.' });
  }
  response.status(200).json(produto);
});


app.put('/produtos/:id', (request, response) => {
  const { nome, preco, categoria } = request.body;
  const produto = produtos.find(p => p.id === parseInt(request.params.id));
  if (!produto) {
    return response.status(404).json({ error: 'Produto não encontrado.' });
  }
  if (nome) produto.nome = nome;
  if (preco) produto.preco = preco;
  if (categoria) produto.categoria = categoria;
  response.status(200).json(produto);
});


app.delete('/produtos/:id', (request, response) => {
  const index = produtos.findIndex(p => p.id === parseInt(request.params.id));
  if (index === -1) {
    return response.status(404).json({ error: 'Produto não encontrado.' });
  }
  produtos.splice(index, 1);
  response.status(204).end();
});

app.listen(port, () => {
  console.log(`Servidor em execução http://localhost:${port}`);
});

module.exports = app; 