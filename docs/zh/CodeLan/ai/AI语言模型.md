# AI语言模型

盘古、通义千问、文心一言和ChatGPT

## 概念

* 神经网络：AI的一种重要的计算模型
* 深度学习：通过神经网络实现特征学习和模式分析，大量用于图像识别等领域

## 分类

### 训练方法

>  根据训练方法的不同，机器学习可以分为四类: 监督学习、无监督学习、半监督学习、强化学习

* 监督学习：监督学习是用正确答案已知的例子来训练神经网络，也就是用标记过的数据。
* 无监督学习: 无监督学习 中使用的数据是没有标记过的，即不知道输入数据对应的输出结果是什么。无监督学习只能默默的读取数据，自己寻找数据的模型和规律，比如聚类（把相似数据归为一组）和异常检测（寻找异常）
* 半监督学习:半监督学习训练中使用的数据，只有一小部分是标记过的，而大部分是没有标记的。因此和监督学习相比，半监督学习的成本较低，但是又能达到较高的准确度。
* 强化学习: 强化学习也是使用未标记的数据，但是可以通过某种方法知道你是离正确答案越来越近还是越来越远（即奖惩函数）

## 参考：



### 初步试探AI小模型

> 零基础AI入门指南: `https://www.liaoxuefeng.com/article/1543329456062498`

* 根据作者的步骤运行项目，了解大概步骤
* 运行出现Numpy2.0不支持，pip 安装 `pip install numpy==1.26.4`

![人工智能、机器学习与深度学习之间的关系](https://segmentfault.com/img/remote/1460000043004537)



### 8个学习AI的网站（免费自学人工智能必备）

> `https://www.xue8nav.com/2090.html`

* 《适用于所有人的人工智能课程》英文，暂不学习
* 《动手学深度学习》中文 : 动手学深度学习.md

<font color=red>**水平不够，学习吃力**</font>



## 千问

> 阿里出品
>
> 在线问答：https://qianwen.aliyun.com/

《阿里AI.md》



## Ollama

> https://zhuanlan.zhihu.com/p/690046494

https://cloud.tencent.com/developer/article/2411429

* 离线

  ```
  https://blog.csdn.net/u010197332/article/details/137604798
  ```

* Open-webui

  ```
  https://zhuanlan.zhihu.com/p/694422278
  
  基于 WebUI 部署 Ollama 可视化对话界面
  Ollama自带控制台对话界面体验总归是不太好，接下来部署 Web 可视化聊天界面：
  
  下载并安装 Node.js 工具：https://nodejs.org/zh-cn
  下载ollama-webui工程代码：git clone https://github.com/ollama-webui/ollama-webui-lite ollama-webui
  切换ollama-webui代码的目录：cd ollama-webui
  设置 Node.js 工具包镜像源（下载提速）：npm config set registry http://mirrors.cloud.tencent.com/npm/
  安装 Node.js 依赖的工具包：npm install
  最后，启动 Web 可视化界面：npm run dev
  ```
  
  
