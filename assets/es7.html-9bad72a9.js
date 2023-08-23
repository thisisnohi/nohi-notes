import{_ as e,p as i,q as a,a1 as s}from"./framework-449724a9.js";const l={},n=s(`<h1 id="es7" tabindex="-1"><a class="header-anchor" href="#es7" aria-hidden="true">#</a> es7</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; elasticsearch:7.3.0

docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; elasticsearch:tag(7.3.0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>官方：</p><ul><li><p>https://hub.docker.com/_/elasticsearch</p></li><li><p>Create user defined network (useful for connecting to other services attached to the same network (e.g. Kibana)):</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker network create somenetwork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Run Elasticsearch:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; elasticsearch:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="elasticsearch-head" tabindex="-1"><a class="header-anchor" href="#elasticsearch-head" aria-hidden="true">#</a> elasticsearch head</h3><blockquote><p>https://www.cnblogs.com/wxy0126/p/11381598.html</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.2.0/elasticsearch-analysis-ik-7.2.0.zip

docker run -d --name elasticsearch-head -p 9100:9100 docker.io/mobz/elasticsearch-head:5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>406错误</p><blockquote><p>https://blog.csdn.net/ge_csdn/article/details/100125123</p></blockquote></li><li></li></ul><h3 id="kibana" tabindex="-1"><a class="header-anchor" href="#kibana" aria-hidden="true">#</a> Kibana</h3><blockquote><p>https://segmentfault.com/a/1190000020140461</p></blockquote><ul><li><p>安装ik分词器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /usr/share/elasticsearch/plugins/
elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.3.0/elasticsearch-analysis-ik-7.3.0.zip
exit
docker restart elasticsearch 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行kibana</p><ul><li>配置文件 *</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run --name kibana --link=elasticsearch:es7 -p 5601:5601 -v /Users/nohi/data/docker/volumes/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml -d kibana:7.3.0
docker start kibana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用</p><blockquote><p>https://www.cnblogs.com/wangzhuxing/p/9693707.html</p></blockquote></li></ul><h3 id="logstash" tabindex="-1"><a class="header-anchor" href="#logstash" aria-hidden="true">#</a> logstash</h3><blockquote><p>https://www.cnblogs.com/time-read/p/10981731.html</p></blockquote><ul><li><p>配置文件：</p><ul><li><p>logstash.conf</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># input{
#  file{
#    path=&gt;&quot;/tmp/nginx/logs/access.log&quot;
#  }
# }
input {
    beats {
        port =&gt; &quot;5044&quot;
    }
}
# The filter part of this file is commented out to indicate that it is
# optional.
# filter {
#
# }
output{
  stdout{     }
 
  elasticsearch{
    hosts =&gt; &quot;http://172.17.0.1:9200/&quot;
    index =&gt; &quot;logstash&quot;
    document_type =&gt; &quot;doc&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>logstash.yml</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http.host: &quot;0.0.0.0&quot;
xpack.monitoring.enabled: false
xpack.monitoring.elasticsearch.hosts: [ &quot;http://elasticsearch:9200&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker pull docker.elastic.co/logstash/logstash:7.3.0
docker pull logstash:7.3.0

docker run -p 5044:5044 --name logstash -d \\
    -v /Users/nohi/data/docker/volumes/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \\
    logstash:7.3.0

直接读取/Users/nohi/app/logstash.log --&gt; es
参见：https://blog.csdn.net/devcloud/article/details/99681107
docker run -p 5044:5044 --name logstash -d \\
    -v /Users/nohi/data/docker/volumes/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \\
    -v /Users/nohi/data/docker/volumes/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml   \\
    -v /Users/nohi/app/logstash.log:/tmp/nginx/logs/access.log \\
    logstash:7.3.0 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Filebeat -&gt; logstash</li></ul><h3 id="filebeat" tabindex="-1"><a class="header-anchor" href="#filebeat" aria-hidden="true">#</a> filebeat</h3><blockquote><p>https://www.cnblogs.com/time-read/p/10981731.html</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker pull docker.elastic.co/beats/filebeat:7.3.0

docker run --name filebeat -d \\
    -v /app/logs/:/var/log/:ro \\
    -v /Users/nohi/data/docker/volumes/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml \\
    docker.elastic.co/beats/filebeat:7.3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es系列" tabindex="-1"><a class="header-anchor" href="#es系列" aria-hidden="true">#</a> ES系列</h2><blockquote><p>https://www.cnblogs.com/wangzhuxing/p/9385365.html</p></blockquote><h3 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念" aria-hidden="true">#</a> 基础概念</h3><ul><li>索引：数据库</li><li>索引类型：表</li><li>文档：row -&gt; 唯一标识</li><li>映射：表结构</li></ul><h3 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h3><ul><li>分片</li><li>副本：replica</li></ul><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><blockquote><p>站内搜索、NoSQL数据库、日志分析、数据分析</p></blockquote><h3 id="分词器" tabindex="-1"><a class="header-anchor" href="#分词器" aria-hidden="true">#</a> 分词器</h3><p>​ 全文搜索引擎会用某种算法对要建索引的文档进行分析， 从文档中提取出若干Token(词元)， 这些算法称为Tokenizer(分词器)， 这些Token会被进一步处理， 比如转成小写等， 这些处理算法被称为Token Filter(词元处理器), 被处理后的结果被称为Term(词)， 文档中包含了几个这样的Term被称为Frequency(词频)。 引擎会建立Term和原文档的Inverted Index(倒排索引)， 这样就能根据Term很快到找到源文档了。 文本被Tokenizer处理前可能要做一些预处理， 比如去掉里面的HTML标记， 这些处理的算法被称为Character Filter(字符过滤器)， 这整个的分析算法被称为Analyzer(分析器)。</p><p>​ ES内置了很多Analyzer, 还有很多第三方的Analyzer插件， 比如一些处理中文的Analyzer(中文分词)。</p>`,29),t=[n];function d(r,c){return i(),a("div",null,t)}const u=e(l,[["render",d],["__file","es7.html.vue"]]);export{u as default};
