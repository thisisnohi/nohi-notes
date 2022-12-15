# Android

* Init.gradle

  ```
  allprojects {
      repositories {
          maven { url 'file:/Users/nohi/data/repo'}
          mavenLocal()
          maven { name "Alibaba" ; url "https://maven.aliyun.com/repository/public" }
          maven { url 'http://maven.aliyun.com/nexus/content/repositories/central/' }
          maven { url "http://maven.oschina.net/content/groups/public/" } 
          mavenCentral()
      }
  
      buildscript { 
          repositories { 
              maven { name "Alibaba" ; url 'https://maven.aliyun.com/repository/public' }
              maven { name "M2" ; url 'https://plugins.gradle.org/m2/' }
          }
      }
  }
  切记不要配置： maven { name "Bstek" ; url "http://nexus.bsdn.org/content/groups/public/" }
  这玩意里面的包不对，折腾了我几天
  ```

  



## 网站

* https://developer.android.google.cn/studio/build/application-id.html?hl=zh-cn
* Android 教程： https://www.w3cschool.cn/android/android-application-components.html
* UI设计：摹客网：https://app.mockplus.cn/app/sTqAu93NpX/storyboard

## Android 应用程序组件

| 组件                | 描述                                      |
| :------------------ | :---------------------------------------- |
| Activities          | 描述UI，并且处理用户与机器屏幕的交互。    |
| Services            | 处理与应用程序关联的后台操作。            |
| Broadcast Receivers | 处理Android操作系统和应用程序之间的通信。 |
| Content Providers   | 处理数据和数据库管理方面的问题。          |

广播接收器是**BroadcastReceiver**类的一个子类，每个消息以**Intent**对象的形式来广播。

## 附件组件

| 组件      | 描述                                             |
| :-------- | :----------------------------------------------- |
| Fragments | 代表活动中的一个行为或者一部分用户界面。         |
| Views     | 绘制在屏幕上的UI元素，包括按钮，列表等。         |
| Layouts   | 控制屏幕格式，展示视图外观的View的继承。         |
| Intents   | 组件间的消息连线。                               |
| Resources | 外部元素，例如字符串资源、常量资源及图片资源等。 |
| Manifest  | 应用程序的配置文件。                             |

res/ 目录在各种子目录中包含了所有的资源。这里有一个图片资源，两个布局资源和一个字符串资源文件。下表详细的给出了在项目中 res/ 目录里面支持的资源。

| 目录      | 资源类型                                                     |
| :-------- | :----------------------------------------------------------- |
| anim/     | 定义动画属性的XML文件。它们被保存在res/anim/文件夹下，通过R.anim类访问 |
| color/    | 定义颜色状态列表的XML文件。它们被保存在res/color/文件夹下，通过R.color类访问 |
| drawable/ | 图片文件，如.png,.jpg,.gif或者XML文件，被编译为位图、状态列表、形状、动画图片。它们被保存在res/drawable/文件夹下，通过R.drawable类访问 |
| layout/   | 定义用户界面布局的XML文件。它们被保存在res/layout/文件夹下，通过R.layout类访问 |
| menu/     | 定义应用程序菜单的XML文件，如选项菜单，上下文菜单，子菜单等。它们被保存在res/menu/文件夹下，通过R.menu类访问 |
| raw/      | 任意的文件以它们的原始形式保存。需要根据名为R.raw.filename的资源ID，通过调用Resource.openRawResource()来打开raw文件 |
| values/   | 包含简单值(如字符串，整数，颜色等)的XML文件。这里有一些文件夹下的资源命名规范。arrays.xml代表数组资源，通过R.array类访问；integers.xml代表整数资源，通过R.integer类访问；bools.xml代表布尔值资源，通过R.bool类访问；colors.xml代表颜色资源，通过R.color类访问；dimens.xml代表维度值，通过R.dimen类访问；strings.xml代表字符串资源，通过R.string类访问；styles.xml代表样式资源，通过R.style类访问 |
| xml/      | 可以通过调用Resources.getXML()来在运行时读取任意的XML文件。可以在这里保存运行时使用的各种配置文件 |

* 使用资源

  ```
  Java 文字：txtName.setText(getResources().getText(R.string.name)); 
  图片：imgIcon.setBackgroundDrawableResource(R.drawable.icon); 
  颜色：txtName.setTextColor(getResouces().getColor(R.color.red)); 
  布局：setContentView(R.layout.main);
  控件：txtName = (TextView)findViewById(R.id.txt_name);
  
  
  <TextView android:text="@string/hello_world" android:layout_width="wrap_content" android:layout_height="wrap_content" android:background = "@drawable/img_back"/>
  ```

  

## Activity 类

| 回调        | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| onCreate()  | 这是第一个回调，在活动第一次创建是调用                       |
| onStart()   | 这个回调在活动为用户可见时被调用                             |
| onResume()  | 这个回调在应用程序与用户开始可交互的时候调用                 |
| onPause()   | 被暂停的活动无法接受用户输入，不能执行任何代码。当当前活动将要被暂停，上一个活动将要被恢复是调用 |
| onStop()    | 当活动不在可见时调用                                         |
| onDestroy() | 当活动被系统销毁之前调用                                     |
| onRestart() | 当活动被停止以后重新打开时调用                               |



## Android Drawable 详解（教你画画！）

> 参考：https://www.cnblogs.com/Jeely/p/11045042.html

### Drawable分类

| No   | xml标签        | Class类            | 含义                   |
| ---- | -------------- | ------------------ | ---------------------- |
| 1    | shape          | ShapeDrawable      | 特定形状，模型的图样   |
| 2    | selector       | StateListDrawable  | 不同状态选择不同的图样 |
| 3    | layer-list     | LayerDrawable      | 层叠图样               |
| 4    | level-list     | LevelListDrawable  | 不同程度图样           |
| 5    | transition     | TransitionDrawable | 渐变图样               |
| 6    | ripple         | RippleDrawable     | 波纹图样               |
| 7    | inset          | InsetDrawable      | 内嵌图样               |
| 8    | scale          | ScaleDrawable      | 缩放图样               |
| 9    | clip           | ClipDrawable       | 剪切图样               |
| 10   | rotate         | RotateDrawable     | 旋转图样               |
| 11   | animation-list | AnimationDrawable  | 动画效果               |
| 12   | bitmap         | BitmapDrawable     | 图片图样               |
| 13   | nine-patch     | NinePatchDrawable  | .9图                   |







