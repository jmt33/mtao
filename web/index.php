<?php
$currentDir = __DIR__;

if (isset($_SERVER['REQUEST_URI'])) {
    $uri = explode("/", $_SERVER['REQUEST_URI']);
    if ($_SERVER['REQUEST_URI'] === '/') {
        require $currentDir.'/view.php';
    } else if (isset($uri[1]) && $uri[1] === 'api'){
        require $currentDir.'/api.php';
        header("Content-Type:application/json");

        if (isset($uri[2])) {
            $action = $uri[2];
            $api = new Api();
            if (method_exists($api, $action)) {
                echo $api->$action();
            } else {
                echo "不是正确的Api";
            }
        } else {
            echo "不是正确的Api";
        }
    }
}
