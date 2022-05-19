<?php


namespace app;

use PDO;

class User
{
    public function add($request): void
    {
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'name',
                    'password'
                ])
        );
        $sql = "INSERT INTO user(name, password) 
            VALUES (:name, :password)";
        $params = [
            'name' => $name,
            'password' => $password,
        ];
        $types = [
            'name' => PDO::PARAM_STR,
            'password' => PDO::PARAM_STR,
        ];
        dbQuery($sql, $params, $types);
    }

    public function get($request): void
    {
        $sql = 'SELECT id, name, password FROM user';
        $rowsTask = dbQuery($sql);
        echo json_encode(['success' => true, 'rows' => $rowsTask->fetchAll()]);
    }


}