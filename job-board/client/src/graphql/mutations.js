import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;

    const variables = { input };
    const { job } = await request(GRAPHQL_URL, mutation, variables);

    return job;
}
