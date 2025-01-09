<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173"); // Set the specific origin
header("Access-Control-Allow-Credentials: true"); // Allow credentials
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow necessary HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow necessary headers

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight request handling
    http_response_code(200);
    exit;
}

session_start();
session_destroy();
echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
?>