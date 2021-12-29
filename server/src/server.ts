
import { ApolloServer } from 'apollo-server';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
  `)
})
