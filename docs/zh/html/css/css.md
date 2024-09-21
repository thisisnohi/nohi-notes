# CSS：层叠样式表

> create by nohi 20240920
>
> 参考：https://developer.mozilla.org/zh-CN/docs/Web/CSS

## 伪类

> [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) ***伪类***是添加到选择器的关键字，用于指定所选元素的特殊状态。例如，伪类 [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) 可以用于选择一个按钮，当用户的指针悬停在按钮上时，设置此按钮的样式。



### `:root`

`:root `这个 CSS 伪类匹配文档树的根元素。对于 HTML 来说，`:root` 表示 `<html> `元素，除了优先级更高之外，与 `html `选择器相同。



## 变量

* 定义

  ```css
  :root {
    --first-color: #488cff;
    --second-color: #ffff8c;
  }
  ```

* 使用

  ```html
  #firstParagraph {
    background-color: var(--first-color);
    color: var(--second-color);
  }
  ```

  

