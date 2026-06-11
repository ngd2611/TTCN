/**
 * Main.js - Core Application Logic
 * Quản lý toàn bộ logic chính của hệ thống: routing, user session, navigation
 */

const App = {
    config: {
        defaultPage: 'tongquan',
        breadcrumbMap: {
            'tongquan': 'Tổng quan',
            'danhmuc': 'Danh mục vật tư',
            'nhapkho': 'Quản lý Nhập kho',
            'xuatkho': 'Quản lý Xuất kho',
            'kiemke': 'Kiểm kê & Xử lý',
            'baocao': 'Báo cáo quản trị',
            'quantri': 'Quản lý tài khoản'
        }
    },

    // Khởi tạo ứng dụng
    init() {
        console.log('🚀 Trường Thọ Inventory System - Initializing...');
        
        this.loadUserSession();
        this.setupGlobalEvents();
        this.setupMenuNavigation();
        this.setActiveMenuFromURL();
        
        console.log('✅ Application ready!');
    },

    // Load thông tin user từ LocalStorage
    loadUserSession() {
        const userSession = localStorage.getItem('ttcn_user_session');
        
        if (userSession) {
            try {
                const user = JSON.parse(userSession);
                this.updateUserInfo(user);
                console.log('✅ User session loaded:', user.name);
            } catch (e) {
                console.error('❌ Error parsing user session:', e);
                this.setDefaultUser();
            }
        } else {
            this.setDefaultUser();
        }
    },

    // Set default user
    setDefaultUser() {
        const mockUser = {
            name: 'Vân',
            role: 'Giám đốc',
            department: 'Ban Giám đốc',
            avatar: 'V'
        };
        this.updateUserInfo(mockUser);
        localStorage.setItem('ttcn_user_session', JSON.stringify(mockUser));
    },

    // Cập nhật thông tin user trên header
    updateUserInfo(user) {
        const userName = document.getElementById('user-name');
        const userRole = document.getElementById('user-role');
        const userAvatar = document.getElementById('user-avatar');
        const dropdownUserName = document.getElementById('dropdown-user-name');
        const dropdownUserEmail = document.getElementById('dropdown-user-email');

        if (userName) userName.textContent = `${user.name} (${user.role})`;
        if (userRole) userRole.textContent = user.department;
        if (userAvatar) userAvatar.textContent = user.avatar;
        if (dropdownUserName) dropdownUserName.textContent = user.name;
        if (dropdownUserEmail) dropdownUserEmail.textContent = user.email || `${user.name.toLowerCase()}@truongtho.vn`;
    },

    // Setup menu navigation
    setupMenuNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Xóa active state khỏi tất cả items
                menuItems.forEach(mi => mi.classList.remove('active'));
                
                // Thêm active state cho item được click
                item.classList.add('active');
                
                // Cập nhật breadcrumb
                const pageName = item.getAttribute('data-page');
                this.updateBreadcrumb(pageName);
                
                console.log('📍 Navigating to:', pageName);
            });
        });
    },

    // Set active menu dựa trên URL hiện tại
    setActiveMenuFromURL() {
        const iframe = document.getElementById('main-frame');
        if (!iframe) return;
        
        const currentSrc = iframe.getAttribute('src');
        
        // Tìm menu item tương ứng
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (currentSrc && currentSrc.includes(href)) {
                item.classList.add('active');
                const pageName = item.getAttribute('data-page');
                this.updateBreadcrumb(pageName);
            }
        });
    },

    // Cập nhật breadcrumb
    updateBreadcrumb(pageName) {
        const breadcrumbElement = document.getElementById('breadcrumb-current');
        if (breadcrumbElement && this.config.breadcrumbMap[pageName]) {
            breadcrumbElement.textContent = this.config.breadcrumbMap[pageName];
        }
    },

    // Setup global events
    setupGlobalEvents() {
        // Global search (Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });

        // Initialize dropdowns
        this.initDropdowns();

        // Iframe load event
        const iframe = document.getElementById('main-frame');
        if (iframe) {
            iframe.addEventListener('load', () => {
                console.log('✅ Page loaded in iframe');
            });
        }
    },

    // Initialize all dropdowns
    initDropdowns() {
        const dropdowns = [
            { btnId: 'settings-btn', dropdownId: 'settings-dropdown' },
            { btnId: 'notification-btn', dropdownId: 'notification-dropdown' },
            { btnId: 'user-profile', dropdownId: 'profile-dropdown' }
        ];

        dropdowns.forEach(({ btnId, dropdownId }) => {
            const btn = document.getElementById(btnId);
            const dropdown = document.getElementById(dropdownId);
            
            if (btn && dropdown) {
                const menu = dropdown.querySelector('.dropdown-menu');
                
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        if (m !== menu) m.classList.add('hidden');
                    });
                    
                    // Toggle current dropdown
                    menu.classList.toggle('hidden');
                    console.log(`🔽 Dropdown ${dropdownId} toggled`);
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
        });

        // Prevent dropdown close when clicking inside
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Logout handler
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    },

    // Logout
    logout() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            localStorage.removeItem('ttcn_user_session');
            window.location.href = '01_auth/Tranglogin.html';
        }
    },

    // Navigate to page programmatically
    navigateTo(pagePath) {
        const iframe = document.getElementById('main-frame');
        if (iframe) {
            iframe.src = pagePath;
        }
    },

    // Utility: Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    },

    // Utility: Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(date));
    }
};

// Auto-init khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export global
window.App = App;
