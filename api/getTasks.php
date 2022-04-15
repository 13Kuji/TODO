<?php
require_once 'include.php';

$sql = 'SELECT * FROM task';
$rows = dbQuery($sql);
echo json_encode(['success' => true, 'rows' => $rows->fetchAll()]);