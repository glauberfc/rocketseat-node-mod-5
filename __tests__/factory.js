import factory from 'factory-girl'
import faker from 'faker'

import { Users } from '../src/app/models'

factory.define('Users', Users, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export default factory
