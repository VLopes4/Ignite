import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  test('Criar uma transação', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'venda de carro',
        amount: 5000,
        type: 'credit'
      })
      .expect(201)
  })

  test('Listar todas as transações', async () => {
    const createTransactionResponde = await request(app.server)
      .post('/transactions')
      .send({
        title: 'venda de carro',
        amount: 5000,
        type: 'credit'
      })

    const cookies = createTransactionResponde.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body).toEqual([
      expect.objectContaining({
        title: 'venda de carro',
        amount: 5000,
      })
    ])
  })

  test('Listar uma transação específica', async () => {
    const createTransactionResponde = await request(app.server)
      .post('/transactions')
      .send({
        title: 'venda de carro',
        amount: 5000,
        type: 'credit'
      })

    const cookies = createTransactionResponde.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body[0].id

    const getTransactionResponse = await request(app.server)
    .get(`/transactions/${transactionId}`)
    .set('Cookie', cookies)
    .expect(200)
    
    expect(getTransactionResponse.body).toEqual(
      expect.objectContaining({
        title: 'venda de carro',
        amount: 5000,
      })
    )
  })

  test('Obter o resumo das transações', async () => {
    const createTransactionResponde = await request(app.server)
      .post('/transactions')
      .send({
        title: 'venda de carro',
        amount: 5000,
        type: 'credit'
      })

    const cookies = createTransactionResponde.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'compra de carro',
        amount: 2000,
        type: 'debit'
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body).toEqual({
      amount: 3000
    })
  })
})

