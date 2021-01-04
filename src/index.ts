// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { TestResolver } from './typeorm/resolvers/TestResolver'
import { UserResolver } from './typeorm/resolvers/UserResolver'
import { AuthResolver } from './typeorm/resolvers/AuthResolver'

const PORT: number = Number(process.env.PORT) ?? 4000
const URL: string = String(process.env.BASE_URL) ?? 'localhost'

main()

async function main() {
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers: [TestResolver, UserResolver, AuthResolver],
  })
  const server = new ApolloServer({ schema })
  await server.listen(PORT)
  console.log(`Server has started at http://${URL}:${PORT}/graphql !`)
}
