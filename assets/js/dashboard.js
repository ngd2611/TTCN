/**
 * Dashboard.js - Logic cho trang Tổng quan
 */

const Dashboard = {
    init() {
        console.log('📊 Dashboard module initialized');
        this.setupEventHandlers();
        this.loadDashboardData();
    },

    setupEventHandlers() {
        // Export report button
        const exportBtn = document.querySelector('[data-action="export-report"]');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportReport();
            });
        }

        // View alert button
        const viewAlertBtn = document.querySelector('[data-action="view-alert"]');
        if (viewAlertBtn) {
            viewAlertBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.viewAllAlerts();
            });
        }
    },

    loadDashboardData() {
        // Mock data loading
        console.log('📈 Loading dashboard data...');
        // Trong thực tế sẽ gọi API ở đây
    },

    exportReport() {
        console.log('📥 Exporting report...');
        alert('Chức năng xuất báo cáo đang được phát triển');
    },

    viewAllAlerts() {
        console.log('🔔 Viewing all alerts...');
        alert('Chức năng xem tất cả cảnh báo đang được phát triển');
    }
};

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Dashboard.init());
} else {
    Dashboard.init();
}

window.Dashboard = Dashboard;
