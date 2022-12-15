# 第4章 NumPy基础：数组和矢量计算

NumPy（Numerical Python的简称）是Python数值计算最重要的基础包。大多数提供科学计算的包都是用NumPy的数组作为构建基础。

NumPy的部分功能如下：

- ndarray，一个具有矢量算术运算和复杂广播能力的快速且节省空间的多维数组。
- 用于对整组数据进行快速运算的标准数学函数（无需编写循环）。
- 用于读写磁盘数据的工具以及用于操作内存映射文件的工具。
- 线性代数、随机数生成以及傅里叶变换功能。
- 用于集成由C、C++、Fortran等语言编写的代码的A C API

## 4.1 NumPy的ndarray：一种多维数组对象

* 随机数据的小数组

  ```
  In [12]: import numpy as np
  
  # Generate some random data
  In [13]: data = np.random.randn(2, 3)
  
  In [14]: data
  Out[14]: 
  array([[-0.2047,  0.4789, -0.5194],
         [-0.5557,  1.9658,  1.3934]])
  ```

* 数据运算

  ```
  In [15]: data * 10
  Out[15]: 
  array([[ -2.0471,   4.7894,  -5.1944],
         [ -5.5573,  19.6578,  13.9341]])
  
  In [16]: data + data
  Out[16]: 
  array([[-0.4094,  0.9579, -1.0389],
         [-1.1115,  3.9316,  2.7868]])
  ```

* ndarray是一个通用的同构数据多维容器

  ```
  In [17]: data.shape
  Out[17]: (2, 3)
  
  In [18]: data.dtype
  Out[18]: dtype('float64')
  ```

### 创建ndarray

创建数组最简单的办法就是使用array函数

* 指定类型：numeric_strings = np.array(['1.25', '-9.6', '42'], dtype=np.string_)

* 转换类型

  ```
  In [44]: numeric_strings = np.array(['1.25', '-9.6', '42'], dtype=np.string_)
  
  In [45]: numeric_strings.astype(float)
  Out[45]: array([  1.25,  -9.6 ,  42.  ])
  ```

### NumPy数组的运算

* 大小相等的数组之间的任何算术运算都会将运算应用到元素级
* 大小相同的数组之间的比较会生成布尔值数组

* 不同大小的数组之间的运算叫做广播

### 基本的索引和切片

* 切片：arr[5:8]
* 切片的一份副本而非视图 `arr[5:8].copy()`

### 切片索引

### 布尔型索引

```
In [98]: names = np.array(['Bob', 'Joe', 'Will', 'Bob', 'Will', 'Joe', 'Joe'])
In [99]: data = np.random.randn(7, 4)
In [100]: names
Out[100]: 
array(['Bob', 'Joe', 'Will', 'Bob', 'Will', 'Joe', 'Joe'],
      dtype='<U4')
In [102]: names == 'Bob'
Out[102]: array([ True, False, False,  True, False, False, False], dtype=bool)     
```

### 数组转置和轴对换

```
In [126]: arr = np.arange(15).reshape((3, 5))

In [127]: arr
Out[127]: 
array([[ 0,  1,  2,  3,  4],
       [ 5,  6,  7,  8,  9],
       [10, 11, 12, 13, 14]])

In [128]: arr.T
Out[128]: 
array([[ 0,  5, 10],
       [ 1,  6, 11],
       [ 2,  7, 12],
       [ 3,  8, 13],
       [ 4,  9, 14]])
```

* np.dot计算矩阵内积：

## 4.2 通用函数：快速的元素级数组函数

## 4.3 利用数组进行数据处理

## 4.4 用于数组的文件输入输出

* np.save和np.load是读写磁盘数组数据的两个主要函数。默认情况下，数组是以未压缩的原始二进制格式保存在扩展名为.npy的文件中的：np.save('some_array', arr)

## 4.5 线性代数

## 4.6 伪随机数生成

## 4.7 随机漫步

```
import random
position = 0
walk = [position]
steps = 1000
for i in range(steps):
    step = 1 if random.randint(0, 1) else -1
    position += step
    walk.append(position)
```

```
 plt.plot(walk[:100])
```

![img](https://upload-images.jianshu.io/upload_images/7178691-80e85ae6b9c89ada.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



![img](https://upload-images.jianshu.io/upload_images/7178691-dcdb66e49e5f70ea.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



![img](https://upload-images.jianshu.io/upload_images/7178691-97ba09c96dab93a2.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

![img](https://upload-images.jianshu.io/upload_images/7178691-6ed04fae3d1178e2.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)
