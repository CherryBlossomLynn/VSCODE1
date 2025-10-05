// XAMPP MySQL Database Import Script
// This script imports users from XAMPP MySQL database while preserving core users

const mysql = require('mysql2/promise');

// XAMPP MySQL connection configuration
const xamppConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Default XAMPP password is empty
    database: 'lynns_database',
    port: 3306
};

// Protected users that should not be replaced
const PROTECTED_USERS = ['lynn', 'michael', 'testuser'];

// Create XAMPP connection
async function connectToXAMPP() {
    try {
        const connection = await mysql.createConnection(xamppConfig);
        console.log('✅ Connected to XAMPP MySQL database');
        return connection;
    } catch (error) {
        console.error('❌ Failed to connect to XAMPP MySQL:', error);
        throw error;
    }
}

// Import users from XAMPP MySQL
async function importFromXAMPP() {
    let connection;
    
    try {
        connection = await connectToXAMPP();
        
        // First, let's see what tables exist
        console.log('\n📋 Checking available tables...');
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('Available tables:', tables);
        
        // Check if users table exists
        const userTableExists = tables.some(table => 
            Object.values(table)[0].toLowerCase() === 'users'
        );
        
        if (!userTableExists) {
            console.log('\n🔄 Users table not found. Creating sample data...');
            await createSampleXAMPPData(connection);
        }
        
        // Import users
        console.log('\n📥 Importing users from XAMPP database...');
        const [users] = await connection.execute(`
            SELECT id, username, email, full_name, role, status, created_at, last_login, avatar, location 
            FROM users 
            WHERE username NOT IN (${PROTECTED_USERS.map(() => '?').join(',')})
            ORDER BY id
        `, PROTECTED_USERS);
        
        console.log(`\n📊 Found ${users.length} users to import (excluding protected users)`);
        
        if (users.length === 0) {
            console.log('⚠️  No additional users found to import.');
            return [];
        }
        
        // Convert MySQL data to website format
        const importedUsers = users.map(user => ({
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: capitalizeRole(user.role),
            status: capitalizeStatus(user.status),
            lastSeen: formatLastSeen(user.last_login),
            username: user.username,
            avatar: user.avatar || 'fas fa-user',
            location: user.location || 'Unknown'
        }));
        
        console.log('\n📋 Imported Users:');
        importedUsers.forEach(user => {
            console.log(`  - ${user.name} (${user.username}) - ${user.role} - ${user.status}`);
        });
        
        return importedUsers;
        
    } catch (error) {
        console.error('❌ Import failed:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n🔌 Database connection closed');
        }
    }
}

// Create sample XAMPP data if table doesn't exist
async function createSampleXAMPPData(connection) {
    try {
        // Create users table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                full_name VARCHAR(100) NOT NULL,
                role ENUM('admin', 'user', 'manager') DEFAULT 'user',
                status ENUM('active', 'inactive') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                last_login TIMESTAMP NULL,
                avatar VARCHAR(50) DEFAULT 'fas fa-user',
                location VARCHAR(100) DEFAULT 'Unknown'
            )
        `);
        
        // Insert sample users (excluding protected ones)
        const sampleUsers = [
            ['alex_rodriguez', '$2b$10$sample_hash', 'alex@company.com', 'Alex Rodriguez', 'manager', 'active', 'fas fa-user-tie', 'Miami, FL'],
            ['jennifer_wong', '$2b$10$sample_hash', 'jennifer@company.com', 'Jennifer Wong', 'user', 'active', 'fas fa-user', 'Seattle, WA'],
            ['robert_taylor', '$2b$10$sample_hash', 'robert@company.com', 'Robert Taylor', 'admin', 'active', 'fas fa-user-shield', 'Austin, TX'],
            ['maria_gonzalez', '$2b$10$sample_hash', 'maria@company.com', 'Maria Gonzalez', 'manager', 'active', 'fas fa-user-tie', 'Phoenix, AZ'],
            ['james_wilson', '$2b$10$sample_hash', 'james@company.com', 'James Wilson', 'user', 'inactive', 'fas fa-user', 'Denver, CO'],
            ['amanda_chen', '$2b$10$sample_hash', 'amanda@company.com', 'Amanda Chen', 'user', 'active', 'fas fa-user', 'Portland, OR'],
            ['carlos_martinez', '$2b$10$sample_hash', 'carlos@company.com', 'Carlos Martinez', 'manager', 'active', 'fas fa-user-tie', 'Las Vegas, NV'],
            ['stephanie_adams', '$2b$10$sample_hash', 'stephanie@company.com', 'Stephanie Adams', 'user', 'active', 'fas fa-user', 'Nashville, TN'],
            ['kevin_lee', '$2b$10$sample_hash', 'kevin@company.com', 'Kevin Lee', 'admin', 'active', 'fas fa-user-shield', 'Atlanta, GA'],
            ['melissa_brown', '$2b$10$sample_hash', 'melissa@company.com', 'Melissa Brown', 'user', 'active', 'fas fa-user', 'Charlotte, NC']
        ];
        
        for (const user of sampleUsers) {
            await connection.execute(`
                INSERT IGNORE INTO users (username, password_hash, email, full_name, role, status, avatar, location, last_login)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 168) HOUR))
            `, user);
        }
        
        console.log('✅ Sample XAMPP data created');
        
    } catch (error) {
        console.error('❌ Failed to create sample data:', error);
        throw error;
    }
}

// Update the website files with imported data
async function updateWebsiteFiles(importedUsers) {
    const fs = require('fs').promises;
    
    try {
        // Read current script.js
        const scriptContent = await fs.readFile('script.js', 'utf8');
        
        // Preserve protected users and add imported users
        const protectedUsersData = [
            { id: 1, name: 'Lynn Miller', email: 'lynn@lynnsdatabase.local', role: 'Admin', status: 'Active', lastSeen: '2 minutes ago' },
            { id: 2, name: 'Michael Johnson', email: 'michael@lynnsdatabase.local', role: 'User', status: 'Active', lastSeen: '5 minutes ago' },
            { id: 999, name: 'Test User', email: 'testuser@lynnsdatabase.local', role: 'User', status: 'Active', lastSeen: '1 minute ago' }
        ];
        
        // Combine protected users with imported users
        const allUsers = [...protectedUsersData, ...importedUsers.map((user, index) => ({
            ...user,
            id: index + 10 // Start imported users from ID 10
        }))];
        
        // Create new userDatabase array string
        const userDatabaseString = `        const userDatabase = [
${allUsers.map(user => 
            `            { id: ${user.id}, name: '${user.name}', email: '${user.email}', role: '${user.role}', status: '${user.status}', lastSeen: '${user.lastSeen}' }`
        ).join(',\n')}
        ];`;
        
        // Replace the userDatabase in script.js
        const updatedScript = scriptContent.replace(
            /const userDatabase = \[[\s\S]*?\];/,
            userDatabaseString
        );
        
        await fs.writeFile('script.js', updatedScript, 'utf8');
        console.log('✅ Updated script.js with imported users');
        
        // Update lynn-website.html as well
        const htmlContent = await fs.readFile('lynn-website.html', 'utf8');
        const updatedHtml = htmlContent.replace(
            /const userDatabase = \[[\s\S]*?\];/,
            userDatabaseString
        );
        
        await fs.writeFile('lynn-website.html', updatedHtml, 'utf8');
        console.log('✅ Updated lynn-website.html with imported users');
        
        return allUsers;
        
    } catch (error) {
        console.error('❌ Failed to update website files:', error);
        throw error;
    }
}

// Helper functions
function capitalizeRole(role) {
    const roleMap = {
        'admin': 'Admin',
        'user': 'User',
        'manager': 'Manager'
    };
    return roleMap[role.toLowerCase()] || 'User';
}

function capitalizeStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatLastSeen(lastLogin) {
    if (!lastLogin) return 'Never';
    
    const now = new Date();
    const loginDate = new Date(lastLogin);
    const diffMs = now - loginDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
}

// Main import function
async function main() {
    console.log('🚀 Starting XAMPP MySQL Database Import');
    console.log('🔒 Protected users: lynn, michael, testuser');
    console.log('━'.repeat(50));
    
    try {
        // Import users from XAMPP
        const importedUsers = await importFromXAMPP();
        
        if (importedUsers.length > 0) {
            // Update website files
            const allUsers = await updateWebsiteFiles(importedUsers);
            
            console.log('\n📊 Import Summary:');
            console.log(`  - Protected users: ${PROTECTED_USERS.length}`);
            console.log(`  - Imported users: ${importedUsers.length}`);
            console.log(`  - Total users: ${allUsers.length}`);
            
            console.log('\n✅ Database import completed successfully!');
            console.log('🌐 You can now test the updated website');
        } else {
            console.log('\n⚠️  No users imported. Database may be empty or contain only protected users.');
        }
        
    } catch (error) {
        console.error('\n❌ Import process failed:', error.message);
        process.exit(1);
    }
}

// Run the import if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = {
    importFromXAMPP,
    updateWebsiteFiles,
    connectToXAMPP
};