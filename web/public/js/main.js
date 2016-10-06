/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_React$Component) {
	    _inherits(Header, _React$Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	    }

	    _createClass(Header, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "header",
	                null,
	                React.createElement(
	                    "nav",
	                    null,
	                    React.createElement(
	                        "ul",
	                        { className: "nav navbar-top-links" },
	                        React.createElement(Category, null),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "button",
	                                { type: "button", onClick: this.handleSync.bind(this), className: "btn btn-success" },
	                                "同步"
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "button",
	                                { type: "button", onClick: this.handleClear.bind(this), className: "btn btn-warning" },
	                                "清空"
	                            )
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement("input", { type: "hidden", id: "time", value: this.state != null ? this.state.time : '' })
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: "handleClear",
	        value: function handleClear(event) {
	            //暂使用比较low的方式
	            $('#markdown').empty();
	            $('#htmlArea div').empty();
	        }
	    }, {
	        key: "handleSync",
	        value: function handleSync(event) {
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
	                $.post('/api.php?action=sync', data, function (data) {
	                    _this.setState({ time: data });
	                });
	            } else {
	                alert('请输入正确格式的文档');
	            }
	        }
	    }]);

	    return Header;
	}(React.Component);

	var Category = function (_React$Component2) {
	    _inherits(Category, _React$Component2);

	    function Category() {
	        _classCallCheck(this, Category);

	        var _this3 = _possibleConstructorReturn(this, (Category.__proto__ || Object.getPrototypeOf(Category)).call(this));

	        _this3.state = {
	            category_id: '随笔',
	            article: []
	        };
	        return _this3;
	    }

	    _createClass(Category, [{
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            var _this = this;
	            $.ajax({
	                url: '/api.php?action=category',
	                datatype: "json",
	                async: false,
	                type: 'get',
	                success: function success(data) {
	                    _this.setState({ value: data });
	                }
	            });

	            this.fetchArticle(this.state.category_id);
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(event) {
	            this.fetchArticle(event.target.value);
	        }
	    }, {
	        key: "articleChange",
	        value: function articleChange(event) {
	            var value = event.target.value;
	            if (value != 0) {
	                $.get('/api.php?action=markdown&key=' + value, function (data) {
	                    $('#markdown').val(data.content);
	                    var convert = new showdown.Converter();
	                    $('#htmlArea').html(convert.makeHtml(data.content));
	                });
	            }
	        }
	    }, {
	        key: "fetchArticle",
	        value: function fetchArticle(category_id) {
	            var _this = this;
	            $.ajax({
	                url: '/api.php?action=article&category_id=' + category_id,
	                datatype: "json",
	                async: false,
	                type: 'get',
	                success: function success(data) {
	                    var items = [];
	                    items.push(React.createElement(
	                        "option",
	                        { value: "0" },
	                        "新增"
	                    ));
	                    var _iteratorNormalCompletion = true;
	                    var _didIteratorError = false;
	                    var _iteratorError = undefined;

	                    try {
	                        for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                            var i = _step.value;

	                            items.push(React.createElement(
	                                "option",
	                                { value: i },
	                                data[i]['title']
	                            ));
	                        }
	                    } catch (err) {
	                        _didIteratorError = true;
	                        _iteratorError = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion && _iterator.return) {
	                                _iterator.return();
	                            }
	                        } finally {
	                            if (_didIteratorError) {
	                                throw _iteratorError;
	                            }
	                        }
	                    }

	                    _this.setState({ article: items });
	                }
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this = this;
	            return React.createElement(
	                "li",
	                null,
	                React.createElement(
	                    "li",
	                    null,
	                    React.createElement(
	                        "select",
	                        { id: "category", onChange: _this.handleChange.bind(_this), className: "form-control" },
	                        _this.state.value.map(function (option, i) {
	                            return React.createElement(
	                                "option",
	                                { value: option },
	                                option
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    "li",
	                    null,
	                    React.createElement(
	                        "select",
	                        { id: "article", onChange: _this.articleChange.bind(_this), className: "form-control" },
	                        _this.state.article
	                    )
	                )
	            );
	        }
	    }]);

	    return Category;
	}(React.Component);

	var Markdown = function (_React$Component3) {
	    _inherits(Markdown, _React$Component3);

	    function Markdown() {
	        _classCallCheck(this, Markdown);

	        var _this4 = _possibleConstructorReturn(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this));

	        _this4.state = {
	            converter: new showdown.Converter(),
	            value: "Hello, World!\n===\n---\n# Write "
	        };
	        return _this4;
	    }

	    _createClass(Markdown, [{
	        key: "createMarkup",
	        value: function createMarkup() {
	            return {
	                __html: this.state.converter.makeHtml(this.state.value)
	            };
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(event) {
	            this.setState({ value: event.target.value });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "row" },
	                React.createElement(
	                    "div",
	                    { className: "markdown-write" },
	                    React.createElement("textarea", { type: "text", defaultValue: this.state.value, onChange: this.handleChange.bind(this), id: "markdown", className: "col-xs-12 full-height" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "markdown-previewer" },
	                    React.createElement(
	                        "div",
	                        { id: "htmlArea", className: "col-xs-12 full-height" },
	                        React.createElement("div", { dangerouslySetInnerHTML: this.createMarkup() })
	                    )
	                )
	            );
	        }
	    }]);

	    return Markdown;
	}(React.Component);

	var Footer = function (_React$Component4) {
	    _inherits(Footer, _React$Component4);

	    function Footer() {
	        _classCallCheck(this, Footer);

	        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	    }

	    _createClass(Footer, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "footer",
	                { className: "col-xs-8 col-xs-offset-2" },
	                React.createElement("hr", null),
	                React.createElement(
	                    "p",
	                    { className: "text-center" },
	                    "Markdown Previewer created by ",
	                    React.createElement(
	                        "a",
	                        { href: "http://jmt33.github.com/mtao", target: "_blank", className: "text-warning" },
	                        "Mtao"
	                    )
	                )
	            );
	        }
	    }]);

	    return Footer;
	}(React.Component);

	var App = function (_React$Component5) {
	    _inherits(App, _React$Component5);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "container-fluid" },
	                React.createElement(Header, null),
	                React.createElement(Markdown, null),
	                React.createElement(Footer, null)
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	var div = document.createElement('div');
	div.id = 'app';
	document.body.appendChild(div);
	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ }
/******/ ]);