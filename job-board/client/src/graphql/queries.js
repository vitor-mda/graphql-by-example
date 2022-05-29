import { gql } from '@apollo/client';
import { APOLLO_CLIENT, JOB_QUERY } from './constants';

const client = APOLLO_CLIENT;

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    id
                    name
                }
            }
        }
    `;

    const { data: { jobs } } = await client.query({ 
        query,
        fetchPolicy: 'no-cache' });
    return jobs;
}

export async function getJobById(id) {
    const variables = { id };
    const { data: { job } } = await client.query({ 
        query: JOB_QUERY,
        variables
    });
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
