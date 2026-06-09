<?php

require_once __DIR__ . '/../models/VattuModel.php';

/**
 * Class VattuController
 * Xử lý request và trả về dữ liệu vật tư dưới dạng JSON API.
 */
class VattuController {

    // Đối tượng Model vật tư
    private $vattuModel;

    /**
     * Khởi tạo Controller, inject VattuModel.
     */
    public function __construct() {
        $this->vattuModel = new VattuModel();
    }

    /**
     * Trả về toàn bộ danh sách vật tư dưới dạng JSON.
     * GET /Backend/controllers/VattuController.php
     */
    public function getAll(): void {
        // Cho phép Frontend trên bất kỳ origin nào gọi API này
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json; charset=UTF-8');

        $data = $this->vattuModel->getAllVattu();

        if (!empty($data)) {
            // Trả về dữ liệu thành công
            http_response_code(200);
            echo json_encode(
                ['status' => 'success', 'data' => $data],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            // Truy vấn thành công nhưng không có bản ghi nào
            http_response_code(200);
            echo json_encode(
                ['status' => 'success', 'data' => [], 'message' => 'Không có dữ liệu'],
                JSON_UNESCAPED_UNICODE
            );
        }
    }
}

// --- Routing cơ bản ---
// Chỉ xử lý khi file được gọi trực tiếp qua HTTP GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller = new VattuController();
    $controller->getAll();
}
