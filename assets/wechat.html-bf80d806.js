import{_ as i,p as e,q as n,a1 as a}from"./framework-449724a9.js";const l={},t=a(`<h1 id="微信公众号" tabindex="-1"><a class="header-anchor" href="#微信公众号" aria-hidden="true">#</a> 微信公众号</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><ul><li><p>微信公众平台能干什么？</p><ul><li>写文章发文章</li><li>和粉丝聊天</li><li>配置菜单</li><li>开通各种公众号的权限（仅限自己的公众号）</li><li>启用开发者模式，开发自己的公众号</li><li>投放广告</li><li>查看数据</li></ul></li><li><p>微信开放平台能干什么？</p><ul><li>APP想用微信登录/分享到朋友圈等</li><li>PC网站想用微信登录等</li><li>注册公众号第三方平台（服务所有公众号）</li><li>注册小程序第三方平台（提供小程序模板）</li><li>绑定公众号或小程序，以形成UnionID</li></ul></li></ul><h2 id="demo工程" tabindex="-1"><a class="header-anchor" href="#demo工程" aria-hidden="true">#</a> DEMO工程</h2><ul><li>后台服务https://github.com/demo-wx/server.git <ul><li>参考自：https://github.com/chanjarster/weixin-java-tools</li></ul></li><li>前端页面：https://github.com/demo-wx/web-app.git</li></ul><h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><ul><li><p>公众号: <code>nohi@live.cn/a123</code> 地址: https://mp.weixin.qq.com/?token=&amp;lang=zh_CN</p></li><li><p>开放平台: <code>ading_25@163.com/t123</code> 地址:https://open.weixin.qq.com/?token=&amp;lang=zh_CN</p></li><li><p>公众号测试平台: https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&amp;t=sandbox/index</p><ul><li>url: http://4ruh64.natappfree.cc/server/wx/portal/wx9c38d89b47cec88c</li><li>JS接口安全域名: 4k2jya.natappfree.cc</li><li>网页服务 -&gt;网页帐号-&gt;网页授权获取用户基本信息 修改为 外网的域名: 4k2jya.natappfree.cc（不需要http://）</li></ul></li><li><p>nginx，配置见下方</p></li><li><p>内网穿透工具natapp</p><ul><li>https://natapp.cn/ 注册 18012/ad token:9a096632e3a3f559</li><li>我的隧道-&gt;购买隧道-&gt;免费隧道</li><li>natapp.exe同目录下新建config.ini文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	#将本文件放置于natapp同级目录 程序将读取 [default] 段
	#在命令行参数模式如 natapp -authtoken=xxx 等相同参数将会覆盖掉此配置
	#命令行参数 -config= 可以指定任意config.ini文件
	[default]
	authtoken=9a096632e3a3f559      #对应一条隧道的authtoken
	clienttoken=                    #对应客户端的clienttoken,将会忽略authtoken,若无请留空,
	log=none                        #log 日志文件,可指定本地文件, none=不做记录,stdout=直接屏幕输出 ,默认为none
	loglevel=ERROR                  #日志等级 DEBUG, INFO, WARNING, ERROR 默认为 DEBUG
	http_proxy=                     #代理设置 如 http://10.123.10.10:3128 非代理上网用户请务必留空
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>淘宝基础组件 http://m.sui.taobao.org/components/</p></li></ul><h2 id="公众号开发" tabindex="-1"><a class="header-anchor" href="#公众号开发" aria-hidden="true">#</a> 公众号开发</h2><p>https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&amp;redirect_uri=REDIRECT_URI&amp;response_type=code&amp;scope=SCOPE&amp;state=STATE#wechat_redirect //若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.nginx、natapp
2.配置公众号 https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&amp;t=sandbox/index
	* url: http://4ruh64.natappfree.cc/server/wx/portal/wx9c38d89b47cec88c
	  4ruh64.natappfree.cc 为natapp域名，/server为nginx代理微信公众号后台服务
  * JS接口安全域名: 4k2jya.natappfree.cc  不能添加http
  * 网页服务 -&gt;网页帐号-&gt;网页授权获取用户基本信息 修改为 外网的域名: 4k2jya.natappfree.cc（不需要http://）

nginx
server {
        listen       8099;
        server_name  localhost;

        #charset koi8-r;
        #access_log  /var/log/nginx/host.access.log  main;
				
				# 前端
 				location /vue/ {
            proxy_pass   http://127.0.0.1:9000/; 
        }
        # 后端服务
        location /server {
            proxy_pass   http://127.0.0.1:8080;
        }

				# 后端服务
        location /common/ {
            proxy_pass   http://127.0.0.1:8080/server/common/;
        }
				# 腾讯地图api
        location /qqmap/ {
            proxy_pass   https://apis.map.qq.com/;       
        }
        # 高德地图api
        location /gaodemap/ {
            proxy_pass   https://restapi.amap.com/;           
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="地图api" tabindex="-1"><a class="header-anchor" href="#地图api" aria-hidden="true">#</a> 地图API</h3><ul><li>腾讯地图 <ul><li>https://lbs.qq.com/</li></ul></li></ul>`,12),s=[t];function d(c,r){return e(),n("div",null,s)}const p=i(l,[["render",d],["__file","wechat.html.vue"]]);export{p as default};
