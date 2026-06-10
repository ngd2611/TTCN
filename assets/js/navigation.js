/**
 * Navigation.js - Quản lý tất cả các link điều hướng trong hệ thống
 * Kiến trúc: Sử dụng iframe trong index.html để load các trang con
 */

const Navigation = {
    // Map các route trong hệ thống
    routes: {
        // 01. Auth
        login: 'pages/01_auth/Tranglogin.html',
        
        // 02. Tổng quan
        dashboard: 'pages/02_tongquan/TrangTongQuan.html',
        
        // 03. Danh mục vật tư
        materials: 'pages/03_danhmuc/TrangDanhMucVatTu.html',
        addMaterial: 'pages/03_danhmuc/ThemVatTu.html',
        editMaterial: 'pages/03_danhmuc/SuaVatTu.html',
        
        // 04. Nhập kho
        importList: 'pages/04_nhapkho/DanhSachPhieuNhapKho.html',
        createImport: 'pages/04_nhapkho/TaoPhieuNhapKho.html',
        importProposalList: 'pages/04_nhapkho/TrangDSDeXuatNhapHang.html',
        createImportProposal: 'pages/04_nhapkho/LapDeXuatNhapHang.html',
        defectiveList: 'pages/04_nhapkho/DanhSachBienBanHangLoi.html',
        defectiveReport: 'pages/04_nhapkho/LapBienBanHangLoi.html',
        
        // 05. Xuất kho
        exportList: 'pages/05_xuatkho/DSPhieuXuatKho.html',
        createExport: 'pages/05_xuatkho/TaoPhieuXuatKho.html',
        exportRequestList: 'pages/05_xuatkho/DSYeuCauXuatKho.html',
        createExportRequest: 'pages/05_xuatkho/LapYeuCauXuatKho.html',
        inventoryLookup: 'pages/05_xuatkho/TraCuuTonKho.html',
        
        // 06. Kiểm kê
        auditList: 'pages/06_kiemke/DSDotKiemKe.html',
        performAudit: 'pages/06_kiemke/ThucHienKiemKe.html',
        handleDiscrepancy: 'pages/06_kiemke/XuLyChechLech.html',
        
        // 07. Báo cáo
        reports: 'pages/07_baocao/TrangBaoCao.html',
        
        // 08. Quản trị
        userManagement: 'pages/08_quantri/TrangQuanLyTaiKhoan.html'
    },

    // Khởi tạo navigation
    init() {
        console.log('🧭 Navigation system initialized');
        this.setupButtonHandlers();
    },

    // Setup tất cả các button handlers
    setupButtonHandlers() {
        // Sử dụng event delegation để handle tất cả buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-nav]');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                const route = btn.getAttribute('data-nav');
                console.log('👆 Button clicked with route:', route);
                this.navigateTo(route);
                return;
            }

            // Intercept sidebar links (target="main_content") để thêm cache-busting
            const link = e.target.closest('a[target="main_content"]');
            if (link) {
                e.preventDefault();
                const iframe = document.getElementById('main-frame');
                if (iframe) {
                    const basePath = link.getAttribute('href');
                    iframe.src = basePath + '?v=' + Date.now();
                    this.updateSidebarActive(basePath);
                }
            }
        });
        console.log('✅ Button handlers setup complete');
    },

    // Navigate đến trang
    navigateTo(routeKey) {
        const path = this.routes[routeKey];
        
        if (!path) {
            console.error(`❌ Route not found: ${routeKey}`);
            alert(`Trang "${routeKey}" chưa được cấu hình`);
            return;
        }

        const bust = path + (path.includes('?') ? '&' : '?') + 'v=' + Date.now();
        console.log(`📍 Navigating to: ${bust}`);
        
        // Kiểm tra xem đang ở trong iframe hay không
        const isInIframe = window.self !== window.top;
        
        if (isInIframe) {
            window.parent.postMessage({ type: 'navigate', path: bust, routeKey: routeKey }, '*');
        } else {
            const iframe = document.getElementById('main-frame');
            if (iframe) {
                iframe.src = bust;
                this.updateSidebarActive(path);
            } else {
                window.location.href = bust;
            }
        }
    },

    // Cập nhật active state cho sidebar
    updateSidebarActive(path) {
        console.log('🔄 Updating sidebar for path:', path);
        const menuItems = document.querySelectorAll('.menu-item');
        let found = false;
        
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            
            if (path && href) {
                // So sánh folder con cụ thể (01_auth, 02_tongquan, 03_danhmuc, etc.)
                // Lấy folder chứa thực tế: pages/XX_tenchuyen/
                const pathMatch = path.match(/pages\/(\d+_\w+)\//);
                const hrefMatch = href.match(/pages\/(\d+_\w+)\//);
                
                if (pathMatch && hrefMatch && pathMatch[1] === hrefMatch[1]) {
                    item.classList.add('active');
                    const pageName = item.getAttribute('data-page');
                    console.log('✅ Activated menu:', pageName);
                    found = true;
                    if (window.App) {
                        window.App.updateBreadcrumb(pageName);
                    }
                }
            }
        });
        
        if (!found) {
            console.warn('⚠️ No matching menu item found for path:', path);
        }
    },

    // Navigate với URL trực tiếp
    navigateToUrl(url) {
        const bust = url + (url.includes('?') ? '&' : '?') + 'v=' + Date.now();
        const isInIframe = window.self !== window.top;
        
        if (isInIframe) {
            window.parent.postMessage({ type: 'navigate', path: bust }, '*');
        } else {
            const iframe = document.getElementById('main-frame');
            if (iframe) {
                iframe.src = bust;
            } else {
                window.location.href = bust;
            }
        }
    },

    // Go back
    goBack() {
        window.history.back();
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Navigation.init());
} else {
    Navigation.init();
}

// Export global
window.Navigation = Navigation;
