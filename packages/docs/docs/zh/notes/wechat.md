# 微信公众号－开发说明

## 简介

* 微信公众平台能干什么？
	* 写文章发文章
	* 和粉丝聊天
	* 配置菜单
	* 开通各种公众号的权限（仅限自己的公众号）
	* 启用开发者模式，开发自己的公众号
	* 投放广告
	* 查看数据


* 微信开放平台能干什么？
	* APP想用微信登录/分享到朋友圈等
	* PC网站想用微信登录等
	* 注册公众号第三方平台（服务所有公众号）
	* 注册小程序第三方平台（提供小程序模板）
	* 绑定公众号或小程序，以形成UnionID

## 环境
* 公众号: `nohi@live.cn/a123`  地址: https://mp.weixin.qq.com/?token=&lang=zh_CN

* 开放平台: `ading_25@163.com/t123` 地址:https://open.weixin.qq.com/?token=&lang=zh_CN

* 公众号测试平台: https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

  * url: http://4k2jya.natappfree.cc/jcms/wechat/portal
  * JS接口安全域名: 4k2jya.natappfree.cc
  * 网页服务 ->网页帐号->网页授权获取用户基本信息 修改为 外网的域名: 4k2jya.natappfree.cc（不需要http://）

* 内网穿透工具natapp
	* https://natapp.cn/ 注册 18012/ad   token:9a096632e3a3f559
	* 我的隧道->购买隧道->免费隧道
	* natapp.exe同目录下新建config.ini文件
	```
		#将本文件放置于natapp同级目录 程序将读取 [default] 段
		#在命令行参数模式如 natapp -authtoken=xxx 等相同参数将会覆盖掉此配置
		#命令行参数 -config= 可以指定任意config.ini文件
		[default]
		authtoken=9a096632e3a3f559      #对应一条隧道的authtoken
		clienttoken=                    #对应客户端的clienttoken,将会忽略authtoken,若无请留空,
		log=none                        #log 日志文件,可指定本地文件, none=不做记录,stdout=直接屏幕输出 ,默认为none
		loglevel=ERROR                  #日志等级 DEBUG, INFO, WARNING, ERROR 默认为 DEBUG
		http_proxy=                     #代理设置 如 http://10.123.10.10:3128 非代理上网用户请务必留空
	```

* 淘宝基础组件 http://m.sui.taobao.org/components/

## 公众号开发

https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect 
//若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。

