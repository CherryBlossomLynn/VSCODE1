# Lynn's Database Website

A comprehensive, modern database website featuring user authentication, advanced search, account management, and accessibility-first design.

## 🌟 Features

### Core Functionality
- **Secure Login System** - Multi-user authentication with demo accounts
- **Advanced User Search** - Filter by role, status, with real-time results
- **Account Management** - Complete profile customization and settings
- **Theme System** - Multiple themes (Default, Dark, Ocean, Sunset)
- **Data Management** - Export/import user data with backup functionality

### Modern Enhancements (Updated)
- **Performance Optimized** - Lazy loading, efficient CSS/JS, preloaded fonts
- **Loading States** - Visual feedback for all async operations
- **Error Handling** - Comprehensive error messages and recovery
- **Accessibility Compliant** - WCAG 2.1 standards, screen reader support
- **Keyboard Navigation** - Full keyboard accessibility with shortcuts
- **Responsive Design** - Mobile-first, works on all devices
- **Auto-Save** - Automatic settings backup every 5 minutes
- **Data Persistence** - Robust localStorage with integrity checks

## 🚀 Quick Start

### MySQL Setup (Optional)
For database integration:
1. **Install MySQL Server**
   ```bash
   # Windows (using winget)
   winget install Oracle.MySQL
   
   # macOS (using Homebrew)
   brew install mysql
   
   # Ubuntu/Debian
   sudo apt install mysql-server
   ```

2. **Configure MySQL**
   ```sql
   CREATE DATABASE lynns_database;
   CREATE USER 'lynn_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON lynns_database.* TO 'lynn_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Connection Settings**
   ```javascript
   const dbConfig = {
     host: 'localhost',
     user: 'lynn_user',
     password: 'secure_password',
     database: 'lynns_database',
     port: 3306
   };
   ```

### Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/CherryBlossomLynn/VSCODE1.git
   cd VSCODE1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MySQL credentials
   ```

4. **Setup database**
   ```bash
   npm run setup-db
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Demo Accounts
- **Admin**: `lynn` / `Lynn@1104`
- **User**: `michael` / `database2025`

### Accessing the Website
1. Ensure MySQL server is running
2. Navigate to: `http://lynnsdatabase.local`
3. Or use: `http://localhost:3000/VSCODE1` (for development server)
4. Or directly open `lynn-website.html` in your browser

## 🎯 User Guide

### Login & Navigation
1. Enter credentials on the login page
2. Use the navigation bar to switch between Main and Account pages
3. Logout securely when finished

### User Search
- Search by name, email, or role
- Use dropdown filters for refined results
- Real-time search results with loading indicators

### Account Management
- **Profile Settings**: Update personal information
- **Appearance**: Choose themes, colors, and font sizes
- **Preferences**: Configure notifications and privacy
- **Security**: Change passwords, enable 2FA
- **Data Management**: Export/import backups

### Keyboard Shortcuts
- `Ctrl+S`: Save settings
- `Escape`: Close notifications
- `Enter`: Trigger search (in search box)
- `Tab/Shift+Tab`: Navigate elements
- `Arrow Keys`: Navigate tabs

## 🛠️ Technical Details

### Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, Custom Properties
- **Storage**: localStorage with versioning
- **Accessibility**: ARIA labels, semantic HTML, screen reader support

### Performance Features
- Preloaded critical resources
- Lazy loading for non-critical assets
- Optimized animations with `will-change`
- Efficient DOM manipulation
- Auto cleanup and memory management

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔧 Development

### File Structure
```
VSCODE1/
├── index.html          # Main application file
├── styles.css          # Complete CSS styling
├── script.js           # Application logic
├── README.md           # This documentation
└── images/             # Image assets
```

### Key Components
- **Login System**: Multi-user authentication
- **Search Engine**: Advanced filtering and results
- **Theme System**: Dynamic CSS custom properties
- **Data Layer**: localStorage with backup/restore
- **Notification System**: Toast notifications
- **Navigation**: SPA-style page switching

### Accessibility Features
- Semantic HTML structure
- ARIA labels and live regions
- High contrast mode support
- Reduced motion support
- Focus management
- Screen reader announcements
- Keyboard navigation

## 📊 Statistics Dashboard
The website includes a real-time statistics dashboard showing:
- Total Users: 8
- Administrators: 2
- Active Users: 6
- System Uptime: 99.9%

## 🎨 Themes Available
1. **Default**: Blue gradient theme
2. **Dark**: Professional dark mode
3. **Ocean**: Blue ocean-inspired
4. **Sunset**: Warm sunset colors

## 🔒 Security Features
- Input validation and sanitization
- Secure session management
- Data integrity checks
- Auto-backup on page unload
- Storage quota monitoring

## 📱 Mobile Responsive
- Mobile-first design approach
- Touch-friendly interfaces
- Optimized layouts for all screen sizes
- Gesture support where applicable

## 🌐 Domain Configuration
Configured to work with:
- `lynnsdatabase.local` (Primary)
- `localhost:3000/VSCODE1` (Development server)
- Direct file access via `lynn-website.html` (Standalone)

## 💾 Data Management
- **Auto Backup**: Every 5 minutes
- **Manual Export**: JSON format
- **Import Restore**: Full settings restoration
- **Clear Data**: Complete reset option

## 🎯 Future Enhancements
- Real database integration
- Advanced user roles
- Email notifications
- File upload capabilities
- Advanced reporting

---

**Built with ❤️ using modern web technologies**
*Last Updated: December 2024*