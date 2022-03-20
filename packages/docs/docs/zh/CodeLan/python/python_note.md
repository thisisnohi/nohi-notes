# Python3



## 环境配置

> 参考：https://blog.csdn.net/Lionel_yl/article/details/112611080
>
> https://www.jianshu.com/p/ac1ac8cb0973

* 指定安装源： pip3 install numpy -i https://pypi.douban.com/simple/
* 安装pyenv: brew install pyenv

### 安装源

```
https://www.python.org/ftp/python
http://npm.taobao.org/mirrors/python/
https://www.python.org/ftp/python/
```



## Python 安装

* 编译环境：

  ```
  yum install bzip2-devel expat-devel gdbm-devel ncurses-devel openssl-devel readline-devel sqlite-devel tk-devel xz-devel zlib-devel wget
  ```

* 下载安装包：wget https://cdn.npm.taobao.org/dist/python/3.9.5/Python-3.9.5.tgz （地址见安装源，版本自选）

  * 2.7.18： https://cdn.npm.taobao.org/dist/python/2.7.18/Python-2.7.18.tgz

* 编译&安装

  ```
  解压：tar -zxvf Python-3.9.5.tgz
  cd Python-3.9.5
  ./configure --enable-optimizations
  make && make altinstall
  ```

* 建立软件链接

  ```
  ln -s /usr/local/bin/python3.9 /usr/bin/python3
  ln -s /usr/local/bin/pip3.9 /usr/bin/pip3
  ```

## supervisor

* 启动：

  * supervisord -c /etc/supervisord.conf 

* 启动服务： supervisorctl stop py3

  * supervisorctl start dytt

* 问题

  * supervisorctl status： Server requires authentication

    ```shell
    因为你设置访问账号密码，所以只能先supervisorctl进去
    ```

    



## pyenv常用命令

* 查看python版本: pyenv versions
* 查看可下载版本: pyenv install -l 
* 安装： pyenv install <version>
* 切换版本： pyenv global <version>



## Centos pyenv

> 参考： https://blog.csdn.net/kuang99csdn/article/details/102997630

### 1.安装

* 安装pyenv

  ```
  git clone https://github.com/pyenv/pyenv.git ~/.pyenv
  # 如果速度慢，国内可以使用
  git clone https://gitee.com/mirrors/pyenv.git ~/.pyenv
  ```

* 安装pyenv-virtualenv

  ```
  git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
  # 如果速度比较慢，国内可以使用
  git clone https://gitee.com/baliadd/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
  ```

* 配置环境变量

  ```
  echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
  echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
  echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile
  echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
  ```

## 2.使用

* 创建虚拟环境

  ```
  pyenv virtualenv 3.9.5 venv3.9.5
  ```

* 查看虚拟环境

  ```
  pyenv virtualenvs
  ```

* 指定目录虚拟环境(进入某个目录)

  * 指定虚拟环境： 

    ```shell
    pyenv local venv3.9.5 
    进入该目录后自动切换环境，退出还原
    ```

  * 查看当前虚拟环境

    ```shell
    pyenv version
    ```

    

## Django笔记

### 安装

* pip3 install Django  -i https://pypi.douban.com/simple/

## 笔记

* 创建项目:django-admin startproject HelloWorld
* 创建APP:django-admin startapp TestModel

### 模型

* python3 manage.py migrate   # 创建表结构

* python3 manage.py makemigrations TestModel  # 让 Django 知道我们在我们的模型有一些变更

  ```
  python manage.py makemigrations polls
  ```

* python3 manage.py migrate TestModel   # 创建表结构

* 三步都得执行 *

### 管理工具

* python3 manage.py createsuperuser 来创建超级用户

### templates

* 模板文件路径配置
	* settings.py : TEMPLATES ... 'DIRS': [BASE_DIR+"/templates",],

### 国际化

> 参考：https://blog.csdn.net/weixin_40647516/article/details/102746791

#### settings修改

* MIDDLEWARE 节点增加  'django.middleware.locale.LocaleMiddleware',

* 增加LANGUAGES和LOCAL_PATHS 节点

  ```
  LANGUAGES = (
      ('zh-hans', '中文简体'),
      ('en', 'English'),
  )
  LOCALE_PATHS = (
      os.path.join(BASE_DIR, 'locale'),
  )
  ```

* 生成翻译文件： django-admin makemessages -l zh_hans

* 生成翻译:  django-admin compilemessages 