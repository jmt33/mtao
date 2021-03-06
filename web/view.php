<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Markdown Previewer</title>
        <link rel="stylesheet" href="public/bootstrap/css/bootstrap.min.css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="public/style/main.css" media="screen" title="no title" charset="utf-8">
    </head>
    <body>
        <script type="text/javascript">
        var pubsub = {};
        (function (q) {

            var topics = {}, // 回调函数存放的数组
                subUid = -1;
            // 发布方法
            q.publish = function (topic, args) {

                if (!topics[topic]) {
                    return false;
                }

                setTimeout(function () {
                    var subscribers = topics[topic],
                        len = subscribers ? subscribers.length : 0;

                    while (len--) {
                        subscribers[len].func(topic, args);
                    }
                }, 0);

                return true;

            };
            //订阅方法
            q.subscribe = function (topic, func) {

                if (!topics[topic]) {
                    topics[topic] = [];
                }

                var token = (++subUid).toString();
                topics[topic].push({
                    token: token,
                    func: func
                });
                return token;
            };
            //退订方法
            q.unsubscribe = function (token) {
                for (var m in topics) {
                    if (topics[m]) {
                        for (var i = 0, j = topics[m].length; i < j; i++) {
                            if (topics[m][i].token === token) {
                                topics[m].splice(i, 1);
                                return token;
                            }
                        }
                    }
                }
                return false;
            };
        } (pubsub));
        </script>
        <script src = "public/js/jquery.js" type="text/javascript"></script>
        <script src = "public/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src = "public/js/react-15.1.0.min.js" type="text/javascript"></script>
        <script src = "public/js/react-dom-15.1.0.min.js" type="text/javascript"></script>
        <script src = "public/js/showdown.min.js" type="text/javascript"></script>
        <script src = "public/js/main.js" type="text/javascript"></script>
    </body>
</html>
