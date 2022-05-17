import { Company, Job } from './db.js';

export const resolvers = {
    Query: {
        job: async (_root, { id }) => Job.findById(id),
        jobs: async () => Job.findAll(),
        company: async (_root, { id }) => Company.findById(id)
    },

    Mutation: {
        createJob: async (_root, { input }, { user }) => {
            if (!user) {
                throw new Error('Unauthenticated');
            }

            return Job.create({ ...input, companyId: user.companyId });
        },
        deleteJob: async (_root, { id }, { user }) => {
            if (!user) {
                throw new Error('Unauthenticated');
            }

            const job = await Job.findById(id);
            console.log('job: ', job);
            if (job && job.companyId !== user.companyId) {
                throw new Error('Unauthorized');
            }

            return Job.delete(id);
        },
        updateJob: async (_root, { input }) => Job.update(input)
    },

    Job: {
        company: async (job) => Company.findById(job.companyId)
    },

    Company: {
        jobs: async (company) => Job.findAll(job => job.companyId === company.id)
    }
};
