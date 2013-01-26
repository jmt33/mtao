/*
var Base = {
	getId = function (id) {
		return document.getElementById(id)
	},
	getName: function (name) {
		return document.getElementByName (name)
	},
	getTagName: function (tag) {
		return document.getElementByTagName(tag);
	}
}
*/

function Base() {
	//创建数组来存储节点和节点数组
	this.elements = [];
	//获取ID节点
	this.getId = function () {
		this.elements.push(document.getElementById(id));
		return this;
	};
	//获取元素节点
	this.getTagName = function (tag) {
		var tags = document.getElementByTagName(tag);
		for (var i = 0; i< tags.length; i++) {
			this.elements.push(tags[i]);
		}
		return this;
	};
}

Base.prototype.css = function(attr, value) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style[attr] = value;
	}
	return this;
}

Base.prototype.html = function(str) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].innerHTML = str;
	}
	return this;
}
Base.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclcik = fn;
	}
	return this;
}