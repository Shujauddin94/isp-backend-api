const { Client } = require('pg');
require('dotenv').config();

// Trying non-pooled host
const connectionString = `postgresql://neondb_owner:p5Qv6wB2nEOR@ep-delicate-salad-a166di02.ap-southeast-1.aws.neon.tech/nest_db?sslmode=require`;

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('Attempting to connect to NON-POOLED host...');
client.connect()
    .then(() => {
        console.log('Successfully connected to Non-pooled host!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Query result:', res.rows[0]);
        return client.end();
    })
    .catch(err => {
        console.error('Connection error:', err.stack);
        process.exit(1);
    });
