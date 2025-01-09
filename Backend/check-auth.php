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

session_start();

if (isset($_SESSION['user_id'])) {
    // User is logged in
    $stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
    } else {
        // User ID in session doesn't match any user in the database
        session_destroy();
        echo json_encode(['success' => false, 'error' => 'Invalid session']);
    }
} else {
    // User is not logged in
    echo json_encode(['success' => false, 'error' => 'Not authenticated']);
}
?>