const request = require('supertest');
const app = require('./api'); 

const produtosTeste = [
  { nome: 'Xícara', preco: 10.0, categoria: 'Cozinha' },
  { nome: 'Brinco', preco: 50.0, categoria: 'Acessório' },
  { nome: 'Mesa', preco: 150.0, categoria: 'Móveis' }
];

describe('produtos API', () => {
  beforeEach(async () => {
  
    await request(app).delete('/produtos/deleteAll'); 
   
    for (const produto of produtosTeste) {
      await request(app).post('/produtos').send(produto);
    }
  });

  it('Criando novo produto', async () => {
    const response = await request(app).post('/produtos').send({ nome: 'Lâmpada', preco: 20.0, categoria: 'Decoração' });
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('Lâmpada');
  });

  it('Listando os produtos', async () => {
    const response = await request(app).get('/produtos');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3); 
  });

  it('Buscando um produto pelo Id', async () => {
    const response = await request(app).get('/produtos/2');
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Brinco');
  });

  it('Atualizando um produto pelo Id', async () => {
    const response = await request(app).put('/produtos/1').send({ nome: 'Espelho', preco: 15.0, categoria: 'Decoração' });
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Espelho');
  });

  it('Deletando um produto', async () => {
    const response = await request(app).delete('/produtos/3');
    expect(response.status).toBe(204);
  });
});
