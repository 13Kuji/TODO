<?php
require_once('include.php');
require_once('myException.php');
register_shutdown_function(function (){
    var_dump(error_get_last());
    die();
});
$dataTask = json_decode($_REQUEST['data'], true);
extract(checkParams(
        $dataTask,
        [
            'title',
            'text',
            'execTime'
        ])
);
$sql = "INSERT INTO task(title, text, time) 
        VALUES (:title, :text, :time)";
$params = [
    ':title' => $title,
    ':text' => $text,
    ':time' => $execTime
];
$types = [
    ':title' => PDO::PARAM_STR,
    ':text' => PDO::PARAM_STR,
    ':time' => PDO::PARAM_STR
];
dbQuery($sql, $params, $types);
