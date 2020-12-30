# GraphiQL

> create by nohi 202021028

## 目录

* 环境搭建
* 如何使用
* 如何整合
* 落地

## 网站

* https://graphql.cn/

## 环境搭建

* springboot-graphql
  * 源码： https://github.com/dionylon/springboot-graphql
  * 问题：
    * 需要mogodb
    * 没有初始化数据
* graphql
  * 源码： https://github.com/windhan2100/graphql
  * http://localhost:8080/graphiql
* 其他： https://www.cnblogs.com/chenglc/p/11103269.html

## NOTE

* 操作类型 名称 片段

  ```
  query abc {
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
  ```

* 保存修改

  ```
  mutation newAuthor{
    newAuthor(
      lastName: "aaa"
      firstName: "bbb"
    ) {
      id
      lastName,
      firstName
    }
  }
  
  
  ```

  



