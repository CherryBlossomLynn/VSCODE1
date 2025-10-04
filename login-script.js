// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginBtn = document.querySelector('.login-btn');
    const messageContainer = document.getElementById('messageContainer');
    const demoAccountBtns = document.querySelectorAll('.use-demo-btn');

    // Valid credentials
    const validCredentials = {
        'lynn': 'Lynn@1104',
        'michael': 'database2025'
    };

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Demo account buttons
    demoAccountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const demoAccount = this.closest('.demo-account');
            const username = demoAccount.getAttribute('data-username');
            const password = demoAccount.getAttribute('data-password');
            
            usernameInput.value = username;
            passwordInput.value = password;
            
            // Add visual feedback
            demoAccount.style.background = '#e8f5e8';
            setTimeout(() => {
                demoAccount.style.background = '';
            }, 1000);
        });
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Show loading state
        showLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            if (validateCredentials(username, password)) {
                showMessage('Login successful! Redirecting...', 'success');
                
                // Store login info
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);
                
                // Redirect to main page after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage('Invalid username or password. Please try again.', 'error');
                // Shake animation for form
                loginForm.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    loginForm.style.animation = '';
                }, 500);
            }
            
            showLoading(false);
        }, 1000);
    });

    // Validate credentials
    function validateCredentials(username, password) {
        return validCredentials[username] && validCredentials[username] === password;
    }

    // Show loading state
    function showLoading(loading) {
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }

    // Show message
    function showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${text}</span>
            </div>
        `;
        
        messageContainer.appendChild(message);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    messageContainer.removeChild(message);
                }, 300);
            }
        }, 5000);
    }

    // Input focus effects
    const inputs = document.querySelectorAll('.input-wrapper input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
            this.parentElement.style.boxShadow = '';
        });
    });

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showMessage('You are already logged in. Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }

    // Add shake animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideOut {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + L to focus username
        if (e.altKey && e.key === 'l') {
            e.preventDefault();
            usernameInput.focus();
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            usernameInput.value = '';
            passwordInput.value = '';
            usernameInput.focus();
        }
    });

    // Auto-focus username field
    usernameInput.focus();
});