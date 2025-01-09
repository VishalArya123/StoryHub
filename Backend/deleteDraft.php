<?php
require_once 'config.php';
header('Content-Type: application/json');

// Get the id from the URL parameters
$id = $_GET['id'];

try {
    // SQL query to delete a draft by id
    $sql = "DELETE FROM drafts WHERE id = :id";
    
    // Prepare the statement
    $stmt = $pdo->prepare($sql);

    // Bind the id parameter to the SQL statement
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Execute the statement
    $success = $stmt->execute();

    // Return the success status in JSON format
    echo json_encode(['success' => $success]);
} catch (PDOException $e) {
    // Return an error message if something goes wrong
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
