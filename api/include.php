<?php

$connection = NULL;

function createConnection()
{
    $connect = new PDO("mysql:host=localhost;dbname=scheduler","root", "");
    if (!$connect) {
        exit (PDO::errorInfo());
    }

    return $connect;
}

function dbQuery($sql, $params = [], $types = [])
{
    global $connection;
    if (!$connection) {
        $connection = createConnection();
    }

    $statement = $connection->prepare($sql);
    if (stripos('SELECT', $sql) === false || stripos('SELECT', $sql) !== false && !empty($params) && !empty($types)) {
        $statement = bindTypedParams($statement, $params, $types);
    }
    $statement->execute();

    if (stripos('SELECT', $sql) !== false) {
        return $statement->fetchAll();
    }

    return $statement;
}

function bindTypedParams($stmt, $params, $types)
{
    foreach ($params as $name => &$value) {
        $stmt->bindParam($name, $value, $types[$name]);
    }

    return $stmt;
}

function checkParams($request, $paramNames)
{
    $errors = new myException();

    foreach ($paramNames as $paramName) {
        if (empty($request[$paramName])) {
            $errors->errorEmptyField($paramName);
        }
    }
    if ($errors->withErrors()) {
        echo $errors->getErrors();
        die();
    }

    return $request;
}
