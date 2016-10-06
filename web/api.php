<?php
header("Content-Type:application/json");
$dir = __DIR__;
include $dir.'/../bootstrap.php';

use Pwiki\Config;
use Pwiki\Adapter\Convert;
use Pwiki\Adapter\Source;
class Api
{
    public $pwiki = null;

    public function __construct($pwiki)
    {
        $this->pwiki = $pwiki;
    }

    public function index()
    {
        return 'index';
    }

    public function sync()
    {
        $key = !empty($_POST['time']) ? $_POST['time'] : date("YmdHis", time());
        $config = Config::instance();
        $data = $config->data;
        $title = $key."_".$_POST['category']."_".$_POST['title'];
        $htmlTitle = $key."_".$_POST['title'];

        if (!isset($data[$key])) {
            $key = !empty($_POST['time']) ? $_POST['time'] : date("YmdHis", time());
            //暂不考虑安全性，健壮性
            $params = array(
                'key' => $key,
                'title' => $_POST['title'],
                'category' => $_POST['category']
            );
            $config->data[$key] = $params;
            //新建文件
            Source::setMarkdownFile($title);
        } else {
            $oldTitle = $key."_".$data[$key]['category']."_".$data[$key]['title'];
            $oldHtmlTitle = $key."_".$data[$key]['title'];
            //剪切的过程
            Source::mvMarkdownFile($oldTitle, $title);
            //删除Html
            Source::delHtmlFile($data[$key]['category'], $oldHtmlTitle, $htmlTitle);
            $config->data[$key]['category'] = $_POST['category'];
            $config->data[$key]['title'] = $_POST['title'];
        }

        //加入Markdown内容
        Source::putMarkdownContent($title, $_POST['content']);

        // 转换文件
        $convert = new Convert($key);
        $convert->setOverFlow(true);
        $convert->run();
        return json_encode($key);
    }

    public function category()
    {
        $data = $this->pwiki->getCategory();
        return json_encode($data, true);
    }

    public function article()
    {
        $category_id = isset($_GET['category_id']) ? $_GET['category_id'] : '';
        $config = Config::instance();
        $data = $config->data;
        if (empty($category_id)) {
            $result = $data;
        } else {
            $result = array_filter($data, function($item) use($category_id) {
                if ($item['category'] == $category_id) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        return json_encode($result, true);
    }

    public function markdown()
    {
        $key = isset($_GET['key']) ? $_GET['key'] : '';
        $config = Config::instance();
        $data = $config->data;
        $content = '';
        if (!empty($key)) {
            $markdown = $config->markdownPath.$key."_".$data[$key]['category']."_".$data[$key]['title'].".md";
            $content = file_get_contents($markdown);
        }
        return json_encode(['content' => $content], true);
    }
}

$api = new Api($bootstrap);

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if (method_exists($api, $action)) {
        echo $api->$action();
    }
}
