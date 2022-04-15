<?php
require_once('include.php');
require_once('myException.php');

register_shutdown_function(function (){
    var_dump(error_get_last());
    die();
});
$data = json_decode($_REQUEST['data'], true);

extract(checkParams(
    $data,
    [
        'title',
        'text'
    ])
);
var_dump($data);
if (empty($id)) {
    $sql = "INSERT INTO task(title, text) 
            VALUES (:title, :text)";
} else {
    $sql = "UPDATE task SET 
            title = :title, 
            text = :text 
        WHERE id = :id ";
    $params = [
        ':id' => (int)$data['id'],
        ];
}
$params = [
    ':title' => $data['title'],
    ':text' => $data['text']
];
$types = [
    ':id' => PDO::PARAM_INT,
    ':title' => PDO::PARAM_STR,
    ':text' => PDO::PARAM_STR
];
dbQuery($sql, $params, $types);
