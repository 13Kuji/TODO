<?php

namespace app;

use PDO;

class Task
{

    public function addOrUpdateTaskByAction($taskId, $title, $text, $time, $action): void
    {
        $params = [
            'title' => $title,
            'text' => $text,
            'time' => $time
        ];
        $types = [
            'title' => PDO::PARAM_STR,
            'text' => PDO::PARAM_STR,
            'time' => PDO::PARAM_STR
        ];

        if ($action === 'add') {
            $sql = 'INSERT INTO task(title, text, time) 
            VALUES (:title, :text, :time)';
        }
        if ($action === 'update') {
            $sql = "UPDATE task SET
            title = :title,
            text = :text,
            time = :time
            WHERE id = :id ";
            $params = array_merge($params, ['id' => $taskId]);
            $types = array_merge($types, ['id' => PDO::PARAM_INT]);
        }

        dbQuery($sql, $params, $types);
    }

    public function addOrDeleteUserByAction($taskId, $users, $action): void
    {
        if ($action === 'delete') {
            $sql = "DELETE FROM user_task WHERE task_id = :task_id and user_id = :user_id";
        }

        if ($action === 'add') {
            $sql = 'INSERT INTO user_task(task_id, user_id) 
            VALUES (:task_id, :user_id)';
        }

        $types = [
            'task_id' => PDO::PARAM_INT,
            'user_id' => PDO::PARAM_INT
        ];
        foreach ($users as $userId) {
            $params = [
                'task_id' => $taskId,
                'user_id' => $userId
            ];
            dbQuery($sql, $params, $types);
        }

    }

    public function add($request): void
    {
        checkParams($request, ['data']);
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'currentUsers',
                    'title',
                    'text',
                    'execTime'
                ])
        );
        $actionTask = 'add';

        /** @var PDO $connection */
        $connection = createConnection();
        $connection->beginTransaction();

        try {
            $this->addOrUpdateTaskByAction( null, $title, $text, $execTime, $actionTask);
            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollBack();
            throw new \myException('Ошибка при создании задачи: ' . $e->getMessage(),);
        }

        global $connection;
        $lastId = $connection->lastInsertId();

        if (isset($lastId)) {
            $actionUsers = 'add';
            $this->addOrDeleteUserByAction($lastId, $currentUsers, $actionUsers);
        }
    }

    public function updateFromAdmin($request): void
    {
        checkParams($request, ['data']);
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'taskId',
                    'title',
                    'text',
                    'execTime',
                    'currentUsers',
                    'previousUsers'
                ])
        );
        $actionTask = 'update';

        /** @var PDO $connection */
        $connection = createConnection();
        $connection->beginTransaction();

        try {
            $this->addOrUpdateTaskByAction($taskId, $title, $text, $execTime, $actionTask);
            $deletedUsers = array_values(array_diff($previousUsers, $currentUsers));
            $addedUsers = array_values(array_diff($currentUsers, $previousUsers));
            if (!empty($deletedUsers[0])) {
                $actionUsers = 'delete';
                $this->addOrDeleteUserByAction($taskId, $deletedUsers, $actionUsers);
            }
            if (!empty($addedUsers[0])) {
                $actionUsers = 'add';
                $this->addOrDeleteUserByAction($taskId, $addedUsers, $actionUsers);
            }
            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollBack();
            throw new \myException('Ошибка при обновлении пользователя: ' . $e->getMessage(),);
        }
    }

    public function updateFromUser($request): void
    {
        checkParams($request, ['data']);
        $dataTask = json_decode($request['data'], true);
        extract(checkParams(
                $dataTask,
                [
                    'taskId',
                    'title',
                    'text',
                    'execTime',
                ])
        );
        $actionTask = 'update';

        /** @var PDO $connection */
        $connection = createConnection();
        $connection->beginTransaction();

        try {
            $this->addOrUpdateTaskByAction($taskId, $title, $text, $execTime, $actionTask);
            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollBack();
            throw new \myException('Ошибка при обновлении пользователя: ' . $e->getMessage(),);
        }
    }

    public function delete($request): void
    {
        $idTask = $request['id'];
        checkParams($idTask, 'id');

        /** @var PDO $connection */
        $connection = createConnection();
        $connection->beginTransaction();
        try {
            $sql = "DELETE FROM user_task WHERE task_id = :id";
            $params = ['id' => $idTask];
            $types = ['id' => PDO::PARAM_INT];
            dbQuery($sql, $params, $types);

            $sql = "DELETE FROM task WHERE id = :id";
            dbQuery($sql, $params, $types);
            $connection->commit();
        } catch (\Exception $e) {
            $connection->rollBack();
            throw new \myException('Ошибка при удалении пользователя: ' . $e->getMessage(),);
        }
    }

    public function combineUsersWithSameTask($rowsArray) : array
    {
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
        return $resultRows;
    }

    public function getAll(): void
    {
        $sql = file_get_contents(__DIR__ . '/sql/getAllTasks.sql');
        $taskRows = dbQuery($sql);
        $resultRows = $this->combineUsersWithSameTask($taskRows->fetchAll());

        echo json_encode(['success' => true, 'rows' => array_values($resultRows)]);
    }

    public function getAllForUser($request): void
    {
        $idUser = $request['id'];
        checkParams($idUser, 'id');
        $sql = file_get_contents(__DIR__ . '/sql/getUserTasks.sql');
        $params = ['id' => $idUser];
        $types = ['id' => PDO::PARAM_INT];
        $resultRows = dbQuery($sql, $params, $types)->fetchAll();
        echo json_encode(['success' => true, 'rows' => array_values($resultRows)]);
    }
}