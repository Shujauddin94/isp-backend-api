const mysql = require('mysql2/promise');

async function run() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'wifi-management'
    });

    const [rows] = await connection.execute('SELECT * FROM packages');
    console.log('Total packages:', rows.length);
    console.log(JSON.stringify(rows.map(r => ({ id: r.id, name: r.name, speed: r.speed })), null, 2));

    await connection.end();
}

run().catch(err => {
    console.error('FAILED:', err.message);
    process.exit(1);
});
