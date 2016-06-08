<?php
$dir = __DIR__;
include_once $dir."/../vendor/autoload.php";

$bootstrap = new \Pwiki\Bootstrap();
$commentPlugin = "<div id=\"uyan_frame\"></div><script type=\"text/javascript\" src=\"http://v2.uyan.cc/code/uyan.js?uid=2101665\"></script>";
$bootstrap->setConfig(
    [
        'pageInfo' => [
            'title' => 'Mtao Blog',
            'keywords' => '',
            'description' => ''
        ],
        'markdownPath' => $dir.'/../markdown/',
        'htmlPath' => $dir.'/../html/',
        'htmlIndexFile' => $dir.'/../index.html',
        'databaseFile' => $dir.'/../.log.json',
        'commentPlugin' => $commentPlugin
    ]
);
$bootstrap->run();
