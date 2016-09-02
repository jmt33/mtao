<?php
header("Content-Type:application/json");
$dir = __DIR__;
include $dir.'/../bootstrap.php';

class Api
{
    public $pwiki = null;

    public function __construct($pwiki)
    {
        $this->pwiki = $pwiki;
    }

    public function index()
    {
        return 'gogo';
    }

    public function sync()
    {
        print_r($_POST);
    }

    public function category()
    {
        $data = $this->pwiki->getCategory();
        return json_encode($data, true);
    }
}

$api = new Api($bootstrap);

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if (method_exists($api, $action)) {
        echo $api->$action();
    }
}
