import {ApolloServer} from 'apollo-server';
import typeDefs from './graphql/schema';
import resolvers from "./graphql/resolvers";

const app = new ApolloServer({
  typeDefs,
  resolvers,
});

export default app;

