/**
 * Auth Module - Xử lý đăng nhập hệ thống Trường Thọ
 */

const Auth = {
    // Mock users (Level 1 Prototype)
    mockUsers: [
        { username: 'admin', password: '123', name: 'Minh', role: 'Admin', department: 'Quản lý kỹ thuật', avatar: 'M' },
        { username: 'thukho', password: '123', name: 'Trần Minh Tâm', role: 'Thủ kho', department: 'Phòng Kho', avatar: 'T' },
        { username: 'tam.thukho', password: '123', name: 'Trần Minh Tâm', role: 'Thủ kho', department: 'Phòng Kho', avatar: 'T' },
        { username: 'van', password: '123456', name: 'Vân', role: 'Giám đốc', department: 'Ban Giám đốc', avatar: 'V' },
        { username: 'van.giamdoc', password: '123', name: 'Nguyễn Thị Vân', role: 'Giám đốc', department: 'Ban Giám đốc', avatar: 'V' },
        { username: 'lan', password: '123456', name: 'Lan', role: 'Kế toán', department: 'Phòng Kế toán', avatar: 'L' },
        { username: 'lann', password: '123456', name: 'Lân', role: 'Thủ kho', department: 'Phòng Kho', avatar: 'L' }
    ],

    init() {
        console.log('🔐 Custom Auth module initialized');
        this.setupEventListeners();
        this.checkExistingSession();
    },

    setupEventListeners() {
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
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                const icon = togglePassword.querySelector('i');
                if (isPassword) {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        }

        // Technical Support button click
        const supportBtn = document.getElementById('support-btn');
        if (supportBtn) {
            supportBtn.addEventListener('click', () => {
                this.showToast(
                    "Hệ thống nội bộ: Mọi sự cố tài khoản vui lòng gửi ticket hoặc liên hệ Admin qua Email: admin.it@truongtho.com để được hỗ trợ.",
                    "info"
                );
            });
        }
    },

    handleLogin() {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const usernameError = document.getElementById('username-error');
        const passwordError = document.getElementById('password-error');

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        let hasError = false;

        // Reset errors
        usernameError.classList.add('hidden');
        passwordError.classList.add('hidden');
        usernameInput.classList.remove('border-rose-500', 'focus:border-rose-500', 'bg-rose-50/10');
        passwordInput.classList.remove('border-rose-500', 'focus:border-rose-500', 'bg-rose-50/10');

        // Validation checks
        if (!username) {
            usernameError.classList.remove('hidden');
            usernameInput.classList.add('border-rose-500', 'focus:border-rose-500', 'bg-rose-50/10');
            hasError = true;
        }

        if (!password) {
            passwordError.classList.remove('hidden');
            passwordInput.classList.add('border-rose-500', 'focus:border-rose-500', 'bg-rose-50/10');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Verify credentials
        const user = this.mockUsers.find(u => u.username === username && u.password === password);

        if (user) {
            // Save session schema to 'user_session' (containing username, role mapping, and timestamp)
            const userSession = {
                username: user.username,
                roleMapping: {
                    role: user.role,
                    department: user.department,
                    avatar: user.avatar,
                    name: user.name
                },
                timestamp: Date.now()
            };
            localStorage.setItem('user_session', JSON.stringify(userSession));

            // Legacy support key 'ttcn_user_session' for compatibility with main dashboard components
            const legacySession = {
                name: user.name,
                role: user.role,
                department: user.department,
                avatar: user.avatar,
                username: user.username,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem('ttcn_user_session', JSON.stringify(legacySession));

            const rememberMe = document.getElementById('remember-me');
            if (rememberMe && rememberMe.checked) {
                localStorage.setItem('ttcn_remember_me', 'true');
            }

            // Success Toast & Redirect
            this.showToast(`Đăng nhập thành công! Xin chào ${user.name}.`, 'success');
            
            setTimeout(() => {
                window.location.href = '../07_baocao/TrangBaoCao.html';
            }, 1500);
        } else {
            this.showToast('Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
        }
    },

    checkExistingSession() {
        const session = localStorage.getItem('user_session') || localStorage.getItem('ttcn_user_session');
        if (session && window.location.pathname.includes('Tranglogin.html')) {
            console.log('🔄 Session found, auto-navigating to dashboard reports...');
            // Optional auto-redirect, but we can stay on the page for design review or let it redirect
        }
    },

    showToast(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-[90%] sm:max-w-md';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        
        let typeConfig = {
            info: {
                bg: 'backdrop-blur-md bg-slate-900/90 border border-white/20 text-white',
                icon: '<i class="fa-solid fa-circle-info text-indigo-400 text-lg"></i>',
                title: 'Hỗ Trợ Kỹ Thuật'
            },
            success: {
                bg: 'backdrop-blur-md bg-emerald-950/90 border border-emerald-500/30 text-white',
                icon: '<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>',
                title: 'Thành Công'
            },
            error: {
                bg: 'backdrop-blur-md bg-rose-950/90 border border-rose-500/30 text-white',
                icon: '<i class="fa-solid fa-circle-exclamation text-rose-400 text-lg"></i>',
                title: 'Lỗi Đăng Nhập'
            }
        };

        const cfg = typeConfig[type] || typeConfig.info;

        toast.className = `p-4 rounded-xl shadow-2xl flex gap-3 transform translate-y-[-20px] opacity-0 transition-all duration-300 ease-out ${cfg.bg}`;
        toast.innerHTML = `
            <div class="flex-shrink-0 mt-0.5">${cfg.icon}</div>
            <div class="flex-grow space-y-1">
                <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-350">${cfg.title}</h4>
                <p class="text-xs text-slate-100 font-medium leading-relaxed">${message}</p>
            </div>
            <button class="flex-shrink-0 text-slate-400 hover:text-white transition-colors h-fit self-start ml-2 focus:outline-none">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        `;

        container.appendChild(toast);

        // Animation in
        setTimeout(() => {
            toast.classList.remove('translate-y-[-20px]', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        }, 10);

        const dismiss = () => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-[-20px]', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 300);
        };

        toast.querySelector('button').addEventListener('click', dismiss);

        // Auto dismiss
        const duration = type === 'info' ? 8000 : 4000;
        setTimeout(dismiss, duration);
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Auth.init());
} else {
    Auth.init();
}

window.Auth = Auth;
