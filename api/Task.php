<?php


namespace app;

use PDO;

class Task
{
    public function add($request): void
    {
        register_shutdown_function(function () {
            var_dump(error_get_last());
            die();
        });
        checkParams($request, 'data');
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'currentUser',
                    'title',
                    'text',
                    'execTime'
                ])
        );
        $sql = 'INSERT INTO task(title, text, time) 
            VALUES (:title, :text, :time)';
        $params = [
            'title' => $title,
            'text' => $text,
            'time' => $execTime
        ];
        $types = [
            'title' => PDO::PARAM_STR,
            'text' => PDO::PARAM_STR,
            'time' => PDO::PARAM_STR
        ];
        dbQuery($sql, $params, $types);
        global $connection;
        $lastId = $connection->lastInsertId();
        foreach ($currentUser as $currentUserId) {
            $sql = 'INSERT INTO user_task(task_id, user_id) 
            VALUES (:task_id, :user_id)';
            $addParams = [
                'task_id' => $lastId,
                'user_id' => $currentUserId,
            ];
            var_dump($currentUserId);
            $addTypes = [
                'task_id' => PDO::PARAM_INT,
                'user_id' => PDO::PARAM_INT,
            ];
            dbQuery($sql, $addParams, $addTypes);
        }

    }
    public function update($request): void
    {
        checkParams($request, 'data');
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'taskId',
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
            'id' => $taskId,
            'title' => $title,
            'text' => $text,
            'time' => $execTime
        ];
        $types = [
            'id' => PDO::PARAM_INT,
            'title' => PDO::PARAM_STR,
            'text' => PDO::PARAM_STR,
            'time' => PDO::PARAM_STR
        ];
        dbQuery($sql, $params, $types);
        extract(checkParams(
                $dataTask,
                [
                    'currentUser',
                    'previousUser',
                ])
        );
        $deletedUsers = array_values(array_diff($previousUser, $currentUser));
        $addedUsers = array_values(array_diff($currentUser, $previousUser));
        if ($deletedUsers[0] != null) {
            foreach ($deletedUsers as $idDeletedUser) {
                $sql = "DELETE FROM user_task WHERE task_id = :task_id and user_id = :user_id";
                $delParams = [
                    'task_id' => $taskId,
                    'user_id' => $idDeletedUser
                ];
                $delTypes = [
                    'task_id' => PDO::PARAM_INT,
                    'user_id' => PDO::PARAM_INT
                ];
                dbQuery($sql, $delParams, $delTypes);
            }
        }
        if ($addedUsers[0] != null) {
            foreach ($addedUsers as $idNewUser) {
                $sql = 'INSERT INTO user_task(task_id, user_id) 
            VALUES (:task_id, :user_id)';
                $addParams = [
                    'task_id' => $taskId,
                    'user_id' => $idNewUser
                ];
                $addTypes = [
                    'task_id' => PDO::PARAM_INT,
                    'user_id' => PDO::PARAM_INT
                ];
                dbQuery($sql, $addParams, $addTypes);
            }
        }
    }
    public function delete($request): void
    {
        $idTask = $request['id'];
        checkParams($idTask,'id');
        $sql = "DELETE FROM user_task WHERE task_id = :id";
        $params = ['id' => $idTask];
        $types = ['id' => PDO::PARAM_INT];
        dbQuery($sql, $params, $types);
        $sql = "DELETE FROM task WHERE id = :id";
        dbQuery($sql, $params, $types);
    }

    public function get($request): void
    {
        $idUser = $request['id'];
        checkParams($idUser,'id');
        if ($idUser == 1){
            $sql = 'SELECT user.id AS userId, name, task.id AS taskId, title, text, task.time FROM user
            JOIN user_task ON user.id = user_task.user_id
            JOIN task ON user_task.task_id = task.id';
            $taskRows = dbQuery($sql);

            $rowsArray = $taskRows->fetchAll();
            $resultRows = [];
            $countRowArray = count($rowsArray) - 1;
            $checkedTaskIds = [];
            for ($i = 0; $i <= $countRowArray; $i++) {
                if (in_array($rowsArray[$i]['taskId'], $checkedTaskIds)) {
                    continue;
                }
                $resultRows[$i]['userIds'] = [$rowsArray[$i]['userId']];
                $resultRows[$i]['name'] = $rowsArray[$i]['name'];
                $resultRows[$i]['taskId'] = $rowsArray[$i]['taskId'];
                $resultRows[$i]['title'] = $rowsArray[$i]['title'];
                $resultRows[$i]['text'] = $rowsArray[$i]['text'];
                $resultRows[$i]['time'] = $rowsArray[$i]['time'];
                if ($i !== $countRowArray) {
                    for ($j = $i + 1; $j <= $countRowArray; $j++) {
                        if ($rowsArray[$i]['taskId'] === $rowsArray[$j]['taskId']) {
                            $resultRows[$i]['name'] = $resultRows[$i]['name'] . ', ' . $rowsArray[$j]['name'];
                            $resultRows[$i]['userIds'][] = $rowsArray[$j]['userId'];
                        }
                    }
                }
                $checkedTaskIds[] = $rowsArray[$i]['taskId'];
            }
        }
        else {
            $sql = 'SELECT task.id AS taskId, task.title, task.text, DATE_FORMAT(time, "%m.%d.%Y %H:%i") as time  
                FROM task 
                JOIN user_task ON task.id = user_task.task_id
                JOIN user ON user_task.user_id = user.id
                WHERE user.id = :id';
            $params = ['id' => $idUser];
            $types = ['id' => PDO::PARAM_INT];
            $resultRows = dbQuery($sql, $params, $types)->fetchAll();
        }
        echo json_encode(['success' => true, 'rows' => array_values($resultRows)]);
    }
}