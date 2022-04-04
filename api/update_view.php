<?php
require_once ('include.php');

$task_id = $_POST['id'];
?>
<h3>Update task</h3>
<form action = "update_action.php" method = "post">
    <input type = "hidden" name = "id" value = "<?= $task_id ?>">
    <p>Title</p>
    <input type = "text" name = "title">
    <p>Text</p>
    <textarea name = "text"></textarea> <br> <br>
    <button type = "submit">Update</button>
</form>