import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ message: 'Token not provided' })
  }

  const [_, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET)
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' })
  }
}
