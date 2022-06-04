import { Company, Job, db, companyLoader } from './db.js';
import { nanoid } from 'nanoid';

export const resolvers = {
    Query: {
        job: async (_root, { id }) =>
            await db.select()
                .from('job')
                .where({ id })
                .first(),

        jobs: async () =>
            await db.select()
                .from('job'),

        company: async (_root, { id }) => 
            await db.select()
                .from('company')
                .where({ id })
                .first()
    },

    Mutation: {
        createJob: async (_root, { input }, { user }) => {
            checkIfAuthenticated(user);

            const newJob = await db.insert({
                ...input,
                id: nanoid(),
                company_id: user.company_id
            })
                .into('job')
                .returning('*');

            return newJob[0];
        },

        deleteJob: async (_root, { id }, { user }) => {
            checkIfAuthenticated(user);

            const job = await db.select()
                .from('job')
                .where({ id })
                .first();
            if (job) checkIfAuthorized(job.companyId === user.companyId);
            else return;

            await db.delete().from('job').where({ id });

            return job;
        },

        updateJob: async (_root, { input }, { user }) => {
            checkIfAuthenticated(user);

            const job = await db.select()
                .from('job')
                .where({ id: input.id})
                .first();
            if (job) checkIfAuthorized(job.companyId === user.companyId);
            else return;

            await db.update({ ...input })
                .from('job')
                .where({ id: input.id });

            return { ...job, ...input};
        }
    },

    Job: {
        company: async (job) => await companyLoader.load(job.company_id)
    },

    Company: {
        jobs: async (company) =>
            await db.select()
                .from('job')
                .where({ company_id: company.id })
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
