import { gql } from '@apollo/client';
import { getAccessToken } from '../auth';
import { APOLLO_CLIENT, JOB_QUERY } from './constants';
import { JOB_DETAIL_FRAGMENT } from './fragments';

const client = APOLLO_CLIENT;

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!) {
            job: createJob(input: $input) {
                ...JobDetail
            }
        }

        ${JOB_DETAIL_FRAGMENT}
    `;

    const variables = { input };
    const token = getAccessToken();
    const context = { headers: { 'Authorization': `Bearer ${token}` } };

    const { data: { job } } = await client.mutate({
        mutation,
        variables,
        context,
        update: (cache, { data: { job } }) => {
            cache.writeQuery({
                query: JOB_QUERY,
                variables: { id: job.id },
                data: { job }
            })
        }
    });

    return job;
}
