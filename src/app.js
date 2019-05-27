import express from 'express'

const dotenv = require('dotenv')

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.test.env' : 'test',
})

import router from './router'

const app = express()

app.use(express.json())
app.use(router)

export default app
