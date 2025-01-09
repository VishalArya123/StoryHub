<?php
require_once 'config.php';

$genre = isset($_GET['genre']) ? $_GET['genre'] : 'all';

try {
    if ($genre === 'all') {
        $stmt = $pdo->query("SELECT id, title, author, description, genre, likes, created_at FROM stories ORDER BY created_at DESC");
    } else {
        $stmt = $pdo->prepare("SELECT id, title, author, description, genre, likes, created_at FROM stories WHERE genre = ? ORDER BY created_at DESC");
        $stmt->execute([$genre]);
    }
    
    $stories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'stories' => $stories]);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>