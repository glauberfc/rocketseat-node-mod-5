import supertest from 'supertest'
import nodemailer from 'nodemailer'

import truncate from '../utils/truncate'
import factory from '../factory'
import app from '../../src/app'

jest.mock('nodemailer')

const transport = {
  sendMail: jest.fn(),
}

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  beforeAll(() => {
    nodemailer.createTransport.mockReturnValue(transport)
  })

  it('should be able to authenticate with valid credentials', async () => {
    const user = await factory.create('Users')

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      })

    expect(response.status).toBe(200)
  })

  it('should not be authenticate with invalid credentials', async () => {
    const user = await factory.create('Users')

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('Users')

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should not be able to access private routes when not pass a token', async () => {
    const response = await supertest(app).get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes when pass a invalid token', async () => {
    const response = await supertest(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 1234`)

    expect(response.status).toBe(401)
  })

  it('should be able to access private routes when pass a valid token', async () => {
    const user = await factory.create('Users')

    const response = await supertest(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should receive an email notification when authenticated', async () => {
    const user = await factory.create('Users')

    await supertest(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    expect(transport.sendMail).toHaveBeenCalledTimes(1)
    expect(transport.sendMail.mock.calls[0][0].to).toBe(
      `${user.name} <${user.email}>`
    )
  })
})
