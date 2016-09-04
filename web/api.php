<?php
header("Content-Type:application/json");
$dir = __DIR__;
include $dir.'/../bootstrap.php';

use Pwiki\Adapter\FileData;
use Pwiki\Adapter\Convert;
use Pwiki\Adapter\Markdown;
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
        $key = date("YmdHis", time());
        if (isset($_POST['time']) && $_POST['time']) {
            $key = $_POST['time'];
        }

        $data = FileData::getData();

        if (!isset($data[$key])) {
            $key = date("YmdHis", time());
            //暂不考虑安全性，健壮性
            $params = array(
                'key' => $key,
                'title' => $_POST['title'],
                'category' => $_POST['category']
            );

            $data[$key] = $params;

            //新建文件
            FileData::setData($params);
            Markdown::setFile($key."_".$_POST['title']);
        }

        // 转换文件
        $convert = new Convert($key);
        $convert->setData($data);
        $convert->setOverFlow(false);
        $convert->run();
        return json_encode($key);
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
