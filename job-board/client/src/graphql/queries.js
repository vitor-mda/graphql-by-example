import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

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

    const { jobs} = await request(GRAPHQL_URL, query);
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
    const { job } = await request(GRAPHQL_URL, query, variables);
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
    const { company } = await request(GRAPHQL_URL, query, variables);
    return company;
}
