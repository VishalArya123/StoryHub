<?php
require_once 'config.php';

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    echo json_encode(['error' => 'Story ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM stories WHERE id = ?");
    $stmt->execute([$id]);
    $story = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$story) {
        echo json_encode(['error' => 'Story not found']);
        exit;
    }
    
    // Process content for proper display
    $story['content'] = nl2br($story['content']);
    $story['content'] = str_replace(['<br />', '<br>', '<br/>'], "\n", $story['content']);
    
    // Process short description
    $story['description'] = nl2br($story['description']);
    
    echo json_encode(['success' => true, 'story' => $story]);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>