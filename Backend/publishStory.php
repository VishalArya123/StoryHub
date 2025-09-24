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

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['title']) || empty($data['content']) || empty($data['genre']) || empty($data['author'])) {
        throw new Exception('Missing required fields');
    }
    
    $cleanContent = html_entity_decode(strip_tags($data['content']));
    
    $sql = "INSERT INTO stories (title, content, genre, description, author) VALUES (:title, :content, :genre, :description, :author)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
    $stmt->bindParam(':content', $cleanContent, PDO::PARAM_STR);
    $stmt->bindParam(':genre', $data['genre'], PDO::PARAM_STR);
    $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
    $stmt->bindParam(':author', $data['author'], PDO::PARAM_STR);
    
    $success = $stmt->execute();
    
    if ($success) {
        echo json_encode([
            'success' => true, 
            'storyId' => $pdo->lastInsertId(),
            'message' => 'Story published successfully'
        ]);
    } else {
        throw new Exception('Failed to publish the story');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
