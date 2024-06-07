require('dotenv').config({path: '.env.development.local'});

const {sql} = require('@vercel/postgres');

async function execute() {
    try {
        const rows = await sql`
            INSERT INTO komentar (name, website, komentar)
            VALUES ('Arifin badri','kicauburungku.com', 'wuuiiiih mengerikuaaannn mate dieeee merrraaaah, giginya tajam!!!')
        `;
        console.log(rows)
    } catch (error) {
        console.log("Error ditemukan: " ,error.message);
    }
};

execute()