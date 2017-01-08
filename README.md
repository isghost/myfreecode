# 我在freecodecamp完成的工程代码
目前完成的题目有

1. Build a Personal Portfolio Webpage(个人作品展示页)
2. Design a danmu app (弹幕APP)
3. Build a Random Quote Machine (随机显示引用)
4. Show the Local Weather (显示地方实时天气)
5. Build a Wikipedia Viewer (维基百科搜索)
6. Use the Twitch.tv JSON API (主播状态列表)

## 注意事项
题要一般要求，完成的工程都要放在codepen网站上，但即使翻墙了，这个网站还是非常的卡顿，所以后来我所有的代码都在本地编写，再放在codepen上。会存在明显的显示偏差，这是由于css加载顺序引起的。由于官方对于题目的维护速度异常缓慢，好多例子已经失效，API接口不对，例子比较糟糕等问题，所以我在自己服务器上提供了题目要求的接口。`www.ccyblog.com`是个人博客地址。

## 个人作品展示页
### Build a Personal Portfolio Webpage    
早期做的，比较基础，但做的比较糟糕，重点是熟悉布局

## 弹幕APP
###Design a danmu app    
采用了野狗的API,例子好像也是野狗的工作人员写的。例子是随机显示弹幕，感觉很LOW。我进行了一些改进。

1. 一打开页面，会把所有已有弹幕显示一遍。
2. 打开多个窗口，发送一条弹幕，所有窗口实时显示弹幕。
3. 打开多个窗口，清除弹幕，所有窗口实时清除弹幕。

野狗保存信息时，使用时间作为Key，以此判断哪些弹幕是新的。

## 随机显示引用
###Build a Random Quote Machine
点击按钮，显示一条新的引用信息，很简单的例子，由于存在跨域，第一次接触到JSONP。我在服务器上提供

	http://www.ccyblog.com:3000/api/randomQuotes

这个论语接口，每次调用随机显示一个论语。返回格式为JSONP。
待优化: 由客户端指定回调函数名称。

## 显示地方实时天气
###Show the Local Weather
题目推荐使用聚合数据接口，但只能免费500条，现在连例子都已经跑不起来。我采用知心的免费接口，提供信息很少，至少能用。由于知心要求加密，所以将加密代码移到服务端，对外提供

	http://www.ccyblog.com:3000/api/localWeather

## 维基百科搜索
###Build a Wikipedia Viewer
题目的例子也已经跑不起来。查文档，维基的API真的是超复杂，还提供沙盒工具。最后东拼西凑出一个接口

	https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpslimit=10&prop=pageimages%7Cpageterms|info&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&inprop=url&format=json&gpssearch=

题目需要列表的动态增删改。

## 主播状态列表
###Use the Twitch.tv JSON API
题目的例子也已经跑不起来。Twitch已经更新API，要求每次请求提供client_id，通过申请开者者XXX，最后得到client_id。`https://api.twitch.tv/kraken/channels/chanel`这个是获取主播的基础信息。`https://api.twitch.tv/kraken/streams/channel`根据返回值stream的值判断主播是否在线。    

还提供简单的搜索，分状态功能。