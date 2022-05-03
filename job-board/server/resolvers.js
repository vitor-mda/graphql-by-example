import { Company, Job } from './db.js';

export const resolvers = {
    Query: {
        job: async () => Job.findAll(),
        company: async () => Company.findAll()
    },

    Job: {
        company: async (job) => Company.findById(job.companyId)
    }
};
