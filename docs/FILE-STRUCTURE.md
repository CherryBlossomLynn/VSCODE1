# 📁 Project File Structure

This document describes the organized file structure for Lynn's Database project.

## 🏗️ Root Directory
```
VSCODE1/
├── 📄 git-installer.exe             # Git installer
├── 📁 frontend/                     # Frontend development files
├── 📁 backend/                      # Server-side files
├── 📁 database/                     # Database files
├── 📁 docs/                         # Documentation
└── 📁 .git/                         # Git repository files
```

## 📂 Folder Details

### 🎨 frontend/
Contains all frontend development files:
- `index.html` - Main website entry point
- `index-integrated.html` - Enhanced integrated version
- `lynn-website.html` - Original enhanced version
- `css/styles.css` - Main stylesheet
- `js/script.js` - Main JavaScript functionality
- `images/` - Image assets folder
- `README.md` - Frontend development guide

### ⚙️ backend/
Contains server-side and Node.js files:
- `server.js` - Express server implementation
- `mysql-config.js` - Database configuration and operations
- `import-xampp-users.js` - XAMPP user import script
- `package.json` - Node.js dependencies and scripts

### 🗄️ database/
Contains database-related files:
- `xampp-database-import.sql` - SQL import file for phpMyAdmin

### 📚 docs/
Contains project documentation:
- `README.md` - Project overview and instructions
- `XAMPP-IMPORT-GUIDE.md` - Guide for importing XAMPP databases
- `.env.example` - Environment configuration template



## 🔗 File References Updated

All HTML files have been updated to reference the new file locations:
- CSS: `href="assets/styles.css"`
- JavaScript: `src="assets/script.js"`

## 🚀 Usage

### For Frontend Development:
- Main files: `index.html`, `index-integrated.html`
- Assets: Located in `assets/` folder
- Images: Located in `images/` folder

### For Backend Development:
- Navigate to `backend/` folder
- Run: `npm install` (if needed)
- Start server: `node server.js`

### For Database Setup:
- SQL files: Located in `database/` folder
- Import guides: Located in `docs/` folder

### For Documentation:
- All guides and documentation: Located in `docs/` folder

## ✅ Benefits of This Structure

1. **🎯 Clear Separation**: Frontend, backend, and database files are clearly separated
2. **📖 Easy Navigation**: Related files are grouped together
3. **🔧 Better Maintenance**: Easier to find and update specific types of files
4. **📦 Professional Organization**: Follows industry best practices
5. **🔍 Improved Search**: Easier to locate files by category

## 🛠️ Next Steps

1. Test all functionality to ensure file paths work correctly
2. Update any additional file references if needed
3. Consider adding more specific folders as the project grows
4. Keep documentation updated as new files are added

---
*Last updated: October 4, 2025*