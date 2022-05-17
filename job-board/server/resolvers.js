import { Company, Job } from './db.js';

export const resolvers = {
    Query: {
        job: async (_root, { id }) => Job.findById(id),
        jobs: async () => Job.findAll(),
        company: async (_root, { id }) => Company.findById(id)
    },

    Mutation: {
        createJob: async (_root, { input }, { user }) => {
            checkIfAuthenticated(user);

            return Job.create({ ...input, companyId: user.companyId });
        },
        deleteJob: async (_root, { id }, { user }) => {
            checkIfAuthenticated(user);

            const job = await Job.findById(id);
            if (job) {
                checkIfAuthorized(job.companyId === user.companyId);
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

function checkIfAuthenticated(user) {
    if (!user) {
        throw new Error('Unauthenticated');
    }
}

function checkIfAuthorized(condition) {
    if (!condition) {
        throw new Error('Unauthorized');
    }
}
