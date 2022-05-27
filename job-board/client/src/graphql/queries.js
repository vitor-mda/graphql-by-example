import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache()
});

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    name
                }
            }
        }
    `;

    const { data: { jobs } } = await client.query({ query });
    return jobs;
}

export async function getJobById(id) {
    const query = gql`
        query JobById($id: ID!) {
            job(id: $id) {
                id
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;

    const variables = { id };
    const { data: { job } } = await client.query( { query, variables });
    return job;
}

export async function getCompanyById(id) {
    const query = gql`
        query CompanyById($id: ID!) {
            company(id: $id) {
                name
                description
                jobs {
                    id
                    title
                }
            }
        }
    `

    const variables = { id };
    const { data: { company } } = await client.query({ query, variables });
    return company;
}
