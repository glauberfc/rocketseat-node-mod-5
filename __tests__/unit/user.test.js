import { Users } from '../../src/app/models'
import truncate from '../utils/truncate'
import factory from '../factory'

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await factory.create('Users', {
      password: '123',
    })

    const compareHash = await user.checkPassword('123')

    expect(compareHash).toBe(true)
  })
})
