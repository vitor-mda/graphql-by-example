import { gql } from "@apollo/client";

export const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetail on Job {
        id
        title
        company {
            id
            name
        }
        description
    }
`;
