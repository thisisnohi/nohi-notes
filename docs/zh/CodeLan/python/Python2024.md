# Python2024

> create by nohi 20240902



## 主题

* DrissionPage-基于 python 的网页自动化工具

  项目地址: `https://gitee.com/g1879/DrissionPage`

* [python+fastapi+vue3](https://gitee.com/ktianc/kinit)

  * 运行过程中发现很多不会的点，简单熟悉下
  * FastApi
  * Typer
  * SQLAlchemy




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
  
  

## Typer

> https://typer.fastapi.org.cn/

Typer 是一个用于构建 CLI 应用程序的库，用户将**乐于使用**，开发者将**乐于创建**。基于 Python 类型提示。

它也是一个命令行工具，用于运行脚本，自动将它们转换为 CLI 应用程序。

主要功能包括

- **直观编写**: 出色的编辑器支持。随处 完成。减少调试时间。设计易于使用和学习。减少阅读文档的时间。
- **易于使用**: 最终用户易于使用。自动帮助，所有 shell 的自动完成。
- **简洁**: 最小化代码重复。每个参数声明的多个功能。减少错误。
- **从简单开始**：最简单的示例只向你的应用添加 2 行代码：**1 个导入，1 个函数调用**。
- **不断扩展**：可以根据需要增加复杂性，创建任意复杂的命令树和子命令组，以及选项和参数。
- **运行脚本**：Typer 包含一个 `typer` 命令/程序，你可以使用它来运行脚本，自动将它们转换为 CLI，即使它们在内部不使用 Typer。

```shell
-- 显示帮助
python main.py --help
-- 显示方法 hello 帮助
python main.py hello --help
-- 运行 hello方法 传递参数world
python main.py hello world
```

### 依赖项

**Typer** 站在巨人的肩膀上。它唯一内部必需的依赖项是 [Click](https://click.palletsprojects.com/)。

默认情况下，它还附带额外的标准依赖项

- [`rich`](https://rich.readthedocs.io/en/stable/index.html)：自动显示格式良好的错误。

- `shellingham`

  ：在安装补全时自动检测当前 shell。

  - 使用 `shellingham`，你可以只使用 `--install-completion`。
  - 不使用 `shellingham`，你必须传递要为其安装补全的 shell 的名称，例如 `--install-completion bash`。



```python
from typing import Optional

def type_example(name: str, formal: bool = False, intro: Optional[str] = None):
    pass
```

- `name` 的类型为 `str`，并且是必需的参数。
- `formal` 是 `bool`，并且默认为 `False`。
- `intro` 是一个可选的 `str`，默认为 `None`。

### CLI

```shell
ls ./myproject --size
```

`ls` 将显示目录 `./myproject` 的内容及其`大小`。

- `ls` 是*程序*（或“命令”、“CLI 应用程序”）。
- `./myproject` 是一个*CLI 参数*。
- `--size` 是一个可选的*CLI 选项*。

CLI参数与选项的区别

- *CLI 参数*是**必需的**
- *CLI 选项*是**可选的**
- CLI 选项**以`--`开头**且不依赖于顺序
- CLI参数*依赖于**顺序顺序**



demo

```python
def main(name: str, lastname: str, formal: bool = False) -> None:
    if formal:
        print(f"Good Day Mr. {name} {lastname}")
    else:
        print(f"Hello {name} {lastname}")


if __name__ == "__main__":
    typer.run(main)
```

```shell
$ python main.py --help                                                      
 Usage: main.py [OPTIONS] NAME LASTNAME                                                                 
╭─ Arguments──────────────────────────────────────────────────────────────────────────────────────────╮
│ *    name          TEXT  [default: None] [required]                                                 │
│ *    lastname      TEXT  [default: None] [required]                                                 │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─Options─────────────────────────────────────────────────────────────────────────────────────────────╮
│ --formal    --no-formal      [default: no-formal]                                                   │
│ --help                       Show this message and exit.                                            │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 打印和颜色

* rich.print
* Rich 标记
* Rich 表格

* 还有很多

### 命令

```python
from typing import Annotated

import typer

# no_args_is_help 如果没有给定命令，则显示帮助消息
app = typer.Typer(no_args_is_help=True, help="Awesome CLI user manager.")

@app.command()
def create(name : Annotated[str, typer.Argument(help="请输入创建用户名称")]):
    """
        Create a new user with USERNAME.
    """
    print(f"Creating user: {name}")

@app.command()
def delete(name : Annotated[str, typer.Argument( help="请输入要删除的用户名称")],
           force : Annotated[bool, typer.Option(prompt="是否强制删除",help="强制删除 without confirmation.")],
           ):
    """
       Delete a user with USERNAME.

       If --force is not used, will ask for confirmation.
   """
    if force:
        print(f"Deleting user: {name}")
    else:
        print("Operation cancelled")

@app.command(deprecated=True)
def delete2(username: str):
    """
    Delete a user.

    This is deprecated and will stop being supported soon.
    """
    print(f"Deleting user: {username}")

@app.command()
def delete_all(
    force: Annotated[
        bool, typer.Option(prompt="Are you sure you want to delete ALL users?")
    ],
):
    """
        Delete ALL users in the database.

        If --force is not used, will ask for confirmation.
    """
    if force:
        print("Deleting all users")
    else:
        print("Operation cancelled")


if __name__ == "__main__":
    app()
```

* 提示

  ```shell
  python user.py delete abc
  是否强制删除 [y/n]: n
  Operation cancelled
  
  $ python user.py --help                                                  
   Usage: user.py [OPTIONS] COMMAND [ARGS]...                                                         
   Awesome CLI user manager.                                                                           
                                                        
  ╭─Options──────────────────────────────────────────────────────────────────────────────────────────╮
  │ --install-completion          Install completion for the current shell.                          │
  │ --show-completion             Show completion for the current shell, to copy it or customize the installation.                                          │
  │ --help                        Show this message and exit.                                        │
  ╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
  ╭─Commands─────────────────────────────────────────────────────────────────────────────────────────╮
  │ create       Create a new user with USERNAME.                                                    │
  │ delete       Delete a user with USERNAME.                                                        │
  │ delete-all   Delete ALL users in the database.                                                   │
  │ delete2      Delete a user.                                                        (deprecated)  │
  ╰─────────────────────────────────────────────────────────────────────────────────────────────────╯
  ```



## SQLAlchemy

> SQLAlchemy 是一个功能强大的Python ORM 工具包
>
> 参考：`https://docs.sqlalchemy.org.cn/en/20/`



### Hello World

> 直接查询数据库表（不仅仅是此功能）

```python
from sqlalchemy import create_engine, text

# 创建数据库引擎
engine = create_engine("mysql+pymysql://root:root1234@127.0.0.1:3306/nohi?charset=utf8")

# 获取连接
with engine.connect() as conn:
    # 查询数据库中t_user表
    sql = "select id, name from t_user"
    # 执行语句
    result = conn.execute(text(sql))
    print(result.all())

# [(1, 'admin'), (2, 'user_1')]
```

* 模块安装

  ```shell
  pip3 install sqlalchemy==2.0.19
  pip3 install pymysql==1.1.0
  -- 注意版本号，如果不指定，程序可能有问题
  ```



### 重点说明

#### engine同步与异步

```
根据驱动不同，创建engine方法不同
pymysql同步驱动，对应create_engine
asyncmy异步驱动，对应create_async_engine
```

```python
# 异步驱动及demo
import asyncio

from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

# 创建数据库引擎
# echo=True 参数表示连接发出的 SQL 将被记录到标准输出。
# asyncmy 为异步连接驱动
engine = create_async_engine('mysql+asyncmy://root:root1234@127.0.0.1:3306/nohi', echo=True)

async def main() :
    async with engine.connect() as conn:
        sql = "select id, name from t_user"
        result = await conn.execute(text(sql))
        print(result.all())

asyncio.run(main())
```

#### engine.begin与engin.connect

* engin.connect 默认不开启事务，可以手工提交事务

  ```python
  async with engine.connect() as conn:
    # REPEATABLE READ
    print("===> engine.begin() get_isolation_level ", await conn.get_isolation_level())
    sql = "INSERT INTO demo_parent (id, data) VALUES (3, '测试事务connect_with_commit')"
    result = await conn.execute(text(sql))
    print("===> insert", result)
  
    # 提交事务
    await conn.commit()
  ```

* engine.begin 默认就开启事务

  ```python
   # 测试事务
   # connection.commit 提交事务
   async with engine.begin() as conn:
      # REPEATABLE READ
      print("===> engine.begin() get_isolation_level ", await conn.get_isolation_level())
      sql = "INSERT INTO demo_parent (id, data) VALUES (4, '测试事务 begin_with_commit')"
      result = await conn.execute(text(sql))
      print("===> insert", result)
  ```

  

### ORM

> 代码见：https://github.com/thisisnohi/python-2024    test_user.py

* model[User] 节选

  ```python
  
  @dataclass
  class User(Base):
      __tablename__ = "t_user"
  
      id: Mapped[int] = mapped_column(Integer, primary_key=True, comment='主键ID')
      create_datetime: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), comment='创建时间')
      update_datetime: Mapped[datetime] = mapped_column(
          DateTime,
          server_default=func.now(),
          onupdate=func.now(),
          comment='更新时间'
      )
      delete_datetime: Mapped[datetime] = mapped_column(DateTime, nullable=True, comment='删除时间')
      is_delete: Mapped[bool] = mapped_column(Boolean, default=False, comment="是否软删除")
  
      user_code: Mapped[str] = mapped_column(String(11), nullable=False, index=True, comment="用户编号", unique=False)
      name: Mapped[str] = mapped_column(String(50), index=True, nullable=False, comment="姓名")
      telephone: Mapped[str] = mapped_column(String(11), nullable=False, index=True, comment="手机号", unique=False)
  ...

* 操作

  ```python
  import asyncio
  
  from sqlalchemy import delete, select, text
  from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
  from sqlalchemy.orm import sessionmaker
  
  from quickstart.model.User import User
  
  # 创建数据库引擎
  # echo=True 参数表示连接发出的 SQL 将被记录到标准输出。
  # asyncmy 为异步连接驱动
  engine = create_async_engine(
      'mysql+asyncmy://root:root1234@127.0.0.1:3306/nohi',
      echo=True,
      future=True,
      pool_size=10,
      max_overflow=5,
      pool_timeout=5,
      pool_pre_ping=True,
  )
  
  # 同步session
  # Session = sessionmaker(engine)
  # 异步session
  Session = sessionmaker(bind=engine,class_=AsyncSession)
  
  #
  user = User()
  
  async def init():
      await asyncio.sleep(1)
      # 初始化表结构
      # Base.metadata.create_all(engine)
  
      # 清理数据
      # 删除 11数据
      async with Session() as session:
          async with session.begin():
              await session.execute(delete(User).where(User.id == 11))
              await session.execute(text("delete from t_user where id in (12, 13)"))
  
  
      # 初始化数据
      async with Session() as session:
          async with session.begin():
              session.add(User(id=11, user_code='1001', name='NOHI', telephone='18012920403', email='thisnohi@163.com', remark='11'))
  
              user1 = User(id=12, user_code='1001', name='NOHI', telephone='18012920403', email='thisnohi@163.com',
                           remark='11')
              user2 = User(id=13, user_code='1002', name='NOHI', telephone='18012920403', email='thisnohi@163.com',
                           remark='11')
              session.add_all([user1, user2])
  
          sql = select(User).where(User.id.in_([11,12,13]))
          print("===> sql:", sql)
          result = await session.execute(sql)
          # print(result.all())
          # 必须使用 result.unique() ，否则报错：
          # sqlalchemy.exc.InvalidRequestError: The unique() method must be invoked on this Result, as it contains results that include joined eager loads against collections
          for row in result.unique().all():
              print(row)
  
  async def user_model():
      print('===>user_model')
      await init()
  
  asyncio.run(user_model())
  ```

  







