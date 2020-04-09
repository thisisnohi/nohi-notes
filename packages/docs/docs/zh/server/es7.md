### es7

```
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.3.0

docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag(7.3.0)
```

* 官方：

  * https://hub.docker.com/_/elasticsearch

  * Create user defined network (useful for connecting to other services attached to the same network (e.g. Kibana)):

    ```
    $ docker network create somenetwork
    ```

    Run Elasticsearch:

    ```
    $ docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag
    ```

### elasticsearch head

> https://www.cnblogs.com/wxy0126/p/11381598.html



```
elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.2.0/elasticsearch-analysis-ik-7.2.0.zip

docker run -d --name elasticsearch-head -p 9100:9100 docker.io/mobz/elasticsearch-head:5
```

* 406错误

  >https://blog.csdn.net/ge_csdn/article/details/100125123

* 

### Kibana

> https://segmentfault.com/a/1190000020140461

* 安装ik分词器

  ```
  cd /usr/share/elasticsearch/plugins/
  elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.3.0/elasticsearch-analysis-ik-7.3.0.zip
  exit
  docker restart elasticsearch 
  ```

* 运行kibana

  * 配置文件
    * 

  ```
  docker run --name kibana --link=elasticsearch:es7 -p 5601:5601 -v /Users/nohi/data/docker/volumes/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml -d kibana:7.3.0
  docker start kibana
  ```

* 使用

  > https://www.cnblogs.com/wangzhuxing/p/9693707.html

### logstash

> https://www.cnblogs.com/time-read/p/10981731.html



* 配置文件：

  * logstash.conf

    ```
    # input{
    #  file{
    #    path=>"/tmp/nginx/logs/access.log"
    #  }
    # }
    input {
        beats {
            port => "5044"
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
        hosts => "http://172.17.0.1:9200/"
        index => "logstash"
        document_type => "doc"
      }
    }
    ```

  * logstash.yml

    ```
    http.host: "0.0.0.0"
    xpack.monitoring.enabled: false
    xpack.monitoring.elasticsearch.hosts: [ "http://elasticsearch:9200" ]
    ```

    

```
docker pull docker.elastic.co/logstash/logstash:7.3.0
docker pull logstash:7.3.0

docker run -p 5044:5044 --name logstash -d \
    -v /Users/nohi/data/docker/volumes/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
    logstash:7.3.0

直接读取/Users/nohi/app/logstash.log --> es
参见：https://blog.csdn.net/devcloud/article/details/99681107
docker run -p 5044:5044 --name logstash -d \
    -v /Users/nohi/data/docker/volumes/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
    -v /Users/nohi/data/docker/volumes/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml   \
    -v /Users/nohi/app/logstash.log:/tmp/nginx/logs/access.log \
    logstash:7.3.0 
```

* Filebeat -> logstash



### filebeat

> https://www.cnblogs.com/time-read/p/10981731.html

```
docker pull docker.elastic.co/beats/filebeat:7.3.0

docker run --name filebeat -d \
    -v /app/logs/:/var/log/:ro \
    -v /Users/nohi/data/docker/volumes/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml \
    docker.elastic.co/beats/filebeat:7.3.0
```



## ES系列

> https://www.cnblogs.com/wangzhuxing/p/9385365.html

### 基础概念

* 索引：数据库
* 索引类型：表
* 文档：row -> 唯一标识
* 映射：表结构

### 核心概念

* 分片
* 副本：replica

### 应用场景

> 站内搜索、NoSQL数据库、日志分析、数据分析

### 分词器

​		全文搜索引擎会用某种算法对要建索引的文档进行分析， 从文档中提取出若干Token(词元)， 这些算法称为Tokenizer(分词器)， 这些Token会被进一步处理， 比如转成小写等， 这些处理算法被称为Token Filter(词元处理器), 被处理后的结果被称为Term(词)， 文档中包含了几个这样的Term被称为Frequency(词频)。 引擎会建立Term和原文档的Inverted Index(倒排索引)， 这样就能根据Term很快到找到源文档了。 文本被Tokenizer处理前可能要做一些预处理， 比如去掉里面的HTML标记， 这些处理的算法被称为Character Filter(字符过滤器)， 这整个的分析算法被称为Analyzer(分析器)。

​		ES内置了很多Analyzer, 还有很多第三方的Analyzer插件， 比如一些处理中文的Analyzer(中文分词)。







