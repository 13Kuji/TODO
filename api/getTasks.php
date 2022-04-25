<?php
require_once 'include.php';

$sql = 'SELECT id, title, text, DATE_FORMAT(time, "%m.%d.%Y %H:%i") as execTime  FROM task';
$rowsTask = dbQuery($sql);
echo json_encode(['success' => true, 'rows' => $rowsTask->fetchAll()]);