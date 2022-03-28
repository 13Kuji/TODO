<?php
//echo 'Если ты это видишь, то оно заработало';
//register_shutdown_function(function (){
//    var_dump(error_get_last());
//    die();
//});
$connect = mysqli_connect("localhost", "root", "",  "scheduler");
if (!$connect){
    exit (mysqli_error($connect));
}