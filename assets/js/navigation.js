/**
 * Navigation.js - Quản lý tất cả các link điều hướng trong hệ thống
 * Kiến trúc: Sử dụng iframe trong index.html để load các trang con
 */

const Navigation = {
    // Map các route trong hệ thống
    routes: {
        // 01. Auth
        login: '01_auth/Tranglogin.html',
        
        // 02. Tổng quan
        dashboard: '02_tongquan/TrangTongQuan.html',
        
        // 03. Danh mục vật tư
        materials: '03_danhmuc/TrangDanhMucVatTu.html',
        addMaterial: '03_danhmuc/ThemVatTu.html',
        
        // 04. Nhập kho
        importList: '04_nhapkho/DanhSachPhieuNhapKho.html',
        createImport: '04_nhapkho/TaoPhieuNhapKho.html',
        importProposalList: '04_nhapkho/TrangDSDeXuatNhapHang.html',
        createImportProposal: '04_nhapkho/LapDeXuatNhapHang.html',
        defectiveList: '04_nhapkho/DanhSachBienBanHangLoi.html',
        defectiveReport: '04_nhapkho/LapBienBanHangLoi.html',
        
        // 05. Xuất kho
        exportList: '05_xuatkho/DSPhieuXuatKho.html',
        createExport: '05_xuatkho/TaoPhieuXuatKho.html',
        exportRequestList: '05_xuatkho/DSYeuCauXuatKho.html',
        createExportRequest: '05_xuatkho/LapYeuCauXuatKho.html',
        inventoryLookup: '05_xuatkho/TraCuuTonKho.html',
        
        // 06. Kiểm kê
        auditList: '06_kiemke/DSDotKiemKe.html',
        performAudit: '06_kiemke/ThucHienKiemKe.html',
        handleDiscrepancy: '06_kiemke/XuLyChechLech.html',
        
        // 07. Báo cáo
        reports: '07_baocao/TrangBaoCao.html',
        
        // 08. Quản trị
        userManagement: '08_quantri/TrangQuanLyTaiKhoan.html'
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

        console.log(`📍 Navigating to: ${path}`);
        
        // Kiểm tra xem đang ở trong iframe hay không
        const isInIframe = window.self !== window.top;
        
        if (isInIframe) {
            // Đang trong iframe, gửi message cho parent window
            window.parent.postMessage({ type: 'navigate', path: path, routeKey: routeKey }, '*');
        } else {
            // Đang ở trang chính, tìm iframe và navigate
            const iframe = document.getElementById('main-frame');
            if (iframe) {
                iframe.src = path;
                this.updateSidebarActive(path);
            } else {
                // Không có iframe, navigate trực tiếp
                window.location.href = path;
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
            const href = item.getAttribute('href');
            
            // Check nếu path bắt đầu với href folder
            if (path && href) {
                const folder = href.split('/')[0];
                if (path.startsWith(folder)) {
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
        const isInIframe = window.self !== window.top;
        
        if (isInIframe) {
            window.parent.postMessage({ type: 'navigate', path: url }, '*');
        } else {
            const iframe = document.getElementById('main-frame');
            if (iframe) {
                iframe.src = url;
            } else {
                window.location.href = url;
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
