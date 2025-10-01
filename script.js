// Enhanced JavaScript with modern features and Login System
document.addEventListener('DOMContentLoaded', function () {
    // Login System
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const mainContent = document.getElementById('mainContent');

    // Valid credentials - Multiple users supported
    const validUsers = {
        'lynn': 'Lynn@1104',
        'michael': 'database2025'
    };

    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showMainContent();
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;

            if (validUsers[username] && validUsers[username] === password) {
                // Successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);
                showSuccessMessage(username);
                setTimeout(showMainContent, 1500);
            } else {
                // Failed login
                showErrorMessage();
            }
        });
    }

    function showMainContent() {
        if (loginSection) loginSection.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';

        // Show current user in welcome message
        const currentUser = localStorage.getItem('currentUser');
        const userNameElement = document.getElementById('currentUserName');
        if (currentUser && userNameElement) {
            const capitalizedName = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
            userNameElement.textContent = capitalizedName;
        }

        initializeMainFeatures();
    }

    function showSuccessMessage(username) {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        const capitalizedName = username.charAt(0).toUpperCase() + username.slice(1);
        loginBtn.innerHTML = `<i class="fas fa-check"></i> Welcome ${capitalizedName}!`;
        loginBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        setTimeout(() => {
            loginBtn.innerHTML = originalText;
        }, 1500);
    }

    function showErrorMessage() {
        const loginContainer = document.querySelector('.login-container');
        loginContainer.style.animation = 'shake 0.5s ease-in-out';

        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-times"></i> Invalid Credentials';
        loginBtn.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';

        setTimeout(() => {
            loginBtn.innerHTML = originalText;
            loginContainer.style.animation = '';
        }, 2000);
    }

    function initializeMainFeatures() {
        const button = document.getElementById("button");
        const demo = document.getElementById("demo");
        const counter = document.getElementById("counter");

        let clickCount = 0;
        const messages = [
            "🚀 Hello!",
            "🎉 You clicked again!",
            "⭐ This is awesome!",
            "💫 Keep clicking for more!",
            "🌟 You're doing great!",
            "🔥 Absolute magic!",
            "✨ You rock!",
            "Tee-Hee Michael"
        ];

        if (button && demo && counter) {
            button.addEventListener("click", function () {
                clickCount++;

                // Update demo text with random message
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                demo.innerHTML = `${randomMessage} (Click #${clickCount})`;

                // Add animation class
                demo.classList.add('updated');
                setTimeout(() => {
                    demo.classList.remove('updated');
                }, 600);

                // Update counter
                counter.innerHTML = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;

                // Change button text based on clicks
                if (clickCount === 1) {
                    button.innerHTML = "Click Again! 🎯";
                } else if (clickCount === 5) {
                    button.innerHTML = "You're on fire! 🔥";
                } else if (clickCount === 10) {
                    button.innerHTML = "Amazing! 🌟";
                } else if (clickCount > 15) {
                    button.innerHTML = "Unstoppable! 💪";
                }

                // Add special effects for milestone clicks
                if (clickCount % 5 === 0) {
                    confettiEffect();
                }
            });

            // Reset button
            const resetBtn = document.getElementById('resetBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', function () {
                    clickCount = 0;
                    demo.innerHTML = "Ready for action! Click the button above.";
                    counter.innerHTML = "Click counter will appear here";
                    button.innerHTML = "Click me! 🎯";
                });
            }

        } else {
            console.error('Required elements not found');
        }

        // Simple confetti effect
        function confettiEffect() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
                }, i * 10);
            }
        }

        function createConfetti(color) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            animation: fall 3s linear forwards;
            z-index: 1000;
        `;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }

        // Add CSS for confetti animation
        const style = document.createElement('style');
        style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-10px) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
        }
    `;
        document.head.appendChild(style);
    }
});
