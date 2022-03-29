<?php
require_once ('connect.php');

$id = $_POST['id'];
$stmt = $connect->prepare("DELETE FROM task WHERE id = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();
header('Location: /test_project/todo/api');