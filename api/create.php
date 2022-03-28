<?php
require_once ('connect.php');
$title = $_POST['title'];
$text = $_POST['text'];
mysqli_query($connect, "INSERT INTO task (title, text) VALUES ('$title', '$text')");
header('Location: /test_project/todo/api');
die();