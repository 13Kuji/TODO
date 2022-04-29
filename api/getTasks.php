<?php
require_once 'include.php';
require_once('myException.php');
require_once('taskTodo.php');

$task = new taskTodo();
$task->get($_REQUEST);
