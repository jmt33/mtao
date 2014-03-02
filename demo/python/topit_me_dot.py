# coding:utf-8

import urllib2
import re
import urllib
import sys
import time
import sys

class topit:
    def __init__(self):
        self.url = 'http://www.topit.me/tag/%E6%9D%A5%E8%87%AA%E6%98%9F%E6%98%9F%E7%9A%84%E4%BD%A0';
        self.header = {
            "GET": self.url,
            "Host": "f3.topit.me",
            "Referer": "http://www.topit.me/",
            "User-Agent": "Mozilla/5.0 (X11; Linux i686)"
        }

    def run(self):
        html = self.getHtml(self.url)        
        preg = re.findall(r"\">(\d+)</a><a id=\"page-next\"", html)
        pagenum = int(preg[0]) + 1
        for page in range(pagenum):
            if page == 0:
                continue
            url = self.url
            url = url+'?p=' + str(page)
            print url
            self.renderJpg(url)
        
    def renderJpg(self, url):
        html = self.getHtml(url)
        parten = "width=\"245px\" height=\"200px\" [\w-]+?=\"(.*?)\""
        jpgs = re.findall(parten, html)
        for jpg in jpgs:
            time.sleep(1)
            # 解析最后一个字符
            jpg = jpg.replace('m.', 'l.')
            filename = urllib.unquote(jpg).decode('utf8').split('/')[-1]  
            urllib.urlretrieve(jpg, filename)
            #print jpg
    def getHtml(self, url):
        request = urllib2.Request(url)
        # for key in self.header:
        #     request.add_header(key, self.header[key])

        html = urllib2.urlopen(request).read()
        return html

if __name__ == "__main__":
    topit = topit()
    url = sys.argv[1]
    if url == '':
        print '请输入要采集URL'
        exit()
    else:
        topit.url = url
        topit.run()