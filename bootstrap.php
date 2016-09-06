<?php

$dir = __DIR__;
include_once $dir."/vendor/autoload.php";

$bootstrap = new \Pwiki\Bootstrap();
$commentPlugin = "<div id=\"uyan_frame\"></div><script type=\"text/javascript\" src=\"http://v2.uyan.cc/code/uyan.js?uid=2101665\"></script>";

$dataFun = function($dir) {
    $folder = $dir.'/Markdown/';
    $files = scandir($folder);
    $data = [];
    foreach ($files as $file) {
        if($file === '.' || $file === '..'){
           continue;
        }
        list($time, $category, $title) = explode('_', $file);
        if ($time && $category && $title) {
            $data[$time] = [
                'key' => $time,
                'category' => $category,
                'title' => str_replace('.md', '', $title)
            ];
        }
    }
    return $data;
};


$bootstrap->setConfig(
    [
        'pageInfo' => [
            'title' => 'Mtao Blog',
            'keywords' => '',
            'description' => ''
        ],
        'markdownPath' => $dir.'/Markdown/',
        'htmlPath' => $dir.'/Html/',
        'htmlIndexFile' => $dir.'/index.html',
        'data' => $dataFun($dir),
        'commentPlugin' => $commentPlugin
    ]
);
