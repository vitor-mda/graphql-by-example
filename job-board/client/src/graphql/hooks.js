import { useMutation, useQuery } from "@apollo/client";
import { getAccessToken } from "../auth";
import { CREATE_JOB_MUTATION } from "./mutations";
import { JOBS_QUERY, JOB_QUERY, COMPANY_QUERY } from "./queries";

export function useJobs() {
    const { data, loading, error } = useQuery(JOBS_QUERY, {
        fetchPolicy: 'network-only'
    });

    return {
        jobs: data?.jobs,
        loading,
        error
    };
}

export function useJob(id) {
    const { data, loading, error } = useQuery(JOB_QUERY, {
        variables: { id }
    });

    return {
        job: data?.job,
        loading,
        error
    };
}

export function useCompany(id) {
    const { data, loading, error } = useQuery(COMPANY_QUERY, {
        variables: { id }
      });

      return {
        company: data?.company,
        loading,
        error
      };
}

export function useCreateJob(input) {
    const context = { headers: { 'Authorization': `Bearer ${getAccessToken()}` } };
    const [createJob, { data, loading, error }] = useMutation(CREATE_JOB_MUTATION, {
        variables: { input },
        context,
        update: (cache, { data: { job } }) => {
            cache.writeQuery({
                query: JOB_QUERY,
                variables: { id: job.id },
                data: { job }
            })
        }
    });

    return [
        createJob,
        {
            job: data?.job,
            loading,
            error
        }
    ];
}
