<?php
$host = 'database.ct6rgnl5t3su.us-east-1.rds.amazonaws.com';
$user = 'admin';
$password = '12345678';
$database = 'metadata';

// Create a connection to the database
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the 'infosnap' table
$sql = "SELECT DISTINCT SnapshotId, VolumeId, InstanceId, DeleteOn, CurrentDateTime FROM infosnap";

$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
