import { Company, Job } from './db.js';

export const resolvers = {
    Query: {
        job: async (_root, { id }) => Job.findById(id),
        jobs: async () => Job.findAll(),
        company: async (_root, { id }) => Company.findById(id)
    },

    Mutation: {
        createJob: async (_root, { input }) => Job.create(input),
        deleteJob: async (_root, { id }) => Job.delete(id),
        updateJob: async (_root, { input }) => Job.update(input)
    },

    Job: {
        company: async (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: async (company) => Job.findAll(job => job.companyId === company.id)
    }
};
