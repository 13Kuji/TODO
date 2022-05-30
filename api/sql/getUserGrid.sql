SELECT task.id AS taskId, task.title, task.text, DATE_FORMAT(time, "%m.%d.%Y %H:%i") as time
FROM task
    JOIN user_task ON task.id = user_task.task_id
    JOIN user ON user_task.user_id = user.id
WHERE user.id = :id