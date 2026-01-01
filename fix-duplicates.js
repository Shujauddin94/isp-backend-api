const mysql = require('mysql2/promise');

async function run() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'wifi-management'
    });

    console.log('Clearing packages table...');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    await connection.execute('DELETE FROM packages');

    console.log('Re-inserting default packages with static IDs...');
    const packages = [
        ['pkg-basic', 'Basic Plan', '50 Mbps', 29.99, 80.97, 287.90, '["Up to 50 Mbps speed", "Unlimited data", "Free installation", "24/7 customer support"]', false],
        ['pkg-standard', 'Standard Plan', '100 Mbps', 49.99, 134.97, 479.90, '["Up to 100 Mbps speed", "Unlimited data", "Free WiFi router", "Free installation", "24/7 priority support"]', true],
        ['pkg-premium', 'Premium Plan', '250 Mbps', 79.99, 215.97, 767.90, '["Up to 250 Mbps speed", "Unlimited data", "Premium WiFi router", "Free installation", "Dedicated support line", "Free streaming package"]', false],
        ['pkg-ultra', 'Ultra Plan', '500 Mbps', 99.99, 269.97, 959.90, '["Up to 500 Mbps speed", "Unlimited data", "Latest WiFi 6 router", "Professional installation", "VIP support 24/7", "Premium streaming bundle", "Free security suite"]', false]
    ];

    for (const pkg of packages) {
        await connection.execute(
            'INSERT INTO packages (id, name, speed, monthly_price, three_months_price, yearly_price, features, is_popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            pkg
        );
    }

    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Deduplication complete!');
    await connection.end();
}

run().catch(err => {
    console.error('FAILED:', err.message);
    process.exit(1);
});
