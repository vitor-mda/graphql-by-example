import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient as createWsClient } from 'graphql-ws';
import { getAccessToken } from '../auth';

const GRAPHQL_HTTP_URL = 'http://localhost:9000/graphql';
const GRAPHQL_WS_URL = 'ws://localhost:9000/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URL
});

const wsLink = new GraphQLWsLink(createWsClient({
  url: GRAPHQL_WS_URL,
  connectionParams: () => ({
    accessToken: getAccessToken()
  })
}));

const isSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  const isOperation = kind === Kind.OPERATION_DEFINITION;
  const isSubscription = operation === OperationTypeNode.SUBSCRIPTION;

  return isOperation && isSubscription;
};

export const client = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
});

export default client;
