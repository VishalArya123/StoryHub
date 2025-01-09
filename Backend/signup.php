<?php
require_once 'config.php';
header('Content-Type: application/json');
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173"); // Set the specific origin
header("Access-Control-Allow-Credentials: true"); // Allow credentials
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow necessary HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight request handling
    http_response_code(200);
    exit;
}


$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
    
    echo json_encode(['success' => true, 'message' => 'User registered successfully']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>