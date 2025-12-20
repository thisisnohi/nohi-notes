# WebSocket and SSE

> create by nohi 20251219

## 一、介绍

> Server-Send Events 服务器发送事件，简称SSE。服务器主动向客户端推送消息，我们常见的有 WebSocket （SignalR） ,SSE 也是其中一种。
>
> SSE 是HTML5规范的一部分，该规范非常简单，主要由两部分组成：第一部分是服务端与浏览器端的通讯协议（Http协议），第二部分是浏览器端可供JavaScript使用的EventSource对象。

* WebSocket比SSE功能更加强大，WebSocket是在服务端和客户端建立的双向实时数据通道，而SSE只支持服务端想客户端的单向通讯

* 浏览器对WebSocket的支持也更加广泛，IE、Edge几乎不支持SSE
* WebSocket有一套独立的标准协议，在使用过程中必须按照标准协议来，而SSE使用的是Http协议，只需要更改`Context-Type`为`"text/event-stream; charset=utf-8"`即可，这里需要特殊注意的一点，必须是`utf-8`



