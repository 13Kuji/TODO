<?php
require_once ('connect.php');

$id = $_POST['id'];
$title = ($_POST['title'] == NULL) ? die("Нужно ввести название задачи!!!") : $_POST['title'];
$text = ($_POST['text'] == NULL) ? "Описание отсутствует" : $_POST['text'];
$stmt=$connect->prepare("UPDATE task SET title = :title ,  text = :text WHERE id = :id ");
$stmt->bindParam(':title', $title);
$stmt->bindParam(':text', $text);
$stmt->bindParam(':id', $id);
$stmt->execute();
header('Location: /test_project/todo/api');
