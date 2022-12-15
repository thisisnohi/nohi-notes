# SpringBootEvent

> create by nohi 20221024
>
> 参考：https://www.jianshu.com/p/da859d70e357

* 代码：git@github.com:thisisnohi/SpringCloud2022.git/nohi-web/src/main/java/nohi/web/service/enent/DemoEventPublisher.java

*ApplicationContext 通过 ApplicationEvent 类和 ApplicationListener 接口进行事件处理。 如果将实现 ApplicationListener 接口的 bean 注入到上下文中，则每次使用 ApplicationContext 发布 ApplicationEvent 时，都会通知该 bean。 本质上，这是标准的观察者设计模式。*

Spring的事件（Application Event）其实就是一个观察者设计模式，一个 Bean 处理完成任务后希望通知其它 Bean 或者说 一个Bean 想观察监听另一个Bean的行为。

## 步骤

Spring 事件只需要几步：

- 自定义事件，继承 ApplicationEvent
- 定义监听器，实现 ApplicationListener 或者通过 @EventListener 注解到方法上
- 定义发布者，通过 ApplicationEventPublisher



