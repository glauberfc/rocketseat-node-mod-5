import express from 'express'

import { login } from './app/controllers/SessionController'

const router = express.Router()

router.post('/sessions', login)

export default router
