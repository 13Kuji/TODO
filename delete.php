<?php
require_once ('connect.php');
$id = $_POST['id'];
mysqli_query($connect, "DELETE FROM task WHERE id='$id'");
header('Location: /test_project/todo/');