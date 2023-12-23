# Rust-demo

> create by nohi 20231113

## 入门

> 参考：https://www.rust-lang.org/zh-CN/learn/get-started
>
> Rust 程序设计语言 简体中文版：https://kaisery.github.io/trpl-zh-cn/

## 一、常用概念

### 变量

变量默认是不可改变的(immutable)。可变变量：在定义变量时增加mut

```rust
let x = 5;
println!("x is {x}");
// x = 6; // 此处不注释则异常

let mut x = 5; // 隐藏第一个定义的X
println!("x is {x}");
x = 6; // 此处正常
println!("x is {x}");
```

#### 常量

使用const定义且必须注明值的类型，且不允许使用mut，总是不可变。常量只能被设置为常量表达式，而不可以是其他任务只能在运行时计算出的值。

```
const THREE_HOURS_IN_SECONDS : u32 = 60 * 60 * 3;
```

#### 隐藏

可以使用第二变量隐藏第一个定义的变量，允许改变变量类型。

```rust
let x = 5;
let x = x + 1;
{
  let x = x * 2;
  println!("The value of x in the inner scope is: {x}");
}
println!("The value of x is: {x}");

let spaces = "   ";
let spaces = spaces.len(); // 改变了变更的类型
--输出
The value of x in the inner scope is: 12
The value of x is: 6
```

### 数据类型

> Rust是静态类型语言，编译时就必须知道所有变量的类型
>
> 根据值及其使用方式，编译器通常可以推断出我们想要用的类型。当多种类型均有可能时，比如第二章的 [“比较猜测的数字和秘密数字”](http://127.0.0.1/trpl-zh-cn/ch02-00-guessing-game-tutorial.html#comparing-the-guess-to-the-secret-number) 使用 `parse` 将 `String` 转换为数字时，必须增加类型注解，像这样：

```rust
let guess: u32 = "42".parse().expect("Not a number!");
```

#### 标量类型

> Rust有四种基本标量类型：整型、浮点型、布尔型和字符类型
>
> 那么该使用哪种类型的数字呢？如果拿不定主意，Rust 的默认类型通常是个不错的起点，数字类型默认是 `i32`。`isize` 或 `usize` 主要作为某些集合的索引。

##### 整型

|  长度   | 有符号  | 无符号  |
| :-----: | :-----: | :-----: |
|  8-bit  |  `i8`   |  `u8`   |
| 16-bit  |  `i16`  |  `u16`  |
| 32-bit  |  `i32`  |  `u32`  |
| 64-bit  |  `i64`  |  `u64`  |
| 128-bit | `i128`  | `u128`  |
|  arch   | `isize` | `usize` |

整形字面值

|          数字字面值           |     例子      |
| :---------------------------: | :-----------: |
|       Decimal (十进制)        |   `98_222`    |
|        Hex (十六进制)         |    `0xff`     |
|        Octal (八进制)         |    `0o77`     |
|        Binary (二进制)        | `0b1111_0000` |
| Byte (单字节字符)(仅限于`u8`) |    `b'A'`     |

##### 浮点型

> Rust 的浮点数类型是 `f32` 和 `f64`，分别占 32 位和 64 位。默认类型是 `f64`。
>
> 所有的浮点型都是有符号的。

```rust
let x = 2.0; // f64
let y: f32 = 3.0; // f32
```

##### 布尔型

> Rust 中的布尔类型有两个可能的值：`true` 和 `false`

##### 字符类型

> Rust 的 `char` 类型是语言中最原生的字母类型。下面是一些声明 `char` 值的例子

```rust
let c = 'z';
let z: char = 'ℤ'; // with explicit type annotation
let heart_eyed_cat = '😻';
```

#### 复合类型

> **复合类型**（*Compound types*）可以将多个值组合成一个类型。Rust 有两个原生的复合类型：元组（tuple）和数组（array）。

##### 元组

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
println!("tup is: {} {} {}", tup.0, tup.1, tup.2);
let tup = (500, 6.4, 1);
let (x, y, z) = tup;
println!("The value of y is: {y}");
```

数组

```
let a: [i32; 5] = [1, 2, 3, 4, 5];
let a = [3; 5]; // 初始化数组长度为5，每个元素值为3 == let a = [3,3,3,3,3];
```



### 函数

* 无返回值/返回值为()

```rust
fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}
```

* 有返回值

  ```rust
  fn five() -> i32 {
      5
  }
  fn plus_one(x: i32) -> i32 {
      x + 1   // 返回值不加;，否则报错，或者可以使用其他方式返回
  }
  ```

### 控制流

#### if

```rust
let number = 6;

if number % 4 == 0 {
  println!("number is divisible by 4");
} else if number % 3 == 0 {
  println!("number is divisible by 3");
} else if number % 2 == 0 {
  println!("number is divisible by 2");
} else {
  println!("number is not divisible by 4, 3, or 2");
}

let number = if condition { 5 } else { "six" };
```

#### 循环

##### loop

```rust
// loop 死循环
loop {
  println!("again!");
}

// 从循环返回值
let result = loop {
  counter += 1;
  if counter == 10 {
    break counter * 2;
  }
};

println!("The result is {result}");

// 多个循环之间消除歧义
let mut count = 0;
'counting_up: loop {
  println!("count = {count}");
  let mut remaining = 10;

  loop {
    println!("remaining = {remaining}");
    if remaining == 9 {
      break;
    }
    if count == 2 {
      break 'counting_up; // 退出最外层循环
    }
    remaining -= 1;
  }

  count += 1;
}
println!("End count = {count}");
```



##### while

```rust
while number != 0 {
  println!("{number}!");
  number -= 1;
}
```

##### for

```rust
let a = [10, 20, 30, 40, 50];
for element in a {
  println!("the value is: {element}");
}
// 反转
for number in (1..4).rev() {
   println!("{number}!");
}
println!("LIFTOFF!!!");
```





## 所有权

### 规则

1. Rust 中的每一个值都有一个 **所有者**（*owner*）。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。



```rust
let s1 = String::from("hello");
let s2 = s1;								// 此处只为浅拷贝，即拷贝了s1的引用到s2.即s2指向了原来s1指向的内存地址
println!("{}, world!", s1); // s1 已经失效

// 使用clone复制数据
let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {}, s2 = {}", s1, s2);

// 整形只在栈上分配，不存在拷贝引用
let x = 5;
let y = x;
println!("x = {}, y = {}", x, y);
```

#### 所有权与函数

```rust
// 所有权
let s = String::from("hello"); // s 进入作用域
println!("s : {s}");
takes_ownership(s); // s 的值移动到函数里 ...
										// ... 所以到这里不再有效
// println!("s : {s}"); // 此处编译报错

let x = 5; // x 进入作用域
makes_copy(x); // x 应该移动函数里，
							 // 但 i32 是 Copy 的，
							 // 所以在后面可继续使用 x
```



* 变量的所有权总是遵循相同的模式：将值赋给另一个变量时移动它。当持有堆中数据值的变量离开作用域时，其值将通过 `drop` 被清理掉，除非数据被移动为另一个变量所有。

* 同一时刻只能存在一个可变引用，或多个可读引用 



### 引用与借用

* 可变引用

  ```rust
  fn main() {
      let mut s = String::from("hello");
      change(&mut s);
  }
  
  fn change(some_string: &mut String) {
      some_string.push_str(", world");
  }
  ```

* 悬垂引用

  ```rust
  fn main() {
      let reference_to_nothing = dangle();
  }
  
  fn dangle() -> &String {
      let s = String::from("hello");
      &s  // 返回了地址，但s已经出了作用域范围，会被drop内容。导致&s地址指向了一块随便被其他地址使用/修改的内容
  }
  ```

  



### slice

```rust
let str = String::from("aaa bbb ccc");
let str2 = String::from("你好 中国");

let aaa = &str[0..3];
let bbb = &str[4..7];
println!("aaa: {aaa}");
println!("bbb: {bbb}");

println!("[..=4]: {}", &str[..=4]);
println!("[..3]: {}", &str[..3]);
println!("[4..]: {}", &str[4..]);

--输出
aaa: aaa
bbb: bbb
[..=4]: aaa b
[..3]: aaa
[4..]: bbb ccc
```



## 结构体

```rust
// 初始化User，允许修改
let mut user1 = User {
  active: false,
  username: "nohi".to_string(),
  email: "thisisnohi@163.com".to_string(),
  sign_in_count: 0,
};
println!("User1: {}", user1);
user1.username = "NOHI".to_string();
println!("User1: {}", user1);

// 通过函数初始化
let user2 = build_user("thisisnohi".to_string(), "thisisnohi@163.com".to_string());
println!("User2: {}", user2);

// 通过忆存在变量初始化，username使用单独的初始化
let user3 = User {
  username: "nohi".to_string(),
  ..user2
};
//println!("User2: {}", user2); // 不能再使用user2,因其已经被user3借用
println!("User3: {}", user3);
```

### 元组结构体

> 也可以定义与元组（在第三章讨论过）类似的结构体，称为 **元组结构体**（*tuple structs*）

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```



### 方法

**方法**（method）与函数类似：它们使用 `fn` 关键字和名称声明，可以拥有参数和返回值，同时包含在某处调用该方法时会执行的代码。不过方法与函数是不同的，因为它们在结构体的上下文中被定义，并且它们第一个参数总是 `self`，它代表调用该方法的结构体实例。

* 在结构体中字义
* 第一个参数总是self,代码该方法的结构体实例

```rust
// main()
let rect1 = Rectangle {
  width: 30,
  height: 50,
};
println!(
  "Tet rectangle width={} heigth={}, thre area is {}",
  rect1.width,
  rect1.height,
  area_calc(&rect1)
);

println!("rect {rect1:#?}");

dbg!(&rect1);
println!("rect {rect1:#?}");
println!("rect area {}", rect1.area());
println!("rect area {}", Rectangle::area2(&rect1));

let rect2 = Rectangle {
  width: 30,
  height: 50,
};

println!("rect1 can hold rect2 {}", rect1.can_hold(&rect2))

// main() end


#[derive(Debug, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, rect: &Rectangle) -> bool {
        self.width >= rect.width && self.height >= rect.height
    }

    fn area2(rect: &Rectangle) -> u32 {
        rect.width * rect.height
    }
}
```

```

```



### 关联函数

所有在 `impl` 块中定义的函数被称为 **关联函数**（*associated functions*），因为它们与 `impl` 后面命名的类型相关。我们可以定义不以 `self` 为第一参数的关联函数（因此不是方法），因为它们并不作用于一个结构体的实例。我们已经使用了一个这样的函数：在 `String` 类型上定义的 `String::from` 函数。

```rust
// 关联函数使用
let rect3 = Rectangle::square(10);
dbg!(&rect3);
println!("rect3 {rect3:#?}");

impl Rectangle {
    ...
    // 关联函数
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}
```





## 枚举和模式匹配

**枚举**（*enumerations*），也被称作 *enums*。枚举允许你通过列举可能的 **成员**（*variants*）来定义一个类型

### match 控制流结构

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(value: Coin) -> i32 {
    match value {
        Coin::Penny => {
            println!("==Penny");
            1
        }
        Coin::Nickel => 2,
        Coin::Dime => 10,
        Coin::Quarter => 15,
    }
}
```

### 绑定值的模式

```rust

#[derive(Debug)] // 这样可以立刻看到州的名称
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(value: Coin) -> i32 {
    match value {
        Coin::Penny => {
            print!("==Penny ");
            1
        }
        Coin::Nickel => 2,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            print!("Quarter state {state:?} ");
            15
        }
    }
}
```

### 匹配 Option<T>

```rust
println!("====option=====");
println!("Option {:?}", plus_one(Option::Some(1)));
println!("Option {:?}", plus_one(Some(1)));
println!("Option {:?}", plus_one(None));
println!("Option {:?}", plus_one(Option::None));

fn plus_one(a: Option<i32>) -> Option<i32> {
    match a {
        None => None,
        Some(x) => Some(x + 1),
    }
}
```

Rust 中的匹配是 **穷尽的**（*exhaustive*）：必须穷举到最后的可能性来使代码有效。

### 通配模式和 _ 占位符

```rust
println!("通配模式和 _ 占位符");
let dice_roll = 9;
match dice_roll {
  3 => add_fancy_hat(),
  7 => remove_fancy_hat(),
  other => move_player(other),
}
```

* `other` 分支的代码通过将其传递给 `move_player` 函数来使用这个变量。

* 必须将通配分支放在最后，因为模式是按顺序匹配的。如果我们在通配分支后添加其他分支，Rust 将会警告我们，因为此后的分支永远不会被匹配到。

* Rust 还提供了一个模式，当我们不想使用通配模式获取的值时，请使用 `_` ，这是一个特殊的模式，可以匹配任意值而不绑定到该值。这告诉 Rust 我们不会使用这个值，所以 Rust 也不会警告我们存在未使用的变量。

  ```rust
  let dice_roll = 9;
  match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    _ => reroll(),  //  _ => (), 空元组
  }
  ```

### if let 简洁控制流

```rust
let config_max = Some(3u8);
match config_max {
  Some(max) => println!("The maximum is configured to be {}", max),
  _ => (),
}

let config_max = Some(3u8);
if let Some(max) = config_max {
  println!("The maximum is configured to be {}", max);
}
```

`if let` 语法获取通过等号分隔的一个模式和一个表达式。它的工作方式与 `match` 相同，这里的表达式对应 `match` 而模式则对应第一个分支。在这个例子中，模式是 `Some(max)`，`max` 绑定为 `Some` 中的值。接着可以在 `if let` 代码块中使用 `max` 了，就跟在对应的 `match` 分支中一样。模式不匹配时 `if let` 块中的代码不会执行。

* 可以认为 `if let` 是 `match` 的一个语法糖，它当值匹配某一模式时执行代码而忽略所有其他值。
* 可以在 `if let` 中包含一个 `else`。`else` 块中的代码与 `match` 表达式中的 `_` 分支块中的代码相同，这样的 `match` 表达式就等同于 `if let` 和 `else`。

## 使用包、Crate 和模块管理不断增长的项目

- **包**（*Packages*）：Cargo 的一个功能，它允许你构建、测试和分享 crate。
- **Crates** ：一个模块的树形结构，它形成了库或二进制项目。
- **模块**（*Modules*）和 **use**：允许你控制作用域和路径的私有性。
- **路径**（*path*）：一个命名例如结构体、函数或模块等项的方式

### 包和 Crate

* crate 是 Rust 在编译时最小的代码单位。

* crate 有两种形式：二进制项和库。
  * *二进制项* 可以被编译为可执行程序，比如一个命令行程序或者一个服务器。它们必须有一个 `main` 函数来定义当程序被执行的时候所需要做的事情。目前我们所创建的 crate 都是二进制项。
  * *库* 并没有 `main` 函数，它们也不会编译为可执行程序，它们提供一些诸如函数之类的东西，使其他项目也能使用这些东西
* *crate root* 是一个源文件，Rust 编译器以它为起始点，并构成你的 crate 的根模块
* *包*（*package*）是提供一系列功能的一个或者多个 crate。一个包会包含一个 *Cargo.toml* 文件，阐述如何去构建这些 crate。



* Cargo 遵循的一个约定：*src/main.rs* 就是一个与包同名的二进制 crate 的 crate 根。
* 同样的，Cargo 知道如果包目录中包含 *src/lib.rs*，则包带有与其同名的库 crate，且 *src/lib.rs* 是 crate 根。
* crate 根文件将由 Cargo 传递给 `rustc` 来实际构建库或者二进制项目。

**如果一个包同时含有 *src/main.rs* 和 *src/lib.rs*，则它有两个 crate：一个二进制的和一个库的，且名字都与包相同。通过将文件放在 *src/bin* 目录下，一个包可以拥有多个二进制 crate：每个 *src/bin* 下的文件都会被编译成一个独立的二进制 crate。**



### 定义模块来控制作用域与私有性

#### 模块小抄

- **从 crate 根节点开始**: 当编译一个 crate, 编译器首先在 crate 根文件（通常，对于一个库 crate 而言是*src/lib.rs*，对于一个二进制 crate 而言是*src/main.rs*）中寻找需要被编译的代码。
- 声明模块: 在 crate 根文件中，你可以声明一个新模块；比如，你用mod garden声明了一个叫做garden的模块。编译器会在下列路径中寻找模块代码：
  * 内联，在大括号中，当mod garden后方不是一个分号而是一个大括号
  * 在文件 src/garden.rs
  * 在文件 src/garden/mod.rs

* **声明子模块**: 在除了 crate 根节点以外的其他文件中，你可以定义子模块。比如，你可能在*src/garden.rs*中定义了`mod vegetables;`。编译器会在以父模块命名的目录中寻找子模块代码：
  - 内联，在大括号中，当`mod vegetables`后方不是一个分号而是一个大括号
  - 在文件 *src/garden/vegetables.rs*
  - 在文件 *src/garden/vegetables/mod.rs*
* **模块中的代码路径**: 一旦一个模块是你 crate 的一部分，你可以在隐私规则允许的前提下，从同一个 crate 内的任意地方，通过代码路径引用该模块的代码。举例而言，一个 garden vegetables 模块下的`Asparagus`类型可以在`crate::garden::vegetables::Asparagus`被找到。
* **私有 vs 公用**: 一个模块里的代码默认对其父模块私有。为了使一个模块公用，应当在声明时使用`pub mod`替代`mod`。为了使一个公用模块内部的成员公用，应当在声明前使用`pub`。
* **`use` 关键字**: 在一个作用域内，`use`关键字创建了一个成员的快捷方式，用来减少长路径的重复。在任何可以引用`crate::garden::vegetables::Asparagus`的作用域，你可以通过 `use crate::garden::vegetables::Asparagus;`创建一个快捷方式，然后你就可以在作用域中只写`Asparagus`来使用该类型。

**例** 建立项目: _07_module，代码建

```rust
_07_module
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs

use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {:?}!", plant);
}
```

* `pub mod garden;`行告诉编译器应该包含在*src/garden.rs*文件中发现的代码：

* 文件名：src/garden.rs

  ```rust
  pub mod vegetables; // 意味着在src/garden/vegetables.rs中的代码也应该被包括
  ```

* *vegetables.rs*

  ```rust
  #[derive(Debug)]
  pub struct Asparagus {}
  ```

#### 在模块中对相关代码进行分组





