## 关于Pwiki

### 背景

我用markdown已经一段时间了，深深被markdown这种简洁的语法与优雅的表现形式所吸引。之前很大一部分笔记资料存在evernote上，包括一些学习，工作，生活的。使用markdown之后就产生了一个想法：如果能使markdown与evernote兼容，markdown写出来的文档解析到evernote上这是多么美妙的一件事情，后来在无意还是有意中发现了马克飞象这么个玩意，它是一个中国人写的evernote插件，能在web可视化编写markdown后解析出html并能同步到evernote上。虽然有这么一个东西，但使用的过程中发现一些问题比如经常卡死、linux上写文档会有Bug再加上分享不利的情况，又让我很不舒服。

到底怎样才能更舒服，更便利？

- 编写markdown后可以自动生成html
- 可以分享
- 编写方便

本想用python，或者node.js 进行编写，想想这两个语言对于我来说实现的较慢些，果然采用了php用周末的一天时间写这么一个小工具。


### 简单的介绍

> pwiki采用php进行编写，依赖php-markdown用来解析markdown文件，同时借鉴了phpmig实现原理。
