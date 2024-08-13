import express, { Express } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolver';
import { PORT } from './internal';

const app: Express = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
