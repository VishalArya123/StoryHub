<?php
// saveDraft.php
require_once 'config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

try {
    // Check for required fields
    if (!isset($data['title']) || !isset($data['content']) || !isset($data['genre']) || !isset($data['author'])) {
        throw new Exception('Missing required fields');
    }

    // Check if it's an update or an insert
    if (isset($data['id'])) {
        // Update existing draft
        $sql = "UPDATE drafts SET title = :title, content = :content, genre = :genre, description = :description, author = :author WHERE id = :id";
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
        $stmt->bindParam(':content', $data['content'], PDO::PARAM_STR);
        $stmt->bindParam(':genre', $data['genre'], PDO::PARAM_STR);
        $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
        $stmt->bindParam(':author', $data['author'], PDO::PARAM_STR);
        $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
    } else {
        // Insert new draft
        $sql = "INSERT INTO drafts (title, content, genre, description, author) VALUES (:title, :content, :genre, :description, :author)";
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
        $stmt->bindParam(':content', $data['content'], PDO::PARAM_STR);
        $stmt->bindParam(':genre', $data['genre'], PDO::PARAM_STR);
        $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
        $stmt->bindParam(':author', $data['author'], PDO::PARAM_STR);
    }

    // Execute the statement
    $success = $stmt->execute();

    // Check if the execution was successful
    if (!$success) {
        throw new Exception('Failed to save draft');
    }

    // Return the success response with the draft id
    echo json_encode([
        'success' => true,
        'id' => isset($data['id']) ? $data['id'] : $pdo->lastInsertId(),
        'message' => 'Draft saved successfully'
    ]);
} catch (Exception $e) {
    // Catch errors and return the error message
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
