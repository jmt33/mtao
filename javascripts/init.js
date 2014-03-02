
(function(){
var records = {
    2013: {
        1: [
            {
                href: '/document/1-1.html',
                tag: '生活',
                title: '热血人生'
            },
            {
                href: 'document/1-20.html',
                tag: 'PHP',
                title: 'ubuntu 安装xhprof'
            }
        ],
        2: [
            {
                href: 'document/2-21.html',
                title: '重新练习了一下PHP数组',
                tag: 'PHP'
            }
        ],
        7: [
            {
                href: 'document/7-15.html',
                title: 'javascript 对象模型详解',
                tag: 'javascript'
            },
            {
                href: 'demo/service-chooser-app.tar.gz',
                title: 'Backbone Demo',
                tag: 'javascript'
            }
        ]
    },
    2014: {
        1: [
            {
                href: 'document/2014/1-23.html',
                title: 'javascript 简单模板引擎',
                tag: 'javascript'
            }
        ],
        2: [
            {
                href: 'https://github.com/jmt33/repo/tree/gh-pages/demo/backbone-demo1',
                title: 'backbone another demo',
                tag: 'javascript'
            }
        ],
        3: [
            {
                href: '',
                title: '几种常用的PHP设计模式',
                tag: 'PHP'
            },
            {
              href: 'https://github.com/jmt33/repo/demo/python/topit_me_dot.py',
              title: 'python 采集topit.me 脚本',
              tag: 'python'
            }
        ]
    },

};

var message = [
            '单曲循环，其实听的是自己的心情',
        　　
        　　'寂寞是听见某个熟悉名字，不小心想起某些故事；孤独是路过我身边的影子，笑着对我说似曾相识。',
        　　
        　　'如果你是单身，请你不羡慕那些天天粘在一起的小情侣，也不要妒忌那些在寒风中可以拥抱在一起紧握双手的两个人。你也不会想承受他们可能因为分歧因为距离，偶尔闹起的小脾气，那些吵架伤人分手的话，会影响到你的美好情绪。你现在能做的只是打理好生活，冷了穿好衣服，努力学习充实好自己，以最好的姿态期待他的出现。',
        　　　'哪里会有人喜欢孤独，只是不喜欢失望。',
        　　
        　　　'你是否经常狠不下心来做事，对自己不够狠，对别人也不够狠。所以，你总是黏黏糊糊，总是不忍心去拒绝别人，总是下不了决心让自己过的更好，总是缠绵过往不能自拔……完了，优柔寡断的你，必须狠一次，否则你永远也活不出自己。',
        　　'优等的心，不必华丽，但必须坚固。',
        　　
        　　'如果你想任性，那就先学会承受，能承受后果才可以任性。如果你想独立，那就先学会坚强，能忍住伤痛，才可以独立。如果你想放肆的爱，那就先学会遗忘，忘掉失恋痛楚，才可以大胆爱。你可以去做一切事情，但前提是不会为结果伤悲。一个人真正的强大，并非看他能做什么，而是看他能承担什么。',
        　　'有棱有角的害处是，别人啃起你来十分方便。',
        　　
        　　'我可以在，很痛的时候说没关系。我可以在，难过的时候说无所谓。我可以在，寂寞的时候哈哈大笑。我可以在，绝望的时候说世界依然美好。我只是希望在，我开始抱怨上天吝啬的时候，有个人可以对我说，别太在意，我心疼你。',
        　　'有时候，选择与某人保持距离，不是因为不在乎，而是因为清楚的知道，他不属于你。',
        　　
        　　'心存感激地生活吧。我们来自偶然，生命是最宝贵的礼物。爱你所爱的人，温柔地对待一切，不要因不幸而怨恨和悲戚。无论前途怎样凶险，都要微笑着站定，因为有爱，我们不该恐惧。',
        　　'如果他总在为别人撑伞，你又何苦非为他等在雨中。',
        　　
        　　'生活不是用来妥协的，你退缩得越多，能让你喘息的空间就越有限；日子不是用来将就的，你表现得越卑微，一些幸福的东西就会离你越远。无须把自己摆得太低，属于自己的，都要积极地争取；不必一而再的容忍，不能让别人践踏你的底线。只有挺直了腰板，世界给你回馈才会多点。',
        　　
        　　'尝尽人间百味，还是清淡最美；看过人生繁华，还是平淡最真。生活可以很复杂，也可以很简单，关键在于我们用什么样的心态去看待它。平淡并不可怕，可怕的是带着面具，活在虚荣的梦幻里。活得真实点，活得简单些，对就对了，错就错了，爱就爱了，恨就恨了，笑就笑了，哭就哭了，不虚伪，不做作。',
        　　'人生就是这样，处同样的位置，有人哭，有人笑，有人沉默。',
        　　
        　　'你或许不知道，碰到你以前，天空对于我，是一抹色彩，遇见你以后，它是一种心情；你或许不知道，你没出现时，生活是一套流程，波澜不惊索然寡味，当你到来时，它是一池春水，碧波荡漾妙趣横生；你或许不知道，没有你的舞台，我是心灵的独行者，无缘精彩与高潮；有了你当主角，属于我的戏剧亦流光溢彩。',　　
        　　'世界的模样，取决于你凝视它的目光。',
        　　
        　　'可不可以和我约定，就算忙碌，就算焦虑，也要在空闲之余说一声我想你；就算疲惫，就算郁闷，也要在临睡的时候道一声晚安；就算生气，就算吵架，也要在第二天阳光依稀的早晨眯眼微笑；就算无趣，就算平淡，也要在黄昏的街道上坚定地握着彼此的手。我们约定，一辈子就已足够。',
        　　'一个人，尤其是一个女人，在为另一个人等待的那刻起，她已不再真正年轻，人生开始了它的苍老。',
        　　
        　　'若此生，得不到，护不了，吾宁愿此生孤独到老。'

        ];

        var title= document.textdata = document.title = message[Math.round(Math.random()*21) - 1];
        document.getElementById('project_tagline').innerHTML = title;

        function pageview(data)
        {
            this.data = {};
            if (data) {
                this.data = data;
            }
        }


        pageview.prototype.content = function()
        {
            var data = this.data;
            var html = '';
            if (data) {
                for (var i in data) {
                    html = html + '<h3 id="' + i + '">' + i + '年</h3>';
                    for (var y in data[i]) {
                        html = html + '<div class="month">'
                        html = html + '<h4>' + y +'</h4>';
                        html = html + '<p>';
                        html = html + '<ul>';
                        var record = data[i][y];
                        for (var list in record) {
                            html = html + '<li>[' + record[list].tag + '] <a href="' + record[list].href + '">' + record[list].title + '</a></li>';
                        }
                        html = html + '</p>';
                        html = html + '</ul>';
                        html = html + '</div>';
                    }
                    html = html + '<div class="clear"></div>';
                }
            }
            return html;
        }

        pageview.prototype.nav = function()
        {
            var data = this.data;
            var nav = '';
            for (var i in data) {
                nav = nav + '<a href="#' + i + '">' + i + '</a>';
            }
            return nav;
        }

       var pageview = new pageview(records)
       var content = pageview.content();
       var nav = pageview.nav();
       console.log(nav);
       //菜单渲染
       document.getElementById('nav').innerHTML = nav;

       //内容渲染
       document.getElementById('main_content').innerHTML = content;
})();
