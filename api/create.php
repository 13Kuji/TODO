<?php
require_once ('connect.php');

class create_exception extends Exception { }
function error_create(){
    throw new create_exception('Укажите название задачи!');
}
try {
    $title = (empty($_POST['title'])) ? error_create() : $_POST['title'];
    $text = (empty($_POST['text'])) ? "Описание отсутсвует" : $_POST['text'];
} catch (create_exception $e) {
    echo 'Ошибка выполнения: ', $e->getMessage();
}
$stmt = $connect->prepare("INSERT INTO task(title, text) VALUES (:title, :text)");
$stmt->bindParam(':title', $title);
$stmt->bindParam(':text', $text);
$stmt->execute();
header('Location: /test_project/todo/api');
