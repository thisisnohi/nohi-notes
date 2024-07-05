# HarmonyOS

> create by nohi 20240317

## 参考：

* 系统课程：`https://developer.huawei.com/consumer/cn/training/study-path/101660823576639948`
* 三方库资源汇总：https://gitee.com/openharmony-tpc/tpc_resource
* OpenHarmony三方库中心仓：[https://ohpm.openharmony.cn](https://ohpm.openharmony.cn/)
* @ohos/lottie的使用：https://gitee.com/openharmony-tpc/lottieETS

## 过程

### 架构

![image-20240317164424606](./attach/image-20240317164424606.png)



## 小知识

* Vp:虚拟像素

  * 超小：xs 
  * 小：sm
  * 中：md
  * 大:  lg

  ![image-20240402124950498](./attach/image-20240402124950498.png)

* svg无法填充颜色

  ```
  svg 添加fill="currentColor"
  ```

  



### 布局

自适应而已：拉伸、均分、占比、缩放、延伸、隐藏、折行能力 

响应式布局：断点、媒体查询、栅格布局、

* grid
  * columnsTemplate: 列布局，单位fr,按比例划分， 1fr 2fr 1fr  四等 份，三块。中间一块点2 等份
  * rowsTemplate: 行布局，单位fr 
  * columnsGap 列间距
  * rowsGap 行间距

### 页面

* 修改首页

  ```
  1. src/main/ets/entryability/EntryAbility.ts
     windowStage.loadContent('test_pages/text'
  2. src/main/resources/base/profile/main_pages.json
     {
      "src": [
        "test_pages/text"
      ]
    }
  ```

* 窗口全屏

  ```js
  // 窗口全屏
  // let windowClass = null;
  // windowStage.getMainWindow((err, data) => {
  //   if (err.code) {
  //     console.error('Failed to obtain the main window. Cause: ' + JSON.stringify(err));
  //     return;
  //   }
  //   windowClass = data;
  //   console.info('Succeeded in obtaining the main window. Data: ' + JSON.stringify(data));
  //
  //   windowClass.setWindowLayoutFullScreen(true, (err) => {
  //     if (err.code) {
  //       console.error('Failed to set the window layout to full-screen mode. Cause:' + JSON.stringify(err));
  //       return;
  //     }
  //     console.info('Succeeded in setting the window layout to full-screen mode.');
  //   });
  // });
  ```

  


### 生命周期

* `@Entry`

  <img src="./attach/image-20240407131141433.png" alt="image-20240407131141433" style="zoom: 25%;" />

* `@Component`

  <img src="./attach/image-20240407131300799.png" alt="image-20240407131300799" style="zoom: 33%;" />

* UIAbility生命周期

  <img src="./attach/image-20240407212217203.png" alt="image-20240407212217203" style="zoom:33%;" />



### 组件状态

* 组件内的状态管理：`@State`
* 从父组件单向同步状态：`@Prop`
* 父子组件双向同步状态和监听：`@Link`、`@Watch`
* 跨组件层级双向同步状态： `@Provide和@Consume`

### 弹窗

* 确认类： AlertDialog
* 选择类
  * TextPickerDialog
  * DatePickerDiallog



## 问题

* `@State`与`@Link` 对象属性双向绑定的问题

  ```
  @State @Link 对象属性的双向绑定
  
  父组件有个@Stata abc: <Class>   abc是个Class,里面有个属性a:string. 想与子组件@Link a:string进行双向绑定。
  
  父组件使用子组件时，是否有方法实现  abc.a  与 子组件a实现双向绑定。  目前 a: $abc.a /  abc.$a / $(abc.a) 都不行。
  ```

  

  



