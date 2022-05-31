import { gql } from '@apollo/client';
import { JOB_DETAIL_FRAGMENT } from './fragments';

export const CREATE_JOB_MUTATION = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetail
        }
    }

    ${JOB_DETAIL_FRAGMENT}
`;
