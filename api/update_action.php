<?php
require_once ('connect.php');
class update_exception extends Exception { }
function error_update(){
    throw new update_exception('Укажите название задачи!');
}
$id = $_POST['id'];
try{
    $title = (empty($_POST['title'])) ? error_update() : $_POST['title'];
    $text = (empty($_POST['text'])) ? "Описание отсутствует" : $_POST['text'];
} catch (update_exception $e) {
    echo 'Ошибка выполнения: ', $e->getMessage();
}
$stmt=$connect->prepare("UPDATE task SET title = :title ,  text = :text WHERE id = :id ");
$stmt->bindParam(':title', $title);
$stmt->bindParam(':text', $text);
$stmt->bindParam(':id', $id);
$stmt->execute();
header('Location: /test_project/todo/api');
