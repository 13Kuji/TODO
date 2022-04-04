<?php
$connection = NULL;

function createConnection()
{
    $connect = new PDO("mysql:host=localhost;dbname=scheduler", "root", "");
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

    $stmt = $connection->prepare($sql);
    if (stripos('SELECT', $sql) === false || stripos('SELECT', $sql) !== false && !empty($params) && !empty($types)) {
        $stmt = bindTypedParams($stmt, $params, $types);
    }
    $stmt->execute();

    if (stripos('SELECT', $sql) !== false) {
        return $stmt->fetchAll();
    }

    return $stmt;
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
    $errorArray = new myException();
    foreach ($paramNames as $paramName) {
        if (empty($request[$paramName])) {
            $errorArray->error_empty_field($paramName);
        }
    }
    if ($errorArray->withErrors()) {
        echo $errorArray->getErrors();
        die();
    }

    return $request;
}
