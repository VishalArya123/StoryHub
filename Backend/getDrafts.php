<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
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

try {
    $sql = "SELECT id, title, last_modified FROM drafts ORDER BY last_modified DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $drafts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($drafts)) {
        echo json_encode(['success' => false, 'message' => 'No drafts found']);
    } else {
        echo json_encode(['success' => true, 'drafts' => $drafts]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
