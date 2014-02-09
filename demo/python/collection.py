# coding:utf-8
import urllib2
import re
import urllib
import sys

class Collection(keyword):
	keyword = '科技'
	filterKeyword = urllib.quote(keyword)
	url = "http://sug.so.360.cn/suggest?callback=suggest_so&encodein=utf-8&encodeout=utf-8&format=json&fields=word,obdata&word="+keyword
	header = {
		"GET": url,
		"Host": "sug.so.360.cn",
		"Referer": "http://www.so.com/",
		"User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1707.0 Safari/537.36"
	}
	def run(self):
		req = urllib2.Request(self.url)
		for key in self.header:
			req.add_header(key, self.header[key])
		html = urllib2.urlopen(req).read()
		preg = re.findall("\"word\":\"(.*?)\"", html)
		for item in preg:
			print item


if __name__ == '__main__':
	p = Collection()
	p.keyword = sys.argv[1]
	p.run()
