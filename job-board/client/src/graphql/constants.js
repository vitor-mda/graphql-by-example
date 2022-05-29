import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { JOB_DETAIL_FRAGMENT } from './fragments';

const GRAPHQL_URL = 'http://localhost:9000/graphql';
const CACHE = new InMemoryCache();

export const APOLLO_CLIENT = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: CACHE
});

export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }

    ${JOB_DETAIL_FRAGMENT}
`;
