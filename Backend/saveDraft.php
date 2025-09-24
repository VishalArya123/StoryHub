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

$data = json_decode(file_get_contents('php://input'), true);

try {
    if (!isset($data['title']) || !isset($data['content']) || !isset($data['genre']) || !isset($data['author'])) {
        throw new Exception('Missing required fields');
    }
    
    if (isset($data['id'])) {
        $sql = "UPDATE drafts SET title = :title, content = :content, genre = :genre, description = :description, author = :author WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
        $stmt->bindParam(':content', $data['content'], PDO::PARAM_STR);
        $stmt->bindParam(':genre', $data['genre'], PDO::PARAM_STR);
        $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
        $stmt->bindParam(':author', $data['author'], PDO::PARAM_STR);
        $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
    } else {
        $sql = "INSERT INTO drafts (title, content, genre, description, author) VALUES (:title, :content, :genre, :description, :author)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
        $stmt->bindParam(':content', $data['content'], PDO::PARAM_STR);
        $stmt->bindParam(':genre', $data['genre'], PDO::PARAM_STR);
        $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
        $stmt->bindParam(':author', $data['author'], PDO::PARAM_STR);
    }
    
    $success = $stmt->execute();
    
    if (!$success) {
        throw new Exception('Failed to save draft');
    }
    
    echo json_encode([
        'success' => true,
        'id' => isset($data['id']) ? $data['id'] : $pdo->lastInsertId(),
        'message' => 'Draft saved successfully'
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
