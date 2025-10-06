# XAMPP MySQL Database Import Instructions

## 📋 Overview
This guide will help you import a MySQL database from XAMPP while preserving the core users (lynn, michael, testuser) and replacing other mock data with real database records.

## 🛠️ Method 1: Using phpMyAdmin (Recommended)

### Step 1: Access phpMyAdmin
1. Start XAMPP Control Panel
2. Start Apache and MySQL services
3. Open your browser and go to: `http://localhost/phpmyadmin`

### Step 2: Import Database
1. **Create Database:**
   - Click "New" in the left sidebar
   - Database name: `lynns_database`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

2. **Import SQL File:**
   - Select the `lynns_database` database
   - Click the "Import" tab
   - Click "Choose File" and select `xampp-database-import.sql`
   - Click "Go" to import

### Step 3: Verify Import
```sql
-- Check total users
SELECT COUNT(*) as total_users FROM users;

-- Check user roles
SELECT role, COUNT(*) as count FROM users GROUP BY role;

-- View all users
SELECT id, username, full_name, email, role, status FROM users;
```

## 🔧 Method 2: Using Node.js Import Script

### Prerequisites
```bash
npm install mysql2
```

### Run Import Script
```bash
# Install dependencies
npm install

# Run the import script
npm run import-xampp
```

### What the script does:
- ✅ Connects to XAMPP MySQL database
- ✅ Preserves lynn, michael, testuser accounts
- ✅ Imports additional users from MySQL
- ✅ Updates website files with imported data
- ✅ Maintains user roles and statuses

## 📊 Expected Results

After import, you should have:

### Core Users (Preserved)
- **lynn** - Admin - Michelle.wise2004@gmail.com
- **michael** - User - michael@lynnsdatabase.local  
- **testuser** - User - testuser@lynnsdatabase.local

### Additional Users (From Database)
- Alex Rodriguez - Manager - Miami, FL
- Jennifer Wong - User - Seattle, WA
- Robert Taylor - Admin - Austin, TX
- Maria Gonzalez - Manager - Phoenix, AZ
- James Wilson - User - Denver, CO (Inactive)
- Amanda Chen - User - Portland, OR
- Carlos Martinez - Manager - Las Vegas, NV
- Stephanie Adams - User - Nashville, TN
- Kevin Lee - Admin - Atlanta, GA
- Melissa Brown - User - Charlotte, NC
- David Kim - Manager - San Diego, CA
- Sarah Johnson - User - Boston, MA
- Thomas Garcia - User - Chicago, IL (Inactive)
- Lisa Anderson - Manager - Houston, TX
- Ryan Davis - User - Minneapolis, MN

## 🔍 Troubleshooting

### Database Connection Issues
```javascript
// Check XAMPP MySQL settings
const xamppConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Usually empty for XAMPP
    database: 'lynns_database',
    port: 3306
};
```

### Common Issues
1. **XAMPP not running**: Start Apache and MySQL in XAMPP Control Panel
2. **Database doesn't exist**: Create `lynns_database` in phpMyAdmin first
3. **Permission denied**: Make sure MySQL service is running
4. **Import fails**: Check SQL file format and database collation

### Verify Import Success
```bash
# Check if users were imported
node -e "
const mysql = require('mysql2/promise');
(async () => {
  const conn = await mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'lynns_database'
  });
  const [rows] = await conn.execute('SELECT COUNT(*) as count FROM users');
  console.log('Total users:', rows[0].count);
  await conn.end();
})();
"
```

## 🌐 Testing the Website

After successful import:

1. **Open the website**: `http://localhost:8080/lynn-website.html`
2. **Test login**: Use any of the core accounts
3. **Test search**: Search for imported users
4. **Verify data**: Check that new users appear in search results

## 📁 Files Created/Modified

- `xampp-database-import.sql` - SQL file for direct import
- `import-xampp-users.js` - Node.js import script
- `script.js` - Updated with imported users
- `lynn-website.html` - Updated with imported users

## 🔒 Security Notes

- All sample passwords are hashed (for demo purposes)
- In production, use proper bcrypt hashing
- Change default XAMPP passwords
- Use environment variables for database credentials

## ✅ Success Criteria

Import is successful when:
- [x] Core users (lynn, michael, testuser) are preserved
- [x] Additional users are imported from database
- [x] Website search shows new users
- [x] All user roles and statuses are correct
- [x] No duplicate users exist