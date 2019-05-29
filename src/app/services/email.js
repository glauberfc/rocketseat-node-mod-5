import nodemailer from 'nodemailer'
import config from '../../config/email'

export async function sendMail(messageConfig) {
  const transporter = nodemailer.createTransport(config)

  await transporter.sendMail(messageConfig)
}
