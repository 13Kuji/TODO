<?php
class myException extends Exception
{
    private array $exceptions = [];

    public function error_empty_field($fieldName){
        $this->exceptions[] = 'пустое поле ' . "\"$fieldName\"" . '!<br>';
    }

    public function withErrors() {
        return !empty($this->exceptions);
    }

    public function getErrors() {
        return implode(PHP_EOL, $this->exceptions);
    }
}