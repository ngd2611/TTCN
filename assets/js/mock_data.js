/**
 * mock_data.js - Khởi tạo dữ liệu gốc cho demo
 * Chỉ ghi vào localStorage nếu chưa có dữ liệu (không ghi đè)
 */

const MockData = {
    init() {
        this.initVatTu();
        this.initPhieuNhap();
        this.initPhieuXuat();
        this.initBienBan();
        this.initDeXuat();
    },

    initVatTu() {
        if (localStorage.getItem('ttcn_vattu')) return;
        const data = [
            { ma: 'VT001', ten: 'Tấm thạch cao tiêu chuẩn Knauf', nhom: 'Tấm thạch cao', quyCach: '1220x2440x9mm', dvt: 'Tấm', ton: 1250 },
            { ma: 'VT002', ten: 'Khung xương trần chìm Vĩnh Tường', nhom: 'Hệ khung xương', quyCach: 'Thanh chính 3.6m', dvt: 'Thanh', ton: 840 },
            { ma: 'VT003', ten: 'Tấm ốp than tre vân gỗ', nhom: 'Vật liệu mới', quyCach: '1220x2800x8mm', dvt: 'Tấm', ton: 15 },
            { ma: 'VT004', ten: 'Sàn gỗ công nghiệp 8mm Walnut', nhom: 'Vật liệu mới', quyCach: '1200x200x8mm', dvt: 'm²', ton: 320 },
            { ma: 'VT005', ten: 'Tấm trần nhựa PVC vân gỗ', nhom: 'Tấm trần nhựa', quyCach: '600x600mm', dvt: 'Tấm', ton: 500 }
        ];
        localStorage.setItem('ttcn_vattu', JSON.stringify(data));
    },

    initPhieuNhap() {
        if (localStorage.getItem('ttcn_phieu_nhap')) return;
        const data = [
            { ma: 'PNK-202605-001', ngay: '01/05/2026 14:20', nhaCungCap: 'Đại lý Daiichi Hạ Long', chungTu: 'KNA-2405-00892', trangThai: 'nhap' },
            { ma: 'PNK-202605-002', ngay: '04/05/2026 10:15', nhaCungCap: 'Công ty TNHH Knauf Việt Nam', chungTu: 'VT/DELI/2026/7710', trangThai: 'cho' },
            { ma: 'PNK-202605-003', ngay: '03/05/2026 09:00', nhaCungCap: 'Công ty CP Công nghiệp Daiichi', chungTu: 'PX-99182', trangThai: 'cho' }
        ];
        localStorage.setItem('ttcn_phieu_nhap', JSON.stringify(data));
    },

    initPhieuXuat() {
        if (localStorage.getItem('ttcn_phieu_xuat')) return;
        const data = [
            { ma: 'PXK-202605-001', ngay: '05/05/2026 14:20', thamChieu: 'YCX-202605-001', nguoiLap: 'Lân (Thủ kho)', trangThai: 'thanh_cong' },
            { ma: 'PXK-202605-002', ngay: '05/05/2026 10:15', thamChieu: 'YCX-202605-004', nguoiLap: 'Lân (Thủ kho)', trangThai: 'da_xuat' },
            { ma: 'PXK-202605-003', ngay: '03/05/2026 09:00', thamChieu: 'YCX-202605-012', nguoiLap: 'Lân (Thủ kho)', trangThai: 'da_xuat' }
        ];
        localStorage.setItem('ttcn_phieu_xuat', JSON.stringify(data));
    },

    initBienBan() {
        if (localStorage.getItem('ttcn_bien_ban')) return;
        const data = [
            { ma: 'BBHL-202605-001', phieuNhap: 'PNK-202605-004', nhaCungCap: 'Công ty Knauf Việt Nam', ngay: '05/05/2026 16:30', slLoi: '2 loại', nguoiLap: 'Lân (Thủ kho)' },
            { ma: 'BBHL-202604-012', phieuNhap: 'PNK-202604-028', nhaCungCap: 'Công ty Vĩnh Tường', ngay: '28/04/2026 10:15', slLoi: '1 loại', nguoiLap: 'Lân (Thủ kho)' }
        ];
        localStorage.setItem('ttcn_bien_ban', JSON.stringify(data));
    },

    initDeXuat() {
        if (localStorage.getItem('ttcn_de_xuat')) return;
        const data = [
            { ma: 'DXN-202605-001', ngay: '05/05/2026 09:15', nhaCungCap: 'Đại lý Daiichi Hạ Long', loai: 'Nhập mua từ nhà cung cấp', soMatHang: 4, trangThai: 'duyet' },
            { ma: 'DXN-202605-002', ngay: '05/05/2026 10:30', nhaCungCap: 'Công ty TNHH Knauf Việt Nam', loai: 'Nhập kho định kỳ', soMatHang: 2, trangThai: 'cho' },
            { ma: 'DXN-202605-003', ngay: '04/05/2026 15:45', nhaCungCap: 'Công ty Thép Hòa Phát', loai: 'Nhập hàng bổ sung', soMatHang: 12, trangThai: 'tu_choi' }
        ];
        localStorage.setItem('ttcn_de_xuat', JSON.stringify(data));
    }
};

// Utility dùng chung
function todayDisplay() {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function todayISO() {
    return new Date().toISOString().split('T')[0];
}

MockData.init();
window.MockData = MockData;
window.todayDisplay = todayDisplay;
window.todayISO = todayISO;
