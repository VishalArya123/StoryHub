<?php
// publishStory.php
require_once 'config.php';
header('Content-Type: application/json');

try {
    // Read the incoming JSON data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($data['title']) || empty($data['content']) || empty($data['genre']) || empty($data['author'])) {
        throw new Exception('Missing required fields');
    }

    // Clean the content - remove HTML and convert to plain text
    $cleanContent = html_entity_decode(strip_tags($data['content']));
    
    // SQL query to insert a new story
    $sql = "INSERT INTO stories (title, content, genre, description, author) VALUES (:title, :content, :genre, :description, :author)";
    
    // Prepare the statement
    $stmt = $pdo->prepare($sql);

    // Bind the parameters to the SQL statement
    $stmt->bindParam(':title', $data['title'], PDO::PARAM_STR);
    $stmt->bindParam(':content', $cleanContent, PDO::PARAM_STR); // Use cleaned content
    $stmt->bindParam(':genre', $data['genre'], PDO::PARAM_STR);
    $stmt->bindParam(':description', $data['description'], PDO::PARAM_STR);
    $stmt->bindParam(':author', $data['author'], PDO::PARAM_STR);

    // Execute the query
    $success = $stmt->execute();

    // If the insert is successful, return the new story ID
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
    // Handle errors and return the error message in JSON format
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>