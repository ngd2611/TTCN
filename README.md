# Hệ thống Quản lý Kho Trường Thọ

## Kiến trúc Hệ thống

### Kiến trúc đã chọn: **IFRAME-BASED ARCHITECTURE**

Hệ thống sử dụng kiến trúc iframe với:
- **index.html**: Trang chính chứa sidebar, header và iframe container
- **Các trang con**: Load vào iframe, không cần sidebar/header riêng
- **Navigation**: Sử dụng postMessage để giao tiếp giữa iframe và parent window

### Cấu trúc File

```
TTCN/
├── index.html                 # Trang chính (Main layout)
├── assets/
│   ├── css/
│   │   ├── global.css        # Styles dùng chung
│   │   └── index.css         # Styles cho layout chính
│   └── js/
│       ├── main.js           # ⭐ Core logic (user session, dropdowns, breadcrumb)
│       ├── navigation.js     # ⭐ Routing và navigation system
│       ├── auth.js           # Authentication logic
│       └── dashboard.js      # Dashboard page logic
└── pages/
    ├── 01_auth/
    │   └── Tranglogin.html
    ├── 02_tongquan/
    │   └── TrangTongQuan.html
    ├── 03_danhmuc/
    │   ├── TrangDanhMucVatTu.html
    │   └── ThemVatTu.html
    └── ... (các module khác)
```

## File JavaScript Chính

### 1. main.js
**Chức năng:**
- Quản lý user session (load/save từ localStorage)
- Xử lý dropdowns (settings, notifications, user profile)
- Quản lý menu navigation và active states
- Cập nhật breadcrumb
- Utilities: formatCurrency, formatDate

**Sử dụng:**
```javascript
// Đã tự động init khi DOM ready
App.navigateTo('pages/02_tongquan/TrangTongQuan.html');
App.formatCurrency(1000000); // "1.000.000 ₫"
```

### 2. navigation.js
**Chức năng:**
- Map tất cả routes trong hệ thống
- Xử lý navigation với `data-nav` attribute
- Hỗ trợ navigation trong iframe và parent window

**Sử dụng:**
```html
<!-- Trong các trang con -->
<button data-nav="addMaterial">Thêm vật tư</button>
<button data-nav="dashboard">Về trang chủ</button>
```

### 3. auth.js
**Chức năng:**
- Xử lý đăng nhập
- Mock users cho development
- Quản lý session

**Mock Users:**
- Username: `van` / Password: `123456` (Giám đốc)
- Username: `lan` / Password: `123456` (Kế toán)
- Username: `lann` / Password: `123456` (Thủ kho)

### 4. dashboard.js
**Chức năng:**
- Logic cho trang Tổng quan
- Xử lý export report
- Xử lý view alerts

## Cách Thêm Trang Mới

### Bước 1: Tạo file HTML
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tên Trang - Trường Thọ</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-[#F4F7F9] text-slate-800">
    <div class="p-6">
        <!-- Nội dung trang -->
    </div>
    
    <script src="../../assets/js/navigation.js"></script>
</body>
</html>
```

### Bước 2: Thêm route vào navigation.js
```javascript
routes: {
    // ... existing routes
    newPage: 'pages/XX_folder/TenTrang.html'
}
```

### Bước 3: Thêm link vào sidebar (index.html)
```html
<a href="pages/XX_folder/TenTrang.html" target="main-frame" 
   class="menu-item flex items-center px-4 py-3 text-slate-400 hover:text-white rounded-lg transition-colors" 
   data-page="newpage">
    <i class="fas fa-icon w-6"></i> 
    <span class="text-sm font-medium">Tên Trang</span>
</a>
```

### Bước 4: Thêm breadcrumb vào main.js
```javascript
breadcrumbMap: {
    // ... existing breadcrumbs
    'newpage': 'Tên Trang'
}
```

## Navigation Giữa Các Trang

### Từ trang con sang trang con khác:
```html
<button data-nav="materials">Đi đến Danh mục</button>
<button data-nav="createImport">Tạo phiếu nhập</button>
```

### Từ JavaScript:
```javascript
Navigation.navigateTo('dashboard');
Navigation.navigateToUrl('pages/03_danhmuc/ThemVatTu.html');
```

## Lưu ý Quan Trọng

1. **Không sử dụng component-based architecture** - Đã loại bỏ template.html
2. **Tất cả trang con load vào iframe** - Không cần sidebar/header riêng
3. **File index.js đã bị xóa** - Logic đã gộp vào main.js
4. **Đường dẫn login đúng**: `Tranglogin.html` (không phải TrangDangNhap.html)

## Development

### Chạy local:
```bash
# Sử dụng Live Server hoặc bất kỳ HTTP server nào
# Ví dụ với Python:
python -m http.server 8000

# Hoặc với Node.js:
npx http-server
```

### Browser:
Mở `http://localhost:8000/index.html`

## Changelog

### Version 1.1 (Latest)
- ✅ Gộp main.js và index.js thành 1 file
- ✅ Tạo dashboard.js cho trang Tổng quan
- ✅ Sửa đường dẫn logout: TrangDangNhap.html → Tranglogin.html
- ✅ Đơn giản hóa navigation.js
- ✅ Xác định rõ kiến trúc: Iframe-based
- ✅ Xóa file không dùng: index.js

### Version 1.0
- Initial release
