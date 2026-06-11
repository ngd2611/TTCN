# CHƯƠNG 3: THIẾT KẾ HỆ THỐNG - TRƯỜNG THỌ INVENTORY

## 3.1. Thiết kế mức khái niệm

### 3.1.1. Xác định các thực thể và thuộc tính

#### Nhóm thực thể Danh mục & Dữ liệu nền tảng:
* **Nhân viên**: Mã nhân viên, Họ tên, Chức vụ, Tên đăng nhập, Mật khẩu, Email, Số điện thoại.
* **Nhà cung cấp**: Mã nhà cung cấp, Tên nhà cung cấp, Số điện thoại, Địa chỉ.
* **Khách hàng**: Mã khách hàng, Tên khách hàng, Số điện thoại, Địa chỉ.
* **Vật tư**: Mã vật tư, Tên vật tư, Quy cách, Độ dày, Vị trí lưu kho, Định mức tồn, Đơn vị tính cơ bản, Số lượng thực tế, Số lượng hỏng vỡ.
* **Nhóm vật tư**: Mã nhóm, Tên nhóm, Mô tả.
* **Đơn vị tính**: Mã ĐVT, Tên ĐVT.
* **Quy đổi đơn vị**: Mã vật tư, Mã ĐVT, Hệ số quy đổi.

#### Nhóm thực thể Nghiệp vụ Nhập - Xuất:
* **Đề xuất nhập**: Mã đề xuất, Ngày lập, Lý do, Trạng thái.
* **Chi tiết đề xuất nhập**: Mã đề xuất, Mã vật tư, Mã ĐVT thao tác, Số lượng, Nhà cung cấp dự kiến.
* **Phiếu nhập kho**: Mã phiếu nhập, Ngày lập, Trạng thái, File hóa đơn.
* **Chi tiết phiếu nhập**: Mã phiếu nhập, Mã vật tư, Mã ĐVT thao tác, Số lượng, Đơn giá nhập.
* **Yêu cầu xuất**: Mã yêu cầu, Ngày lập, Lý do, Trạng thái.
* **Chi tiết yêu cầu xuất**: Mã yêu cầu, Mã vật tư, Mã ĐVT thao tác, Số lượng.
* **Phiếu xuất kho**: Mã phiếu xuất, Ngày lập, Trạng thái.
* **Chi tiết phiếu xuất**: Mã phiếu xuất, Mã vật tư, Mã ĐVT thao tác, Số lượng.

#### Nhóm thực thể Nghiệp vụ Kiểm kê và Xử lý lỗi:
* **Biên bản kiểm kê**: Mã biên bản KK, Ngày lập, Ghi chú, Trạng thái.
* **Chi tiết kiểm kê**: Mã biên bản KK, Mã vật tư, Số lượng tồn máy, Số lượng thực tế.
* **Biên bản lỗi**: Mã biên bản lỗi, Ngày lập, Mô tả lỗi.
* **Chi tiết biên bản lỗi**: Mã biên bản lỗi, Mã vật tư, Mã ĐVT thao tác, Số lượng lỗi.
* **Biên bản xử lý**: Mã biên bản xử lý, Ngày lập, Loại xử lý, Ghi chú.
* **Chi tiết biên bản xử lý**: Mã biên bản xử lý, Mã vật tư, Lý do, Phương án xử lý.

### 3.1.2. Mối quan hệ giữa các thực thể
* **Chủ thể - Chứng từ**: Nhân viên lập các loại phiếu (Đề xuất, Nhập, Xuất, Kiểm kê, Lỗi, Xử lý). Quan hệ (1-n).
* **Tổng - Phân hợp**: Chứng từ gốc bao gồm các Chi tiết chứng từ. Quan hệ (1-n).
* **Chủ thể - Hàng hóa**: Nhà cung cấp cung cấp Vật tư, Khách hàng mua Vật tư. Quan hệ (n-n).
* **Giao dịch Vật tư**: Vật tư nằm trong các Chi tiết chứng từ giao dịch. Quan hệ (1-n).
* **Đa đơn vị tính**: Vật tư có các Quy đổi đơn vị tính.
* **Phân loại**: Nhóm vật tư phân loại các Vật tư. Quan hệ (1-n).

---

## 3.2. Thiết kế mức logic

### 3.2.1. Các quan hệ (Schema)

#### A. Nhóm Danh mục & Dữ liệu nền tảng
* **NhanVien** (MaNhanVien, HoTen, ChucVu, TenDangNhap, MatKhau, Email, SoDienThoai)
* **NhaCungCap** (MaNhaCungCap, TenNhaCungCap, SoDienThoai, DiaChi)
* **KhachHang** (MaKhachHang, TenKhachHang, SoDienThoai, DiaChi)
* **VatTu** (MaVatTu, TenVatTu, NhomVatTu, QuyCach, DoDay, ViTriLuuKho, DinhMucTon, DonViTinhCoBan, SoLuongThucTe, SoLuongHongVo)
* **DonViTinh** (MaDVT, TenDVT)
* **QuyDoiDonVi** (MaVatTu, MaDVT, HeSoQuyDoi)

#### B. Nhóm Nghiệp vụ Nhập - Xuất
* **DeXuatNhap** (MaDeXuat, NgayLap, LyDo, TrangThai, MaNhanVien)
* **ChiTietDeXuatNhap** (MaDeXuat, MaVatTu, MaDVTThaoTac, SoLuong, NhaCungCapDuKien)
* **PhieuNhapKho** (MaPhieuNhap, NgayLap, TrangThai, FileHoaDon, MaNhanVien)
* **ChiTietPhieuNhap** (MaPhieuNhap, MaVatTu, MaDVTThaoTac, SoLuong, DonGiaNhap)
* **YeuCauXuat** (MaYeuCau, NgayLap, LyDo, TrangThai, MaNhanVien)
* **ChiTietYeuCauXuat** (MaYeuCau, MaVatTu, MaDVTThaoTac, SoLuong)
* **PhieuXuatKho** (MaPhieuXuat, NgayLap, TrangThai, MaNhanVien)
* **ChiTietPhieuXuat** (MaPhieuXuat, MaVatTu, MaDVTThaoTac, SoLuong)

#### C. Nhóm Nghiệp vụ Kiểm kê và Xử lý lỗi
* **BienBanKiemKe** (MaBienBanKK, NgayLap, GhiChu, TrangThai, MaNhanVien)
* **ChiTietKiemKe** (MaBienBanKK, MaVatTu, SoLuongTonMay, SoLuongThucTe)
* **BienBanLoi** (MaBienBanLoi, NgayLap, MoTaLoi, MaNhanVien)
* **ChiTietBienBanLoi** (MaBienBanLoi, MaVatTu, MaDVTThaoTac, SoLuongLoi)
* **BienBanXuLy** (MaBienBanXuLy, NgayLap, LoaiXuLy, GhiChu, MaNhanVien)
* **ChiTietBienBanXuLy** (MaBienBanXuLy, MaVatTu, LyDo, PhuongAnXuLy)

### 3.2.2. Chuẩn hóa (3NF Summary)
* **1NF**: Tách các danh sách vật tư đa trị thành bảng Chi tiết (Master-Detail).
* **2NF**: Đảm bảo thuộc tính không khóa phụ thuộc hoàn toàn vào khóa chính (nhất là các bảng có khóa kết hợp).
* **3NF**: Tách các nhóm vật tư và đơn vị tính thành danh mục độc lập để tránh phụ thuộc bắc cầu.

---

## 3.3. Thiết kế mức vật lý (Physical Schema)

### 3.3.1. Bảng DON_VI_TINH
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Giải thích |
| :--- | :--- | :--- | :--- |
| MaDVT | Varchar(10) | PK, Not null | Mã đơn vị tính |
| TenDVT | Nvarchar(50) | Not null | Tên đơn vị tính |

### 3.3.2. Bảng NHOM_VAT_TU
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Giải thích |
| :--- | :--- | :--- | :--- |
| MaNhomVatTu | Varchar(10) | PK, Not null | Mã nhóm vật tư |
| TenNhomVatTu| Nvarchar(50) | Not null | Tên nhóm vật tư |
| MoTa | Nvarchar(200)| | Mô tả nhóm |

### 3.3.3. Bảng KHACH_HANG
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Giải thích |
| :--- | :--- | :--- | :--- |
| MaKhachHang | Varchar(10) | PK, Not null | Mã khách hàng |
| TenKhachHang | Nvarchar(50) | Not null | Tên khách hàng |
| SoDienThoai | Varchar(10) | Not null | Số điện thoại |
| DiaChi | Nvarchar(100)| Not null | Địa chỉ liên hệ |

### 3.3.4. Bảng NHA_CUNG_CAP
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Giải thích |
| :--- | :--- | :--- | :--- |
| MaNhaCungCap | Varchar(10) | PK, Not null | Mã nhà cung cấp |
| TenNhaCungCap| Nvarchar(50) | Not null | Tên nhà cung cấp |
| SoDienThoai | Varchar(10) | Not null | Số điện thoại |
| DiaChi | Nvarchar(100)| Not null | Địa chỉ liên hệ |

### 3.3.5. Bảng NHAN_VIEN
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Giải thích |
| :--- | :--- | :--- | :--- |
| MaNhanVien | Varchar(10) | PK, Not null | Mã nhân viên |
| HoTen | Nvarchar(50) | Not null | Họ và tên |
| ChucVu | Nvarchar(50) | Not null | Chức vụ |
| TenDangNhap | Varchar(50) | Not null | Username |
| MatKhau | Varchar(50) | Not null | Password |
| Email | Varchar(50) | | Email |
| SoDienThoai | Varchar(10) | Not null | Số điện thoại |

### 3.3.6. Bảng VAT_TU
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Giải thích |
| :--- | :--- | :--- | :--- |
| MaVatTu | Varchar(10) | PK, Not null | Mã vật tư |
| TenVatTu | Nvarchar(50) | Not null | Tên vật tư |
| MaNhomVatTu | Varchar(10) | FK, Not null | Nhóm phân loại |
| QuyCach | Nvarchar(50) | | Kích thước/Quy cách |
| DonViTinh | Varchar(10) | FK | Đơn vị tính cơ bản |
| DinhMucTon | Int | | Ngưỡng tồn an toàn |
| SoLuongTon | Int | | Tồn kho thực tế |

### 3.3.7. Bảng DE_XUAT_NHAP & CHI_TIET_DE_XUAT_NHAP
* **DE_XUAT_NHAP**: MaDeXuat (PK), NgayLap, LyDo, TrangThai, MaNhanVien (FK).
* **CHI_TIET_DE_XUAT_NHAP**: MaDeXuat (PK, FK), MaVatTu (PK, FK), SoLuong, MaNhaCungCap (FK).

### 3.3.8. Bảng PHIEU_NHAP_KHO & CHI_TIET_PHIEU_NHAP
* **PHIEU_NHAP_KHO**: MaPhieuNhap (PK), NgayLap, TrangThai, MaHoaDon, MaNhaCungCap (FK), MaNhanVien (FK).
* **CHI_TIET_PHIEU_NHAP**: MaPhieuNhap (PK, FK), MaVatTu (PK, FK), SoLuong, DonGiaNhap.

### 3.3.9. Bảng YEU_CAU_XUAT & PHIEU_XUAT_KHO & CHI_TIET_PHIEU_XUAT
* **YEU_CAU_XUAT**: MaYeuCau (PK), NgayLap, LyDo, TrangThai, MaKhachHang (FK), MaNhanVien (FK).
* **PHIEU_XUAT_KHO**: MaPhieuXuat (PK), NgayLap, TrangThai, MaYeuCau (FK), MaNhanVien (FK).
* **CHI_TIET_PHIEU_XUAT**: MaPhieuXuat (PK, FK), MaVatTu (PK, FK), SoLuong.

### 3.3.10. Bảng BIEN_BAN_KIEM_KE & CHI_TIET_KIEM_KE
* **BIEN_BAN_KIEM_KE**: MaBienBanKK (PK), NgayLap, GhiChu, TrangThai, MaNhanVien (FK).
* **CHI_TIET_KIEM_KE**: MaBienBanKK (PK, FK), MaVatTu (PK, FK), SoLuongTonMay, SoLuongThucTe.

### 3.3.11. Bảng BIEN_BAN_XU_LY
* **BIEN_BAN_XU_LY**: MaBienBanXuLy (PK), NgayLap, LoaiXuLy, GhiChu, MaBienBanKK (FK).