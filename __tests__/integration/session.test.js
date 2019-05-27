import supertest from 'supertest'

import truncate from '../utils/truncate'
import { Users } from '../../src/app/models'
import app from '../../src/app'

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should be able to authenticate with valid credentials', async () => {
    const user = await Users.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123',
    })

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123',
      })

    expect(response.status).toBe(200)
  })

  it('should not be authenticate with invalid credentials', async () => {
    const user = await Users.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123',
    })

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await Users.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123',
    })

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123',
      })

    expect(response.body).toHaveProperty('token')
  })
})
