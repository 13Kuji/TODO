<?php
class myException extends Exception
{
    private array $exceptions = [];

    public function errorEmptyField($fieldName){
        $this->exceptions[] = 'Отсутствует обязательный параметр ' . "\"$fieldName\"" . '!<br>';
    }

    public function withErrors() {
        return !empty($this->exceptions);
    }

    public function getErrors() {
        return implode(PHP_EOL, $this->exceptions);
    }
}