<?php
require_once('include.php');
require_once('myException.php');

extract(checkParams($_REQUEST, ['title', 'text']));
$sql = "UPDATE task SET title = :title ,  text = :text WHERE id = :id ";
$params = [':id' => $id, ':title' => $title, ':text' => $text];
$types = [':id' => PDO::PARAM_INT, ':title' => PDO::PARAM_STR, ':text' => PDO::PARAM_STR];
dbQuery($sql, $params, $types);
header('Location: /test_project/todo/api');
