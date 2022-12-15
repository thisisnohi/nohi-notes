# 设置模式

## 1. 理论

### 设置模式原则

> 总原则——开闭原则 **对扩展开放，对修改关闭**

* **单一职责原则**

* **里氏替换原则** 任何基类可以出现的地方，子类一定可以出现

* **依赖倒置原则**

  1、上层模块不应该依赖底层模块，它们都应该依赖于抽象。
  2、抽象不应该依赖于细节，细节应该依赖于抽象。

* **接口隔离原则**

  1、客户端不应该依赖它不需要的接口。
  2、类间的依赖关系应该建立在最小的接口上。

* **迪米特法则（最少知道原则）**
* **合成复用原则** 尽量使用对象组合/聚合，而不是继承关系达到软件复用的目的。

### 分类

* **创建型模式**（5种）工厂模式、抽象工厂模式、单例模式、建造者模式、原型模式
* **结构型模式**（7种）适配器模式、装饰者模式、代理模式、外观模式、桥接模式、组合模式、享元模式
* **行为型模式** （11种）策略模式、模板方法模式、观察者模式、迭代器模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

## 2.模式

### 简单工厂、工厂方法、抽象工厂

> 参考：https://cloud.tencent.com/developer/article/1876931

#### 简单工厂/静态工厂方法模式

> 简单工厂模式是**由一** **个工厂对象决定创建出哪一种产品类的实例**
>
> 由于创建实例的方法通常为静态(static)方法，因此简单工厂模式又被成为静态工厂方法模式(Static Factory Method)。

```
public class SimpleFactory {
    public AbstractBlock getBlock(String type){ //根据传参创建不同的地块
        if(type.equalsIgnoreCase("Empty")){
            return new Empty();
        } else if(type.equalsIgnoreCase("Park")){
            return new Park();
        } else if(type.equalsIgnoreCase("Prison")){
            return new Prison();
        }
        return null;
    }
}
```

* 简单
* 增加新产品需要对工厂类修改

#### 工厂方法

>  工厂方法进一步解耦合，把工厂类抽象，不再负责所有实例的创建，而是把具体的创建工作交给了子类去完成，实例化延迟到子类加载，由子类来决定要实例化的类。

```
// 抽象产品类
public abstract class Prodcut {
    //抽象产品方法
    public abstract sayHi();
}

//继承抽象类实现产品A类
public class ProductA extends Product {  
    //实现抽象产品方法
    @Overide
    public abstract sayHi(){
        System.out.println("Hi, I'm ProductA");
    }
//继承抽象类实现产品B类
public class ProductB extends Product {  
    //实现抽象产品方法
    @Overide
    public abstract sayHi(){
        System.out.println("Hi, I'm ProductB");
    }
}

// 工厂抽象类
public abstract class Factory {
    //抽象工厂方法
    public abstract Product createProduct();
}
// 具体工厂类FactoryA
public class FactoryA extends Factory {
    @Overide
    public Product createProduct() {
        System.out.println("生产了一个A");
        return new ProductA();//生产产品A
    }
}
// 具体工厂类FactoryB
public class FactoryB extends Factory {
    @Overide
    public Product createProduct() {
        System.out.println("生产了一个B");
        return new ProductB();//生产产品B
    }
}
```



#### 抽象工厂

> 解决产品簇，何为产品簇
>
> 产品簇即多个产品的组合，如果车的产品簇包含轿车、卡车等

* 工厂方法模式只有一个抽象产品类，而抽象工厂模式有多个。
* 工厂方法模式的具体工厂类只能创建一个具体产品类的实例，而抽象工厂模式可以创建多个。

```
// 抽象产品类
public interface AbstractProductA{
    public void produceA();
}
public interface AbstractProductB{
    public void produceB();
}
// 抽象工厂角色
public interface AbstractFactory{
    public AbstractProductA CreateProductA();
    public AbstractProductB CreateProductB();
}


//具体产品角色
public class ProductA1 implements AbstractProductA{
    @Override
    public void produceA(){
        System.out.println("Im ProductA1!");
    }
}
public class ProductA2 implements AbstractProductA{
    @Override
    public void produceA() {
        System.out.println("Im ProductA2!");
    }
}
public class ProductB1 implements AbstractProductB{
    @Override
    public void produceB(){
        System.out.println("Im ProductB1!");
    }
}
public class ProductB2 implements AbstractProductB{
    @Override
    public void produceB(){
        System.out.println("Im ProductB2!");
    }
}

// 具体工厂角色
public class ConcreteFactory1 implements AbstractFactory{
    @Override
    public AbstractProductA CreateProductA(){
        return new ProductA1();
    }
    @Override
    public AbstractProductB CreateProductB(){
        return new ProductB1();
    }
}
public class ConcreteFactory2 implements AbstractFactory{
    @Override
    public AbstractProductA CreateProductA(){
        return new ProductA2();
    }
    @Override
    public AbstractProductB CreateProductB(){
        return new ProductB2();
    }
}
```



### 观察者

#### 定义

观察者模式是关于多个对象想知道一个对象中数据变化情况的一种成熟的模式。观察者模式中有一个称作“主题”的对象和若干个称作“观察者”的对象，“主题”和“观察者”间是一种一对多的依赖关系，当“主题”的状态发生变化时，所有“观察者”都得到通知。

**主要解决：**一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。

####   :alien:优缺点

**优点：**

　　1、具体主题和具体观察者是松耦合关系。由于主题接口仅仅依赖于观察者接口，因此具体主题只是知道它的观察者是实现观察者接口的某个类的实例，但不需要知道具体是哪个类。同样，由于观察者仅仅依赖于主题接口，因此具体观察者只是知道它依赖的主题是实现主题接口的某个类的实例，但不需要知道具体是哪个类。

　　2、观察者模式满足“开-闭原则”。主题接口仅仅依赖于观察者接口，这样，就可以让创建具体主题的类也仅仅是依赖于观察者接口，因此，如果增加新的实现观察者接口的类，不必修改创建具体主题的类的代码。。同样，创建具体观察者的类仅仅依赖于主题接口，如果增加新的实现主题接口的类，也不必修改创建具体观察者类的代码。

**缺点：** 

　　1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。

　　2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。

　　3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。





