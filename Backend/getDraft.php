<?php
require_once 'config.php';
header('Content-Type: application/json');

$id = $_GET['id'];

try {
    // SQL query to select a draft by id
    $sql = "SELECT * FROM drafts WHERE id = :id";

    // Prepare the statement
    $stmt = $pdo->prepare($sql);

    // Bind the id parameter to the SQL statement
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    // Execute the statement
    $stmt->execute();

    // Fetch the result as an associative array
    $draft = $stmt->fetch(PDO::FETCH_ASSOC);

    // Return the draft as JSON
    echo json_encode($draft ? $draft : ['success' => false, 'message' => 'Draft not found']);
} catch (PDOException $e) {
    // Return an error message if something goes wrong
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
