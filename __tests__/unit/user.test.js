import { Users } from '../../src/app/models'
import truncate from '../utils/truncate'

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await Users.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123',
    })

    const compareHash = await user.checkPassword('123')

    expect(compareHash).toBe(true)
  })
})
