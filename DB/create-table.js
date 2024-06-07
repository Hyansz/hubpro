require('dotenv').config({path: '.env.dev.local'});

const {sql} = require('@vercel/postgres');

async function execute() {
    // const deleteTable = await sql`DROP TABLE komentar`;

    const createTable = await sql `
        CREATE TABLE IF NOT EXISTS komentar (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20) NOT NULL,
            website VARCHAR(50),
            komentar VARCHAR(160) NOT NULL
        )
    `;
    console.log(createTable);
};

execute()