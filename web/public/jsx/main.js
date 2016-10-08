class Header extends React.Component {
    render() {
        var _this = this;
        return (
            <header>
                <nav>
                    <ul className="nav navbar-top-links">
                        <Category callback={function(time) {
                            _this.setState({time: time});
                        }}/>
                        <li><button type="button" onClick = {this.handleSync.bind(this)} className="btn btn-success">同步</button></li>
                        <li><button type="button" onClick = {this.handleClear.bind(this)} className="btn btn-warning">清空</button></li>
                        <li><input type="hidden" id="time" value={this.state != null ? this.state.time : ''}/></li>
                    </ul>
                </nav>
            </header>
        );
    }

    handleClear(event) {
        //暂使用比较low的方式
        $('#markdown').empty();
        $('#htmlArea div').empty();
    }

    handleSync(event) {
        var title = $('#htmlArea').find('h1').eq(0).text(),
            _this = this,
            data;
        if (title != '') {
            data = {
                title: title,
                time: $('#time').val(),
                category: $('#category').val(),
                content: $('#markdown').val()
            };
            if (this.state && this.state.time) {
                data.time = this.state.time;
            }
            $.post('/api.php?action=sync', data, function(data) {
                _this.setState({key: data});
            });
        } else {
            alert('请输入正确格式的文档');
        }
    }
}

class Category extends React.Component {
    constructor() {
        super();
        this.state = {
            category_id: '随笔',
            article: []
        };
    }
    componentWillMount() {
        var _this = this;
        $.ajax({
            url: '/api.php?action=category',
            datatype: "json",
            async: false,
            type: 'get',
            success: function (data) {
                _this.setState({value : data});
            }
        });

        this.fetchArticle(this.state.category_id);
    }

    handleChange(event) {
        this.fetchArticle(event.target.value);
    }

    articleChange(event) {
        let value = event.target.value,
            _this = this;
        if (value != 0) {
            $.get('/api.php?action=markdown&key=' + value, function(data) {
                $('#markdown').val(data.content);
                _this.props.callback(value);
                var convert  = new showdown.Converter();
                pubsub.publish('articlechange', data.content);
            });
        }
    }

    fetchArticle(category_id) {
        var _this = this;
        $.ajax({
            url: '/api.php?action=article&category_id=' + category_id,
            datatype: "json",
            async: false,
            type: 'get',
            success: function (data) {
                let items = [];
                items.push(<option value='0'>新增</option>);
                for (var i of  Object.keys(data)) {
                    items.push(<option value={i}>{data[i]['title']}</option>);
                }
                _this.setState({article : items});
            }
        });
    }

    render() {
        var _this = this;
        return (
            <li>
                <li>
                    <select id="category" onChange={_this.handleChange.bind(_this)} className="form-control">
                        {
                            _this.state.value.map(function(option, i) {
                                return <option value={option}>{option}</option>;
                            })
                        }
                    </select>
                </li>

                <li>
                    <select id="article" onChange={_this.articleChange.bind(_this)} className='form-control'>
                        {_this.state.article}
                    </select>
                </li>
            </li>
       );
    }
}

class Markdown extends React.Component {
    constructor() {
        super();
        this.state = {
            converter: new showdown.Converter(),
            value: `Hello, World!\n===\n---\n# Write `,
        };
    }
    componentDidMount() {
        var _this = this;
       // 订阅ScoreItem的删除事件
       pubsub.subscribe('articlechange', function(topics, content){
           _this.setState({value: content})
       });
    }

    change(topics, content) {
        this.setState({ value: content });
    }

    createMarkup() {
        return {
            __html: this.state.converter.makeHtml(this.state.value)
        };
    }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
        <div className='row'>
            <div className ="markdown-write">
                <textarea type='text' defaultValue={this.state.value} onChange={this.handleChange.bind(this)} id='markdown' className='col-xs-12 full-height'></textarea>
            </div>
            <div className='markdown-previewer'>
                <div id='htmlArea' className='col-xs-12 full-height'>
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </div>
            </div>
        </div>
    );
  }
}

class Footer extends React.Component {
    render() {
        return (
            <footer className='col-xs-8 col-xs-offset-2'>
                <hr />
                <p className='text-center'>
                    Markdown Previewer created by <a href='http://jmt33.github.com/mtao' target='_blank' className='text-warning'>Mtao</a>
                </p>
            </footer>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <Header time='2016'/>
                <Markdown/>
                <Footer/>
            </div>
        );
    }
}

const div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);
ReactDOM.render(<App/>, document.getElementById('app'));
