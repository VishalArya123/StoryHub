<?php
require_once 'config.php';
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


// Ensure session is started
session_start();

// Debug: Log session data
error_log('Session data: ' . print_r($_SESSION, true));

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'User not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['story_id'])) {
    echo json_encode(['success' => false, 'error' => 'Missing story ID']);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO likes (user_id, story_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id");
    $stmt->execute([$_SESSION['user_id'], $data['story_id']]);

    if ($stmt->rowCount() > 0) {
        $stmt = $pdo->prepare("UPDATE stories SET likes = likes + 1 WHERE id = ?");
        $stmt->execute([$data['story_id']]);
    }

    $pdo->commit();

    $stmt = $pdo->prepare("SELECT likes FROM stories WHERE id = ?");
    $stmt->execute([$data['story_id']]);
    $likes = $stmt->fetchColumn();

    echo json_encode(['success' => true, 'likes' => $likes]);
} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>