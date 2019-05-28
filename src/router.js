import express from 'express'

import { login } from './app/controllers/SessionController'
import Auth from './app/middlewares/Auth'

const router = express.Router()

router.post('/sessions', login)

router.use(Auth)

router.get('/dashboard', (req, res) => {
  return res.status(200).send()
})

export default router
