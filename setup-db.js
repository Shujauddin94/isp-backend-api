const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function run() {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'database.sql'), 'utf8');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.argv[2] || '',
        multipleStatements: true
    });

    console.log('Connected to MySQL. Executing SQL...');
    await connection.query(sql);
    console.log('Database setup complete!');
    await connection.end();
}

run().catch(err => {
    console.error('FAILED:', err.message);
    process.exit(1);
});
