import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
});

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;

    const variables = { input };
    const token = getAccessToken();
    const context = {
        headers: { 'Authorization': `Bearer ${token}` }
    }
    const { data: { job } } = await client.mutate({ mutation, variables, context });

    return job;
}
