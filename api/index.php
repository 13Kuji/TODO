<?php
require_once 'connect.php';

    $result = mysqli_query($connect, "SELECT * FROM task");
    while($rows = mysqli_fetch_array($result)){
        //echo $rows['id']."<br>";
        echo $rows['title']."<br>";
        echo $rows['text']."<br>";
       echo $rows['time']."<br>"."<br>";
       ?> <form action="update_view.php" method="post">
        <input type="hidden" name="id" value="<?= $rows['id'] ?>">
        <button type="submit">Update</button>
        </form>
        <form action="delete.php" method="post">
            <input type="hidden" name="id" value="<?= $rows['id'] ?>">
            <button type="submit">Delete</button>
        </form>
        <?php
       echo "--------------------------------"."<br>";
}
?>
</table>
<h3>Add new task</h3>
<form action="create.php" method="post">
    <p>Title</p>
    <input type="text" name="title">
    <p>Text</p>
    <textarea name="text"></textarea> <br> <br>
    <button type="submit">Add new product
</form>
</body>
</html>
<?php
die();





