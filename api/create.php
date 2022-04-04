<?php
require_once('include.php');
require_once('myException.php');

extract(checkParams($_REQUEST, ['title', 'text']));
$sql = "INSERT INTO task(title, text) VALUES (:title, :text)";
$params = [':title' => $title, ':text' => $text];
$types = [':title' => PDO::PARAM_STR, ':text' => PDO::PARAM_STR];
dbQuery($sql, $params, $types);
header('Location: /test_project/todo/api');
