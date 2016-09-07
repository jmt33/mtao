<?php
$currentDir = __DIR__;
include $currentDir.'/../bootstrap.php';

if (!is_writeable($config['markdownPath']) || !is_writeable($config['htmlPath'])) {
    exit("Markdown以及Html目录设置为可写,方可使用.");
}

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
