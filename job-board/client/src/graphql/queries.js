import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getJobs() {
    const query = gql`
        query {
            job {
                id
                title
                company {
                    name
                }
            }
        }
    `;

    const { job } = await request(GRAPHQL_URL, query);
    return job;
}
