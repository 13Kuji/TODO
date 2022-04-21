<?php
require_once ('include.php');
require_once('myException.php');

$idTask = $_POST['id'];
checkParams($idTask,[0]);
$sql = "DELETE FROM task WHERE id = :id";
$params = [':id' => $idTask];
$types = [':id' => PDO::PARAM_INT];
dbQuery($sql, $params, $types);