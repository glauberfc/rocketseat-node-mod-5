import { Users } from '../models'

export async function login(req, res) {
  const { email, password } = req.body

  const user = await Users.findOne({ where: { email } })

  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).json({ message: 'Email or password incorrects' })
  }

  return res.status(200).json({ token: user.generateToken() })
}
