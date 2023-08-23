import{_ as e,p as n,q as s,a1 as c}from"./framework-449724a9.js";const a={},i=c(`<h1 id="webservice" tabindex="-1"><a class="header-anchor" href="#webservice" aria-hidden="true">#</a> Webservice</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wsdl2java  -encoding utf-8 -p com.huawei.wfm.czekh.webservice.remedy -d ../../src/remedy -all fileName.wsdl 
-p 指定生成java文件的package name 
-d 生成java文件的存放路径 
-all 生成客户端和服务端代码，这里还可以用-client生成客户端，用-server生成服务端，不过实际上区别不大，只要用-all就可以了 

-- 生成jdk1.6支持的
wsdl2java -encoding utf-8  -frontend jaxws21 -p nohi.crm.customerquery -d src -all E:\\workspace2\\nohi-cxf\\wsdlxsd\\crm\\customquery\\crmcustomquery.wsdl
wsdl2java -encoding utf-8  -p com.ccb.ms.qunyao -d src -all GiantHope_Bank_Center.wsdl
wsdl2java -encoding utf-8  -p com.ccb.ms.qunyao -d src -client GiantHope_Bank_Center.wsdl

wsdl2java -encoding utf-8  -p com.ccb.ms.intf.qunyao -d src -all GiantHope_Bank_Center.wsdl
wsdl2java -encoding utf-8  -p com.ccb.ms.intf.test -d src -client http://localhost:8080/nohi_cxf/webservice/testObjectImpl?wsdl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d=[i];function l(r,t){return n(),s("div",null,d)}const v=e(a,[["render",l],["__file","webservice.html.vue"]]);export{v as default};
