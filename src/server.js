import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? 'env.test' : 'env',
})

import express from 'express'
import { User } from './app/models'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  const user = User.create({
    name: 'Glauber',
    email: 'test@mail.com',
    password_hash: '123',
  })
  return res.json(user)
})

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)
