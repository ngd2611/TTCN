<?php

require_once __DIR__ . '/../config/database.php';

/**
 * Class VattuModel
 * Tầng Model xử lý toàn bộ truy vấn liên quan đến bảng VAT_TU.
 */
class VattuModel {

    // Đối tượng kết nối PDO dùng chung trong toàn class
    private $conn;

    /**
     * Khởi tạo kết nối CSDL thông qua class Database.
     */
    public function __construct() {
        $database    = new Database();
        $this->conn  = $database->getConnection();
    }

    /**
     * Lấy toàn bộ danh sách vật tư, kèm tên nhóm vật tư và tên đơn vị tính.
     *
     * @return array Mảng kết hợp chứa dữ liệu vật tư.
     */
    public function getAllVattu(): array {
        $result = [];

        $sql = "SELECT
                    vt.Ma_Vat_Tu,
                    vt.Ten_Vat_Tu,
                    vt.Ma_Nhom_Vat_Tu,
                    vt.Quy_Cach,
                    vt.Do_Day,
                    vt.Vi_Tri_Luu_Kho,
                    vt.Ma_DVT_Co_Ban,
                    vt.Dinh_Muc_Ton,
                    vt.So_Luong_Ton,
                    vt.So_Luong_Hong_Vo,
                    vt.Thoi_gian_tao,
                    vt.Thoi_gian_cap_nhat,
                    nvt.Ten_Nhom_Vat_Tu,
                    dvt.Ten_DVT
                FROM VAT_TU vt
                LEFT JOIN NHOM_VAT_TU  nvt ON vt.Ma_Nhom_Vat_Tu  = nvt.Ma_Nhom_Vat_Tu
                LEFT JOIN DON_VI_TINH  dvt ON vt.Ma_DVT_Co_Ban    = dvt.Ma_DVT
                ORDER BY vt.Ma_Vat_Tu ASC";

        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();

            // Nạp toàn bộ kết quả vào mảng kết hợp
            $result = $stmt->fetchAll();

        } catch (PDOException $e) {
            // Ghi lỗi nội bộ, không để lộ chi tiết ra ngoài
            error_log("[TTCN] VattuModel::getAllVattu() - Lỗi truy vấn: " . $e->getMessage());
        }

        return $result;
    }
}

?>
