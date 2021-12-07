## [ Python语法基础，IPython和Jupyter Notebooks](https://www.jianshu.com/p/fc93e943e94a)

> create by nohi 20210803



### 2.1 Python解释器

#### Jupyter Notebook

*  运行Jupyter Notebook

* ```csharp
  jupyter notebook
  ```

* 自省:  ?     ??

*  %run命令

  ```
  %run ipython_script_test.py
  ```

* %load 将脚本导入到一个代码格中

  ```
  %load ipython_script_test.py
  ```

* 中断运行的代码  Ctrl-C

* 从剪贴板执行程序

  * `%paste`可以直接运行剪贴板中的代码
  * `%cpaste`功能类似，但会给出一条提示：

#### 集成Matplotlib

```
 %matplotlib inline
 import matplotlib.pyplot as plt
 plt.plot(np.random.randn(50).cumsum())
```



### 2.3 Python语法基础

