<?php
// getFeaturedStories.php
require_once 'config.php';
header('Content-Type: application/json');

try {
    // Fetch the top 3 stories based on the published date or any other criteria
    $sql = "SELECT id, title, content, genre, description, author FROM stories ORDER BY created_at DESC LIMIT 3";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    $stories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'stories' => $stories
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
