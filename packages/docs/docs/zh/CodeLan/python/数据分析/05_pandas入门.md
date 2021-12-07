# pandas入门

> create by nohi 20210808

## 5.1 pandas的数据结构介绍

### Series

```
obj = pd.Series([4, 7, -5, 3])
指定索引
obj2 = pd.Series([4, 7, -5, 3], index=['d', 'b', 'a', 'c'])
-- 通过字典初始化
In [26]: sdata = {'Ohio': 35000, 'Texas': 71000, 'Oregon': 16000, 'Utah': 5000}
In [27]: obj3 = pd.Series(sdata)
```

### DataFrame

* 修改值：data.loc[0,'message'] = 'NOHI'

* 创建

```
data = {'state': ['Ohio', 'Ohio', 'Ohio', 'Nevada', 'Nevada', 'Nevada'],
        'year': [2000, 2001, 2002, 2001, 2002, 2003],
        'pop': [1.5, 1.7, 3.6, 2.4, 2.9, 3.2]}
frame = pd.DataFrame(data)
```

* 对于特别大的DataFrame，head方法会选取前五行：frame.head()
* 指定了列序列： pd.DataFrame(data, columns=['year', 'state', 'pop'])
* 行也可以通过位置或名称的方式进行获取，比如用loc属： frame2.loc['three']

* 添加列：frame2['eastern'] = frame2.state == 'Ohio'
* 删除列： del frame2['eastern']

* 嵌套字典：

  ```
  In [65]: pop = {'Nevada': {2001: 2.4, 2002: 2.9},'Ohio': {2000: 1.5, 2001: 1.7, 2002: 3.6}}
  In [66]: frame3 = pd.DataFrame(pop)
  
  In [67]: frame3
  Out[67]: 
        Nevada  Ohio
  2000     NaN   1.5
  2001     2.4   1.7
  2002     2.9   3.6
  ```

### 索引对象

## 5.2 基本功能

### 重新索引

```
obj = pd.Series([4.5, 7.2, -5.3, 3.6], index=['d', 'b', 'a', 'c'])
obj2 = obj.reindex(['a', 'b', 'c', 'd', 'e'])


In [95]: obj3 = pd.Series(['blue', 'purple', 'yellow'], index=[0, 2, 4])

In [96]: obj3
Out[96]: 
0      blue
2    purple
4    yellow
dtype: object
-- 填充
In [97]: obj3.reindex(range(6), method='ffill')
Out[97]: 
0      blue
1      blue
2    purple
3    purple
4    yellow
5    yellow
dtype: object
```

* 列可以用columns关键字重新索引：

  ```
  In [98]: frame = pd.DataFrame(np.arange(9).reshape((3, 3)),
     ....:                      index=['a', 'c', 'd'],
     ....:                      columns=['Ohio', 'Texas', 'California'])
  
  In [99]: frame
  Out[99]: 
     Ohio  Texas  California
  a     0      1           2
  c     3      4           5
  d     6      7           8
  
  In [100]: frame2 = frame.reindex(['a', 'b', 'c', 'd'])
  
  In [101]: frame2
  Out[101]: 
     Ohio  Texas  California
  a   0.0    1.0         2.0
  b   NaN    NaN         NaN
  c   3.0    4.0         5.0
  d   6.0    7.0         8.0
  states = ['Texas', 'Utah', 'California']
  frame.reindex(columns=states)
  ```

 ### 丢弃指定轴上的项

* ```python
  obj.drop(['d', 'c'])
  ```

* 通过传递axis=1或axis='columns'可以删除列的值：

  ```
  data = pd.DataFrame(np.arange(16).reshape((4, 4)),index=['Ohio', 'Colorado', 'Utah', 'New York'],columns=['one', 'two', 'three', 'four'])
  data.drop(['Colorado', 'Ohio'])
  data.drop('two', axis=1)
  ```

### 用loc和iloc进行选取

* ```python
  data.loc['Colorado', ['two', 'three']]
  ```

* ```
  data.iloc[2, [3, 0, 1]] 
  iloc[2: 第三行（2+1）
  [3，0，1] ，显示的列索引
  ```

### 算术运算和数据对齐

* 自动的数据对齐操作在不重叠的索引处引入了NA值。缺失值会在算术运算过程中传播。
* 对于DataFrame，对齐操作会同时发生在行和列上

### 在算术方法中填充值

* df1.add(df2, fill_value=0)
* df1.reindex(columns=df2.columns, fill_value=0)

## 5.3 汇总和计算描述统计

* ## 相关系数与协方差

* 

