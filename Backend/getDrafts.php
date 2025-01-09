<?php
// Enable error reporting for development
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include the config file to establish the PDO connection
require_once 'config.php';

header('Content-Type: application/json');

try {
    // SQL query to select only id, title, and last_modified
    $sql = "SELECT id, title, last_modified FROM drafts ORDER BY last_modified DESC";
    
    // Prepare and execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch all drafts as an associative array
    $drafts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Check if drafts exist and respond
    if (empty($drafts)) {
        echo json_encode(['success' => false, 'message' => 'No drafts found']);
    } else {
        echo json_encode(['success' => true, 'drafts' => $drafts]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
