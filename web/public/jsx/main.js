class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <ul className="nav navbar-top-links">
                        <li><button type="button" onClick = {this.handleSync.bind(this)} className="btn btn-success">同步</button></li>
                        <li><button type="button" onClick = {this.handleClear.bind(this)} className="btn btn-warning">清空</button></li>
                        <li><Category/></li>
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
                _this.setState({time: data});
            });
        } else {
            alert('请输入正确格式的文档');
        }
    }
}

class Category extends React.Component {
    componentWillMount() {
        var _this = this;
        $.ajax({
            url: '/api.php?action=category',
            datatype: "json",
            async: false,
            type: 'get',
            success: function (data) {   //成功后回调
                _this.setState({value : data});
            }
        });
    }
    render() {
        var _this = this;
        return (
            <select id="category" className="form-control">
                {
                    _this.state.value.map(function(option, i) {
                        return <option value={option}>{option}</option>;
                    })
                }
            </select>
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
                <Header/>
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
