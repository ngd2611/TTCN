<?php

require_once __DIR__ . '/../models/VattuModel.php';

class VattuController {

    private $vattuModel;

    public function __construct() {
        $this->vattuModel = new VattuModel();
    }

    // ── Thiết lập header chung ────────────────────────────────────────────
    public function setHeaders(): void {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-Type: application/json; charset=UTF-8');
        header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
        header('Pragma: no-cache');
        header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
    }

    // ── Phản hồi JSON chuẩn ───────────────────────────────────────────────
    private function respond(int $code, array $payload): void {
        http_response_code($code);
        echo json_encode($payload, JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ── GET: danh sách vật tư ─────────────────────────────────────────────
    public function getAll(): void {
        $data = $this->vattuModel->getAllVattu();
        $this->respond(200, ['status' => 'success', 'data' => $data]);
    }

    // ── GET: danh sách nhóm vật tư ────────────────────────────────────────
    public function getNhom(): void {
        $data = $this->vattuModel->getNhomVatTu();
        $this->respond(200, ['status' => 'success', 'data' => $data]);
    }

    // ── GET: danh sách đơn vị tính ────────────────────────────────────────
    public function getDvt(): void {
        $data = $this->vattuModel->getDonViTinh();
        $this->respond(200, ['status' => 'success', 'data' => $data]);
    }

    // ── GET: lấy 1 vật tư theo mã ───────────────────────────────────────
    public function getOne(): void {
        $maVatTu = trim($_GET['ma'] ?? '');
        if ($maVatTu === '') {
            $this->respond(400, ['status' => 'error', 'message' => 'Thiếu mã vật tư.']);
        }
        $data = $this->vattuModel->getOneVattu($maVatTu);
        if ($data) {
            $this->respond(200, ['status' => 'success', 'data' => $data]);
        } else {
            $this->respond(404, ['status' => 'error', 'message' => 'Không tìm thấy vật tư.']);
        }
    }

    // ── PUT: cập nhật vật tư ───────────────────────────────────────────
    public function update(): void {
        $maVatTu = trim($_GET['ma'] ?? '');
        if ($maVatTu === '') {
            $this->respond(400, ['status' => 'error', 'message' => 'Thiếu mã vật tư.']);
        }

        $body = json_decode(file_get_contents('php://input'), true);
        if (!$body || !is_array($body)) {
            $this->respond(400, ['status' => 'error', 'message' => 'Dữ liệu không hợp lệ.']);
        }

        $required = ['Ten_Vat_Tu', 'Ma_Nhom_Vat_Tu', 'Ma_DVT_Co_Ban'];
        foreach ($required as $field) {
            if (empty(trim($body[$field] ?? ''))) {
                $this->respond(400, ['status' => 'error', 'message' => "Trường bắt buộc bị thiếu: {$field}"]);
            }
        }

        $data = [
            'Ten_Vat_Tu'     => trim($body['Ten_Vat_Tu']),
            'Ma_Nhom_Vat_Tu' => trim($body['Ma_Nhom_Vat_Tu']),
            'Quy_Cach'       => trim($body['Quy_Cach']       ?? ''),
            'Do_Day'         => trim($body['Do_Day']         ?? ''),
            'Vi_Tri_Luu_Kho' => trim($body['Vi_Tri_Luu_Kho'] ?? ''),
            'Ma_DVT_Co_Ban'  => trim($body['Ma_DVT_Co_Ban']),
            'Dinh_Muc_Ton'   => (int)($body['Dinh_Muc_Ton']  ?? 0),
        ];

        $ok = $this->vattuModel->updateVattu($maVatTu, $data);
        if ($ok) {
            $this->respond(200, ['status' => 'success', 'message' => 'Cập nhật vật tư thành công.']);
        } else {
            $this->respond(500, ['status' => 'error', 'message' => 'Cập nhật thất bại.']);
        }
    }

    // ── DELETE: xóa vật tư ────────────────────────────────────────────────
    public function delete(): void {
        $maVatTu = trim($_GET['ma'] ?? '');

        if ($maVatTu === '') {
            $this->respond(400, ['status' => 'error', 'message' => 'Thiếu mã vật tư.']);
        }

        $ok = $this->vattuModel->deleteVattu($maVatTu);

        if ($ok) {
            $this->respond(200, ['status' => 'success', 'message' => 'Xóa vật tư thành công.']);
        } else {
            $this->respond(404, ['status' => 'error', 'message' => 'Không tìm thấy vật tư hoặc xóa thất bại.']);
        }
    }

    // ── POST: tạo mới vật tư ──────────────────────────────────────────────
    public function create(): void {
        $body = json_decode(file_get_contents('php://input'), true);

        if (!$body || !is_array($body)) {
            $this->respond(400, ['status' => 'error', 'message' => 'Dữ liệu gửi lên không hợp lệ.']);
        }

        // Validate các trường bắt buộc
        $required = ['Ma_Vat_Tu', 'Ten_Vat_Tu', 'Ma_Nhom_Vat_Tu', 'Ma_DVT_Co_Ban'];
        foreach ($required as $field) {
            if (empty(trim($body[$field] ?? ''))) {
                $this->respond(400, [
                    'status'  => 'error',
                    'message' => "Trường bắt buộc bị thiếu: {$field}"
                ]);
            }
        }

        // Làm sạch dữ liệu đầu vào
        $data = [
            'Ma_Vat_Tu'      => trim($body['Ma_Vat_Tu']),
            'Ten_Vat_Tu'     => trim($body['Ten_Vat_Tu']),
            'Ma_Nhom_Vat_Tu' => trim($body['Ma_Nhom_Vat_Tu']),
            'Quy_Cach'       => trim($body['Quy_Cach']       ?? ''),
            'Do_Day'         => trim($body['Do_Day']         ?? ''),
            'Vi_Tri_Luu_Kho' => trim($body['Vi_Tri_Luu_Kho'] ?? ''),
            'Ma_DVT_Co_Ban'  => trim($body['Ma_DVT_Co_Ban']),
            'Dinh_Muc_Ton'   => (int)($body['Dinh_Muc_Ton']  ?? 0),
        ];

        $result = $this->vattuModel->createVattu($data);

        if ($result !== false) {
            $this->respond(201, [
                'status'     => 'success',
                'message'    => 'Thêm vật tư thành công.',
                'Ma_Vat_Tu'  => $result
            ]);
        } else {
            $this->respond(500, [
                'status'  => 'error',
                'message' => 'Thêm vật tư thất bại. Vui lòng kiểm tra lại dữ liệu hoặc mã vật tư đã tồn tại.'
            ]);
        }
    }
}

// ── Routing ───────────────────────────────────────────────────────────────
$controller = new VattuController();
$controller->setHeaders();

// Xử lý OPTIONS preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';
    match ($action) {
        'get_nhom' => $controller->getNhom(),
        'get_dvt'  => $controller->getDvt(),
        'get_one'  => $controller->getOne(),
        default    => $controller->getAll(),
    };
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->create();
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $controller->update();
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $controller->delete();
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Phương thức không được hỗ trợ.'], JSON_UNESCAPED_UNICODE);
}
