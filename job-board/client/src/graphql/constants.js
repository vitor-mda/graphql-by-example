import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:9000/graphql';
const CACHE = new InMemoryCache();

export const APOLLO_CLIENT = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: CACHE
});
