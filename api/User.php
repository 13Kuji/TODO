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
            ':name' => $name,
            ':password' => $password,
        ];
        $types = [
            ':name' => PDO::PARAM_STR,
            ':password' => PDO::PARAM_STR,
        ];
        dbQuery($sql, $params, $types);
    }

    public function delete($request)
    {
        $idUser = $request['id'];
        checkParams($idUser, [0]);
        $sql = "DELETE FROM user WHERE id = :id";
        $params = [':id' => $idUser];
        $types = [':id' => PDO::PARAM_INT];
        dbQuery($sql, $params, $types);
    }

    public function get($request)
    {
        $sql = 'SELECT name, password FROM user';
        $rowsTask = dbQuery($sql);
        echo json_encode(['success' => true, 'rows' => $rowsTask->fetchAll()]);
    }

    public function update($request)
    {
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'title',
                    'text',
                    'execTime'
                ])
        );

        $sql = "UPDATE task SET
            title = :title,
            text = :text,
            time = :time
        WHERE id = :id ";
        $params = [
            ':id' => $id,
            ':title' => $title,
            ':text' => $text,
            ':time' => $execTime
        ];
        $types = [
            ':id' => PDO::PARAM_INT,
            ':title' => PDO::PARAM_STR,
            ':text' => PDO::PARAM_STR,
            ':time' => PDO::PARAM_STR
        ];
        dbQuery($sql, $params, $types);
    }
}