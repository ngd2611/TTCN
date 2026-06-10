<?php

require_once __DIR__ . '/../config/database.php';

class VattuModel {

    private $conn;

    public function __construct() {
        $database   = new Database();
        $this->conn = $database->getConnection();
    }

    /**
     * Lấy toàn bộ danh sách vật tư kèm tên nhóm và tên đơn vị tính.
     */
    public function getAllVattu(): array {
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
                LEFT JOIN NHOM_VAT_TU nvt ON vt.Ma_Nhom_Vat_Tu = nvt.Ma_Nhom_Vat_Tu
                LEFT JOIN DON_VI_TINH dvt ON vt.Ma_DVT_Co_Ban   = dvt.Ma_DVT
                ORDER BY vt.Ma_Vat_Tu ASC";
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("[TTCN] getAllVattu: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Lấy danh sách nhóm vật tư cho dropdown.
     */
    public function getNhomVatTu(): array {
        try {
            $stmt = $this->conn->prepare(
                "SELECT Ma_Nhom_Vat_Tu, Ten_Nhom_Vat_Tu FROM NHOM_VAT_TU ORDER BY Ma_Nhom_Vat_Tu ASC"
            );
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("[TTCN] getNhomVatTu: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Lấy danh sách đơn vị tính cho dropdown.
     */
    public function getDonViTinh(): array {
        try {
            $stmt = $this->conn->prepare(
                "SELECT Ma_DVT, Ten_DVT FROM DON_VI_TINH ORDER BY Ma_DVT ASC"
            );
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("[TTCN] getDonViTinh: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Lấy một vật tư theo mã.
     */
    public function getOneVattu(string $maVatTu): array|false {
        try {
            $stmt = $this->conn->prepare(
                "SELECT vt.*, nvt.Ten_Nhom_Vat_Tu, dvt.Ten_DVT
                 FROM VAT_TU vt
                 LEFT JOIN NHOM_VAT_TU nvt ON vt.Ma_Nhom_Vat_Tu = nvt.Ma_Nhom_Vat_Tu
                 LEFT JOIN DON_VI_TINH dvt ON vt.Ma_DVT_Co_Ban   = dvt.Ma_DVT
                 WHERE vt.Ma_Vat_Tu = :ma LIMIT 1"
            );
            $stmt->bindParam(':ma', $maVatTu, PDO::PARAM_STR);
            $stmt->execute();
            $row = $stmt->fetch();
            return $row ?: false;
        } catch (PDOException $e) {
            error_log("[TTCN] getOneVattu: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Cập nhật thông tin vật tư (không cho đổi mã).
     */
    public function updateVattu(string $maVatTu, array $data): bool {
        $sql = "UPDATE VAT_TU SET
                    Ten_Vat_Tu     = :ten,
                    Ma_Nhom_Vat_Tu = :nhom,
                    Quy_Cach       = :quy_cach,
                    Do_Day         = :do_day,
                    Vi_Tri_Luu_Kho = :vi_tri,
                    Ma_DVT_Co_Ban  = :dvt,
                    Dinh_Muc_Ton   = :dinh_muc
                WHERE Ma_Vat_Tu = :ma";
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':ten',      $data['Ten_Vat_Tu'],     PDO::PARAM_STR);
            $stmt->bindParam(':nhom',     $data['Ma_Nhom_Vat_Tu'], PDO::PARAM_STR);
            $stmt->bindParam(':quy_cach', $data['Quy_Cach'],       PDO::PARAM_STR);
            $stmt->bindParam(':do_day',   $data['Do_Day'],         PDO::PARAM_STR);
            $stmt->bindParam(':vi_tri',   $data['Vi_Tri_Luu_Kho'], PDO::PARAM_STR);
            $stmt->bindParam(':dvt',      $data['Ma_DVT_Co_Ban'],  PDO::PARAM_STR);
            $stmt->bindParam(':dinh_muc', $data['Dinh_Muc_Ton'],   PDO::PARAM_INT);
            $stmt->bindParam(':ma',       $maVatTu,                PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("[TTCN] updateVattu: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Xóa một vật tư theo mã.
     * @param  string $maVatTu  Mã vật tư cần xóa.
     * @return bool  true nếu xóa thành công, false nếu thất bại.
     */
    public function deleteVattu(string $maVatTu): bool {
        try {
            $stmt = $this->conn->prepare("DELETE FROM VAT_TU WHERE Ma_Vat_Tu = :ma");
            $stmt->bindParam(':ma', $maVatTu, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("[TTCN] deleteVattu: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Tạo mới một vật tư.
     * @param  array $data  Mảng dữ liệu từ Controller (đã validate).
     * @return string|false Mã vật tư vừa tạo, hoặc false nếu thất bại.
     */
    public function createVattu(array $data) {
        $sql = "INSERT INTO VAT_TU
                    (Ma_Vat_Tu, Ten_Vat_Tu, Ma_Nhom_Vat_Tu, Quy_Cach, Do_Day,
                     Vi_Tri_Luu_Kho, Ma_DVT_Co_Ban, Dinh_Muc_Ton)
                VALUES
                    (:ma, :ten, :nhom, :quy_cach, :do_day,
                     :vi_tri, :dvt, :dinh_muc)";
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':ma',       $data['Ma_Vat_Tu'],      PDO::PARAM_STR);
            $stmt->bindParam(':ten',      $data['Ten_Vat_Tu'],     PDO::PARAM_STR);
            $stmt->bindParam(':nhom',     $data['Ma_Nhom_Vat_Tu'], PDO::PARAM_STR);
            $stmt->bindParam(':quy_cach', $data['Quy_Cach'],       PDO::PARAM_STR);
            $stmt->bindParam(':do_day',   $data['Do_Day'],         PDO::PARAM_STR);
            $stmt->bindParam(':vi_tri',   $data['Vi_Tri_Luu_Kho'], PDO::PARAM_STR);
            $stmt->bindParam(':dvt',      $data['Ma_DVT_Co_Ban'],  PDO::PARAM_STR);
            $stmt->bindParam(':dinh_muc', $data['Dinh_Muc_Ton'],   PDO::PARAM_INT);
            $stmt->execute();
            return $data['Ma_Vat_Tu'];
        } catch (PDOException $e) {
            error_log("[TTCN] createVattu: " . $e->getMessage());
            return false;
        }
    }
}

?>
