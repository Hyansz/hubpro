require('dotenv').config({path: '.env.dev.local'});

const {sql} = require('@vercel/postgres');

async function execute() {
    try {
        const rows = await sql`
            SELECT * FROM komentar
        `;
        console.log(rows)
    } catch (error) {
        console.log("Error ditemukan: " ,error.message);
    }
};

execute()