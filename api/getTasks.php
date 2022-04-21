<?php
require_once 'include.php';

$sql = 'SELECT * FROM task';
$rowsTask = dbQuery($sql);
echo json_encode(['success' => true, 'rows' => $rowsTask->fetchAll()]);