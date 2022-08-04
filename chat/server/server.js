import { createServer as createHttpServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer as useWsServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { User } from './db.js';
import { resolvers } from './resolvers.js';

const GRAPHQL_PATH = '/graphql';
const PORT = 9000;
const JWT_SECRET = Buffer.from('+Z3zPGXY7v/0MoMm1p8QuHDGGVrhELGd', 'base64');

const app = express();
app.use(cors(), express.json(), expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JWT_SECRET,
}));

app.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne((user) => user.id === userId);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

function getHttpContext({ req }) {
  if (req.auth) {
    return { userId: req.auth.sub };
  }
  return {};
}

function getWsContext({ connectionParams }) {
  const context = {};
  const token = connectionParams?.accessToken;

  if (token) context.userId = jwt.verify(token, JWT_SECRET);

  return context;
}

const httpServer = createHttpServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: GRAPHQL_PATH });

const typeDefs = await readFile('./schema.graphql', 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });
useWsServer({ schema, context: getWsContext }, wsServer);

const apolloServer = new ApolloServer({ schema, context: getHttpContext });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });

httpServer.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${GRAPHQL_PATH}`);
});
