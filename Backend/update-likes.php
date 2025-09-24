<?php
require_once 'config.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$id = isset($_POST['id']) ? $_POST['id'] : null;
if (!$id) {
    echo json_encode(['error' => 'Story ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE stories SET likes = likes + 1 WHERE id = ?");
    $stmt->execute([$id]);
    
    $stmt = $pdo->prepare("SELECT likes FROM stories WHERE id = ?");
    $stmt->execute([$id]);
    $likes = $stmt->fetchColumn();
    
    echo json_encode(['success' => true, 'likes' => $likes]);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
