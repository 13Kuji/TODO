<?php
require_once('include.php');
require_once('myException.php');

$dataTask = json_decode($_REQUEST['data'], true);
extract(checkParams(
        $dataTask,
        [
            'title',
            'text'
        ])
);
$sql = "INSERT INTO task(title, text) 
        VALUES (:title, :text)";
$params = [
    ':title' => $title,
    ':text' => $text
];
$types = [
    ':title' => PDO::PARAM_STR,
    ':text' => PDO::PARAM_STR
];
dbQuery($sql, $params, $types);
