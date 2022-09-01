---
sidebar: auto
---
## vim

> create by nohi 20191211
>
> https://www.toutiao.com/a6768939994401735181/?tt_from=copy_link&utm_campaign=client_share&timestamp=1576024660&app=news_article&utm_source=copy_link&utm_medium=toutiao_ios&req_id=2019121108374001002302815409BDEF42&group_id=6768939994401735181

### 移动光标

* Kjlh  上下左右   n+kjlh 上下n行、n字符
* w 右移字首
* b 左移字首
* e 右移字尾
* () {}   句首、句尾 （使用时是文章头、文章尾）
* **0 行首  $ 行尾**
* gg 第一行  G 最后一行

* H M L  移至当前屏幕 头、中间、尾行

### 屏幕滚动

* ctrl+u 向上半屏
* ctrl+d 向下半屏
* ctrl+f 向下一屏
* ctrl+b 向上一屏
* nz  第nt行至屏幕顶部，不指定n，当前行至屏幕顶部

### 搜索及替换

* /pattern 从光标开始处向文件尾搜索
* ?pattern 从光标开始处向文件首搜索pattern
* n  重复上一次搜索命令
* N  反方向重复上一次搜索命令
* :s/p1/p2/g   将当前行中所有p1均替换为p2, g表示执行 c表示需要确认
* :n1,n2 s/p1/p2/g
* :g/p1/s//p2/g   === :%s/vivian/sky/g  将文件中所有p1替换为p2

### 编辑

* CW/DW 删除单词
