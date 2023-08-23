import{_ as i,p as e,q as l,a1 as n}from"./framework-449724a9.js";const a={},d=n(`<h1 id="graphiql" tabindex="-1"><a class="header-anchor" href="#graphiql" aria-hidden="true">#</a> GraphiQL</h1><blockquote><p>create by nohi 202021028</p></blockquote><h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2><ul><li>环境搭建</li><li>如何使用</li><li>如何整合</li><li>落地</li></ul><h2 id="网站" tabindex="-1"><a class="header-anchor" href="#网站" aria-hidden="true">#</a> 网站</h2><ul><li>https://graphql.cn/</li></ul><h2 id="环境搭建" tabindex="-1"><a class="header-anchor" href="#环境搭建" aria-hidden="true">#</a> 环境搭建</h2><ul><li>springboot-graphql <ul><li>源码： https://github.com/dionylon/springboot-graphql</li><li>问题： <ul><li>需要mogodb</li><li>没有初始化数据</li></ul></li></ul></li><li>graphql <ul><li>源码： https://github.com/windhan2100/graphql</li><li>http://localhost:8080/graphiql</li></ul></li><li>其他： https://www.cnblogs.com/chenglc/p/11103269.html</li></ul><h2 id="note" tabindex="-1"><a class="header-anchor" href="#note" aria-hidden="true">#</a> NOTE</h2><ul><li><p>操作类型 名称 片段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>query abc {
   a: findBookById(id: 302) {
    ...com1
  }
  b: findBookById(id: 303) {
    ...com1
  }
}

fragment com1 on Book {
  id
  title
  pageCount
  author {
    id
    lastName
    firstName
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>保存修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mutation newAuthor{
  newAuthor(
    lastName: &quot;aaa&quot;
    firstName: &quot;bbb&quot;
  ) {
    id
    lastName,
    firstName
  }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,10),s=[d];function r(t,c){return e(),l("div",null,s)}const v=i(a,[["render",r],["__file","GraphiQL.html.vue"]]);export{v as default};
