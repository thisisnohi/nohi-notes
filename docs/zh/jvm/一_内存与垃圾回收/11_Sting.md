# 11 String



## 1. String的基本特性

* 字符串： String s1 = ""; new String("");
  * "abc" // 字面量定义方式，“abc”存储在字符串常量池中
* String声明为final的，不可被继承
* 实现了Serializable支持序列化，实现Comparable接口可比较大小
* jdk1.8及之前，存储为char[]，jdk9及之后改为byte[]
  * 大部分存储是latin文件，只需要一半存储
  * 改防byte数组：IOS-8859-1/latin一个字节存储，其他两个字节
* 不可变字符序列，不可变性
* 字符串常量池中是不会存储相同内容的字符串
* 字符串常量池链表大小： -XX:StringTableSize=1009 
  * jdk6之前是1009
  * jdk7默认60013 
  * jkd8,1009最小值

## 2 String的内存分配

* 常量池
  * String s = "aaaa"
  * String.intern()方法
  * jdk1.6 在永久代中分配
  * jdk1.7及之后 在堆中

## 3 String的基本操作

## 4 字符串拼接操作

* 常量拼接在常量池中

* 只要有一个是变量则在堆中

* String.intern()判断字符串在不在常量池中中，不在创建，在直接返回地址

* DEMO

  ```java 
      public void testString(){
          String s01 = "Hello";
          String s02 = "World";
  
          String s1 = "HelloWorld";
          String s2 = new String("HelloWorld");
          System.out.println("1:s1.equals(2):" + s1.equals(s2));
          System.out.println("2:s1 == s2:" + (s1 == s2));
          s2 = new String("HelloWorld").intern();
          System.out.println("3:s1 == s2(String.intern()):" + (s1 == s2));
  
          s2 = "Hello" + "World";
          System.out.println("4:s1 == s2(\"Hello\" + \"World\"):" + (s1 == s2));
  
          s2 = s01 + s02;
          System.out.println("5:s1 == s2(s2 = s01 + s02):" + (s1 == s2));
        
          final String s21 = s01;
          final String s22 = s02;
          String s23 = s21 + s22;
          System.out.println("6:s1 == s2(s2 = final s01 + final s02):" + (s1 == s23));
          final String s31 = "Hello";
          final String s32 = "World";
          s23 = s31 + s32;
          System.out.println("7:s1 == s2(s2 = final s01 + final s02):" + (s1 == s23));
      }
  ```

  ```java 
  1:s1.equals(2):true
  2:s1 == s2:false
  3:s1 == s2(String.intern()):true
  4:s1 == s2("Hello" + "World"):true
  5:s1 == s2(s2 = s01 + s02):false
  6:s1 == s2(s2 = final s01 + final s02):false
  7:s1 == s2(s2 = final s01 + final s02):true
  ```

* 问题

  * String a = new String("a") 有几个对象，如何证明？

    ```
    2两个：一个是new关键字在堆空间创建的对象，另一个是字符串常量池中对象“a”
    查看字节码 "a"为ldc
    ```

  * new String("a") + new String("b") 创建几个对象

    ```
    
    1. StringBuilder
    2. new String("a")的new
    3. 常量池中的"a"
    4. new String("b")的new
    5. 常量池中的“b”
    
    StringBuilder的toString():
      对象6：new String("ab")
    
    ```

  ## 5 intern()

  * 代码：

    ```java 
       @Test
        public void testInter(){
            String a = new String("a") + new String("b");
            // 保证堆中只有一份相同值： if only if
            // intern()方法：查找常量池中是否存在"ab",如果不存在，则常量池中分配索引指向堆中已有对象“ab”地址
            // 如果存在，则返回常量池中地址
            a.intern();
            String b = "ab";
            System.out.println("a==b ? " + (a == b));
        }
        @Test
        public void testInter2(){
            String a = new String("a") + new String("b");
            String b = "ab";
            String c = a.intern();
            System.out.println("a==b ? " + (a == b)); // jdk6 false  jdk7及以后 true
            System.out.println("c==b ? " + (c == b));
        }
    ```

  ## 6 intern()空间占用

  * 程序中存在大量重复字符串，使用intern()方法，可以减少大量空间。

  *  StringTable 垃圾回收

    * -XX:+PrintStringTableStatistics

      ```java
      /**
      * 增加参数设置
      *   -Xmn10m -Xmx10m -XX:+PrintStringTableStatistics -XX:+PrintGC
      * @param args
      */
      public static void main(String[] args) {
        for (int i = 0; i < 1000000; i++) {
          String.valueOf(i).intern();
        }
      }
      
      [GC (Allocation Failure)  7680K->616K(9216K), 0.0035358 secs]
      [GC (Allocation Failure)  8296K->664K(9216K), 0.0026172 secs]...
      [Full GC (Ergonomics)  493K->420K(9216K), 0.0044161 secs]
      SymbolTable statistics:
      Number of buckets       :     20011 =    160088 bytes, avg   8.000
      Number of entries       :     12211 =    293064 bytes, avg  24.000
      Number of literals      :     12211 =    469920 bytes, avg  38.483
      Total footprint         :           =    923072 bytes
      Average bucket size     :     0.610
      Variance of bucket size :     0.611
      Std. dev. of bucket size:     0.781
      Maximum bucket size     :         6
      StringTable statistics:
      Number of buckets       :     60013 =    480104 bytes, avg   8.000
      Number of entries       :     51383 =   1233192 bytes, avg  24.000
      Number of literals      :     51383 =   2887624 bytes, avg  56.198
      Total footprint         :           =   4600920 bytes
      Average bucket size     :     0.856
      Variance of bucket size :     0.669
      Std. dev. of bucket size:     0.818
      Maximum bucket size     :         5
      ```

    ## 7 String 垃圾回收

