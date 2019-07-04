# Django笔记

## 笔记
* 创建项目:django-admin startproject HelloWorld
* 创建APP:django-admin startapp TestModel

### 模型
* python3 manage.py migrate   # 创建表结构
* python3 manage.py makemigrations TestModel  # 让 Django 知道我们在我们的模型有一些变更
* python3 manage.py migrate TestModel   # 创建表结构

* 三步都得执行 *

### 管理工具
* python3 manage.py createsuperuser 来创建超级用户

## templates
* 模板文件路径配置
	* settings.py : TEMPLATES ... 'DIRS': [BASE_DIR+"/templates",],

