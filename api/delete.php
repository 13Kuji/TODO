<?php
require_once ('include.php');

$id = $_POST['id'];
$sql = "DELETE FROM task WHERE id = :id";
$params = [':id' => $id];
$types = [':id' => PDO::PARAM_INT];
dbQuery($sql, $params, $types);
header('Location: /test_project/todo/api');