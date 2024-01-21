# Rust-demo

> create by nohi 20231113

## 入门

> 参考：https://www.rust-lang.org/zh-CN/learn/get-started
>
> Rust 程序设计语言 简体中文版：https://kaisery.github.io/trpl-zh-cn/
>
> 跟大佬学习RUST：视频：https://www.bilibili.com/video/BV1RZ4y1a7iF/?spm_id_from=333.788.recommend_more_video.9
>
> 个人demo: https://github.com/thisisnohi/rust_start.git

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

## 7 使用包、Crate 和模块管理不断增长的项目

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

```rust
lib2
	src
		bin
      main.rs
      main1.rs
      main2.rs
	lib.rs
```





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

*模块* 让我们可以将一个 crate 中的代码进行分组，以提高可读性与重用性。因为一个模块中的代码默认是私有的，所以还可以利用模块控制项的 *私有性*。私有项是不可为外部使用的内在详细实现。我们也可以将模块和它其中的项标记为公开的，这样，外部代码就可以使用并依赖与它们。

src/lib.rs

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

* 模块，是以 `mod` 关键字为起始，然后指定模块的名字，并且用花括号包围模块的主体

* 在模块内，我们还可以定义其他的模块

* 模块还可以保存一些定义的其他项，比如结构体、枚举、常量、特性、或者函数。

* *模块树*

  ```rust
  crate
   └── front_of_house
       ├── hosting
       │   ├── add_to_waitlist
       │   └── seat_at_table
       └── serving
           ├── take_order
           ├── serve_order
           └── take_payment
  ```

### 引用模块项目的路径

路径有两种形式：

- **绝对路径**（*absolute path*）是以 crate 根（root）开头的全路径；对于外部 crate 的代码，是以 crate 名开头的绝对路径，对于当前 crate 的代码，则以字面值 `crate` 开头。
- **相对路径**（*relative path*）从当前模块开始，以 `self`、`super` 或当前模块的标识符开头。

**属性**

* 在 Rust 中，默认所有项（函数、方法、结构体、枚举、模块和常量）对父模块都是私有的

* 父模块中的项不能使用子模块中的私有项，但是子模块中的项可以使用它们父模块中的项。

#### 使用 pub 关键字暴露路径

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}

        fn seat_at_table() {}
    }
    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();
    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}

```

#### super 开始的相对路径

```rust
fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }
    fn cook_order() {}
}
```

#### 创建公有的结构体和枚举

```rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    // 在夏天订购一个黑麦土司作为早餐
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // 改变主意更换想要面包的类型
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // 如果取消下一行的注释代码不能编译；
    // 不允许查看或修改早餐附带的季节水果
    // meal.seasonal_fruit = String::from("blueberries");
}
```

* 结构体遵循常规，内容全部是私有的，除非使用 `pub` 关键字。

* 枚举设为公有，则它的所有成员都将变为公有

  ```rust
  mod back_of_house {
      pub enum Appetizer {
          Soup,
          Salad,
      }
  }
  pub fn eat_at_restaurant() {
      let order1 = back_of_house::Appetizer::Soup;
      let order2 = back_of_house::Appetizer::Salad;
  }
  ```

### 使用 use 关键字将路径引入作用域

```rust
use crate::front_of_house::hosting;
pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}

//注意 use 只能创建 use 所在的特定作用域内的短路径。
//示例 7-12 将 eat_at_restaurant 函数移动到了一个叫 customer 的子模块，
//这又是一个不同于 use 语句的作用域，所以函数体不能编译。
// 以下编译通不过
use crate::front_of_house::hosting;
mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}
```

#### 创建惯用的 use 路径



* 使用 `use` 引入结构体、枚举和其他项时，习惯是指定它们的完整路径。

  ```rust
  // 将 HashMap 结构体引入二进制 crate 作用域的习惯用法
  use std::collections::HashMap;
  
  fn main() {
      let mut map = HashMap::new();
      map.insert(1, 2);
  }
  ```

* 引入相同名称的项

  ```rust
  use std::fmt;
  use std::io;
  
  fn function1() -> fmt::Result {
      // --snip--
  }
  fn function2() -> io::Result<()> {
      // --snip--
  }
  ```

* 使用 as 关键字提供新的名称

  ```rust
  use std::fmt::Result;
  use std::io::Result as IoResult;
  
  fn function1() -> Result {
      // --snip--
  }
  fn function2() -> IoResult<()> {
      // --snip--
  }
  ```

#### 使用 pub use 重导出名称

*重导出*（*re-exporting*）”：我们不仅将一个名称导入了当前作用域，还允许别人把它导入他们自己的作用域。

```rust
pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

#### 使用外部包

项目中使用 `rand`，在 *Cargo.toml* 中加入了如下行：

```rust
rand = "0.8.5"
```

```rust
use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
}
```

`use std::collections::HashMap;`

#### 嵌套路径来消除大量的 use 行

```rust
use std::{cmp::Ordering, io};
use std::io::{self, Write};
```

#### 通过 glob 运算符将所有的公有定义引入作用域

```rust
use std::collections::*;
```

### 将模块拆分成多个文件

* `src/lib.rs`

  ```rust
  mod front_of_house;
  pub use crate::front_of_house::hosting;
  pub fn eat_at_restaurant() {
      hosting::add_to_waitlist();
  }
  ```

* `src/front_of_house.rs`

  ```rust
  pub mod hosting {
      pub fn add_to_waitlist() {}
  }
  ```

* 另一种文件路径

  对于 front_of_house 的子模块 hosting，编译器会在如下位置查找模块代码：

  * src/front_of_house/hosting.rs（我们所介绍的）
  * src/front_of_house/hosting/mod.rs（老风格，不过仍然支持）

  

## 8 集合

集合指向的数据是储存在堆上的，这意味着数据的数量不必在编译时就已知，并且还可以随着程序的运行增长或缩小。每种集合都有着不同功能和成本。

- *vector* 允许我们一个挨着一个地储存一系列数量可变的值
- **字符串**（*string*）是字符的集合。我们之前见过 `String` 类型，不过在本章我们将深入了解。
- **哈希 map**（*hash map*）允许我们将值与一个特定的键（key）相关联。这是一个叫做 *map* 的更通用的数据结构的特定实现。

### 使用 Vector 储存列表

`Vec<T>`，也被称为 *vector*。vector 允许我们在一个单独的数据结构中储存多于一个的值，它在内存中彼此相邻地排列所有的值。vector 只能储存相同类型的值

#### 初始化vector

```rust
// 没有初始值，需要指定一个类型
let v: Vec<i32> = Vec::new();

println!("v1 {:?}", v);

// vec! 宏，初始化vec
let mut v = vec![1, 2, 3];
println!("v2 {:?}", v);
v.push(5);
v.push(6);
v.push(7);
v.push(8);
println!("v3 {:?}", v);
```

#### 读取vector

> 通过索引或使用 `get` 方法

```rust
let v0 = v[0];
println!("v0:{v0}");
let v2 = v[2];
println!("v2:{v2}");

let v3 = v.get(3);
println!("v3:{:?}", v3);

// [] 方法，当引用一个不存在的元素时 Rust 会造成 panic。
let v100 = v[100];
// 当 get 方法被传递了一个数组外的索引时，它不会 panic 而是返回 None
let v100 = v.get(100);
```

#### 遍历

```rust
println!("===>遍历vector");
let v = vec![100, 32, 57];
for i in &v {
  println!("{i}");
}

// 修改vet里的每一个元素
let mut v = vec![100, 32, 57];
for i in &mut v {
  *i += 50;
}
println!("v: {:?}", v);
```

为了修改可变引用所指向的值，在使用 `+=` 运算符之前必须使用解引用运算符（`*`）获取 `i` 中的值



#### 使用枚举来储存多种类型

vector 只能储存相同类型的值。枚举的成员都被定义为相同的枚举类型，所以当需要在 vector 中储存不同类型值时，我们可以定义并使用一个枚举！

* Rust 在编译时就必须准确的知道 vector 中类型的原因在于它需要知道储存每个元素到底需要多少内存
* 可以准确的知道这个 vector 中允许什么类型。
* 使用枚举外加 `match` 意味着 Rust 能在编译时就保证总是会处理所有可能的情况

### 使用字符串储存 UTF-8 编码的文本

> Rust 倾向于确保暴露出可能的错误，字符串是比很多程序员所想象的要更为复杂的数据结构，以及 UTF-8。
>
> 字符串就是作为字节的集合外加一些方法实现的，当这些字节被解释为文本时，这些方法提供了实用的功能。

Rust 的核心语言中只有一种字符串类型：字符串 slice `str`，它通常以被借用的形式出现，`&str`。

字符串（`String`）类型由 Rust 标准库提供，而不是编入核心语言，它是一种可增长、可变、可拥有、UTF-8 编码的字符串类型。

`String::from` 和 `.to_string`

```rust
let mut s = String::new();
let data = "initial contents";
let s = data.to_string();
// 该方法也可直接用于字符串字面值：
let s = "initial contents".to_string();
let s = String::from("initial contents");

let hello = String::from("السلام عليكم");
let hello = String::from("Dobrý den");
let hello = String::from("Hello");
let hello = String::from("שָׁלוֹם");
let hello = String::from("नमस्ते");
let hello = String::from("こんにちは");
let hello = String::from("안녕하세요");
let hello = String::from("你好");
let hello = String::from("Olá");
let hello = String::from("Здравствуйте");
let hello = String::from("Hola");
```

* 更新字符串

  * 使用 push_str 和 push 附加字符串

    ```rust
    let mut s = String::from("foo");
    s.push_str("bar");
    
    let mut s1 = String::from("foo");
    let s2 = "bar";
    s1.push_str(s2);
    println!("s2 is {s2}");
    ```

  * 使用 + 运算符或 format! 宏拼接字符串

    ```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // 注意 s1 被移动了，不能继续使用
    
    // println!("s1 is {s1}"); // s1被借走了，无法使用
    println!("s2 is {s3}");
    ```

    * `s2` 使用了 `&`，意味着我们使用第二个字符串的 **引用** 与第一个字符串相加。
    * add 调用中使用 &s2 是因为 &String 可以被 强转（coerced）成 &str
    * add 获取了 self 的所有权，因为 self 没有 使用 &

     **format**

    ```rust
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    
    let s = format!("{s1}-{s2}-{s3}");
    ```

* 索引字符串

  > Rust 的字符串不支持索引。即不支持：s1[0];
  >
  > 字节、标量值和字形簇

  ```rust
  let hello = "Здравствуйте";
  let answer = &hello[0]; // 不支持
  ```

  

* 字符串 slice

  ```rust
  let hello = "Здравствуйте";
  let s = &hello[0..4]; // s 将会是 “Зд”
  println!("s is {s}")
  // let s = &hello[0..1]; // 异常
  ```

* 遍历字符串的方法

  ```rust
  // 打印char
  for c in hello.chars() {
    println!("{c}")
  }
  // 打印字节
  for b in "Зд".bytes() {
    println!("{b}");
  }
  ```

### 使用 Hash Map 储存键值对

> `HashMap<K, V>` 类型储存了一个键类型 `K` 对应一个值类型 `V` 的映射。它通过一个 **哈希函数**（*hashing function*）来实现映射，决定如何将键和值放入内存中。

```rust
// use
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
println!("scores is {:?}", scores)
```

* 哈希 map 将它们的数据储存在堆上
* 键类型是 `String` 而值类型是 `i32`
* 类似于 vector，哈希 map 是同质的：所有的键必须是相同类型，值也必须都是相同类型。

#### 访问哈希 map 中的值

```rust
let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0);
println!("{team_name} is {score}");

// 循环访问
for (key, value) in &scores {
  println!("{key}: {value}");
}
```

* get 方法返回 Option<&V>，如果某个键在哈希 map 中没有对应的值，get 会返回 None。

* 程序中通过调用 copied 方法来获取一个 Option<i32> 而不是 Option<&i32>，

* 接着调用 unwrap_or 在 scores 中没有该键所对应的项时将其设置为零

#### 哈希 map 和所有权

```rust
let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
// value moved here
map.insert(field_name, field_value);
// 这里 field_name 和 field_value 不再有效，
// 尝试使用它们看看会出现什么编译错误！
// println!("{field_name} is {field_value}");
```

#### 更新哈希 map

* 覆盖一个值

  ```rust
  let mut scores = HashMap::new();
  scores.insert(String::from("Blue"), 10);
  scores.insert(String::from("Blue"), 25);
  println!("{:?}", scores);
  ```

* 只在键没有对应值时插入键值对

  ```rust
  scores.entry(String::from("Yellow")).or_insert(50);
  scores.entry(String::from("Blue")).or_insert(50);
  println!("{:?}", scores);
  ```

* 根据旧值更新一个值

  ```rust
  use std::collections::HashMap;
  let text = "hello world wonderful world";
  let mut map = HashMap::new();
  for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0); //可变引用（&mut V）
    *count += 1; // 赋值前先解引用
  }
  println!("{:?}", map);
  ```

### hashmap 根据key 获取值，并更新值

```rust
let user_name = user.clone();
dept_map
.get_mut(&dept)
.get_or_insert(&mut vec![])
.push(user);
//
dept_map.entry(dept).or_insert(Vec::new()).push(user_name);
```



#### 哈希函数

`HashMap` 默认使用一种叫做 SipHash 的哈希函数，它可以抵御涉及哈希表（hash table）[1](http://127.0.0.1/trpl-zh-cn/ch08-03-hash-maps.html#siphash) 的拒绝服务（Denial of Service, DoS）攻击。然而这并不是可用的最快的算法，不过为了更高的安全性值得付出一些性能的代价。如果性能监测显示此哈希函数非常慢，以致于你无法接受，你可以指定一个不同的 *hasher* 来切换为其它函数。hasher 是一个实现了 `BuildHasher` trait 的类型。



### 题目

> 代码见：https://github.com/thisisnohi/rust_start/tree/main/_08/homework01

- 给定一系列数字，使用 vector 并返回这个列表的中位数（排列数组后位于中间的值）和众数（mode，出现次数最多的值；这里哈希 map 会很有帮助）。
- 将字符串转换为 Pig Latin，也就是每一个单词的第一个辅音字母被移动到单词的结尾并增加 “ay”，所以 “first” 会变成 “irst-fay”。元音字母开头的单词则在结尾增加 “hay”（“apple” 会变成 “apple-hay”）。牢记 UTF-8 编码！
- 使用哈希 map 和 vector，创建一个文本接口来允许用户向公司的部门中增加员工的名字。例如，“Add Sally to Engineering” 或 “Add Amir to Sales”。接着让用户获取一个部门的所有员工的列表，或者公司每个部门的所有员工按照字典序排列的列表。

## 9 错误处理

Rust 没有异常。相反，它有 `Result<T, E>` 类型，用于处理可恢复的错误，还有 `panic!` 宏，在程序遇到不可恢复的错误时停止执行。

### 用 panic! 处理不可恢复的错误

在实践中有两种方法造成 panic：执行会造成代码 panic 的操作（比如访问超过数组结尾的内容）或者显式调用 `panic!` 宏。这两种情况都会使程序 panic。通常情况下这些 panic 会打印出一个错误信息，展开并清理栈数据，然后退出。通过一个环境变量，你也可以让 Rust 在 panic 发生时打印调用堆栈（call stack）以便于定位 panic 的原因。

* 当出现 panic 时，程序默认会开始 **展开**（*unwinding*），这意味着 Rust 会回溯栈并清理它遇到的每一个函数的数据

* 另一种选择是直接 **终止**（*abort*），这会不清理数据就退出程序。

  panic 时通过在 *Cargo.toml* 的 `[profile]` 部分增加 `panic = 'abort'`，可以由展开切换为终止

  ```rust 
  [profile.release]
  panic = 'abort'
  ```

#### 使用 panic! 的 backtrace



### 用 Result 处理可恢复的错误

```rust
// 读取一个不存在的文件，返回Result.Err
let greeting_file_result = File::open("README.md");
println!("Open README.md result is {:?}", greeting_file_result);
let greeting_file = match greeting_file_result {
  Ok(file) => file,
  Err(err) => panic!("Open README.md result is {:?}", err),
};
println!("Open README.md greeting_file is {:?}", greeting_file);
```

#### 匹配不同的错误

```rust
let greeting_file = match greeting_file_result {
  Ok(file) => file,
  Err(error) => match error.kind() {
    ErrorKind::NotFound => match File::create("hello.txt") {
      Ok(fc) => fc,
      Err(e) => panic!("Problem creating the file: {:?}", e),
    },
    other_error => {
      panic!("Problem opening the file: {:?}", other_error);
    }
  },
};
```

* 使用闭包和 `unwrap_or_else`

  ```rust
  let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
    if error.kind() == ErrorKind::NotFound {
      File::create("hello.txt").unwrap_or_else(|error| {
        panic!("Problem creating the file: {:?}", error);
      })
    } else {
      panic!("Problem opening the file: {:?}", error);
    }
  });
  ```

  

#### 失败时 panic 的简写：unwrap 和 expect

如果 `Result` 值是成员 `Ok`，`unwrap` 会返回 `Ok` 中的值。如果 `Result` 是成员 `Err`，`unwrap` 会为我们调用 `panic!`。

* unwrap

  ```rust
  let greeting_file = File::open("hello.txt").unwrap();
  ```

  

* expect

  ```rust
  let greeting_file = File::open("hello.txt")
          .expect("hello.txt should be included in this project");
  ```

  



#### 传播错误

```rust
fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```



#### 传播错误的简写：? 运算符

```rust
// Result 值之后的 ? 被定义为与示例 9-6 中定义的处理 Result 值的 match 表达式有着完全相同的工作方式。
// 如果 Result 的值是 Ok，这个表达式将会返回 Ok 中的值而程序将继续执行。
// 如果值是 Err，Err 将作为整个函数的返回值，就好像使用了 return 关键字一样，这样错误值就被传播给了调用者。
fn read_username_from_file2() -> Result<String, io::Error> {
    let mut username_file = File::open("hello1.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

* `?` 运算符消除了大量样板代码并使得函数的实现更简单。我们甚至可以在 `?` 之后直接使用链式方法调用来进一步缩短代码

  ```rust
  fn read_username_from_file() -> Result<String, io::Error> {
      let mut username = String::new();
      File::open("hello.txt")?.read_to_string(&mut username)?;
      Ok(username)
  }
  // 更简短的写法
  fn read_username_from_file() -> Result<String, io::Error> {
      fs::read_to_string("hello.txt")
  }
  ```

#### 哪里可以使用 ? 运算符

`?` 运算符只能被用于返回值与 `?` 作用的值相兼容的函数。

```rust
// 尝试在返回 () 的 main 函数中使用 ? 的代码不能编译
fn main() {
    let greeting_file = File::open("hello.txt")?;
}
```

* `?` 运算符作用于 `File::open` 返回的 `Result` 值，不过 `main` 函数的返回类型是 `()` 而不是 `Result`。

### 要不要 panic!

#### 示例、代码原型和测试都非常适合 panic

#### 当我们比编译器知道更多的情况

#### 错误处理指导原则

在当有可能会导致有害状态的情况下建议使用 `panic!` 

- 有害状态是非预期的行为，与偶尔会发生的行为相对，比如用户输入了错误格式的数据。
- 在此之后代码的运行依赖于不处于这种有害状态，而不是在每一步都检查是否有问题。
- 没有可行的手段来将有害状态信息编码进所使用的类型中的情况。我们会在第十七章 [“将状态和行为编码为类型”](http://127.0.0.1/trpl-zh-cn/ch17-03-oo-design-patterns.html#将状态和行为编码为类型) 部分通过一个例子来说明我们的意思。

#### 创建自定义类型进行有效性验证



## 10 泛型、Trait 和生命周期

### 泛型数据类型

#### 在函数定义中使用泛型

>  fn get_largest1<T: std::cmp::PartialOrd>(list: &[T]) -> &T {...}

```rust
fn main() {
    println!("# 1.在函数定义中使用泛型");
    let list = [1, 2, 3, 4, 5, 6];
    let largest = get_largest(&list);
    println!("{list:?} largest is {largest}");
    let largest = get_largest1(&list);
    println!("{list:?} largest is {largest}");

    let list = vec!['y', 'm', 'a', 'q'];
    let largest = get_largest1(&list);
    println!("{list:?} largest is {largest}");
}

fn get_largest(list: &[i32]) -> i32 {
    let mut largest = list[0];
    for item in list {
        if item > &largest {
            largest = *item;
        }
    }
    largest
}

// & 为借用
fn get_largest1<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0]; // 借用
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

```

#### 结构体定义中的泛型

```rust
// 结构体中使用泛型
#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}
struct Point2<T, U> {
    x: T,
    y: U,
}
```

#### 枚举定义中的泛型

```rust
// 枚举定义中的泛型
enum Option<T> {
    Some(T),
    None,
}
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

#### 方法定义中的泛型

```rust
#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}
// 必须在impl后申明T
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
```

#### 泛型代码的性能

泛型并不会使程序比具体类型运行得慢。

Rust 通过在编译时进行泛型代码的 **单态化**（*monomorphization*）来保证效率。单态化是一个通过填充编译时使用的具体类型，将通用代码转换为特定代码的过程。

### Trait：定义共同行为

> *trait* 定义了某个特定类型拥有可能与其他类型共享的功能。可以通过 trait 以一种抽象的方式定义共享的行为。可以使用 *trait bounds* 指定泛型是任何拥有特定行为的类型。

注意：*trait* 类似于其他语言中的常被称为 **接口**（*interfaces*）的功能，虽然有一些不同。

#### 定义 trait

```rust
// 使用 trait 关键字来声明一个 trait
pub trait Summary {
    fn summarize(&self) -> String;
}
```

#### 为类型实现 trait

```rust
use r#trait::{Summary, Tweet};

fn main() {
    println!("Trait：定义共同行为");

    let tweet = Tweet {
        username: "NOHI".to_string(),
        content: "of course, as you probably already know, people".to_string(),
        reply: false,
        retweet: false,
    };
    println!("1 new tweet: {}", tweet.summarize());
}
```

* 只有在 trait 或类型至少有一个属于当前 crate 时，我们才能对类型实现该 trait。

#### 默认实现

```rust
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}

pub trait Summary {
    fn summarize_author(&self) -> String;
    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}
```



#### trait 作为参数

```rust
notify(&tweet);
notify(&article);
...
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

#### Trait Bound 语法

```rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
// 获取两个实现了Summary的参数方法，item1 item2 可以为不同类型
pub fn notify(item1: &impl Summary, item2: &impl Summary) {...}
// 强制item1 item2为相同类型
pub fn notify<T: Summary>(item1: &T, item2: &T) {
 
// 通过 + 指定多个 trait bound
pub fn notify(item: &(impl Summary + Display))
pub fn notify<T: Summary + Display>(item: &T) 

// 通过 where 简化 trait bound
// 在函数签名之后的 where 从句中指定 trait bound 的语法。
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {..}
// 使用 where 从句
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{...}  
```

#### 返回实现了 trait 的类型

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

#### 使用 trait bound 有条件地实现方法

```rust
```



### 使用生命周期来确保引用有效

```rust
fn longest<'a>(p0: &'a str, p1: &'a str) -> &'a str {
    if (p0.len() > p1.len()) {
        return p0;
    } else {
        return p1;
    }
}
```



### 生命周期省略（Lifetime Elision）

函数或方法的参数的生命周期被称为 **输入生命周期**（*input lifetimes*），而返回值的生命周期被称为 **输出生命周期**（*output lifetimes*）。

编译器采用三条规则来判断引用何时不需要明确的注解。

* 第一条规则适用于输入生命周期，后两条规则适用于输出生命周期。如果编译器检查完这三条规则后仍然存在没有计算出生命周期的引用，编译器将会停止并生成错误。这些规则适用于 `fn` 定义，以及 `impl` 块。
* 第一条规则是编译器为每一个引用参数都分配一个生命周期参数。换句话说就是，函数有一个引用参数的就有一个生命周期参数：`fn foo<'a>(x: &'a i32)`，有两个引用参数的函数就有两个不同的生命周期参数，`fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`，依此类推。

* 第二条规则是如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数：`fn foo<'a>(x: &'a i32) -> &'a i32`。

* 第三条规则是如果方法有多个输入生命周期参数并且其中一个参数是 `&self` 或 `&mut self`，说明是个对象的方法 (method)(译者注：这里涉及 rust 的面向对象参见 17 章)，那么所有输出生命周期参数被赋予 `self` 的生命周期。第三条规则使得方法更容易读写，因为只需更少的符号。

## 11 编写自动化测试

### 如何编写测试

1. 设置任何所需的数据或状态
2. 运行需要测试的代码
3. 断言其结果是我们所期望的

#### 测试函数剖析

Rust 中的测试就是一个带有 `test` 属性注解的函数。为了将一个函数变成测试函数，需要在 `fn` 行之前加上 `#[test]`。当使用 `cargo test` 命令运行测试时，Rust 会构建一个测试执行程序用来调用被标注的函数，并报告每一个测试是通过还是失败。

```rust
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

* 运行`cargo test`执行测试检查

#### 使用 assert! 宏来检查结果

```rust
assert!(rect1.can_hold(&rect2), "rect1 can't hold rect2")
assert_eq!(2 + 2, 4);
```

#### 使用 assert_eq! 和 assert_ne! 宏来测试相等

`assert_eq!` 和 `assert_ne!`。这两个宏分别比较两个值是相等还是不相等

`assert_eq!` 和 `assert_ne!` 宏在底层分别使用了 `==` 和 `!=`。当断言失败时，这些宏会使用调试格式打印出其参数，这意味着被比较的值必需实现了 `PartialEq` 和 `Debug` trait。

所有的基本类型和大部分标准库类型都实现了这些 trait。对于自定义的结构体和枚举，需要实现 `PartialEq` 才能断言它们的值是否相等。

#### 使用 should_panic 检查 panic

```rust
pub struct Guess {
    value: i32,
}
impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value 必须在1-100之间!")
        }
        Guess { value }
    }
}

#[test]
#[should_panic]
fn test_guess() {
  Guess::new(200);
}
```



#### 将 Result<T, E> 用于测试

```rust
#[test]
fn it_works_result() -> Result<(), String> {
  if 2 + 2 == 4 {
    Ok(())
  } else {
    Err(String::from("two plus two does not equal four"))
  }
}
```

### 控制测试如何运行

运行 `cargo test --help` 会提示 `cargo test` 的有关参数，而运行 `cargo test -- --help` 可以提示在分隔符之后使用的有关参数。

#### 并行或连续的运行测试

* Rust 默认使用线程来并行运行
* 确保测试不能相互依赖，或依赖任何共享的状态，包括依赖共享的环境，比如当前工作目录或者环境变量。

```rust
# 将测试线程设置为 1
cargo test -- --test-threads=1 
```

#### 显示函数输出

默认情况下，当测试通过时，Rust 的测试库会截获打印到标准输出的所有内容。比如在测试中调用了 `println!` 而测试通过了，我们将不会在终端看到 `println!` 的输出：只会看到说明测试通过的提示行。如果测试失败了，则会看到所有标准输出和其他错误信息。

结尾加上 `--show-output` 告诉 Rust 显示成功测试的输出。

```rust
cargo test -- --show-output
```

#### 通过指定名字来运行部分测试

* `cargo test it_works` 运行名称包含it_works的测试方法

#### 忽略某些测试

使用 `ignore` 属性来标记耗时的测试并排除它们

```rust
#[test]
#[ignore]
fn it_works_result() -> Result<(), String> {
  if 2 + 2 == 4 {
    Ok(())
  } else {
    Err(String::from("two plus two does not equal four"))
  }
}
```

* `cargo test -- --ignored`  运行 `ignored` 的测试时
* `cargo test -- --include-ignored` 运行全部测试

### 测试的组织结构

分类：**单元测试**（*unit tests*）与 **集成测试（*integration tests*）**

单元测试倾向于更小而更集中，在隔离的环境中一次测试一个模块，或者是测试私有接口。而集成测试对于你的库来说则完全是外部的。

#### 单元测试

单元测试的目的是在与其他部分隔离的环境中测试每一个单元的代码，以便于快速而准确地验证某个单元的代码功能是否符合预期。单元测试与它们要测试的代码共同存放在位于 *src* 目录下相同的文件中。规范是在每个文件中创建包含测试函数的 `tests` 模块，并使用 `cfg(test)` 标注模块。

* 测试模块和 `#[cfg(test)]`

#### 集成测试

* tests 目录

```rust
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

* 文件顶部添加 `use adder`
* 完整测试：单元测试、集成测试和文档测试
* 注意如果一个部分的任何测试失败，之后的部分都不会运行

可以通过指定测试函数的名称作为 `cargo test` 的参数来运行特定集成测试。也可以使用 `cargo test` 的 `--test` 后跟文件的名称来运行某个特定集成测试文件中的所有测试：

```rust
cargo test --test integration_test
```



## 12 一个 I/O 项目：构建一个命令行程序

### 接受命令行参数

```rust
cargo run -- searchstring example-filename.txt
```

#### 读取参数值

Rust 标准库提供的函数 `std::env::args`

```rust
// 文件:src/main.rs
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(args);
}

// 运行
cargo run -- searchstring example-filename.txt 中国
// 结果
[minigrep/src/main.rs:7] args = [
    "/Users/nohi/work/workspaces-nohi/rust/rust_start/_12_io/target/debug/minigrep",
    "searchstring",
    "example-filename.txt",
    "中国",
]
```

:warning: 注意 `std::env::args` 在其任何参数包含无效 Unicode 字符时会 panic。如果你需要接受包含无效 Unicode 字符的参数，使用 `std::env::args_os` 代替

* 第一个值为“...target/debug/minigrep”

#### 将参数值保存进变量

```rust
let args: Vec<String> = env::args().collect();
dbg!(&args);
if &args.len() < &3 {
  println!("请输入参数1.查询字符串 2.文件名");
  exit(1);
}
let query = &args[1];
let file_path = &args[2];
println!("query[{query}] from {file_path}");
```



### 读取文件

```rust
let content = fs::read_to_string(file_path).expect("Should have been able to read the file.");
```

* `fs::read_to_string` 接受 `file_path`，打开文件，接着返回包含其内容的 `std::io::Result<String>`。



** 最终代码**

```rust
// 1. 接收命令行参数
let args: Vec<String> = env::args().collect();
dbg!(&args);
if &args.len() < &3 {
  println!("请输入参数1.查询字符串 2.文件名");
  exit(1);
}
// 2.存储参数
let query = &args[1];
let file_path = &args[2];
println!("query[{query}] from {file_path}");

// 3.读取文件
let content = fs::read_to_string(file_path).expect("Should have been able to read the file.");
println!("file[{file_path}]:\n======================================\n{content}\n======================================");
```



### 重构

> 代码见： [github](https://github.com/thisisnohi/rust_start)  程序：_12_io/minigrep

#### 二进制项目的关注分离

* 原则

  - 将程序拆分成 *main.rs* 和 *lib.rs* 并将程序的逻辑放入 *lib.rs* 中。

  - 当命令行解析逻辑比较小时，可以保留在 *main.rs* 中。

  - 当命令行解析开始变得复杂时，也同样将其从 *main.rs* 提取到 *lib.rs* 中。

* 结果：保留在 `main` 函数中的责任应该被限制为

  - 使用参数值调用命令行解析逻辑

  - 设置任何其他的配置

  - 调用 *lib.rs* 中的 `run` 函数

  - 如果 `run` 返回错误，则处理这个错误

* *main.rs* 处理程序运行，而 *lib.rs* 处理所有的真正的任务逻辑。

  因为不能直接测试 `main` 函数，这个结构通过将所有的程序逻辑移动到 *lib.rs* 的函数中使得我们可以测试它们。

#### 提取参数解析器

```rust
fn main(){
		// 解析参数
    let args: Vec<String> = env::args().collect();
    let (query, file_path) = parse_config(&args);
    println!("query[{query}] from {file_path}");
}
// 解析参数
fn parse_config(args: &[String]) -> (&str, &str) {
    dbg!(&args);
    if &args.len() < &3 {
        println!("请输入参数1.查询字符串 2.文件名");
        exit(1);
    }
    (&args[1], &args[2])
}
```

#### 组合配置值

```rust
#[derive(Debug)]
struct Config {
    query: String,
    file_path: String,
}
fn parse_config(args: &[String]) -> Config {
    dbg!(&args);
    if &args.len() < &3 {
        println!("请输入参数1.查询字符串 2.文件名");
        exit(1);
    }
    // args 为借用
    // Config定义为拥有所有权的String
    // 用最简单的clone方法，牺牲一小部分性能换取简洁性
    Config {
        query: args[1].clone(),
        file_path: args[2].clone(),
    }
}
```

#### 创建一个 Config 的构造函数

```rust
let args: Vec<String> = env::args().collect();
let config = Config::new(&args);
...
impl Config {
    // 构造函数
    fn new(args: &[String]) -> Config {
        dbg!(&args);
        if &args.len() < &3 {
            println!("请输入参数1.查询字符串 2.文件名");
            exit(1);
        }
        // args 为借用
        // Config定义为拥有所有权的String
        // 用最简单的clone方法，牺牲一小部分性能换取简洁性
        Config {
            query: args[1].clone(),
            file_path: args[2].clone(),
        }
    }
}
```

#### 修复错误处理

```rust
let config = Config::build(&args).unwrap_or_else(|err| {
  println!("Problem parsing arguments:{err}");
  process::exit(1);
});

fn build(args: &[String]) -> Result<Config, &'static str> {
   dbg!(&args);
   if args.len() < 3 {
     println!("请输入参数1.查询字符串 2.文件名");
     return Result::Err("请输入参数1.查询字符串 2.文件名");
   }
   return Result::Ok(Config {
     query: args[1].clone(),
     file_path: args[2].clone(),
   });
}
```



#### 从 main 提取逻辑

```rust
// 1.返回类型变为 Result<(), Box<dyn Error>>
// 2.Box<dyn Error> 意味着函数会返回实现了 Error trait 的类型，不过无需指定具体将会返回的值的类型
//   dyn，它是 “动态的”（“dynamic”）的缩写
// 3.去掉了 expect 调用并替换为 第九章 讲到的 ?
// 4.成功时这个函数会返回一个 Ok 值
fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let content = fs::read_to_string(&config.file_path)?;
    println!("file[{}]:\n======================================\n{content}\n======================================", config.file_path);

    // 返回
    Ok(())
}

// main方法调用
// 2. 读取文件
// run(&config).unwrap_or_else(|err| {
//     println!("程序异常:{err}");
//     process::exit(1);
// });
// 使用if let
if let Err(e) = run(&config) {
  println!("程序异常:{e}");
  process::exit(1);
}
```

以上代码见： [github](https://github.com/thisisnohi/rust_start)  程序：_12_io/minigrep



##### 将代码拆分到库 crate

> 代码见： [github](https://github.com/thisisnohi/rust_start)  程序：_12_io/minigrep2

* `main.rs`

  ```rust
  use std::{env, process};
  
  fn main() {
      println!("一个 I/O 项目：构建一个命令行程序");
  
      // 1. 解析参数
      let args: Vec<String> = env::args().collect();
      let config = minigrep2::Config::build(&args).unwrap_or_else(|err| {
          println!("Problem parsing arguments:{err}");
          process::exit(1);
      });
  
      // 2. 读取文件
      // 使用if let
      if let Err(e) = minigrep2::run(&config) {
          println!("程序异常:{e}");
          process::exit(1);
      }
  }
  
  ```

* `lib.rs`

  **使用了公有的 `pub` 关键字**

  ```rust
  use std::error::Error;
  use std::fs;
  
  #[derive(Debug)]
  pub struct Config {
     ...
  }
  impl Config {
      // build 返回Result
      pub fn build(args: &[String]) -> Result<Config, &'static str> {
          ...
      }
  }
  // 处理逻辑
  pub fn run(config: &Config) -> Result<(), Box<dyn Error>> {
    ...
  }
  
  ```

### 采用测试驱动开发完善库的功能

* TDD

  1. 编写一个失败的测试，并运行它以确保它失败的原因是你所期望的。

  1. 编写或修改足够的代码来使新的测试通过。

  1. 重构刚刚增加或修改的代码，并确保测试仍然能通过。

  1. 从步骤 1 开始重复！



#### 编写一个失败的测试

```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    vec![]
}
#[cfg(test)]
mod test {
    use crate::search;

    #[test]
    fn on_result() {
        let query = "duct";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.";
        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }
}
```

#### 编写使测试通过的代码

```rust
// 遍历内容的每一行文本。
// 查看这一行是否包含要搜索的字符串。
// 如果有，将这一行加入列表返回值中。
// 如果没有，什么也不做。
// 返回匹配到的结果列表
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}
```

* 在 run 函数中使用 search 函数

  ```rust
  pub fn run(config: &Config) -> Result<(), Box<dyn Error>> {
      let content = fs::read_to_string(&config.file_path)?;  
      for line in search(&config.query, &content) {
          println!("{line}")
      }
      // 返回
      Ok(())
  }
  ```

* 运行程序

  ```rust
  // 单行结果
  cargo run -- frog poem.txt 
  // 多行结果
  cargo run -- body poem.txt
  // 没结果
  cargo run -- monomorphization poem.txt
  ```

  

### 处理环境变量

#### 编写一个大小写不敏感 search 函数的失败测试

```rust
/*
     大小写不敏感测试
    */
    #[test]
    fn case_insensitive() {
        let query = "rUsT";
        let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";
        assert_eq!(
            vec!["Rust:", "Trust me."],
            search_case_insensitive(query, contents)
        );
    }

// 错误函数
fn search_case_insensitive<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
  vec![]
}
```

#### 函数补充全

```rust
// 大小写不敏感
fn search_case_insensitive<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.to_uppercase().contains(query.to_uppercase().as_str()))
        .collect()
}
```

#### 环境变量处理

```rust
// 从环境变量获取参数
let ignore_case = env::var("IGNORE_CASE").is_ok();
```

* `IGNORE_CASE=1 cargo run TO poem.txt`



### 将错误信息输出到标准错误而不是标准输出

**标准输出**（*standard output*，`stdout`）对应一般信息，**标准错误**（*standard error*，`stderr`）则用于错误信息

#### 将错误打印到标准错误

```rust
fn main() {
    // 1. 解析参数
    let args: Vec<String> = env::args().collect();
    let config = minigrep2::Config::build(&args).unwrap_or_else(|err| {
        // 标准错误输出
        eprintln!("解析参数错误: {err}");
        process::exit(1);
    });

    // 2. 读取文件
    if let Err(e) = minigrep2::run(&config) {
        // 标准错误输出
        eprintln!("程序运行错误: {e}");
        process::exit(1);
    }
}
```

* 运行`cargo run > output.txt`

  ```shell
  Problem parsing arguments: not enough arguments
  ```

* `cargo run -- to poem.txt > output.txt`

  终端看不到输出，output.txt内容如下：

  ```text
  Are you nobody, too?
  How dreary to be somebody!
  ```

  

## 13 中的函数式语言功能：迭代器与闭包

涉及内容

- **闭包**（*Closures*），一个可以储存在变量里的类似函数的结构
- **迭代器**（*Iterators*），一种处理元素序列的方式
- 如何使用闭包和迭代器来改进第十二章的 I/O 项目。
- 闭包和迭代器的性能。（**剧透警告：** 它们的速度超乎你的想象！）

 ### 闭包：可以捕获环境的匿名函数

Rust 的 **闭包**（*closures*）是可以保存在一个变量中或作为参数传递给其他函数的匿名函数

#### 闭包会捕获其环境

```rust
impl Inventory {
    // 获取颜色
    fn giveaway(&self, user_preference: Option<ShirtColor>) -> ShirtColor {
        user_preference.unwrap_or_else(|| self.most_stocked())
    }
    // 获取库存最多的颜色
    fn most_stocked(&self) -> ShirtColor {
        let mut red_count = 0;
        let mut blue_count = 0;

        for item in &self.shirts {
            match item {
                ShirtColor::Red => red_count += 1,
                ShirtColor::Blue => blue_count += 1,
            }
        }

        if red_count > blue_count {
            return ShirtColor::Red;
        } else {
            return ShirtColor::Blue;
        }
    }
}
```

传递了一个会在当前 `Inventory` 实例上调用 `self.most_stocked()` 的闭包。标准库并不需要知道我们定义的 `Inventory` 或 `ShirtColor` 类型或是在这个场景下我们想要用的逻辑。闭包捕获了一个 `Inventory` 实例的不可变引用到 `self`，并连同其它代码传递给 `unwrap_or_else` 方法。相比之下，函数就不能以这种方式捕获其环境。

#### 闭包类型推断和注解

* 函数中需要类型注解是因为它们是暴露给用户的显式接口的一部分。严格定义这些接口对保证所有人都对函数使用和返回值的类型理解一致是很重要的。
* 闭包并不用于这样暴露在外的接口：它们储存在变量中并被使用，不用命名它们或暴露给库的用户调用。

```rust
let expensive_closure = |num: u32| -> u32 {
  println!("calculating slowly...");
  thread::sleep(Duration::from_secs(2));
  num
};
let rs = expensive_closure(12);
println!("12 expensive_closure is {rs}");
```

* 定义了一个闭包并将它保存在变量中
* 闭包使用了类型注解

有了类型注解闭包的语法就更类似函数了

```rust
fn  add_one_v1   (x: u32) -> u32 { x + 1 }
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x|             { x + 1 };
let add_one_v4 = |x|               x + 1  ;
```

* 第一行展示了一个函数定义
* 第二行展示了一个完整标注的闭包定义
* 第三行闭包定义中省略了类型注解
* 而第四行去掉了可选的大括号，因为闭包体只有一个表达式。

#### 捕获引用或者移动所有权

闭包可以通过三种方式捕获其环境，它们直接对应到函数获取参数的三种方式：不可变借用，可变借用和获取所有权。闭包会根据函数体中如何使用被捕获的值决定用哪种方式捕获。

```rust
let mut list = vec![1, 2, 3];
println!("Before defining closure: {:?}", list);

let mut borrows_mutably = || list.push(7);
// 这里不能打印，因为borrows_mutably闭包已经借用了list
// 只能borrows_mutably调用结束后，list被借用结束
// 才能存在其他的list借用（println! 也是使用的list借用）
// 注：可变借用存在时不允许有其他借用
// println!("list is {:?}", list);
borrows_mutably();
println!("After calling closure: {:?}", list);
```



闭包体不严格需要所有权，如果希望强制闭包获取它用到的环境中值的所有权，可以在参数列表前使用 `move` 关键字。

```rust
let list = vec![1, 2, 3];
    println!("Before defining closure: {:?}", list);

    thread::spawn(move || println!("From thread: {:?}", list))
        .join()
        .unwrap();
}
```

* 闭包定义前写上 `move` 关键字来指明 `list` 应当被移动到闭包中
* 防止线程维护了 `list` 的所有权但却在新线程之前结束并且丢弃了 `list`，则在线程中的不可变引用将失效

#### 将被捕获的值移出闭包和 Fn trait

1. `FnOnce` 适用于能被调用一次的闭包，所有闭包都至少实现了这个 trait，因为所有闭包都能被调用。一个会将捕获的值移出闭包体的闭包只实现 `FnOnce` trait，这是因为它只能被调用一次。
2. `FnMut` 适用于不会将捕获的值移出闭包体的闭包，但它可能会修改被捕获的值。这类闭包可以被调用多次。
3. `Fn` 适用于既不将被捕获的值移出闭包体也不修改被捕获的值的闭包，当然也包括不从环境中捕获值的闭包。这类闭包可以被调用多次而不改变它们的环境，这在会多次并发调用闭包的场景中十分重要。



### 使用迭代器处理元素序列

```rust
#[test]
fn iterator_demonstration() {
  let v1 = vec![1, 2, 3];
  let mut v1_iter = v1.iter();

  assert_eq!(v1_iter.next(), Some(&1));
  assert_eq!(v1_iter.next(), Some(&2));
  assert_eq!(v1_iter.next(), Some(&3));
  assert_eq!(v1_iter.next(), None);
}
```

* 注意 `v1_iter` 需要是可变的
* 从 `next` 调用中得到的值是 vector 的不可变引用
* 获取 `v1` 所有权并返回拥有所有权的迭代器，则可以调用 `into_iter`
* 获取迭代可变引用，则可以调用 `iter_mut`

#### 消费迭代器的方法

```rust
#[test]
fn iterator_sum() {
  let v1 = vec![1, 2, 3];
  let v1_iter = v1.iter();
  let total: i32 = v1_iter.sum();
  assert_eq!(total, 6);
}
```

调用 `sum` 之后不再允许使用 `v1_iter` 因为调用 `sum` 时它会获取迭代器的所有权



```rust
// 获取query
let query = match args.next() {
  Some(t) => t,
  None => return Err("请输入参数1.查询字符串 2.文件名"),
};
```



## 14 Cargo

### 采用发布配置自定义构建

Cargo 有两个主要的配置：运行 `cargo build` 时采用的 `dev` 配置和运行 `cargo build --release` 的 `release` 配置。`dev` 配置为开发定义了良好的默认配置，`release` 配置则为发布构建定义了良好的默认配置。

```shell
$ cargo build
$ cargo build --release
```

* Cargo.toml

  ```rust
  [profile.dev]
  opt-level = 0
  
  [profile.release]
  opt-level = 3
  ```

  * `opt-level` 设置控制 Rust 会对代码进行何种程度的优化。这个配置的值从 0 到 3。

### 将 crate 发布到 Crates.io

#### 编写有用的文档注释

```rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```



```rust
// cargo doc 来生成这个文档注释的 HTML 文档
cargo doc
// 构建当前 crate 文档的 HTML 并在浏览器中打开
cargo doc --open 
```

* 注释包含项的结构

  文档注释风格 `//!` 为包含注释的项，而不是位于注释之后的项增加文档

  ```rust
  //! # My Crate
  //!
  //! `my_crate` is a collection of utilities to make performing certain
  //! calculations more convenient.
  
  /// Adds one to the number given.
  // --snip--
  ```

* 使用 pub use 导出合适的公有 API

  使用 `pub use` 重导出（re-export）项来使公有结构不同于私有结构

```rust
//! # Art
//!
//! A library for modeling artistic concepts.

pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    // --snip--
}

pub mod utils {
    // --snip--
}
```

* 向新 crate 添加元信息

  ```rust
  [package]
  name = "art"
  version = "0.1.0"
  edition = "2021"
  description = "A fun game where you guess what number the computer has chosen."
  license = "MIT"
  
  # See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
  
  [dependencies]
  ```

* 发布到 Crates.io

  ```shelll
  cargo publish
  ```

* 使用 cargo yank 从 Crates.io 弃用版本

  ```shell
  cargo yank --vers 1.0.1
  ```

### Cargo 工作空间-workspace

> 一个二进制项目和两个库。二进制项目会提供主要功能，并会依赖另两个库。
>
> art: 二进制
>
> cargo、add_one 库

```shell
# 创建库项目
cargo new add_one --lib
# 创建二进制项目
cargo new add_one 
```



* 顶级 *Cargo.toml* 

  ```tom
  [workspace]
  
  members = [
      "art",
      "cargo",   
      "add_one",
  ]
  ```

* `art/Cargo.toml`

  dependencies 依赖的库

  ```toml
  [dependencies]
  # 依赖本工作空间的库
  add_one = { path = "../add_one" }
  # 
  ```

  

* 测试: `-p` 参数并指定希望测试的 crate 名称

  ```shell
  cargo test -p add_one
  ```

  

## 15 智能指针

**指针** （*pointer*）是一个包含内存地址的变量的通用概念。这个地址引用，或 “指向”（points at）一些其他数据。Rust 中最常见的指针是第四章介绍的 **引用**（*reference*）。引用以 `&` 符号为标志并借用了它们所指向的值。除了引用数据没有任何其他特殊功能，也没有额外开销。

**智能指针**（*smart pointers*）是一类数据结构，它们的表现类似指针，但是也拥有额外的元数据和功能。

* **引用计数** （*reference counting*）智能指针类型。这种指针允许数据有多个所有者，它会记录所有者的数量，当没有所有者时清理数据。
* 普通引用和智能指针的一个额外的区别是引用是一类只借用数据的指针；相反，在大部分情况下，智能指针 **拥有** 它们指向的数据。
* 智能指针通常使用结构体实现

**常用**

- `Box<T>`，用于在堆上分配值
- `Rc<T>`，一个引用计数类型，其数据可以有多个所有者
- `Ref<T>` 和 `RefMut<T>`，通过 `RefCell<T>` 访问。（ `RefCell<T>` 是一个在运行时而不是在编译时执行借用规则的类型）。



### 使用Box<T>指向堆上的数据

最简单直接的智能指针是 *box*，其类型是 `Box<T>`。box 允许你将一个值放在堆上而不是栈上。留在栈上的则是指向堆数据的指针

* 使用场景：
  * 当有一个在编译时未知大小的类型，而又想要在需要确切大小的上下文中使用这个类型值的时候
  * 当有大量数据并希望在确保数据不被拷贝的情况下转移所有权的时候
  * 当希望拥有一个值并只关心它的类型是否实现了特定 trait 而不是其具体类型的时候

#### Box 允许创建递归类型

```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
```



### 通过 Deref trait 将智能指针当作常规引用处理

实现 `Deref` trait 允许我们重载 **解引用运算符**（*dereference operator*）`*`（不要与乘法运算符或通配符相混淆）。通过这种方式实现 `Deref` trait 的智能指针可以被当作常规引用来对待，可以编写操作引用的代码并用于智能指针。

* 追踪指针的值

  ```rust
  let x = 5;
  let y = &x; // y 等于 x 的一个引用
  assert_eq!(5, x);
  assert_eq!(5, *y);
  assert_eq!(x, *y);
  // 不能比较5 与 y,因为为y为引用，需要*y 解引用后获取值比较
  //assert_eq!(5, y);
  ```

* 像引用一样使用 Box<T>

  ```rust
  let x = 5;
  let y = Box::new(x);
  
  assert_eq!(5, x);
  assert_eq!(5, *y);
  ```

#### 自定义智能指针

```rust
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(t: T) -> MyBox<T> {
        MyBox(t)
    }
}
// 实例解引用
impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
```

* `*y` 时,底层`*(y.deref())`

#### 函数和方法的隐式 Deref 强制转换

**Deref 强制转换**（*deref coercions*）将实现了 `Deref` trait 的类型的引用转换为另一种类型的引用

```rust
  let m = MyBox::new(String::from("Rust"));
    hello(&m);
    let m = MyBox::new("Rust");
    hello(&m);
}

fn hello(name: &str) {
    println!("Hello, {name}!");
}
```



#### Deref 强制转换如何与可变性交互

Rust 在发现类型和 trait 实现满足三种情况时会进行 Deref 强制转换：

- 当 `T: Deref<Target=U>` 时从 `&T` 到 `&U`。
- 当 `T: DerefMut<Target=U>` 时从 `&mut T` 到 `&mut U`。
- 当 `T: Deref<Target=U>` 时从 `&mut T` 到 `&U`。

### 使用 Drop Trait 运行清理代码

```rust
	#[derive(Debug)]
struct CustomerSmartPointer {
    data: String,
}
impl Drop for CustomerSmartPointer {
    fn drop(&mut self) {
        println!("CustomerSmartPointer...drop {}", self.data);
    }
}

main:
println!("\n使用 Drop Trait 运行清理代码");
let a = CustomerSmartPointer {
  data: "aaaa".to_string(),
};
CustomerSmartPointer {
  data: "bbb".to_string(),
};
let c = CustomerSmartPointer {
  data: String::from("cccc stuff"),
};
let d = CustomerSmartPointer {
  data: String::from("dddd stuff"),
};	

println!("a is {:?}", a);
```

* 结果

  ```shell
  使用 Drop Trait 运行清理代码
  CustomerSmartPointer...drop bbb
  a is CustomerSmartPointer { data: "aaaa" }
  CustomerSmartPointer...drop dddd stuff
  CustomerSmartPointer...drop cccc stuff
  CustomerSmartPointer...drop aaaa
  ```

  * bbb没有引用，直接回收
  * 变量以被创建时相反的顺序被丢弃，所以 `d` 在 `c` 之前被丢弃。

* 通过 std::mem::drop 提早丢弃值

  ```rust
  let c = CustomSmartPointer {
    data: String::from("some data"),
  };
  println!("CustomSmartPointer created.");
  drop(c);
  ```



### Rc<T> 引用计数智能指针

`Rc<T>`，其为 **引用计数**（*reference counting*）的缩写。

```rust
#[derive(Debug)]
enum List2 {
    Cons2(i32, Rc<crate::List2>),
    Nil,
}
impl List2 {}

let a = Rc::new(Cons2(5, Rc::new(Cons2(10, Rc::new(List2::Nil)))));
let b = Cons2(3, Rc::clone(&a));
let c = Cons2(4, Rc::clone(&a));
```

* 调用 `Rc::clone` 函数并传递 `a` 中 `Rc<List>` 的引用作为参数。

* 也可以调用 `a.clone()`

  `Rc::clone` 的实现并不像大部分类型的 `clone` 实现那样对所有数据进行深拷贝。`Rc::clone` 只会增加引用计数，这并不会花费多少时间。深拷贝可能会花费很长时间。

#### 克隆 Rc<T> 会增加引用计数

```rust
let a = Rc::new(Cons2(5, Rc::new(Cons2(10, Rc::new(List2::Nil)))));
println!("Count after create a = {}", Rc::strong_count(&a));
let b = Cons2(3, Rc::clone(&a));
println!("Count after create b = {}", Rc::strong_count(&a));
{
  let c = Cons2(3, Rc::clone(&a));
  println!("Count after create c = {}", Rc::strong_count(&a));
}
println!("Count after goes out of scope= {}", Rc::strong_count(&a));
```

引用计数，其值可以通过调用 `Rc::strong_count` 函数获得

### RefCell<T> 和内部可变性模式

**内部可变性**（*Interior mutability*）是 Rust 中的一个设计模式，它允许你即使在有不可变引用时也可以改变数据，这通常是借用规则所不允许的。



#### 通过 RefCell<T> 在运行时检查借用规则

不同于 `Rc<T>`，`RefCell<T>` 代表其数据的唯一的所有权

1. 在任意给定时刻，只能拥有一个可变引用或任意数量的不可变引用 **之一**（而不是两者）。
2. 引用必须总是有效的。

类似于 `Rc<T>`，`RefCell<T>` 只能用于单线程场景。

如下为选择 `Box<T>`，`Rc<T>` 或 `RefCell<T>` 的理由：

- `Rc<T>` 允许相同数据有多个所有者；`Box<T>` 和 `RefCell<T>` 有单一所有者。
- `Box<T>` 允许在编译时执行不可变或可变借用检查；`Rc<T>`仅允许在编译时执行不可变借用检查；`RefCell<T>` 允许在运行时执行不可变或可变借用检查。
- 因为 `RefCell<T>` 允许在运行时执行可变借用检查，所以我们可以在即便 `RefCell<T>` 自身是不可变的情况下修改其内部的值。



#### 内部可变性：不可变值的可变借用

* 内部可变性的用例：mock 对象

#### RefCell<T> 在运行时记录借用

当创建不可变和可变引用时，我们分别使用 `&` 和 `&mut` 语法。

对于 `RefCell<T>` 来说，则是 `borrow` 和 `borrow_mut` 方法，这属于 `RefCell<T>` 安全 API 的一部分。

`borrow` 方法返回 `Ref<T>` 类型的智能指针，`borrow_mut` 方法返回 `RefMut<T>` 类型的智能指针。这两个类型都实现了 `Deref`，所以可以当作常规引用对待。



#### 结合 Rc<T> 和 RefCell<T> 来拥有多个可变数据所有者

`RefCell<T>` 的一个常见用法是与 `Rc<T>` 结合。回忆一下 `Rc<T>` 允许对相同数据有多个所有者，不过只能提供数据的不可变访问。如果有一个储存了 `RefCell<T>` 的 `Rc<T>` 的话，就可以得到有多个所有者 **并且** 可以修改的值了！

```rust
let value = Rc::new(RefCell::new(5));
    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));
    let b = Cons(Rc::new(RefCell::new(3)), Rc::clone(&a)); // clone引用 a
    let c = Cons(Rc::new(RefCell::new(4)), Rc::clone(&a)); // clone引用 a

    *value.borrow_mut() += 10;

    println!("a after = {:?}", a);
    println!("b after = {:?}", b);
    println!("c after = {:?}", c);
```

* 这里创建了一个 `Rc<RefCell<i32>>` 实例并储存在变量 `value` 中以便之后直接访问。
* 接着在 `a` 中用包含 `value` 的 `Cons` 成员创建了一个 `List`。需要克隆 `value` 以便 `a` 和 `value` 都能拥有其内部值 `5` 的所有权，而不是将所有权从 `value` 移动到 `a` 或者让 `a` 借用 `value`。

注意 `RefCell<T>` 不能用于多线程代码！`Mutex<T>` 是一个线程安全版本的 `RefCell<T>` ，我们会在第十六章讨论 `Mutex<T>`。



### 引用循环与内存泄漏



## 16 无畏并发

本章将要涉及到的内容

- 如何创建线程来同时运行多段代码。
- **消息传递**（*Message passing*）并发，其中信道（channel）被用来在线程间传递消息。
- **共享状态**（*Shared state*）并发，其中多个线程可以访问同一片数据。
- `Sync` 和 `Send` trait，将 Rust 的并发保证扩展到用户定义的以及标准库提供的类型中。



Rust 提供了用于消息传递的信道，和像 `Mutex<T>` 和 `Arc<T>` 这样可以安全的用于并发上下文的智能指针。



### 使用线程同时运行代码

多线程导致的问题：

- 竞态条件（Race conditions），多个线程以不一致的顺序访问数据或资源
- 死锁（Deadlocks），两个线程相互等待对方，这会阻止两者继续运行
- 只会发生在特定情况且难以稳定重现和修复的 bug

#### 使用 spawn 创建新线程

```rust
thread::spawn(|| {
  for i in 1..10 {
    println!("hi number {} from the spawned thread!", i);
    thread::sleep(Duration::from_millis(1));
  }
});
```

* 使用 join 等待所有线程结束

  `thread::spawn` 的返回值类型是 `JoinHandle`。`JoinHandle` 是一个拥有所有权的值，当对其调用 `join` 方法时，它会等待其线程结束。

  ```rust
  let handler = thread::spawn(|| {
    for i in 1..=10 {
      println!("hi number {} from the spawned thread!", i);
      thread::sleep(Duration::from_millis(1));
    }
  });
  println!("创建线程结束");
  for i in 1..=5 {
    println!("hi number {} from the main thread!", i);
    thread::sleep(Duration::from_millis(1));
  }
  println!("等待线程结束");
  handler.join().unwrap();
  println!("线程结束");
  ```



#### 将 move 闭包与线程一同使用

```rust
let v = vec![1, 2, 3];
let handler = thread::spawn(move || println!("Here's a vector: {:?}", v));

// v 已经被move
// println!("Here's a vector: {:?}", v);

handler.join().unwrap();
```



### 使用消息传递在线程间传送数据

* 信道
* 发送者
* 接收者

```rust
// tx 发送者 rx 接收者
let (tx, rx) = mpsc::channel();
let handler = thread::spawn(move || {
  println!("thread run ");
  tx.send("hi").unwrap();
});

let received = rx.recv().unwrap();
println!("Got {}", received);
```

信道的接收者有两个有用的方法：`recv` 和 `try_recv`。

* `recv`方法会阻塞主线程执行直到从信道中接收一个值
* `try_recv` 不会阻塞，相反它立刻返回一个 `Result<T, E>`：`Ok` 值包含可用的信息，而 `Err` 值代表此时没有任何消息。

#### 发送多个值并观察接收者的等待

```rust
let (tx, rx) = mpsc::channel();
let handler = thread::spawn(move || {
  println!("thread run ");
  let vals = vec![
    String::from("hi"),
    String::from("from"),
    String::from("the"),
    String::from("thread"),
  ];
  for item in vals {
    tx.send(item).unwrap();
    // sleep 1s
    thread::sleep(Duration::from_secs(1));
  }
});
// 阻塞读取
let received = rx.recv().unwrap();
println!("Got {}", received);
// rx当作一个迭代器
for rec in rx {
  println!("Got {}", rec);
}
```



#### 通过克隆发送者来创建多个生产者

```rust
let (tx, rx) = mpsc::channel();
// 克隆tx,必须在tx使用前clone
let tx1 = tx.clone();

let handler = thread::spawn(move || {
  println!("thread run ");
  let vals = vec![
    String::from("hi"),
    String::from("from"),
    String::from("the"),
    String::from("thread"),
  ];
  for item in vals {
    tx.send(item).unwrap();
    // sleep 1s
    thread::sleep(Duration::from_secs(1));
  }
});

let handler = thread::spawn(move || {
  println!("another thread run ");
  let vals = vec![
    String::from("more"),
    String::from("messages"),
    String::from("for"),
    String::from("you"),
  ];
  for item in vals {
    tx1.send(item).unwrap();
    // sleep 1s
    thread::sleep(Duration::from_secs(1));
  }
});

// 阻塞读取
let received = rx.recv().unwrap();
println!("Got {}", received);
// rx当作一个迭代器
for rec in rx {
  println!("Got {}", rec);
}
```



### 共享状态并发

#### 互斥器一次只允许一个线程访问数据

**互斥器**（*mutex*）是 *mutual exclusion* 的缩写，也就是说，任意时刻，其只允许一个线程访问某些数据。

互斥器以难以使用著称，因为你不得不记住：

1. 在使用数据之前尝试获取锁。
2. 处理完被互斥器所保护的数据之后，必须解锁数据，这样其他线程才能够获取锁。



#### Mutex<T>的 API

```rust
let mut handles = vec![];
let counter = Arc::new(Mutex::new(0));
println!("m = {:?}", counter);
{
  let mut num = counter.lock().unwrap();
  *num = 1;
}
println!("m = {:?}", counter);

for i in 0..10 {
  let counter = Arc::clone(&counter);
  let hander = thread::spawn(move || {
    let mut num = counter.lock().unwrap();
    *num += 1;
  });
  handles.push(hander);
}

for h in handles {
  h.join().unwrap();
}

println!("m = {:?}", counter.lock().unwrap());
```

`Arc<T>` **正是** 一个类似 `Rc<T>` 并可以安全的用于并发环境的类型。字母 “a” 代表 **原子性**（*atomic*），所以这是一个 **原子引用计数**（*atomically reference counted*）类型。



#### RefCell<T>/Rc<T> 与 Mutex<T>/Arc<T> 的相似性

`Mutex<T>` 提供了内部可变性，就像 `Cell` 系列类型那样。正如第十五章中使用 `RefCell<T>` 可以改变 `Rc<T>` 中的内容那样，同样的可以使用 `Mutex<T>` 来改变 `Arc<T>` 中的内容。

#### 使用 Sync 和 Send trait 的可扩展并发

##### 通过 Send 允许在线程间转移所有权

* 几乎所有的 Rust 类型都是`Send` 的
* `Rc<T>`：这是不能 `Send` 的，只实用于单线程

##### Sync 允许多线程访问

`Sync` 标记 trait 表明一个实现了 `Sync` 的类型可以安全的在多个线程中拥有其值的引用

##### 手动实现 Send 和 Sync 是不安全的



## 17 Rust 的面向对象特性

```rust
// src/lib.rs
pub trait Draw {
    fn draw(&self);
}
pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}

impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}

pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}

impl Draw for Button {
    fn draw(&self) {
        println!("Button[{}][{}-{}]", self.label, self.width, self.height);
    }
}


// src/main.rs
use traitoop::{Button, Draw, Screen};

fn main() {
    println!("顾及不同类型值的 trait 对象");

    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No"),
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}

pub struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for crate::SelectBox {
    fn draw(&self) {
        println!("SelectBox[{}-{}]", self.width, self.height);
        for item in self.options.iter() {
            println!(" * {item}")
        }
    }
}

```

### 面向对象设计模式的实现

博客的最终功能看起来像这样：

1. 博文从空白的草案开始。
2. 一旦草案完成，请求审核博文。
3. 一旦博文过审，它将被发表。
4. 只有被发表的博文的内容会被打印，这样就不会意外打印出没有被审核的博文的文本。



## 18 模式与模式匹配

### 所有可能会用到模式的位置

#### match分支

表达式

```rust
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
```

* `match` 表达式必须是 **穷尽**（*exhaustive*）的，意为 `match` 表达式所有可能的值都必须被考虑到。
* 有一个特定的模式 `_` 可以匹配所有情况，不过它从不绑定任何变量。

#### if let条件表达式

`if let` 表达式主要用于编写等同于只关心一个情况的 `match` 语句简写的。

`if let` 可以对应一个可选的带有代码的 `else` 在 `if let` 中的模式不匹配时运行。

```rust
let favorite_color: Option<&str> = None;
let is_tuesday = false;
let age: Result<u8, _> = "34".parse();

if let Some(color) = favorite_color {
  println!("Using you favorite color, {color}, as the background")
} else if is_tuesday {
  println!("Tuesday is green day");
} else if let Ok(age) = age {
  if age > 18 {
    println!("你已长大，要怕绿！");
  } else {
    println!("你还小，好好长大！")
  }
} else {
  println!("Using blue as the background color");
}
```

`if let` 表达式的缺点在于其穷尽性没有为编译器所检查，而 `match` 表达式则检查了。

#### while let 条件循环

```rust
let mut stack = Vec::new();
stack.push("1");
stack.push("3");
stack.push("3");

while let Some(str) = stack.pop() {
  println!(" * {str}")
}
```

#### for 循环

```rust
let v = vec!["a", "b", "c"];
println!("stack[{:?}]", v);
for (index, value) in v.iter().enumerate() {
  println!(" stack[{index}] is [{value}]")
}
```

#### let语句

解构一个元组

```rust
let (x, y, z) = (1, 2, 3);
println!("{x} {y} {z}");
// 忽略其他值
let (x, ..) = (1, 2, 3); 
println!("{:?}", x)
```

#### 函数参数

```rust
{ 
    // ...
    println!("\n函数参数");
    let point = (1, 2);
    fn_param_pattern(&point);
    println!("point:{:?}", point)
}

fn fn_param_pattern(&(x, y): &(i32, i32)) {
    println!("location [{x},{y}]");
}
```



### Refutability（可反驳性）: 模式是否会匹配失效

模式有两种形式：refutable（可反驳的）和 irrefutable（不可反驳的）

能匹配任何传递的可能值的模式被称为是 **不可反驳的**（*irrefutable*）。一个例子就是 `let x = 5;` 

对某些可能的值进行匹配会失败的模式被称为是 **可反驳的**（*refutable*）。一个这样的例子便是 `if let Some(x) = a_value` 表达式中的 `Some(x)`；如果变量 `a_value` 中的值是 `None` 而不是 `Some`，那么 `Some(x)` 模式不能匹配。

* 函数参数、`let` 语句和 `for` 循环只能接受不可反驳的模式，
* `if let` 和 `while let` 表达式可以接受可反驳和不可反驳的模式，但编译器会对不可反驳的模式发出警告，因为根据定义它们旨在处理可能的失败：条件表达式的功能在于它能够根据成功或失败来执行不同的操作。



```rust
// some_option_value 可能为None
// let Some(x) = some_option_value;
if let Some(x) = some_option_value {
  println!("some_option_value is null时，永不会走到这里");
} else {
  println!("这里可以省略");
}
```



### 模式语法

#### 匹配字面值

```rust
let x = 1;
match x {
  1 => println!("one"),
  2 => println!("two"),
  3 => println!("three"),
  _ => println!("anything"),
}
```

#### 匹配命名变量

```rust
let x = Some(10);
let y = 5;
match x {
  Some(5) => println!("5"),
  // 此处y不是 上述代码定义为5的y
  // 此处的y匹配任务有效值
  Some(y) => println!("this is y {y}"),
  _ => println!("nothing"),
}
```

#### 多个模式

在 `match` 表达式中，可以使用 `|` 语法匹配多个模式，它代表 **或**（*or*）运算符模式。

```rust
let x = 2;
match x {
  1 | 5 => println!("match 1|5 {x}"),
  _ => println!("nothing {x}"),
}
```

#### 通过 ..= 匹配值的范围

```rust
let c = 'c';
match c {
  'a'..='z' => println!("小写字母 {c}"),
  'A'..='Z' => println!("小写字母 {c}"),
  _ => println!("非法字母 {c}"),
}
```



#### 解构并分解值

* 解构结构体

  ```rust
  let p = Point { x: 5, y: 10 };
  let Point { x, y } = p;
  println!("point[{x}, {y}]");
  
  let p = Point { x: 0, y: 7 };
  match p {
    Point { x, y: 0 } => println!("On the x axis is {:?}", p),
    // 匹配上x后进入
    Point { x: 0, y } => println!("On the y axis is {:?}", p),
    Point { x, y } => println!("Point {:?}", p),
  }
  ```

* 解构枚举

  ```rust
  enum Message {
      Quit,
      Move { x: i32, y: i32 },
      Writer(String),
      ChangeColor(i32, i32, i32),
  }
  // ...
  let msg = Message::ChangeColor(1, 2, 3);
  match msg {
    Message::Quit => println!("this is quit"),
    Message::Move { x, y } => println!("move {x} {y}"),
    Message::Writer(msg) => println!("writer [{msg}]"),
    Message::ChangeColor(a, b, c) => println!("clor {a} {b} {c}"),
  }
  ```

* 解构嵌套的结构体和枚举

  ```rust
  #[derive(Debug)]
  enum Clor {
      Rgb(i32, i32, i32),
      Hsv(i32, i32, i32),
  }
  
  #[derive(Debug)]
  enum Message2 {
      Quit,
      Move { x: i32, y: i32 },
      Writer(String),
      ChangeColor(Clor),
  }
  //... 
  let msg = Message2::ChangeColor(Clor::Hsv(1, 2, 3));
  match msg {
    Message2::Quit => println!("quit"),
    Message2::Move { x, y } => println!("move {x} {y}"),
    Message2::Writer(str) => println!("writer [{str}]"),
    Message2::ChangeColor(Clor::Hsv(a, b, c)) => println!("color hsv {a} {b} {c}"),
    Message2::ChangeColor(Clor::Rgb(a, b, c)) => println!("color rgb {a} {b} {c}"),
  }
  ```

* 解构结构体和元组

  ```rust
  let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
  ```

#### 忽略模式中的值

* 使用 _ 忽略整个值

  ```rust
  fn foo(_: i32, y: i32) {
      println!("This code only uses the y parameter: {}", y);
  }
  
  fn main() {
      foo(3, 4);
  }
  
  ```

* 使用嵌套的 _ 忽略部分值

  ```rust
  let mut setting_value = Some(5);
  let new_setting_value = Some(10);
  match (setting_value, new_setting_value) {
    (Some(_), Some(k_)) => {
      println!("无用功....")
    }
    _ => {
      setting_value = new_setting_value;
    }
  }
  println!(
    "setting_value is {:?}, new_setting_value is {:?}",
    setting_value, new_setting_value
  );
  
  let numbers = (1, 2, 3, 4, 5);
  match numbers {
    (first, _, third, _, fifty) => {
      println!("first:{first} third:{third} fifty:{fifty}");
    }
  }
  ```

* 通过在名字前以一个 _ 开头来忽略未使用的变量

  ```rust
  let _x = 5;
  // 编译器会提示，此变量未使用
  let y = 5;
  
  let _some = Some(5);
  // 这里_some已经移动了
  if let Some(_t) = _some {
    println!("_t is {}", _t);
  }
  // 不能再使用_some了，因为 if let 已经移动了_some
  // println!("unable use _some again {_some}");
  let _some = Some(5);
  // _some没有移动，if let后仍可以使用
  if let Some(_) = _some {
    println!("got the value {:?}", _some);
  }
  println!("unable use _some again {:?}", _some);
  ```

* 用 .. 忽略剩余值

  ```rust
  let p = Point2 { x: 1, y: 2, z: 3 };
  match p {
    Point2 { x, .. } => {
      println!("x is {x}");
    }
  }
  
  let numbers = (1, 2, 3, 4, 5);
  match numbers {
    (first, .., last) => {
      println!("first is {first} last is {last}");
    }
  }
  ```

#### 匹配守卫提供的额外条件

**匹配守卫**（*match guard*）是一个指定于 `match` 分支模式之后的额外 `if` 条件，它也必须被满足才能选择此分支。匹配守卫用于表达比单独的模式所能允许的更为复杂的情况。

```rust
let num = Some(4);
match num {
  Some(x) if x % 2 == 0 => println!("是偶数"),
  Some(x) => println!("是奇数"),
  _ => println!("不知道是啥"),
}

let x = 4;
let y = false;
match x {
  4 | 5 | 6 if y => println!("match 4|5|5 and y is true"),
  _ => println!("default ..."),
}
```



#### @ 绑定

```rust
let point = Point2 { x: 3, y: 4, z: 5 };
match point {
  Point2 {
    // 赋值给变更x_val
    x: x_val @ 1..=2,
    y,
    z,
  } => println!(" x at [1..2] {x} {x_val}"),
  Point2 { x: 3..=8, y, z } => println!(" x at [3..8] {x}"),
  _ => (),
}
```



## 19 高级特征

本章将涉及如下内容：

- 不安全 Rust：用于当需要舍弃 Rust 的某些保证并负责手动维持这些保证
- 高级 trait：与 trait 相关的关联类型，默认类型参数，完全限定语法（fully qualified syntax），超（父）trait（supertraits）和 newtype 模式
- 高级类型：关于 newtype 模式的更多内容，类型别名，never 类型和动态大小类型
- 高级函数和闭包：函数指针和返回闭包
- 宏：定义在编译时定义更多代码的方式

### 1.不安全 Rust

#### 不安全的超能力

- 解引用裸指针
- 调用不安全的函数或方法
- 访问或修改可变静态变量
- 实现不安全 trait
- 访问 `union` 的字段



`unsafe` 并不会关闭借用检查器或禁用任何其他 Rust 安全检查：如果在不安全代码中使用引用，它仍会被检查。

`unsafe` 关键字只是提供了那五个不会被编译器检查内存安全的功能。

```rust
let mut num = 5;
unsafe
{
  let r1 = &num as *const i32;
  let r2 = &mut num as *mut i32;
  println!("num is {num} r1:{} r2:{} ", *r1, *r2); // num is 5 r1:5 r2:5 
  num = 6;
  println!("num is {num} r1:{} r2:{} ", *r1, *r2); // num is 6 r1:6 r2:6 
};
```



#### 调用不安全函数或方法

```rust
println!("\n调用不安全函数或方法");
unsafe { dangerous() };

unsafe fn dangerous() {
    println!("this is an dangerous function!");
}
```

不安全函数体也是有效的 `unsafe` 块，所以在不安全函数中进行另一个不安全操作时无需新增额外的 `unsafe` 块



##### 创建不安全代码的安全抽象

```rust
let mut v = vec![1,2,3,4,5,6];
let r = &mut v[..];

let (a,b) = r.split_at_mut(3);
println!("a is {:?}", a);
println!("b is {:?}", b);
assert_eq!(a, &mut [1,2,3]);
assert_eq!(b, &mut [4,5,6]);

fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();
    let ptr = values.as_mut_ptr();

    assert!(mid <= len);

    unsafe {
        (
            slice::from_raw_parts_mut(ptr, mid),
            slice::from_raw_parts_mut(ptr, mid + 1),
        )
    }
}
```

##### 使用 extern 函数调用外部代码

```rust
unsafe{
  println!("-3的绝对值是{}", abs(-3));
}
extern "C" {
    fn abs(input:i32) ->i32;
}

// 供C语言调用call_from_c()
#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```



#### 访问或修改可变静态变量

```rust
static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("name is: {}", HELLO_WORLD);
}
```

* 通常静态变量的名称采用 `SCREAMING_SNAKE_CASE` 写法。

* 静态变量只能储存拥有 `'static` 生命周期的引用

  

**常量与不可变静态变量区别**

*   静态变量中的值有一个固定的内存地址，使用这个值总是会访问相同的地址
*   常量则允许在任何被用到的时候复制其数据。
*   静态变量可以是可变的，访问和修改可变静态变量都是 **不安全** 的

```rust
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```



#### 实现不安全 trait

当 trait 中至少有一个方法中包含编译器无法验证的不变式（invariant）时 trait 是不安全的。可以在 `trait` 之前增加 `unsafe` 关键字将 trait 声明为 `unsafe`，同时 trait 的实现也必须标记为 `unsafe`

```rust
unsafe trait Foo {
    // methods go here
}
unsafe impl Foo for i32 {
    // method implementations go here
}
fn main() {}
```



#### 访问联合体中的字段

`union` 和 `struct` 类似，但是在一个实例中同时只能使用一个声明的字段。联合体主要用于和 C 代码中的联合体交互。



### 2 高级trait

#### 关联类型在 trait 定义中指定占位符类型

> **关联类型**（*associated types*）是一个将类型占位符与 trait 相关联的方式，这样 trait 的方法签名中就可以使用这些占位符类型。trait 的实现者会针对特定的实现在这个占位符类型指定相应的具体类型。如此可以定义一个使用多种类型的 trait，直到实现此 trait 时都无需知道这些类型具体是什么。

标准库提供的 `Iterator` trait

```rust
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
```

* Item是一个占位符类型，同时`next`方法定义表明它返回`Option<Self::Item>`类型的值
* 此trait的实现者会指定`Item`的具体类型

```rust
pub struct Counter {
    index: u32,
    num: u32,
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        todo!()
    }
}
```

#### 默认泛型类型参数和运算符重载

```rust
let p1 = Point { x: 1, y: 1 };
let p2 = Point { x: 1, y: 1 };
let p4 = Point { x: 2, y: 2 };
assert_eq!(p1 + p2, p4);

#[derive(PartialEq, Debug)]
struct Point {
    x: i32,
    y: i32,
}
// 为 Point 实现 Add 时，使用了默认的 Rhs，因为我们希望将两个 Point 实例相加
impl Add for Point {
    type Output = Point;

    fn add(self, rhs: Self) -> Self::Output {
        Point {
            x: self.x + rhs.x,
            y: self.y + rhs.y,
        }
    }
}
```

 **newtype 模式**

```rust
let meters = Meters { 0: 1 };
let mill_meters = Millimeters { 0: 1 };
println!("meters:{:?} mill_meters:{:?}", meters, mill_meters);
let mill_meters = mill_meters.add(meters);
println!("mill_meters:{:?}", mill_meters);


#[derive(Debug)]
pub struct Millimeters(pub u32);
#[derive(Debug)]
pub struct Meters(pub u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, rhs: Meters) -> Self::Output {
        Millimeters(self.0 + rhs.0 * 1000)
    }
}
```



#### 完全限定语法与消歧义：调用相同名称的方法

```rust
let human = Human {};
human.fly(); // 这个人有特殊功能...飞....
Pilot::fly(&human); //这是一个飞行员...
Wizard::fly(&human); // 这是一个哈里波特


trait Pilot {
    fn fly(&self);
}
trait Wizard {
    fn fly(&self);
}
struct Human;
impl Pilot for Human {
    fn fly(&self) {
        println!("这是一个飞行员...")
    }
}
impl Wizard for Human {
    fn fly(&self) {
        println!("这是一个哈里波特");
    }
}
impl Human {
    fn fly(&self) {
        println!("这个人有特殊功能...飞....");
    }
}
```

**完全限定**

```rust
println!("A baby dog is called a {}", Dog::baby_name()); // A baby dog is called a Spot
//  完全限定语法
println!("A baby dog is called a {}", <Dog as Animal>::baby_name()); // A baby dog is called a puppy

trait Animal {
    fn baby_name() -> String;
}
struct Dog;
impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}
impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}
```

完全限定语法定义为：

`<Type as Trait>::function(receiver_if_method, next_arg, ...);`



#### 父 trait 用于在另一个 trait 中使用某 trait 的功能

```rust
// 父 trait 用于在另一个 trait 中使用某 trait 的功能
struct PointDisplay {
    x: i32,
    y: i32,
}
pub trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();

        println!("{}", "*".repeat(len + 6));
        println!("* {} *", " ".repeat(len + 2));
        println!("*  {}  *", output);
        println!("* {} *", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 6));
    }
}
impl OutlinePrint for PointDisplay {}

impl fmt::Display for PointDisplay {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "({},{})", self.x, self.y)
    }
}

let point = PointDisplay { x: 1, y: 3 };
println!("{}", point);
println!("===========================");
crate::OutlinePrint::outline_print(&point);
println!("===========================");
```



#### newtype 模式用以在外部类型上实现外部 trait

```rust
// newtype 模式用以在外部类型上实现外部 trait
struct Wrapper(Vec<String>);
impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0.join(" , "))
    }
}

let w = Wrapper(vec![String::from("hello"), String::from("world")]);
println!("w = {}", w); // w = hello , world
```



### 3高级类型

#### 为了类型安全和抽象而使用 newtype 模式

```rust
pub struct Millimeters(pub u32);
pub struct Meters(pub u32);
```

#### 类型别名用来创建类型同义词

Rust 提供了声明 **类型别名**（*type alias*）的能力，使用 `type` 关键字来给予现有类型另一个名字。例如，可以像这样创建 `i32` 的别名 `Kilometers`：

```rust
type KiloMeters = i32;
let x = 5;
let y: KiloMeters = 5;
println!("x = {}, y = {}  x+y={}", x, y, x + y);
```

类型别名的主要用途是减少重复

```rust
// 定义
type Thunk = Box<dyn Fn() + Send + 'static>;
fn takes_long_type(f: Thunk) {
    f();
}
fn return_long_type(str: &str) -> Thunk {
    Box::new(|| println!("return_long_type"))
}

// 使用
let f: Thunk = Box::new(|| println!("hi"));
f();
takes_long_type(f);
let rs = return_long_type("123");
rs();
```

#### 从不返回的 never type

Rust 有一个叫做 `!` 的特殊类型。在类型理论术语中，它被称为 *empty type*，因为它没有值。我们更倾向于称之为 *never type*。这个名字描述了它的作用：在函数从不返回的时候充当返回值。

从不返回的函数被称为 **发散函数**（*diverging functions*）

```rsut
panic! 是 ! 类型
continue 的值是 !
```



#### 动态大小类型和 Sized trait

**动态大小类型**（*dynamically sized types*）。这有时被称为 “DST” 或 “unsized types”，这些类型允许我们处理只有在运行时才知道大小的类型。

`str` 是一个 DST

```rust
fn generic<T>(t: T) {
    // --snip--
}
fn generic<T: Sized>(t: T) {
    // --snip--
}
fn generic<T: ?Sized>(t: &T) {
    // --snip--
}
```

### 4 高级函数与闭包

#### 函数指针

```rust
println!("\n函数指针");
println!("5 add one is {}", add_one(5));  // 5 add one is 6
println!("5 add twice is {}", add_twice(add_one, 5)); // 5 add twice is 12

fn add_one(val: i32) -> i32 {
    val + 1
}

fn add_twice(f: fn(i32) -> i32, val: i32) -> i32 {
    f(val) + f(val)
}

```

函数指针实现了所有三个闭包 trait（`Fn`、`FnMut` 和 `FnOnce`），所以总是可以在调用期望闭包的函数时传递函数指针作为参数。

```rust
let rs: Vec<Status> = (0u32..5).map(Status::Value).collect();
println!("{:?}", rs);


#[derive(Debug)]
enum Status {
    Value(u32),
    Stop,
}
```



#### 返回闭包

```rust
println!("\n返回闭包");
let f = return_closual();
println!("{}", f(1));
println!("{}", f(2));
// 直接返回 |x| x + 1 会异常。Rust并不知道需要多少空间来储存闭包
fn return_closual() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}

```



### 5 宏

>  宏，声明宏、过程宏

**宏**（*Macro*）指的是 Rust 中一系列的功能：使用 `macro_rules!` 的 **声明**（*Declarative*）宏，和三种 **过程**（*Procedural*）宏：

- 自定义 `#[derive]` 宏在结构体和枚举上指定通过 `derive` 属性添加的代码
- 类属性（Attribute-like）宏定义可用于任意项的自定义属性
- 类函数宏看起来像函数不过作用于作为参数传递的 token

#### 宏和函数的区别

从根本上来说，宏是一种为写其他代码而写代码的方式，即所谓的 **元编程**（*metaprogramming*）

* 特点：
  * 一个函数签名必须声明函数参数个数和类型。相比之下，宏能够接收不同数量的参数：用一个参数调用 `println!("hello")` 或用两个参数调用 `println!("hello {}", name)` 。
  * 宏可以在编译器翻译代码前展开
  * 实现宏不如实现函数的一面是宏定义要比函数定义更复杂，因为你正在编写生成 Rust 代码的 Rust 代码。由于这样的间接性，宏定义通常要比函数定义更难阅读、理解以及维护。
  * 在一个文件里调用宏 **之前** 必须定义它，或将其引入作用域，而函数则可以在任何地方定义和调用。



#### 使用 macro_rules! 的声明宏用于通用元编程

```rsut
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```



#### 用于从属性生成代码的过程宏

> **过程宏**（*procedural macros*）有三种类型的过程宏（自定义派生（derive），类属性和类函数），不过它们的工作方式都类似。

```rsut
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```



#### 如何编写自定义 derive 宏

了三个新的 crate：`proc_macro` 、 [`syn`](https://crates.io/crates/syn) 和 [`quote`](https://crates.io/crates/quote) 。Rust 自带 `proc_macro` crate，因此无需将其加到 *Cargo.toml* 文件的依赖中。`proc_macro` crate 是编译器用来读取和操作我们 Rust 代码的 API。

* `syn` crate 将字符串中的 Rust 代码解析成为一个可以操作的数据结构。
* `quote` 则将 `syn` 解析的数据结构转换回 Rust 代码。这些 crate 让解析任何我们所要处理的 Rust 代码变得更简单：为 Rust 编写整个的解析器并不是一件简单的工作。

```rust
// 三个create, 两个目录下
// 1. 宏定义及实现
// hello_macro/src/lib/rs
// 定义trait
pub trait HelloMacro {
    fn hello_macro();
}
// 2. 宏实现（derive）hello_macro/hello_macro_derive
// 约定/要求derive与trait定义的create下
// 2.1 hello_macro/hello_macro_derive/Cargo.toml
[lib]
proc-macro = true

[dependencies]
syn = "1.0.109"
quote = "1.0.21"

// 2.2 hello_macro/hello_macro_derive/src/lib.rs
use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = syn::parse(input).unwrap();

    // Build the trait implementation
    impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!(".....Hello, Macro! My name is {}!", stringify!(#name));
            }
        }
    };
    gen.into()
}

// 3 macros_demo 应用
// 3.1 macros_demo/Cargo.toml 添加依赖
[dependencies]
hello_macro = { path = "../hello_macro" }
hello_macro_derive = { path = "../hello_macro/hello_macro_derive" }

// 3.2 macros_demo/src/main.rs
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;
#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    println!("\n如何编写自定义 derive 宏");
    Pancakes::hello_macro();
}
```



#### 类属性宏

类属性宏与自定义派生宏相似，不同的是 `derive` 属性生成代码，它们（类属性宏）能让你创建新的属性。

```rust
#[route(GET, "/")]
fn index() {
```

#### 类函数宏

类函数（Function-like）宏的定义看起来像函数调用的宏。类似于 `macro_rules!`，它们比函数更灵活；

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```















