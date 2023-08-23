import{_ as l,M as d,p as s,q as r,R as e,t as n,N as t,a1 as a}from"./framework-449724a9.js";const o={},u=a(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1><blockquote><p>add by nohi 20220505</p></blockquote><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料" aria-hidden="true">#</a> 资料</h2><ul><li>https://www.runoob.com/go/go-tutorial.html</li><li>参考：https://www.w3cschool.cn/yqbmht/fxmdgcqm.html</li><li>demo： git@github.com:thisisnohi/demo_go.git</li></ul><h2 id="目标及过程" tabindex="-1"><a class="header-anchor" href="#目标及过程" aria-hidden="true">#</a> 目标及过程</h2><ul><li>基础</li><li>web框架</li><li>Go 数据库操作</li><li>微服务</li></ul><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2><h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3><ul><li><p>布尔型：true false</p></li><li><p>数字类型</p><p>uint8/16/32/64 int8/16/32/64 float32/64 complex64/128</p><p>Byte rune(类似int32) unint(32/64) int(uint) uinptr(无符号整形，用于存放一个指针)</p></li><li><p>字符串类型</p></li><li><p>派生类型</p><ul><li>(a) 指针类型（Pointer）</li><li>(b) 数组类型</li><li>(c) 结构化类型(struct)</li><li>(d) Channel 类型</li><li>(e) 函数类型</li><li>(f) 切片类型</li><li>(g) 接口类型（interface）</li><li>(h) Map 类型</li></ul></li></ul><h3 id="变量、常量" tabindex="-1"><a class="header-anchor" href="#变量、常量" aria-hidden="true">#</a> 变量、常量</h3><ul><li><p>定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var a, b, c string = &quot;1&quot;, &quot;2&quot;, &quot;3&quot;    
d, e, f := &quot;aaaa&quot;, &quot;bbb&quot;, &quot;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>常量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const b string = &quot;abc&quot;
const b = &quot;abc&quot;
const (
    a = &quot;abc&quot;
    b = len(a)
    c = unsafe.Sizeof(a)
)
const (
    a = iota
    b = iota
    c = iota
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3><ul><li><p>定义</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var variable_name [SIZE] variable_type  =&gt; var balance [10] float32
初始化
var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
balance := [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
或
balance := [...]float32{1000.0, 2
//  将索引为 1 和 3 的元素初始化
balance := [5]float32{1:2.0,3:7.0}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>多维数组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var variable_name [SIZE1][SIZE2]...[SIZEN] variable_type
// Step 1: 创建数组
values := [][]int{}

// Step 2: 使用 append() 函数向空的二维数组添加两行一维数组
row1 := []int{1, 2, 3}
row2 := []int{4, 5, 6}
// 初始化
a := [3][4]int{  
 {0, 1, 2, 3} ,   /*  第一行索引为 0 */
 {4, 5, 6, 7} ,   /*  第二行索引为 1 */
 {8, 9, 10, 11},   /* 第三行索引为 2 */
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h3><ul><li>&amp;获取内存地址</li><li>var var_name *var-type</li><li>指针数组： var ptr [MAX]*int;</li></ul><h3 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h3><ul><li><p>定义</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type struct_variable_type struct {
   member definition
   member definition
   ...
   member definition
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="切片" tabindex="-1"><a class="header-anchor" href="#切片" aria-hidden="true">#</a> 切片</h3><ul><li><p>定义</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var slice1 []type = make([]type, len)
也可以简写为
slice1 := make([]type, len)
make([]T, length, capacity)  capacity 为可选参数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> Range</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for key, value := range oldMap {
    newMap[key] = value
}
for key := range oldMap
for key, _ := range oldMap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map-集合" tabindex="-1"><a class="header-anchor" href="#map-集合" aria-hidden="true">#</a> Map(集合)</h3><ul><li><p>定义</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* 声明变量，默认 map 是 nil */
var map_variable map[key_data_type]value_data_type

/* 使用 make 函数 */
map_variable := make(map[key_data_type]value_data_type)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var cMap map[int]string
cMap = make(map[int]string)
fmt.Println(cMap)
cMap[1] = &quot;aaaa&quot;
cMap[2] = &quot;2222&quot;
fmt.Println(cMap)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>delete() 函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* 创建map */
	countryCapitalMap := map[string]string{&quot;France&quot;: &quot;Paris&quot;, &quot;Italy&quot;: &quot;Rome&quot;, &quot;Japan&quot;: &quot;Tokyo&quot;, &quot;India&quot;: &quot;New delhi&quot;}

	fmt.Println(&quot;原始地图&quot;)
	/* 打印地图 */
	for country := range countryCapitalMap {
		fmt.Println(country, &quot;首都是&quot;, countryCapitalMap[country])
	}
	/*删除元素*/
	delete(countryCapitalMap, &quot;France&quot;)
	fmt.Println(&quot;法国条目被删除&quot;)
	fmt.Println(&quot;删除元素后地图&quot;)
	/*打印地图*/
	for country := range countryCapitalMap {
		fmt.Println(country, &quot;首都是&quot;, countryCapitalMap[country])
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="语言类型转换" tabindex="-1"><a class="header-anchor" href="#语言类型转换" aria-hidden="true">#</a> 语言类型转换</h3><ul><li>type_name(expression) type_name 为类型，expression 为表达式。</li></ul><h3 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h3><ul><li><p>定义：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* 定义接口 */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}

/* 定义结构体 */
type struct_name struct {
   /* variables */
}

/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* 方法实现 */
}
...
func (struct_name_variable struct_name) method_namen() [return_type] {
   /* 方法实现*/
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type Phone interface {
	call()
}
type Nokia struct {
}
type Iphone struct {
}
func (nokia Nokia) call() {
	fmt.Println(&quot;this is nokia&quot;)
}
func (iphone Iphone) call() {
var phone Phone
phone = new(Nokia)
phone.call()
phone = new(Iphone)
phone.call()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h3><h3 id="并发" tabindex="-1"><a class="header-anchor" href="#并发" aria-hidden="true">#</a> 并发</h3><p>Go 语言支持并发，我们只需要通过 go 关键字来开启 goroutine 即可。</p><p>goroutine 是轻量级线程，goroutine 的调度是由 Golang 运行时进行管理的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go 函数名( 参数列表 )
go f(x, y, z)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>通道（channel）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ch &lt;- v    // 把 v 发送到通道 ch
v := &lt;-ch  // 从 ch 接收数据
           // 并把值赋给 v
ch := make(chan int)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>缓冲区：ch := make(chan int, 100)</p></li></ul><h2 id="web框架" tabindex="-1"><a class="header-anchor" href="#web框架" aria-hidden="true">#</a> WEB框架</h2><blockquote><p>Gin:https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI3MjU4Njk3Ng==&amp;action=getalbum&amp;album_id=1362784031968149504&amp;scene=173&amp;from_msgid=2247484397&amp;from_itemidx=1&amp;count=3&amp;nolastread=1#wechat_redirect</p></blockquote><ul><li><p>安装</p><ul><li><p>get 时timeout</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> export GO111MODULE=on
 export GOPROXY=https://goproxy.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>go get -u github.com/gin-gonic/gin</p></li></ul></li><li><p>demo</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import (
	&quot;fmt&quot;
	&quot;github.com/gin-gonic/gin&quot;
)
func main() {
	fmt.Println(&quot;1111&quot;)
	r := gin.Default()
	r.GET(&quot;/&quot;, func(c *gin.Context) {
		c.JSON(200, gin.H{
			&quot;Blog&quot;:   &quot;www.flysnow.org&quot;,
			&quot;wechat&quot;: &quot;flysnow_org&quot;,
		})
	})
	r.Run(&quot;:8080&quot;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="路由及路由参数" tabindex="-1"><a class="header-anchor" href="#路由及路由参数" aria-hidden="true">#</a> 路由及路由参数</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  // 路由参数
	r.GET(&quot;/users/:id&quot;, func(c *gin.Context) {
		id := c.Param(&quot;id&quot;)
		fmt.Println(&quot;id:&quot; + id)
		c.String(200, &quot;This user id is %s&quot;, id)
	})
	// 路由参数
	r.GET(&quot;/users/start/*id&quot;, func(c *gin.Context) {
		id := c.Param(&quot;id&quot;)
		fmt.Println(&quot;id:&quot; + id)
		c.String(200, &quot;This user id is %s&quot;, id)
	})
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询参数" tabindex="-1"><a class="header-anchor" href="#查询参数" aria-hidden="true">#</a> 查询参数</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// http://127.0.0.1:8080/?wechat=thisisnohi&amp;a=1&amp;a=2&amp;a=3&amp;map[a]=m1&amp;map[1]=1111
	r.GET(&quot;/&quot;, func(c *gin.Context) {
		c.JSON(200, gin.H{
			&quot;Blog&quot;:   &quot;www.flysnow.org&quot;,
			&quot;wechat&quot;: &quot;flysnow_org&quot;,
			&quot;abc&quot;:    c.Query(&quot;wechat&quot;),
			&quot;a&quot;:      c.QueryArray(&quot;a&quot;),
			&quot;b&quot;:      &quot;默认值：&quot; + c.DefaultQuery(&quot;b&quot;, &quot;0&quot;),
			&quot;map&quot;:    c.QueryMap(&quot;map&quot;),
		})
	})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="表单参数" tabindex="-1"><a class="header-anchor" href="#表单参数" aria-hidden="true">#</a> 表单参数</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// curl -d wechat=1111 http://127.0.0.1:8080/users
	r.POST(&quot;/users&quot;, func(c *gin.Context) {
		//创建一个用户
		c.JSON(200, gin.H{
			&quot;Blog&quot;:   &quot;www.flysnow.org&quot;,
			&quot;wechat&quot;: &quot;flysnow_org&quot;,
			&quot;abc&quot;:    c.PostForm(&quot;wechat&quot;),
		})
	})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组路由" tabindex="-1"><a class="header-anchor" href="#分组路由" aria-hidden="true">#</a> 分组路由</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g := r.Group(&quot;/v1&quot;)
	{
		g.GET(&quot;/&quot;, func(c *gin.Context) {
			c.JSON(200, gin.H{
				&quot;Blog&quot;: &quot;www.flysnow.org====g1&quot;,
				&quot;abc&quot;:  c.Query(&quot;wechat&quot;),
				&quot;a&quot;:    c.QueryArray(&quot;a&quot;),
				&quot;b&quot;:    &quot;默认值：&quot; + c.DefaultQuery(&quot;b&quot;, &quot;0&quot;),
				&quot;map&quot;:  c.QueryMap(&quot;map&quot;),
			})
		})
		g.GET(&quot;/users&quot;, func(c *gin.Context) {
			c.JSON(200, users)
		})
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>路由中间件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>g2 := r.Group(&quot;/v2&quot;, func(c *gin.Context) {
		fmt.Println(&quot;=======v2 1111======&quot;)
		fmt.Println(&quot;a:&quot; + c.Query(&quot;a&quot;))
		fmt.Println(c.QueryArray(&quot;a&quot;))
	}, func(c *gin.Context) {
		fmt.Println(&quot;=======v2 22222======&quot;)
		fmt.Println(&quot;a:&quot; + c.Query(&quot;a&quot;))
	})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="jsonp跨域" tabindex="-1"><a class="header-anchor" href="#jsonp跨域" aria-hidden="true">#</a> JSONP跨域</h3><p>解决跨域问题的办法有CORS、代理和JSONP，这里结合Gin，主要介绍JSONP模式</p><ul><li><p>样例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--这里必须是application/javascript，否则无法加载sayHello函数 --&gt;
&lt;script type=&quot;application/javascript&quot;&gt;
    function sayHello(data){
        alert(JSON.stringify(data))
    }
    sayHello(&quot;{&#39;title&#39;:&#39;TEST&#39;, &#39;MSG&#39;: &#39;this is msg&#39;}&quot;)
&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;http://localhost:8080/jsonp?callback=sayHello&quot;&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>JSON劫持</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>r.SecureJsonPrefix(&quot;for(;;);&quot;)
groupJsonp.GET(&quot;/secureJson&quot;, func(c *gin.Context) {
		c.SecureJSON(200, a)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="html-template" tabindex="-1"><a class="header-anchor" href="#html-template" aria-hidden="true">#</a> html/template</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>group.GET(&quot;/&quot;, func(c *gin.Context) {
			c.Status(200)
			const templateText = \`this is {{ printf &quot;%s&quot; .}}\`
			tmpl, err := template.New(&quot;htmlTest&quot;).Parse(templateText)
			if err != nil {
				log.Fatalf(&quot;parsing: %s&quot;, err)
			}
			tmpl.Execute(c.Writer, &quot;nohi.online&quot;)
		})
		r.LoadHTMLFiles(&quot;html/index.html&quot;)
		group.GET(&quot;/index&quot;, func(c *gin.Context) {
			c.HTML(200, &quot;index.html&quot;, gin.H{&quot;a&quot;: &quot;aaa&quot;, &quot;name&quot;: &quot;NOHI&quot;})
		})

html/index.html
&lt;h2&gt;this is html/template&lt;/h2&gt;
&lt;p&gt;Hello {{ .a }}&lt;/p&gt;
&lt;p&gt;Hello {{ .name }}&lt;/p&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="中间件" tabindex="-1"><a class="header-anchor" href="#中间件" aria-hidden="true">#</a> 中间件</h3><ul><li><p>Basic Authorization</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>group.Use(gin.BasicAuth(gin.Accounts{&quot;admin&quot;: &quot;123456&quot;, &quot;nohi&quot;: &quot;nohi&quot;}))
	group.GET(&quot;/&quot;, func(c *gin.Context) {
		...
	})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h2><blockquote><p>参考：https://segmentfault.com/a/1190000038632750</p></blockquote><ul><li><p>gorm</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>test: TestGoDbGorm.http</p></li></ul><h2 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务" aria-hidden="true">#</a> 微服务</h2>`,56),c=e("thead",null,[e("tr",null,[e("th",null,"框架名"),e("th",null,"开源时间"),e("th",null,"官网/主文档"),e("th",null,"github"),e("th",null,"github star")])],-1),v=e("td",null,"go-zero",-1),m=e("td",null,"2020",-1),p={href:"https://link.zhihu.com/?target=https%3A//go-zero.dev",target:"_blank",rel:"noopener noreferrer"},h={href:"https://link.zhihu.com/?target=https%3A//github.com/zeromicro/go-zero",target:"_blank",rel:"noopener noreferrer"},b=e("td",null,"15.9K",-1),g=e("td",null,"go-kratos",-1),q=e("td",null,"2019",-1),x={href:"https://link.zhihu.com/?target=https%3A//go-kratos.dev/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://link.zhihu.com/?target=https%3A//github.com/go-kratos/kratos",target:"_blank",rel:"noopener noreferrer"},f=e("td",null,"17.1K",-1),k=e("td",null,"tars-go",-1),y=e("td",null,"2018",-1),w={href:"https://link.zhihu.com/?target=https%3A//tarscloud.gitbook.io/tarsdocs/",target:"_blank",rel:"noopener noreferrer"},z={href:"https://link.zhihu.com/?target=https%3A//github.com/TarsCloud/TarsGo",target:"_blank",rel:"noopener noreferrer"},C=e("td",null,"3K",-1),M=e("td",null,"dubbo-go",-1),S=e("td",null,"2019",-1),P={href:"https://link.zhihu.com/?target=https%3A//dubbo.apache.org/zh/docs/languages/golang/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://link.zhihu.com/?target=https%3A//github.com/apache/dubbo-go",target:"_blank",rel:"noopener noreferrer"},T=e("td",null,"3.9K",-1),G=e("td",null,"go-micro",-1),O=e("td",null,"2015",-1),E=e("td",null,"-",-1),j={href:"https://link.zhihu.com/?target=https%3A//github.com/asim/go-micro",target:"_blank",rel:"noopener noreferrer"},A=e("td",null,"17.9K",-1),I=e("td",null,"go-kit",-1),J=e("td",null,"2015",-1),H=e("td",null,"-",-1),B={href:"https://link.zhihu.com/?target=https%3A//github.com/go-kit/kit",target:"_blank",rel:"noopener noreferrer"},R=e("td",null,"22.7K",-1),Q=e("td",null,"jupiter",-1),Z=e("td",null,"2020",-1),K={href:"https://link.zhihu.com/?target=https%3A//jupiter.douyu.com/",target:"_blank",rel:"noopener noreferrer"},D={href:"https://link.zhihu.com/?target=https%3A//github.com/zeromicro/go-zero",target:"_blank",rel:"noopener noreferrer"},L=e("td",null,"3.6K",-1),V=a(`<h2 id="go-zero" tabindex="-1"><a class="header-anchor" href="#go-zero" aria-hidden="true">#</a> go-zero</h2><blockquote><p>介绍：https://go-zero.dev/cn/docs/introduction/</p><p>文档：https://go-zero.dev/cn/docs/prepare/dev-flow</p><p>视频教程：https://www.bilibili.com/video/BV1ou411q7SC/?spm_id_from=pageDriver</p></blockquote><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><ul><li><p>goctl</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go install github.com/zeromicro/go-zero/tools/goctl@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>protoc &amp; protoc-gen-go (安装较慢)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goctl env check -i -f --verbose 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>etcd</p><blockquote><p>https://cloud.tencent.com/developer/article/1824472</p><p>安装官方：https://github.com/etcd-io/etcd/releases</p></blockquote><ul><li>启动：/tmp/etcd-download-test/etcd</li></ul></li><li><p>redis</p></li></ul><h3 id="创建mall工程" tabindex="-1"><a class="header-anchor" href="#创建mall工程" aria-hidden="true">#</a> 创建mall工程</h3><ul><li>mkdir go-zero-demo</li><li>cd go-zero-demo</li><li>go mod init go-zero-demo</li></ul><p><code>注</code></p><p>goctl rpc protoc user.proto --go_out=./types --go-grpc_out=./types --zrpc_out=.</p><p>goctl api go -api order.api -dir .</p><h4 id="_1-添加api文件" tabindex="-1"><a class="header-anchor" href="#_1-添加api文件" aria-hidden="true">#</a> 1.添加api文件</h4><p><code> vi order.api</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>type(
    OrderReq {
        Id string \`path:&quot;id&quot;\`
    }
  
    OrderReply {
        Id string \`json:&quot;id&quot;\`
        Name string \`json:&quot;name&quot;\`
    }
)
service order {
    @handler getOrder
    get /api/order/get/:id (OrderReq) returns (OrderReply)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-生成服务文件" tabindex="-1"><a class="header-anchor" href="#_2-生成服务文件" aria-hidden="true">#</a> 2.生成服务文件</h4><ul><li><code>goctl api go -api order.api -dir .</code></li></ul><h4 id="_3-添加user-rpc配置" tabindex="-1"><a class="header-anchor" href="#_3-添加user-rpc配置" aria-hidden="true">#</a> 3.添加user rpc配置</h4><ul><li><p><code>vim internal/config/config.go</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package config

import (
    &quot;github.com/zeromicro/go-zero/zrpc&quot;
    &quot;github.com/zeromicro/go-zero/rest&quot;
)

type Config struct {
    rest.RestConf
    UserRpc zrpc.RpcClientConf
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="model生成" tabindex="-1"><a class="header-anchor" href="#model生成" aria-hidden="true">#</a> model生成</h3><h4 id="方式一-ddl" tabindex="-1"><a class="header-anchor" href="#方式一-ddl" aria-hidden="true">#</a> 方式一：ddl</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd service/user/model
goctl model mysql ddl -src user.sql -dir . -c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方式二-datasource" tabindex="-1"><a class="header-anchor" href="#方式二-datasource" aria-hidden="true">#</a> 方式二: datasource</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goctl model mysql datasource -url=&quot;$datasource&quot; -table=&quot;user&quot; -c -dir .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="方式三-intellij插件" tabindex="-1"><a class="header-anchor" href="#方式三-intellij插件" aria-hidden="true">#</a> 方式三：intellij插件</h4><p>在Goland中，右键<code>user.sql</code>，依次进入并点击<code>New</code>-&gt;<code>Go Zero</code>-&gt;<code>Model Code</code>即可生成，或者打开<code>user.sql</code>文件， 进入编辑区，使用快捷键<code>Command+N</code>（for mac OS）或者 <code>alt+insert</code>（for windows），选择<code>Mode Code</code>即可</p><h3 id="api生成" tabindex="-1"><a class="header-anchor" href="#api生成" aria-hidden="true">#</a> api生成</h3><h4 id="方式一-命令行" tabindex="-1"><a class="header-anchor" href="#方式一-命令行" aria-hidden="true">#</a> 方式一：命令行</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd book/service/user/api
goctl api go -api user.api -dir . 
goctl api go -api *.api -dir ../ --style=goZero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方式二-intellij插件" tabindex="-1"><a class="header-anchor" href="#方式二-intellij插件" aria-hidden="true">#</a> 方式二：intellij插件</h4><p>在 <code>user.api</code> 文件右键，依次点击进入 <code>New</code>-&gt;<code>Go Zero</code>-&gt;<code>Api Code</code> ，进入目标目录选择，即api源码的目标存放目录，默认为user.api所在目录，选择好目录后点击OK即可</p><h3 id="rpc" tabindex="-1"><a class="header-anchor" href="#rpc" aria-hidden="true">#</a> rpc</h3><ul><li><p>命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goctl rpc protoc user.proto --go_out=./types --go-grpc_out=./types --zrpc_out=.
goctl rpc protoc user.proto --go_out=../ --go-grpc_out=../ --zrpc_out=.. --style=goZero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="middleware" tabindex="-1"><a class="header-anchor" href="#middleware" aria-hidden="true">#</a> middleware</h3><blockquote><p>视频：https://www.bilibili.com/video/BV1ou411q7SC/?spm_id_from=pageDriver</p><p>源码：</p></blockquote><p><strong>常用命令</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 生成api业务代码 ， 进入&quot;服务/cmd/api/desc&quot;目录下，执行下面命令
# goctl api go -api *.api -dir ../  --style=goZero

# 1）goctl &gt;= 1.3 进入&quot;服务/cmd/rpc/pb&quot;目录下，执行下面命令
#    goctl rpc protoc *.proto --go_out=../ --go-grpc_out=../  --zrpc_out=../ --style=goZero
#    去除proto中的json的omitempty
#    mac: sed -i &quot;&quot; &#39;s/,omitempty//g&#39; *.pb.go
#    linux: sed -i &#39;s/,omitempty//g&#39; *.pb.go

# 创建kafka的topic
# kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 -partitions 1 --topic {topic}
# 查看消费者组情况
# kafka-consumer-groups.sh --bootstrap-server kafka:9092 --describe --group {group}
# 命令行消费
# ./kafka-console-consumer.sh  --bootstrap-server kafka:9092  --topic looklook-log   --from-beginning
# 命令生产
# ./kafka-console-producer.sh --bootstrap-server kafka:9092 --topic second
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>无service的proto</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>protoc -I ./ --go_out=paths=source_relative:. --go-grpc_out=paths=source_relative:. userModel.proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>sql2pb</p><blockquote><p>参考：https://github.com/Mikaelemmmm/sql2pb</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sql2pb -go_package ./pb -host localhost -port 3306  -package pb -user root -password 密码 -schema go_zero -service_name ordercenter &gt; ordercenter.prot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="疑问" tabindex="-1"><a class="header-anchor" href="#疑问" aria-hidden="true">#</a> 疑问</h3><ul><li>调用rpc后返回对象，如何定义、使用？</li><li>Logx 使用</li><li></li></ul>`,37);function F(U,W){const i=d("ExternalLinkIcon");return s(),r("div",null,[u,e("table",null,[c,e("tbody",null,[e("tr",null,[v,m,e("td",null,[e("a",p,[n("https://go-zero.dev"),t(i)])]),e("td",null,[e("a",h,[n("https://github.com/zeromicro/go-zero"),t(i)])]),b]),e("tr",null,[g,q,e("td",null,[e("a",x,[n("https://go-kratos.dev/"),t(i)])]),e("td",null,[e("a",_,[n("https://github.com/go-kratos/kratos"),t(i)])]),f]),e("tr",null,[k,y,e("td",null,[e("a",w,[n("https://tarscloud.gitbook.io/tarsdocs/"),t(i)])]),e("td",null,[e("a",z,[n("https://github.com/TarsCloud/TarsGo"),t(i)])]),C]),e("tr",null,[M,S,e("td",null,[e("a",P,[n("https://dubbo.apache.org/zh/docs/languages/golang/"),t(i)])]),e("td",null,[e("a",N,[n("https://github.com/apache/dubbo-go"),t(i)])]),T]),e("tr",null,[G,O,E,e("td",null,[e("a",j,[n("https://github.com/asim/go-micro"),t(i)])]),A]),e("tr",null,[I,J,H,e("td",null,[e("a",B,[n("https://github.com/go-kit/kit"),t(i)])]),R]),e("tr",null,[Q,Z,e("td",null,[e("a",K,[n("https://jupiter.douyu.com/"),t(i)])]),e("td",null,[e("a",D,[n("https://github.com/zeromicro/go-zero"),t(i)])]),L])])]),V])}const Y=l(o,[["render",F],["__file","20220505_go.html.vue"]]);export{Y as default};
