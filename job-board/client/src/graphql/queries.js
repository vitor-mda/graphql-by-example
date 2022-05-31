import { gql } from '@apollo/client';
import { JOB_DETAIL_FRAGMENT } from './fragments';

export const JOBS_QUERY = gql`
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

export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }

    ${JOB_DETAIL_FRAGMENT}
`;

export const COMPANY_QUERY = gql`
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
`;
