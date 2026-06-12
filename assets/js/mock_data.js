/**
 * mock_data.js - Dữ liệu mẫu và khởi tạo LocalStorage
 * Module: Quản lý Nhập kho - Hệ thống Trường Thọ
 * Tên field khớp với cấu trúc SQL trong truongtho_db.sql
 */

// ============================================================
//  DỮ LIỆU MẪU BAN ĐẦU
// ============================================================

const MOCK_DON_VI_TINH = [
    { Ma_DVT: 'DVT01', Ten_DVT: 'Cây' },
    { Ma_DVT: 'DVT02', Ten_DVT: 'Tấm' },
    { Ma_DVT: 'DVT03', Ten_DVT: 'Hộp' },
    { Ma_DVT: 'DVT04', Ten_DVT: 'Cuộn' },
    { Ma_DVT: 'DVT05', Ten_DVT: 'Thanh' },
    { Ma_DVT: 'DVT06', Ten_DVT: 'Bao' },
];

const MOCK_NHOM_VAT_TU = [
    { Ma_Nhom_Vat_Tu: 'N01', Ten_Nhom_Vat_Tu: 'Khung xương' },
    { Ma_Nhom_Vat_Tu: 'N02', Ten_Nhom_Vat_Tu: 'Tấm thạch cao' },
    { Ma_Nhom_Vat_Tu: 'N03', Ten_Nhom_Vat_Tu: 'Tấm ốp nhựa và than tre' },
    { Ma_Nhom_Vat_Tu: 'N04', Ten_Nhom_Vat_Tu: 'Sàn gỗ và sàn nhựa' },
    { Ma_Nhom_Vat_Tu: 'N05', Ten_Nhom_Vat_Tu: 'Vật tư phụ thi công' },
];

const MOCK_VAT_TU = [
    { Ma_Vat_Tu: 'VT001', Ten_Vat_Tu: 'Khung xương cá Vĩnh Tường',        Ma_Nhom_Vat_Tu: 'N01', Quy_Cach: 'Khung chìm',      Do_Day: '0.4mm', Ma_DVT_Co_Ban: 'DVT01', Ten_DVT: 'Cây',   Dinh_Muc_Ton: 100, So_Luong_Ton: 250, So_Luong_Hong_Vo: 2 },
    { Ma_Vat_Tu: 'VT002', Ten_Vat_Tu: 'Tấm thạch cao Gyproc tiêu chuẩn',  Ma_Nhom_Vat_Tu: 'N02', Quy_Cach: '1220x2440mm',    Do_Day: '9mm',   Ma_DVT_Co_Ban: 'DVT02', Ten_DVT: 'Tấm',   Dinh_Muc_Ton: 50,  So_Luong_Ton: 120, So_Luong_Hong_Vo: 0 },
    { Ma_Vat_Tu: 'VT003', Ten_Vat_Tu: 'Tấm ốp phẳng nano PVC iwood',      Ma_Nhom_Vat_Tu: 'N03', Quy_Cach: '400x3000mm',     Do_Day: '9mm',   Ma_DVT_Co_Ban: 'DVT02', Ten_DVT: 'Tấm',   Dinh_Muc_Ton: 80,  So_Luong_Ton: 210, So_Luong_Hong_Vo: 1 },
    { Ma_Vat_Tu: 'VT004', Ten_Vat_Tu: 'Sàn nhựa hèm khóa SPC Kosmos',     Ma_Nhom_Vat_Tu: 'N04', Quy_Cach: '1220x180mm',     Do_Day: '4mm',   Ma_DVT_Co_Ban: 'DVT02', Ten_DVT: 'Tấm',   Dinh_Muc_Ton: 60,  So_Luong_Ton: 145, So_Luong_Hong_Vo: 0 },
    { Ma_Vat_Tu: 'VT005', Ten_Vat_Tu: 'Vít đen thạch cao tự khoan',        Ma_Nhom_Vat_Tu: 'N05', Quy_Cach: 'Hộp 500 chiếc', Do_Day: '3.5mm', Ma_DVT_Co_Ban: 'DVT03', Ten_DVT: 'Hộp',   Dinh_Muc_Ton: 30,  So_Luong_Ton: 45,  So_Luong_Hong_Vo: 0 },
    { Ma_Vat_Tu: 'VT006', Ten_Vat_Tu: 'Băng keo lưới sợi thủy tinh',       Ma_Nhom_Vat_Tu: 'N05', Quy_Cach: '50mm x 50m',    Do_Day: '0.2mm', Ma_DVT_Co_Ban: 'DVT04', Ten_DVT: 'Cuộn', Dinh_Muc_Ton: 20,  So_Luong_Ton: 85,  So_Luong_Hong_Vo: 0 },
];

const MOCK_NHA_CUNG_CAP = [
    { Ma_NCC: 'NCC001', Ten_NCC: 'Đại lý Daiichi Hạ Long',        Dien_Thoai: '0203.123456', Email: 'daiichi.halong@gmail.com' },
    { Ma_NCC: 'NCC002', Ten_NCC: 'Công ty TNHH Knauf Việt Nam',    Dien_Thoai: '024.3569.8888', Email: 'info@knauf.vn' },
    { Ma_NCC: 'NCC003', Ten_NCC: 'Công ty Thép Hòa Phát',          Dien_Thoai: '024.3974.8888', Email: 'info@hoaphat.com.vn' },
    { Ma_NCC: 'NCC004', Ten_NCC: 'Công ty CP Công nghiệp Daiichi',  Dien_Thoai: '028.3860.9999', Email: 'info@daiichi.vn' },
    { Ma_NCC: 'NCC005', Ten_NCC: 'Công ty TNHH Gyproc Việt Nam',   Dien_Thoai: '028.3811.7777', Email: 'gyproc@saint-gobain.vn' },
];

// Đề xuất nhập hàng - Bảng DE_XUAT_NHAP_HANG
const MOCK_DE_XUAT = [
    {
        Ma_De_Xuat: 'DXN-202605-001',
        Ma_NCC: 'NCC001',
        Ten_NCC: 'Đại lý Daiichi Hạ Long',
        Ly_Do: 'Tồn kho tấm trần sắp hết, cần bổ sung trước mùa xây dựng',
        Ngay_Lap: '2026-05-05T09:15:00',
        Ngay_Can_Hang: '2026-05-10',
        Trang_Thai: 'Da_Duyet',
        Nguoi_Lap: 'Vân (Giám đốc)',
    },
    {
        Ma_De_Xuat: 'DXN-202605-002',
        Ma_NCC: 'NCC002',
        Ten_NCC: 'Công ty TNHH Knauf Việt Nam',
        Ly_Do: 'Khung xương trần chìm tồn kho dưới mức tối thiểu',
        Ngay_Lap: '2026-05-05T10:30:00',
        Ngay_Can_Hang: '2026-05-12',
        Trang_Thai: 'Cho_Duyet',
        Nguoi_Lap: 'Vân (Giám đốc)',
    },
    {
        Ma_De_Xuat: 'DXN-202605-003',
        Ma_NCC: 'NCC003',
        Ten_NCC: 'Công ty Thép Hòa Phát',
        Ly_Do: 'Cần nhập thêm thanh thép theo đơn hàng khách',
        Ngay_Lap: '2026-05-04T15:45:00',
        Ngay_Can_Hang: '2026-05-08',
        Trang_Thai: 'Bi_Tu_Choi',
        Nguoi_Lap: 'Vân (Giám đốc)',
    },
    {
        Ma_De_Xuat: 'DXN-202605-004',
        Ma_NCC: 'NCC004',
        Ten_NCC: 'Công ty CP Công nghiệp Daiichi',
        Ly_Do: 'Bổ sung tấm PVC theo kế hoạch nhập định kỳ',
        Ngay_Lap: '2026-05-03T08:20:00',
        Ngay_Can_Hang: '2026-05-07',
        Trang_Thai: 'Da_Duyet',
        Nguoi_Lap: 'Vân (Giám đốc)',
    },
];

// Chi tiết đề xuất - Bảng CHI_TIET_DE_XUAT
const MOCK_CHI_TIET_DE_XUAT = [
    { Ma_De_Xuat: 'DXN-202605-001', Ma_Vat_Tu: 'VT001', Ten_Vat_Tu: 'Khung xương cá Vĩnh Tường',       Ten_DVT: 'Cây',  So_Luong_De_Xuat: 50 },
    { Ma_De_Xuat: 'DXN-202605-001', Ma_Vat_Tu: 'VT002', Ten_Vat_Tu: 'Tấm thạch cao Gyproc tiêu chuẩn', Ten_DVT: 'Tấm',  So_Luong_De_Xuat: 100 },
    { Ma_De_Xuat: 'DXN-202605-001', Ma_Vat_Tu: 'VT003', Ten_Vat_Tu: 'Tấm ốp phẳng nano PVC iwood',     Ten_DVT: 'Tấm',  So_Luong_De_Xuat: 80 },
    { Ma_De_Xuat: 'DXN-202605-004', Ma_Vat_Tu: 'VT003', Ten_Vat_Tu: 'Tấm ốp phẳng nano PVC iwood',     Ten_DVT: 'Tấm',  So_Luong_De_Xuat: 200 },
    { Ma_De_Xuat: 'DXN-202605-004', Ma_Vat_Tu: 'VT004', Ten_Vat_Tu: 'Sàn nhựa hèm khóa SPC Kosmos',    Ten_DVT: 'Tấm',  So_Luong_De_Xuat: 60 },
    { Ma_De_Xuat: 'DXN-202605-002', Ma_Vat_Tu: 'VT001', Ten_Vat_Tu: 'Khung xương cá Vĩnh Tường',       Ten_DVT: 'Cây',  So_Luong_De_Xuat: 30 },
    { Ma_De_Xuat: 'DXN-202605-002', Ma_Vat_Tu: 'VT005', Ten_Vat_Tu: 'Vít đen thạch cao tự khoan',       Ten_DVT: 'Hộp',  So_Luong_De_Xuat: 20 },
];

// Phiếu nhập kho - Bảng PHIEU_NHAP_KHO
const MOCK_PHIEU_NHAP = [
    {
        Ma_Phieu_Nhap: 'PNK-202605-001',
        Ma_De_Xuat: 'DXN-202605-001',
        Ma_NCC: 'NCC001',
        Ten_NCC: 'Đại lý Daiichi Hạ Long',
        Chung_Tu_Goc: 'KNA-2405-00892',
        Ngay_Nhap: '2026-05-01T14:20:00',
        Trang_Thai: 'Da_Nhap_Kho',
        Ghi_Chu: '',
        Nguoi_Lap: 'Lân (Thủ kho)',
    },
    {
        Ma_Phieu_Nhap: 'PNK-202605-002',
        Ma_De_Xuat: 'DXN-202605-004',
        Ma_NCC: 'NCC004',
        Ten_NCC: 'Công ty CP Công nghiệp Daiichi',
        Chung_Tu_Goc: 'VT/DELI/2026/7710',
        Ngay_Nhap: '2026-05-04T10:15:00',
        Trang_Thai: 'Cho_Nhap_Hang',
        Ghi_Chu: '',
        Nguoi_Lap: 'Lân (Thủ kho)',
    },
    {
        Ma_Phieu_Nhap: 'PNK-202605-003',
        Ma_De_Xuat: null,
        Ma_NCC: 'NCC004',
        Ten_NCC: 'Công ty CP Công nghiệp Daiichi',
        Chung_Tu_Goc: 'PX-99182',
        Ngay_Nhap: '2026-05-03T09:00:00',
        Trang_Thai: 'Cho_Nhap_Hang',
        Ghi_Chu: 'Nhập thẳng không qua đề xuất',
        Nguoi_Lap: 'Lân (Thủ kho)',
    },
];

// Chi tiết phiếu nhập - Bảng CHI_TIET_PHIEU_NHAP
const MOCK_CHI_TIET_PHIEU_NHAP = [
    { Ma_Phieu_Nhap: 'PNK-202605-001', Ma_Vat_Tu: 'VT001', Ten_Vat_Tu: 'Khung xương cá Vĩnh Tường',       Ten_DVT: 'Cây',  So_Luong_Nhap: 50,  Don_Gia: 15000 },
    { Ma_Phieu_Nhap: 'PNK-202605-001', Ma_Vat_Tu: 'VT002', Ten_Vat_Tu: 'Tấm thạch cao Gyproc tiêu chuẩn', Ten_DVT: 'Tấm',  So_Luong_Nhap: 100, Don_Gia: 85000 },
    { Ma_Phieu_Nhap: 'PNK-202605-001', Ma_Vat_Tu: 'VT003', Ten_Vat_Tu: 'Tấm ốp phẳng nano PVC iwood',     Ten_DVT: 'Tấm',  So_Luong_Nhap: 80,  Don_Gia: 120000 },
    { Ma_Phieu_Nhap: 'PNK-202605-002', Ma_Vat_Tu: 'VT003', Ten_Vat_Tu: 'Tấm ốp phẳng nano PVC iwood',     Ten_DVT: 'Tấm',  So_Luong_Nhap: 200, Don_Gia: 118000 },
    { Ma_Phieu_Nhap: 'PNK-202605-002', Ma_Vat_Tu: 'VT004', Ten_Vat_Tu: 'Sàn nhựa hèm khóa SPC Kosmos',    Ten_DVT: 'Tấm',  So_Luong_Nhap: 60,  Don_Gia: 250000 },
    { Ma_Phieu_Nhap: 'PNK-202605-003', Ma_Vat_Tu: 'VT004', Ten_Vat_Tu: 'Sàn nhựa hèm khóa SPC Kosmos',    Ten_DVT: 'Tấm',  So_Luong_Nhap: 30,  Don_Gia: 248000 },
];

// Biên bản hàng lỗi - Bảng BIEN_BAN_HANG_LOI
const MOCK_BIEN_BAN = [
    {
        Ma_Bien_Ban: 'BBHL-202605-001',
        Ma_Phieu_Nhap: 'PNK-202605-001',
        Ma_NCC: 'NCC002',
        Ten_NCC: 'Công ty TNHH Knauf Việt Nam',
        Chung_Tu_Goc: 'KNA-HB-99812',
        Don_Vi_Van_Chuyen: 'Xe tải NCC',
        Ngay_Lap: '2026-05-05T16:30:00',
        Nguoi_Lap: 'Lân (Thủ kho)',
    },
    {
        Ma_Bien_Ban: 'BBHL-202604-012',
        Ma_Phieu_Nhap: 'PNK-202605-002',
        Ma_NCC: 'NCC005',
        Ten_NCC: 'Công ty TNHH Gyproc Việt Nam',
        Chung_Tu_Goc: 'GYP-HB-00124',
        Don_Vi_Van_Chuyen: 'Vận tải Miền Bắc',
        Ngay_Lap: '2026-04-28T10:15:00',
        Nguoi_Lap: 'Lân (Thủ kho)',
    },
];

// Chi tiết biên bản hàng lỗi - Bảng CHI_TIET_BIEN_BAN
const MOCK_CHI_TIET_BIEN_BAN = [
    { Ma_Bien_Ban: 'BBHL-202605-001', Ma_Vat_Tu: 'VT002', Ten_Vat_Tu: 'Tấm thạch cao Gyproc tiêu chuẩn', So_Luong_Loi: 3,  Mo_Ta_Loi: 'Vỡ góc, không sử dụng được' },
    { Ma_Bien_Ban: 'BBHL-202605-001', Ma_Vat_Tu: 'VT003', Ten_Vat_Tu: 'Tấm ốp phẳng nano PVC iwood',     So_Luong_Loi: 5,  Mo_Ta_Loi: 'Trầy xước bề mặt' },
    { Ma_Bien_Ban: 'BBHL-202604-012', Ma_Vat_Tu: 'VT001', Ten_Vat_Tu: 'Khung xương cá Vĩnh Tường',       So_Luong_Loi: 10, Mo_Ta_Loi: 'Cong vênh do vận chuyển sai cách' },
];

// ============================================================
//  HÀM TIỆN ÍCH
// ============================================================

/**
 * Sinh mã tự động theo định dạng PREFIX-YYYYMM-NNN
 * Ví dụ: PNK-202606-004
 */
function generateCode(prefix, existingItems, codeField) {
    const now = new Date();
    const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const pattern = `${prefix}-${yyyymm}-`;
    const sameMonth = existingItems.filter(i => i[codeField] && i[codeField].startsWith(pattern));
    const nextNum = String(sameMonth.length + 1).padStart(3, '0');
    return `${pattern}${nextNum}`;
}

/**
 * Format ngày giờ thành chuỗi DD/MM/YYYY HH:mm
 */
function formatDateTime(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

/**
 * Format ngày thành chuỗi DD/MM/YYYY
 */
function formatDate(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

/**
 * Lấy user hiện tại từ session
 */
function getCurrentUser() {
    try {
        const s = localStorage.getItem('ttcn_user_session');
        return s ? JSON.parse(s).name + ' (' + JSON.parse(s).role + ')' : 'Người dùng';
    } catch { return 'Người dùng'; }
}

// ============================================================
//  KHỞI TẠO DATABASE (LocalStorage)
// ============================================================

function initDatabase() {
    const keys = [
        { key: 'ttcn_don_vi_tinh',          data: MOCK_DON_VI_TINH },
        { key: 'ttcn_nhom_vat_tu',           data: MOCK_NHOM_VAT_TU },
        { key: 'ttcn_vat_tu',                data: MOCK_VAT_TU },
        { key: 'ttcn_nha_cung_cap',          data: MOCK_NHA_CUNG_CAP },
        { key: 'ttcn_de_xuat',               data: MOCK_DE_XUAT },
        { key: 'ttcn_chi_tiet_de_xuat',      data: MOCK_CHI_TIET_DE_XUAT },
        { key: 'ttcn_phieu_nhap',            data: MOCK_PHIEU_NHAP },
        { key: 'ttcn_chi_tiet_phieu_nhap',   data: MOCK_CHI_TIET_PHIEU_NHAP },
        { key: 'ttcn_bien_ban',              data: MOCK_BIEN_BAN },
        { key: 'ttcn_chi_tiet_bien_ban',     data: MOCK_CHI_TIET_BIEN_BAN },
    ];

    keys.forEach(({ key, data }) => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`✅ [DB] Khởi tạo: ${key} (${data.length} bản ghi)`);
        }
    });

    console.log('🗄️ [DB] Database LocalStorage sẵn sàng.');
}

// ============================================================
//  HÀM TRUY VẤN DỮ LIỆU (dùng chung cho các trang)
// ============================================================

function dbGet(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
}

function dbSet(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Gọi khởi tạo ngay khi load file
initDatabase();

// Export global
window.DB = { get: dbGet, set: dbSet };
window.generateCode = generateCode;
window.formatDateTime = formatDateTime;
window.formatDate = formatDate;
window.getCurrentUser = getCurrentUser;
