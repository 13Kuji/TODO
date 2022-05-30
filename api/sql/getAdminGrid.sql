SELECT user.id AS userId, name, task.id AS taskId, title, text, task.time FROM user
            JOIN user_task ON user.id = user_task.user_id
            JOIN task ON user_task.task_id = task.id