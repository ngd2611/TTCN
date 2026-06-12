/**
 * Auth Module - Xử lý đăng nhập
 */

const Auth = {
    // Mock users (Level 1 Prototype)
    mockUsers: [
        { username: 'van', password: '123456', name: 'Vân', role: 'Giám đốc', department: 'Ban Giám đốc', avatar: 'V' },
        { username: 'lan', password: '123456', name: 'Lan', role: 'Kế toán', department: 'Phòng Kế toán', avatar: 'L' },
        { username: 'lann', password: '123456', name: 'Lân', role: 'Thủ kho', department: 'Phòng Kho', avatar: 'L' }
    ],

    init() {
        console.log('🔐 Auth module initialized');
        this.setupEventListeners();
        this.checkExistingSession();
    },

    setupEventListeners() {
        // Form submit
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Toggle password visibility
        const togglePassword = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                const icon = togglePassword.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }
    },

    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Validate
        const user = this.mockUsers.find(u => u.username === username && u.password === password);

        if (user) {
            // Save session
            const session = {
                name: user.name,
                role: user.role,
                department: user.department,
                avatar: user.avatar,
                username: user.username,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('ttcn_user_session', JSON.stringify(session));
            
            if (rememberMe) {
                localStorage.setItem('ttcn_remember_me', 'true');
            }

            console.log('✅ Login successful:', user.name);
            
            // Redirect to dashboard
            window.location.href = '../../index.html';
        } else {
            alert('❌ Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    },

    checkExistingSession() {
        const session = localStorage.getItem('ttcn_user_session');
        if (session && window.location.pathname.includes('Tranglogin.html')) {
            console.log('🔄 Existing session found, redirecting...');
            window.location.href = '../../index.html';
        }
    },

    logout() {
        localStorage.removeItem('ttcn_user_session');
        localStorage.removeItem('ttcn_remember_me');
        window.location.href = 'Tranglogin.html';
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
    Auth.init();
}

window.Auth = Auth;
