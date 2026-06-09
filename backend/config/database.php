<?php

/**
 * Class Database
 * Quản lý kết nối tới CSDL MySQL sử dụng PDO.
 * Áp dụng charset utf8mb4 để hỗ trợ đầy đủ tiếng Việt.
 */
class Database {

    // Thông số kết nối CSDL (mặc định cho XAMPP localhost)
    private $host     = "localhost";
    private $db_name  = "truongtho_db";
    private $username = "root";
    private $password = "";

    // Đối tượng kết nối, dùng chung cho toàn hệ thống
    public $conn;

    /**
     * Thiết lập và trả về đối tượng kết nối PDO.
     * Trả về null nếu kết nối thất bại.
     *
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,   // Ném exception khi có lỗi SQL
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,         // Trả về mảng kết hợp theo mặc định
                PDO::ATTR_EMULATE_PREPARES   => false,                    // Dùng prepared statement thực sự
            ];

            $this->conn = new PDO($dsn, $this->username, $this->password, $options);

        } catch (PDOException $e) {
            // Ghi log lỗi nội bộ, KHÔNG để lộ chi tiết ra ngoài
            error_log("[TTCN] Lỗi kết nối CSDL: " . $e->getMessage());

            // Thông báo an toàn cho người dùng
            die("Hệ thống đang gặp sự cố kết nối dữ liệu. Vui lòng thử lại sau hoặc liên hệ quản trị viên.");
        }

        return $this->conn;
    }
}

?>


