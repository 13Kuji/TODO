<?php
register_shutdown_function(function (){
    var_dump(error_get_last());
    die();
});
require_once ('connect.php');
$id = $_POST['id'];
$title = $_POST['title'];
$text = $_POST['text'];
mysqli_query($connect, "UPDATE task SET title = '$title' ,  text = '$text' WHERE id = '$id'");
header('Location: /test_project/todo/');