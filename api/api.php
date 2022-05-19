<?php


require_once('include.php');
require_once('myException.php');


extract(checkParams(
        $_REQUEST,
        [
            'act',
            'method'
        ])
);

require_once($act . '.php');
$act = 'app\\' . $act;
$act = new $act();
$act->$method($_REQUEST);