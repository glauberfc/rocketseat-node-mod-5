import { Users } from '../models'
import { sendMail } from '../services/email'

export async function login(req, res) {
  const { email, password } = req.body

  const user = await Users.findOne({ where: { email } })

  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).json({ message: 'Email or password incorrects' })
  }

  await sendMail({
    from: 'Test <test@test.com>',
    to: `${user.name} <${user.email}>`,
    subject: 'Test message',
    text: 'Hello!',
  })

  return res.status(200).json({ token: user.generateToken() })
}
