import{_ as i,p as e,q as n,a1 as d}from"./framework-449724a9.js";const s={},r=d(`<h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1><h2 id="_1-理论" tabindex="-1"><a class="header-anchor" href="#_1-理论" aria-hidden="true">#</a> 1. 理论</h2><h3 id="设置模式原则" tabindex="-1"><a class="header-anchor" href="#设置模式原则" aria-hidden="true">#</a> 设置模式原则</h3><blockquote><p>总原则——开闭原则 <strong>对扩展开放，对修改关闭</strong></p></blockquote><ul><li><p><strong>单一职责原则</strong></p></li><li><p><strong>里氏替换原则</strong> 任何基类可以出现的地方，子类一定可以出现</p></li><li><p><strong>依赖倒置原则</strong></p><p>1、上层模块不应该依赖底层模块，它们都应该依赖于抽象。 2、抽象不应该依赖于细节，细节应该依赖于抽象。</p></li><li><p><strong>接口隔离原则</strong></p><p>1、客户端不应该依赖它不需要的接口。 2、类间的依赖关系应该建立在最小的接口上。</p></li><li><p><strong>迪米特法则（最少知道原则）</strong></p></li><li><p><strong>合成复用原则</strong> 尽量使用对象组合/聚合，而不是继承关系达到软件复用的目的。</p></li></ul><h3 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h3><ul><li><strong>创建型模式</strong>（5种）工厂模式、抽象工厂模式、单例模式、建造者模式、原型模式</li><li><strong>结构型模式</strong>（7种）适配器模式、装饰者模式、代理模式、外观模式、桥接模式、组合模式、享元模式</li><li><strong>行为型模式</strong> （11种）策略模式、模板方法模式、观察者模式、迭代器模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式</li></ul><h2 id="_2-模式" tabindex="-1"><a class="header-anchor" href="#_2-模式" aria-hidden="true">#</a> 2.模式</h2><h3 id="简单工厂、工厂方法、抽象工厂" tabindex="-1"><a class="header-anchor" href="#简单工厂、工厂方法、抽象工厂" aria-hidden="true">#</a> 简单工厂、工厂方法、抽象工厂</h3><blockquote><p>参考：https://cloud.tencent.com/developer/article/1876931</p></blockquote><h4 id="简单工厂-静态工厂方法模式" tabindex="-1"><a class="header-anchor" href="#简单工厂-静态工厂方法模式" aria-hidden="true">#</a> 简单工厂/静态工厂方法模式</h4><blockquote><p>简单工厂模式是<strong>由一</strong> <strong>个工厂对象决定创建出哪一种产品类的实例</strong></p><p>由于创建实例的方法通常为静态(static)方法，因此简单工厂模式又被成为静态工厂方法模式(Static Factory Method)。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class SimpleFactory {
    public AbstractBlock getBlock(String type){ //根据传参创建不同的地块
        if(type.equalsIgnoreCase(&quot;Empty&quot;)){
            return new Empty();
        } else if(type.equalsIgnoreCase(&quot;Park&quot;)){
            return new Park();
        } else if(type.equalsIgnoreCase(&quot;Prison&quot;)){
            return new Prison();
        }
        return null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>简单</li><li>增加新产品需要对工厂类修改</li></ul><h4 id="工厂方法" tabindex="-1"><a class="header-anchor" href="#工厂方法" aria-hidden="true">#</a> 工厂方法</h4><blockquote><p>工厂方法进一步解耦合，把工厂类抽象，不再负责所有实例的创建，而是把具体的创建工作交给了子类去完成，实例化延迟到子类加载，由子类来决定要实例化的类。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 抽象产品类
public abstract class Prodcut {
    //抽象产品方法
    public abstract sayHi();
}

//继承抽象类实现产品A类
public class ProductA extends Product {  
    //实现抽象产品方法
    @Overide
    public abstract sayHi(){
        System.out.println(&quot;Hi, I&#39;m ProductA&quot;);
    }
//继承抽象类实现产品B类
public class ProductB extends Product {  
    //实现抽象产品方法
    @Overide
    public abstract sayHi(){
        System.out.println(&quot;Hi, I&#39;m ProductB&quot;);
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
        System.out.println(&quot;生产了一个A&quot;);
        return new ProductA();//生产产品A
    }
}
// 具体工厂类FactoryB
public class FactoryB extends Factory {
    @Overide
    public Product createProduct() {
        System.out.println(&quot;生产了一个B&quot;);
        return new ProductB();//生产产品B
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="抽象工厂" tabindex="-1"><a class="header-anchor" href="#抽象工厂" aria-hidden="true">#</a> 抽象工厂</h4><blockquote><p>解决产品簇，何为产品簇</p><p>产品簇即多个产品的组合，如果车的产品簇包含轿车、卡车等</p></blockquote><ul><li>工厂方法模式只有一个抽象产品类，而抽象工厂模式有多个。</li><li>工厂方法模式的具体工厂类只能创建一个具体产品类的实例，而抽象工厂模式可以创建多个。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 抽象产品类
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
        System.out.println(&quot;Im ProductA1!&quot;);
    }
}
public class ProductA2 implements AbstractProductA{
    @Override
    public void produceA() {
        System.out.println(&quot;Im ProductA2!&quot;);
    }
}
public class ProductB1 implements AbstractProductB{
    @Override
    public void produceB(){
        System.out.println(&quot;Im ProductB1!&quot;);
    }
}
public class ProductB2 implements AbstractProductB{
    @Override
    public void produceB(){
        System.out.println(&quot;Im ProductB2!&quot;);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="观察者" tabindex="-1"><a class="header-anchor" href="#观察者" aria-hidden="true">#</a> 观察者</h3><h4 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h4><p>观察者模式是关于多个对象想知道一个对象中数据变化情况的一种成熟的模式。观察者模式中有一个称作“主题”的对象和若干个称作“观察者”的对象，“主题”和“观察者”间是一种一对多的依赖关系，当“主题”的状态发生变化时，所有“观察者”都得到通知。</p><p>**主要解决：**一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。</p><h4 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 👽优缺点</h4><p><strong>优点：</strong></p><p>1、具体主题和具体观察者是松耦合关系。由于主题接口仅仅依赖于观察者接口，因此具体主题只是知道它的观察者是实现观察者接口的某个类的实例，但不需要知道具体是哪个类。同样，由于观察者仅仅依赖于主题接口，因此具体观察者只是知道它依赖的主题是实现主题接口的某个类的实例，但不需要知道具体是哪个类。</p><p>2、观察者模式满足“开-闭原则”。主题接口仅仅依赖于观察者接口，这样，就可以让创建具体主题的类也仅仅是依赖于观察者接口，因此，如果增加新的实现观察者接口的类，不必修改创建具体主题的类的代码。。同样，创建具体观察者的类仅仅依赖于主题接口，如果增加新的实现主题接口的类，也不必修改创建具体观察者类的代码。</p><p><strong>缺点：</strong></p><p>1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。</p><p>2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。</p><p>3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。</p>`,33),l=[r];function a(c,t){return e(),n("div",null,l)}const v=i(s,[["render",a],["__file","DesignPattern.html.vue"]]);export{v as default};
