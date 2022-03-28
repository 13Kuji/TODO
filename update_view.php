<?php
require_once ('connect.php');
$task_id = $_POST['id'];
$task = mysqli_query($connect, "SELECT * FROM task WHERE id='$task_id'");
$task = mysqli_fetch_assoc($task);
?>
<h3>Update task</h3>
<form action="update1.php" method="post">
    <input type="hidden" name="id" value="<?= $task['id'] ?>">
    <p>Title</p>
    <input type="text" name="title">
    <p>Text</p>
    <textarea name="text"></textarea> <br> <br>
    <button type="submit">Update</button>
</form>
</body>
</html>