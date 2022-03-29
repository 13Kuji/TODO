<?php
$connect = new PDO("mysql:host=localhost;dbname=scheduler", "root", "");
if (!$connect){
    exit (PDO::errorInfo());
}