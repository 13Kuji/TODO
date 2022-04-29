<?php
register_shutdown_function(function (){
    var_dump(error_get_last());
    die();
});
require_once('include.php');
require_once('myException.php');
require_once('taskTodo.php');

$task = new taskTodo();
$task->update($_REQUEST);
