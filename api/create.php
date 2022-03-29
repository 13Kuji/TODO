<?php
require_once ('connect.php');

$title = ($_POST['title'] == NULL) ? die("Нужно ввести название задачи!!!") : $_POST['title'];
$text = ($_POST['text'] == NULL) ? "Описание отсутствует" : $_POST['text'];
$stmt = $connect->prepare("INSERT INTO task(title, text) VALUES (:title, :text)");
$stmt->bindParam(':title', $title);
$stmt->bindParam(':text', $text);
$stmt->execute();
header('Location: /test_project/todo/api');
