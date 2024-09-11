# Python2024

> create by nohi 20240902



## 主题

* DrissionPage-基于 python 的网页自动化工具

  项目地址: `https://gitee.com/g1879/DrissionPage`

* [python+fastapi+vue3](https://gitee.com/ktianc/kinit)



## FastApi

### 参考

* `https://fastapi.tiangolo.com/zh/`

### 安装与运行

```shell
pip install fastapi
pip install "uvicorn[standard]"
```

* `main.py`

  ```python
  from typing import Union
  from fastapi import FastAPI
  
  app = FastAPI()
  @app.get("/")
  def read_root():
      return {"Hello": "World"}
  @app.get("/items/{item_id}")
  def read_item(item_id: int, q: Union[str, None] = None):
      return {"item_id": item_id, "q": q}
  ```

* 运行

  ```shell
  uvicorn main:app --reload
  - main：main.py 文件（一个 Python「模块」）。
  - app：在 main.py 文件中通过 app = FastAPI() 创建的对象。
  - --reload：让服务器在更新代码后重新启动。仅在开发时使用该选项。
  
  http://127.0.0.1:8000/items/5?q=somequery
  swagger-ui: http://127.0.0.1:8000/docs
  ```
  
  



