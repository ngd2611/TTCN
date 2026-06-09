CREATE TABLE `DON_VI_TINH` (
    `Ma_DVT` VARCHAR(10) NOT NULL,
    `Ten_DVT` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`Ma_DVT`),
    UNIQUE KEY `Ten_DVT_UNIQUE` (`Ten_DVT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `NHOM_VAT_TU` (
    `Ma_Nhom_Vat_Tu` VARCHAR(10) NOT NULL,
    `Ten_Nhom_Vat_Tu` VARCHAR(50) NOT NULL,
    `Mo_Ta` VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (`Ma_Nhom_Vat_Tu`),
    UNIQUE KEY `Ten_Nhom_Vat_Tu_UNIQUE` (`Ten_Nhom_Vat_Tu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `VAT_TU` (
    `Ma_Vat_Tu` VARCHAR(10) NOT NULL,
    `Ten_Vat_Tu` VARCHAR(100) NOT NULL,
    `Ma_Nhom_Vat_Tu` VARCHAR(10) NOT NULL,
    `Quy_Cach` VARCHAR(100) DEFAULT NULL,
    `Do_Day` VARCHAR(20) DEFAULT NULL,
    `Vi_Tri_Luu_Kho` VARCHAR(100) DEFAULT NULL,
    `Ma_DVT_Co_Ban` VARCHAR(10) NOT NULL,
    `Dinh_Muc_Ton` INT DEFAULT 0,
    `So_Luong_Ton` INT NOT NULL DEFAULT 0,
    `So_Luong_Hong_Vo` INT NOT NULL DEFAULT 0,
    `Thoi_gian_tao` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `Thoi_gian_cap_nhat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Ma_Vat_Tu`),
    CONSTRAINT `FK_VATTU_NHOM` FOREIGN KEY (`Ma_Nhom_Vat_Tu`) REFERENCES `NHOM_VAT_TU` (`Ma_Nhom_Vat_Tu`),
    CONSTRAINT `FK_VATTU_DVT` FOREIGN KEY (`Ma_DVT_Co_Ban`) REFERENCES `DON_VI_TINH` (`Ma_DVT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `DON_VI_TINH` (`Ma_DVT`, `Ten_DVT`) VALUES 
('DVT01', 'Cây'),
('DVT02', 'Tấm'),
('DVT03', 'Hộp'),
('DVT04', 'Cuộn'),
('DVT05', 'Thanh'),
('DVT06', 'Bao');

INSERT INTO `NHOM_VAT_TU` (`Ma_Nhom_Vat_Tu`, `Ten_Nhom_Vat_Tu`, `Mo_Ta`) VALUES 
('N01', 'Khung xương', 'Hệ thống khung xương thạch cao chính hãng Vĩnh Tường'),
('N02', 'Tấm thạch cao', 'Các loại tấm thạch cao tiêu chuẩn và chuyên dụng Gyproc'),
('N03', 'Tấm ốp nhựa và than tre', 'Vật liệu nhựa nano trang trí nội thất tấm PVC vân đá sợi than tre'),
('N04', 'Sàn gỗ và sàn nhựa', 'Sàn công nghiệp cao cấp và sàn nhựa hèm khóa SPC'),
('N05', 'Vật tư phụ thi công', 'Các loại phụ kiện phụ trợ đinh vít keo xử lý mối nối lưới thủy tinh');

INSERT INTO `VAT_TU` (`Ma_Vat_Tu`, `Ten_Vat_Tu`, `Ma_Nhom_Vat_Tu`, `Quy_Cach`, `Do_Day`, `Vi_Tri_Luu_Kho`, `Ma_DVT_Co_Ban`, `Dinh_Muc_Ton`, `So_Luong_Ton`, `So_Luong_Hong_Vo`) VALUES 
('VT001', 'Khung xương cá Vĩnh Tường', 'N01', 'Khung chìm', '0.4mm', 'Kệ A1', 'DVT01', 100, 250, 2),
('VT002', 'Tấm thạch cao Gyproc tiêu chuẩn', 'N02', '1220x2440mm', '9mm', 'Kệ B2', 'DVT02', 50, 120, 0),
('VT003', 'Tấm ốp phẳng nano PVC iwood', 'N03', '400x3000mm', '9mm', 'Kệ C1', 'DVT02', 80, 210, 1),
('VT004', 'Sàn nhựa hèm khóa SPC Kosmos', 'N04', '1220x180mm', '4mm', 'Kệ D3', 'DVT02', 60, 145, 0),
('VT005', 'Vít đen thạch cao tự khoan', 'N05', 'Hộp 500 chiếc', '3.5mm', 'Tủ E1', 'DVT03', 30, 45, 0),
('VT006', 'Băng keo lưới sợi thủy tinh', 'N05', '50mm x 50m', '0.2mm', 'Tủ E2', 'DVT04', 20, 85, 0);