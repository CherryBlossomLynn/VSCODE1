-- XAMPP MySQL Database Import for Lynn's Database Website
-- Import this file into phpMyAdmin to add sample users
-- This preserves lynn, michael, and testuser accounts

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `lynns_database`;
USE `lynns_database`;

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password_hash` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL,
    `full_name` varchar(100) NOT NULL,
    `role` enum('admin','user','manager') DEFAULT 'user',
    `status` enum('active','inactive') DEFAULT 'active',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `last_login` timestamp NULL DEFAULT NULL,
    `avatar` varchar(50) DEFAULT 'fas fa-user',
    `location` varchar(100) DEFAULT 'Unknown',
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert protected users (lynn, michael, testuser)
INSERT IGNORE INTO `users` (`id`, `username`, `password_hash`, `email`, `full_name`, `role`, `status`, `last_login`, `avatar`, `location`) VALUES
(1, 'lynn', '$2b$10$example_hash_Lynn@1104', 'Michelle.wise2004@gmail.com', 'Lynn Wise', 'admin', 'active', '2025-10-04 12:00:00', 'fas fa-user-tie', 'San Francisco, CA'),
(2, 'michael', '$2b$10$example_hash_database2025', 'michael@lynnsdatabase.local', 'Michael Johnson', 'user', 'active', '2025-10-04 11:55:00', 'fas fa-user', 'New York, NY'),
(3, 'testuser', '$2b$10$example_hash_123', 'testuser@lynnsdatabase.local', 'Test User', 'user', 'active', '2025-10-04 12:01:00', 'fas fa-user-check', 'Los Angeles, CA');

-- Insert additional sample users (these will replace current mock data)
INSERT IGNORE INTO `users` (`username`, `password_hash`, `email`, `full_name`, `role`, `status`, `last_login`, `avatar`, `location`) VALUES
('alex_rodriguez', '$2b$10$sample_hash_alex', 'alex.rodriguez@company.com', 'Alex Rodriguez', 'manager', 'active', '2025-10-04 10:30:00', 'fas fa-user-tie', 'Miami, FL'),
('jennifer_wong', '$2b$10$sample_hash_jennifer', 'jennifer.wong@company.com', 'Jennifer Wong', 'user', 'active', '2025-10-04 11:45:00', 'fas fa-user', 'Seattle, WA'),
('robert_taylor', '$2b$10$sample_hash_robert', 'robert.taylor@company.com', 'Robert Taylor', 'admin', 'active', '2025-10-04 11:59:00', 'fas fa-user-shield', 'Austin, TX'),
('maria_gonzalez', '$2b$10$sample_hash_maria', 'maria.gonzalez@company.com', 'Maria Gonzalez', 'manager', 'active', '2025-10-04 09:15:00', 'fas fa-user-tie', 'Phoenix, AZ'),
('james_wilson', '$2b$10$sample_hash_james', 'james.wilson@company.com', 'James Wilson', 'user', 'inactive', '2025-09-27 14:20:00', 'fas fa-user', 'Denver, CO'),
('amanda_chen', '$2b$10$sample_hash_amanda', 'amanda.chen@company.com', 'Amanda Chen', 'user', 'active', '2025-10-04 11:30:00', 'fas fa-user', 'Portland, OR'),
('carlos_martinez', '$2b$10$sample_hash_carlos', 'carlos.martinez@company.com', 'Carlos Martinez', 'manager', 'active', '2025-10-04 08:45:00', 'fas fa-user-tie', 'Las Vegas, NV'),
('stephanie_adams', '$2b$10$sample_hash_stephanie', 'stephanie.adams@company.com', 'Stephanie Adams', 'user', 'active', '2025-10-04 10:15:00', 'fas fa-user', 'Nashville, TN'),
('kevin_lee', '$2b$10$sample_hash_kevin', 'kevin.lee@company.com', 'Kevin Lee', 'admin', 'active', '2025-10-04 11:58:00', 'fas fa-user-shield', 'Atlanta, GA'),
('melissa_brown', '$2b$10$sample_hash_melissa', 'melissa.brown@company.com', 'Melissa Brown', 'user', 'active', '2025-10-04 11:20:00', 'fas fa-user', 'Charlotte, NC'),
('david_kim', '$2b$10$sample_hash_david', 'david.kim@company.com', 'David Kim', 'manager', 'active', '2025-10-04 09:30:00', 'fas fa-user-tie', 'San Diego, CA'),
('sarah_johnson', '$2b$10$sample_hash_sarah', 'sarah.johnson@company.com', 'Sarah Johnson', 'user', 'active', '2025-10-04 11:10:00', 'fas fa-user', 'Boston, MA'),
('thomas_garcia', '$2b$10$sample_hash_thomas', 'thomas.garcia@company.com', 'Thomas Garcia', 'user', 'inactive', '2025-10-01 16:45:00', 'fas fa-user', 'Chicago, IL'),
('lisa_anderson', '$2b$10$sample_hash_lisa', 'lisa.anderson@company.com', 'Lisa Anderson', 'manager', 'active', '2025-10-04 10:45:00', 'fas fa-user-tie', 'Houston, TX'),
('ryan_davis', '$2b$10$sample_hash_ryan', 'ryan.davis@company.com', 'Ryan Davis', 'user', 'active', '2025-10-04 11:35:00', 'fas fa-user', 'Minneapolis, MN');

-- Create audit log table
CREATE TABLE IF NOT EXISTS `audit_log` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) DEFAULT NULL,
    `action` varchar(100) NOT NULL,
    `details` text,
    `ip_address` varchar(45) DEFAULT NULL,
    `user_agent` text,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create sessions table
CREATE TABLE IF NOT EXISTS `user_sessions` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `session_token` varchar(255) NOT NULL,
    `expires_at` timestamp NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `session_token` (`session_token`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert some sample audit logs
INSERT INTO `audit_log` (`user_id`, `action`, `details`, `ip_address`, `created_at`) VALUES
(1, 'login', 'User logged in successfully', '192.168.1.100', '2025-10-04 12:00:00'),
(2, 'login', 'User logged in successfully', '192.168.1.101', '2025-10-04 11:55:00'),
(1, 'profile_update', 'Updated email address', '192.168.1.100', '2025-10-04 12:05:00'),
(4, 'login', 'User logged in successfully', '192.168.1.102', '2025-10-04 10:30:00');

-- Show results
SELECT 'Database setup completed!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT role, COUNT(*) as count FROM users GROUP BY role;
SELECT status, COUNT(*) as count FROM users GROUP BY status;