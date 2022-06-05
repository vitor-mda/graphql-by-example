import DataLoader from 'dataloader';
import knex from 'knex';

export const db = knex({
    client: 'better-sqlite3',
    connection: {
        filename: './data/db.sqlite3'
    },
    useNullAsDefault: true
});

db.on('query', ({ sql, bindings }) => {
    console.log('[db][knex]', sql, bindings);
});

export const createCompanyLoader = () => new DataLoader(
    async (companyIds) => {
        console.log('[CompanyLoader] companyIds:', companyIds);
        const companies =
            await db.select()
                .from('company')
                .whereIn('id', companyIds);

        return companyIds.map(
            companyId => companies.find(company => company.id === companyId)
        )
    }
);
