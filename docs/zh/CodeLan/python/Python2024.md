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



