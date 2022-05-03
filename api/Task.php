<?php


namespace app;

use PDO;

class Task
{
    public function add($request): void
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
        $sql = "INSERT INTO task(title, text, time) 
            VALUES (:title, :text, :time)";
        $params = [
            ':title' => $title,
            ':text' => $text,
            ':time' => $execTime
        ];
        $types = [
            ':title' => PDO::PARAM_STR,
            ':text' => PDO::PARAM_STR,
            ':time' => PDO::PARAM_STR
        ];
        dbQuery($sql, $params, $types);
    }

    public function delete($request)
    {
        $idTask = $request['id'];
        checkParams($idTask, [0]);
        $sql = "DELETE FROM task WHERE id = :id";
        $params = [':id' => $idTask];
        $types = [':id' => PDO::PARAM_INT];
        dbQuery($sql, $params, $types);
    }

    public function get($request)
    {
        $sql = 'SELECT id, title, text, DATE_FORMAT(time, "%m.%d.%Y %H:%i") as execTime  FROM task';
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