import{_ as e,p as o,q as i,R as n,v as t,a1 as s,t as p}from"./framework-449724a9.js";const c="/assets/robot-trigger-fc312eaf.png",l="/assets/multi-envs-5c3c35c3.jpg",u={},r=s(`<h1 id="_14-06-docker-k8s教程-06sharedlibrary进行cicd流程的优化" tabindex="-1"><a class="header-anchor" href="#_14-06-docker-k8s教程-06sharedlibrary进行cicd流程的优化" aria-hidden="true">#</a> 14-06_Docker+k8s教程-06sharedLibrary进行CICD流程的优化</h1><h3 id="基于sharedlibrary进行ci-cd流程的优化" tabindex="-1"><a class="header-anchor" href="#基于sharedlibrary进行ci-cd流程的优化" aria-hidden="true">#</a> 基于sharedLibrary进行CI/CD流程的优化</h3><p>由于公司内部项目众多，大量的项目使用同一套流程做CICD</p><ul><li>那么势必会存在大量的重复代码</li><li>一旦某个公共的地方需要做调整，每个项目都需要修改</li></ul><p>因此本章主要通过使用groovy实现Jenkins的sharedLibrary的开发，以提取项目在CICD实践过程中的公共逻辑，提供一系列的流程的接口供公司内各项目调用。</p><p>开发完成后，对项目进行Jenkinsfile的改造，最后仅需通过简单的Jenkinsfile的配置，即可优雅的完成CICD流程的整个过程，此方式已在大型企业内部落地应用。</p><h5 id="library工作模式" tabindex="-1"><a class="header-anchor" href="#library工作模式" aria-hidden="true">#</a> Library工作模式</h5><p>由于流水线被组织中越来越多的项目所采用，常见的模式很可能会出现。 在多个项目之间共享流水线有助于减少冗余并保持代码 &quot;DRY&quot;。</p><p>流水线支持引用 &quot;共享库&quot; ，可以在外部源代码控制仓库中定义并加载到现有的流水线中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Library(&#39;my-shared-library&#39;) _
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在实际运行过程中，会把library中定义的groovy功能添加到构建目录中：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>jenkins_home/jobs/<span class="token function">test-maven</span><span class="token operator">-</span>build/branches/feature-CDN-2904<span class="token punctuation">.</span>cm507o/builds/2/libs/my-shared-library/vars/devops<span class="token punctuation">.</span>groovy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用library后，Jenkinsfile大致的样子如下：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>@Library<span class="token punctuation">(</span><span class="token string">&#39;my-shared-library&#39;</span><span class="token punctuation">)</span> _

<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  stages <span class="token punctuation">{</span>
    stage<span class="token punctuation">(</span><span class="token string">&#39;build image&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      steps <span class="token punctuation">{</span>
         container<span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           devops<span class="token punctuation">.</span>buildImage<span class="token punctuation">(</span><span class="token string">&quot;Dockerfile&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;10.0.0.181:5000/demo:latest&quot;</span><span class="token punctuation">)</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  post <span class="token punctuation">{</span>
    success <span class="token punctuation">{</span>
      script <span class="token punctuation">{</span>
          container<span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              devops<span class="token punctuation">.</span>notificationSuccess<span class="token punctuation">(</span><span class="token string">&quot;dingTalk&quot;</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="开发环境搭建" tabindex="-1"><a class="header-anchor" href="#开发环境搭建" aria-hidden="true">#</a> 开发环境搭建</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>补录章节：Groovy及SpringBoot、SpringCloud都会使用
- java
- groovy
- intelliJ idea

###### 下载安装包
链接：\`https://pan.baidu.com/s/1B-bg2_IsB8dU7_62IEtnTg \`
提取码：wx6j

###### 安装java

安装路径：\`D:\\software\\jdk\`

环境变量：

- JAVA_HOME     D:\\software\\jdk
- CLASSPATH      .;%JAVA_HOME%\\lib\\dt.jar;%JAVA_HOME%\\lib\\tools.jar;
- PATH                 %JAVA_HOME%\\bin

###### 安装groovy

解压路径：D:\\software\\groovy-3.0.2

环境变量：

- GROOVY_PATH      D:\\software\\groovy-3.0.2
- PATH                       D:\\software\\groovy-3.0.2\\bin

###### 安装idea

安装路径：D:\\software\\IntelliJ IDEA 2019.2.3

新建项目测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="library代码结构介绍" tabindex="-1"><a class="header-anchor" href="#library代码结构介绍" aria-hidden="true">#</a> Library代码结构介绍</h5><p>共享库的目录结构如下:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
<span class="token operator">+</span><span class="token operator">-</span> src                     <span class="token comment"># Groovy source files</span>
<span class="token punctuation">|</span>   <span class="token operator">+</span><span class="token operator">-</span> org
<span class="token punctuation">|</span>       <span class="token operator">+</span><span class="token operator">-</span> foo
<span class="token punctuation">|</span>           <span class="token operator">+</span><span class="token operator">-</span> Bar<span class="token punctuation">.</span>groovy  <span class="token comment"># for org.foo.Bar class</span>
<span class="token operator">+</span><span class="token operator">-</span> vars
<span class="token punctuation">|</span>   <span class="token operator">+</span><span class="token operator">-</span> foo<span class="token punctuation">.</span>groovy          <span class="token comment"># for global &#39;foo&#39; variable</span>
<span class="token punctuation">|</span>   <span class="token operator">+</span><span class="token operator">-</span> foo<span class="token punctuation">.</span>txt             <span class="token comment"># help for &#39;foo&#39; variable</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>src</code> 目录应该看起来像标准的 Java 源目录结构。当执行流水线时，该目录被添加到类路径下。</p><p><code>vars</code> 目录定义可从流水线访问的全局变量的脚本。 每个 <code>*.groovy</code> 文件的基名应该是一个<code> Groovy (~ Java)</code> 标识符, 通常是 <code>camelCased</code>。</p><h5 id="groovy基本语法介绍" tabindex="-1"><a class="header-anchor" href="#groovy基本语法介绍" aria-hidden="true">#</a> Groovy基本语法介绍</h5><p>新建Groovy项目</p><ul><li><p>变量</p><p>使用数据类型的本地语法，或者使用def关键字</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">// Defining a variable in lowercase  </span>
<span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>

<span class="token comment">// Defining a variable in uppercase  </span>
<span class="token keyword">int</span> X <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span> 

<span class="token comment">// Defining a variable with the underscore in it&#39;s name </span>
<span class="token keyword">def</span> _Name <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;Joe&quot;</span></span><span class="token punctuation">;</span> 

<span class="token function">println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token function">println</span><span class="token punctuation">(</span>X<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token function">println</span><span class="token punctuation">(</span>_Name<span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>方法</p><ul><li><p>调用本地方法</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>def sum<span class="token punctuation">(</span>int a<span class="token punctuation">,</span> int b<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

println<span class="token punctuation">(</span>sum<span class="token punctuation">(</span>1<span class="token punctuation">,</span>2<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>调用类中的方法</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># Hello.groovy</span>
package demo

def sayHi<span class="token punctuation">(</span>String content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;hi, &quot;</span> <span class="token operator">+</span> content<span class="token punctuation">)</span>
<span class="token punctuation">}</span>



<span class="token comment"># Demo.groovy</span>
import demo<span class="token punctuation">.</span>Hello

def demo<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> new Hello<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sayHi<span class="token punctuation">(</span><span class="token string">&quot;devops&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
println<span class="token punctuation">(</span>demo<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>



<span class="token comment"># 级联调用</span>
<span class="token comment"># Hello.groovy</span>
package demo

def init<span class="token punctuation">(</span>String content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>content = content
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>

def sayHi<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    println<span class="token punctuation">(</span><span class="token string">&quot;hi, &quot;</span> <span class="token operator">+</span> this<span class="token punctuation">.</span>content<span class="token punctuation">)</span>
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>

def sayBye<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    println<span class="token punctuation">(</span><span class="token string">&quot;bye &quot;</span> <span class="token operator">+</span> this<span class="token punctuation">.</span>content<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token comment"># Demo.groovy</span>
import demo<span class="token punctuation">.</span>Hello

def demo<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    new Hello<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>init<span class="token punctuation">(</span><span class="token string">&quot;devops&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sayHi<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sayBye<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

demo<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>异常捕获</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> <span class="token function">exceptionDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">def</span> val <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">0</span>
        <span class="token function">println</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>Exception e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> e
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">exceptionDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>计时器与循环</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">import</span> groovy<span class="token punctuation">.</span>time<span class="token punctuation">.</span>TimeCategory


<span class="token function">use</span><span class="token punctuation">(</span> TimeCategory <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">def</span> endTime <span class="token operator">=</span> TimeCategory<span class="token punctuation">.</span><span class="token function">plus</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> TimeCategory<span class="token punctuation">.</span><span class="token function">getSeconds</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> counter <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>counter<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> endTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">println</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;done&quot;</span></span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>解析yaml文件</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>import org<span class="token punctuation">.</span>yaml<span class="token punctuation">.</span>snakeyaml<span class="token punctuation">.</span>Yaml

def readYaml<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    def content = new File<span class="token punctuation">(</span><span class="token string">&#39;myblog.yaml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text
    Yaml parser = new Yaml<span class="token punctuation">(</span><span class="token punctuation">)</span>
    def <span class="token keyword">data</span> = parser<span class="token punctuation">.</span>load<span class="token punctuation">(</span>content<span class="token punctuation">)</span>
    def kind = <span class="token keyword">data</span><span class="token punctuation">[</span><span class="token string">&quot;kind&quot;</span><span class="token punctuation">]</span>
    def name = <span class="token keyword">data</span><span class="token punctuation">[</span><span class="token string">&quot;metadata&quot;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>
    println<span class="token punctuation">(</span>kind<span class="token punctuation">)</span>
    println<span class="token punctuation">(</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
readYaml<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="library与jenkins集成" tabindex="-1"><a class="header-anchor" href="#library与jenkins集成" aria-hidden="true">#</a> library与Jenkins集成</h5><p>先来看一下如何使用shared library实现最简单的helloworld输出功能，来理清楚使用shared library的流程。</p><h6 id="hello-groovy" tabindex="-1"><a class="header-anchor" href="#hello-groovy" aria-hidden="true">#</a> Hello.groovy</h6><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token comment">/**
* @author Yongxin
* @version v0.1
 */</span>

<span class="token comment">/**
 * say hello
 * @param content
 */</span>
<span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span>String content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    echo <span class="token interpolation-string"><span class="token string">&quot;Hi, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>content</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,how are you?&quot;</span></span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    echo <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>content</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">: fine, thank you, and you?&quot;</span></span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">sayBye</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    echo <span class="token interpolation-string"><span class="token string">&quot;i am fine too , </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>content</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, Bye!&quot;</span></span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建<code>vars/devops.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">import</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops<span class="token punctuation">.</span>Hello

<span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span>String content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>20230319 创建groovy工程, git地址:<code>http://gitlab.nohi.com/root/jenkins-shared-library.git</code></p><p>src/com/nohi/devops/Hello.groovy</p><p>vars/devops.groovy</p></blockquote><p>在gitlab创建项目，把library代码推送到镜像仓库。</p><h6 id="配置jenkins" tabindex="-1"><a class="header-anchor" href="#配置jenkins" aria-hidden="true">#</a> 配置Jenkins</h6><p>[系统管理] -&gt; [系统设置] -&gt; [ <strong>Global Pipeline Libraries</strong> ]</p><ul><li>Library Name：nohi-devops</li><li>Default Version：master</li><li>Source Code Management：Git [<code>http://gitlab.nohi.com/root/jenkins-shared-library.git</code>]</li></ul><h6 id="jenkinsfile中引用" tabindex="-1"><a class="header-anchor" href="#jenkinsfile中引用" aria-hidden="true">#</a> Jenkinsfile中引用</h6><p><code>jenkins/pipelines/p11.yaml</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token annotation punctuation">@Library</span><span class="token punctuation">(</span><span class="token string">&#39;nohi-devops&#39;</span><span class="token punctuation">)</span> <span class="token number">_</span>

pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span> label <span class="token string">&#39;jnlp-slave&#39;</span><span class="token punctuation">}</span>

    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;hello-devops&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    devops<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;树哥&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">answer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sayBye</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span> 
            echo <span class="token string">&#39;Congratulations!&#39;</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            echo <span class="token string">&#39;Oh no!&#39;</span>
        <span class="token punctuation">}</span>
        always <span class="token punctuation">{</span> 
            echo <span class="token string">&#39;I will always say Hello again!&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>20230319 可以使用之前构建记录，通过回放功能运行</p></blockquote><h5 id="library集成镜像构建及推送" tabindex="-1"><a class="header-anchor" href="#library集成镜像构建及推送" aria-hidden="true">#</a> library集成镜像构建及推送</h5><p>需要实现的逻辑点：</p><ul><li>docker build，docker push，docker login</li><li>账户密码，jenkins凭据，（library中获取凭据内容），</li><li>docker login 10.0.0.181:5000</li><li>try catch</li></ul><h6 id="镜像构建逻辑实现" tabindex="-1"><a class="header-anchor" href="#镜像构建逻辑实现" aria-hidden="true">#</a> 镜像构建逻辑实现</h6><p><code>devops.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">/**
 *
 * @param repo, 10.0.0.181:5000/demo/myblog/xxx/
 * @param tag, v1.0
 * @param dockerfile
 * @param credentialsId
 * @param context
 */</span>
<span class="token keyword">def</span> <span class="token function">docker</span><span class="token punctuation">(</span>String repo<span class="token punctuation">,</span> String tag<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> String dockerfile<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;Dockerfile&quot;</span></span><span class="token punctuation">,</span> String context<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;.&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Docker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>repo<span class="token punctuation">,</span> tag<span class="token punctuation">,</span> credentialsId<span class="token punctuation">,</span> dockerfile<span class="token punctuation">,</span> context<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Docker.groovy</code></p><p>逻辑中需要注意的点：</p><ul><li>构建和推送镜像，需要登录仓库（需要认证）</li><li>构建成功或者失败，需要将结果推给gitlab端</li><li>为了将构建过程推送到钉钉消息中，需要将构建信息统一收集</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>package com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> @<span class="token keyword">param</span> repo
 <span class="token operator">*</span> @<span class="token keyword">param</span> tag
 <span class="token operator">*</span> @<span class="token keyword">param</span> credentialsId
 <span class="token operator">*</span> @<span class="token keyword">param</span> dockerfile
 <span class="token operator">*</span> @<span class="token keyword">param</span> context
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def init<span class="token punctuation">(</span>String repo<span class="token punctuation">,</span> String tag<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> String dockerfile=<span class="token string">&quot;Dockerfile&quot;</span><span class="token punctuation">,</span> String context=<span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>repo = repo
    this<span class="token punctuation">.</span>tag = tag
    this<span class="token punctuation">.</span>dockerfile = dockerfile
    this<span class="token punctuation">.</span>credentialsId = credentialsId
    this<span class="token punctuation">.</span>context = context
    this<span class="token punctuation">.</span>fullAddress = <span class="token string">&quot;\${this.repo}:\${this.tag}&quot;</span>
    this<span class="token punctuation">.</span>isLoggedIn = false
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>


<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> build image
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def build<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token string">&quot;docker build \${this.context} -t \${this.fullAddress} -f \${this.dockerfile} &quot;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> exc
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> push image
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def push<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token string">&quot;docker push \${this.fullAddress}&quot;</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> exc
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> docker registry login
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def login<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>this<span class="token punctuation">.</span>isLoggedIn <span class="token punctuation">|</span><span class="token punctuation">|</span> credentialsId == <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
    <span class="token operator">/</span><span class="token operator">/</span> docker login
    withCredentials<span class="token punctuation">(</span><span class="token punctuation">[</span>usernamePassword<span class="token punctuation">(</span>credentialsId: this<span class="token punctuation">.</span>credentialsId<span class="token punctuation">,</span> usernameVariable: <span class="token string">&#39;USERNAME&#39;</span><span class="token punctuation">,</span> passwordVariable: <span class="token string">&#39;PASSWORD&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        def regs = this<span class="token punctuation">.</span>getRegistry<span class="token punctuation">(</span><span class="token punctuation">)</span>
        retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                sh <span class="token string">&quot;docker login \${regs} -u <span class="token variable">$USERNAME</span> -p <span class="token variable">$PASSWORD</span>&quot;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">echo</span> <span class="token string">&quot;docker login err, &quot;</span> <span class="token operator">+</span> exc<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    this<span class="token punctuation">.</span>isLoggedIn = true<span class="token punctuation">;</span>
    <span class="token keyword">return</span> this<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> get registry server
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def getRegistry<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    def <span class="token function">sp</span> = this<span class="token punctuation">.</span>repo<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sp</span><span class="token punctuation">.</span>size<span class="token punctuation">(</span><span class="token punctuation">)</span> &gt; 1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">sp</span><span class="token punctuation">[</span>0<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> this<span class="token punctuation">.</span>repo
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Jenkinsfile</code></p><p>需要先在Jenkins端创建仓库登录凭据<code>credential-registry</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token annotation punctuation">@Library</span><span class="token punctuation">(</span><span class="token string">&#39;nohi-devops&#39;</span><span class="token punctuation">)</span> <span class="token number">_</span>

pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span> label <span class="token string">&#39;jnlp-slave&#39;</span><span class="token punctuation">}</span>
    options <span class="token punctuation">{</span>
		<span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span>
		<span class="token function">gitLabConnection</span><span class="token punctuation">(</span><span class="token string">&#39;gitlab&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    environment <span class="token punctuation">{</span>
        IMAGE_REPO <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;10.0.0.181:5000/demo/myblog&quot;</span></span>
        IMAGE_CREDENTIAL <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;credential-registry&quot;</span></span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;checkout&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    checkout scm
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;docker-image&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                        devops<span class="token punctuation">.</span><span class="token function">docker</span><span class="token punctuation">(</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">IMAGE_REPO</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">GIT_COMMIT</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            IMAGE_CREDENTIAL                          
                        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span> 
            echo <span class="token string">&#39;Congratulations!&#39;</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            echo <span class="token string">&#39;Oh no!&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="丰富构建通知逻辑" tabindex="-1"><a class="header-anchor" href="#丰富构建通知逻辑" aria-hidden="true">#</a> 丰富构建通知逻辑</h6><p>目前的构建镜像逻辑中缺少如下内容：</p><ul><li>try逻辑中，若发生异常，是否该把异常抛出 <ul><li>若直接抛出异常可能会导致多次重复的异常信息</li><li>若不抛出，则如果未构建成功镜像，流水线感知不到错误</li></ul></li><li>通知gitlab端构建任务及状态</li><li>构建通知格式</li></ul><p>需要针对上述问题，做出优化</p><ol><li><p>优化try逻辑</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>def build<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    def isSuccess = false
    def errMsg
    retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token string">&quot;docker build \${this.context} -t \${this.fullAddress} -f \${this.dockerfile}&quot;</span>
            isSuccess = true
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token operator">/</span><span class="token operator">/</span>ignore
            errMsg = err<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token operator">/</span><span class="token operator">/</span> check <span class="token keyword">if</span> build success
        <span class="token keyword">if</span><span class="token punctuation">(</span>isSuccess<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token operator">/</span><span class="token operator">/</span>todo
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token operator">/</span><span class="token operator">/</span> <span class="token keyword">throw</span> exception，aborted pipeline
            error errMsg
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>通知gitlab端构建任务及状态</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>def build<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    def isSuccess = false
    def errMsg = <span class="token string">&quot;&quot;</span>
    retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token string">&quot;docker build \${this.context} -t \${this.fullAddress} -f \${this.dockerfile} &quot;</span>
            isSuccess = true
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token operator">/</span><span class="token operator">/</span>ignore
            errMsg = err<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token operator">/</span><span class="token operator">/</span> check <span class="token keyword">if</span> build success
        def stage = env<span class="token punctuation">.</span>STAGE_NAME <span class="token operator">+</span> <span class="token string">&#39;-build&#39;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>isSuccess<span class="token punctuation">)</span><span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&#39;\${stage}&#39;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&#39;\${stage}&#39;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
            <span class="token operator">/</span><span class="token operator">/</span> <span class="token keyword">throw</span> exception，aborted pipeline
            error errMsg
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>钉钉消息通知格式</p><p>由于每个stage都需要构建通知任务，因此抽成公共的逻辑，为各stage调用</p><p><code>BuildMessage.groovy</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>package com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

def updateBuildMessage<span class="token punctuation">(</span>String source<span class="token punctuation">,</span> String add<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>source<span class="token punctuation">)</span><span class="token punctuation">{</span>
        source = <span class="token string">&quot;&quot;</span>
    <span class="token punctuation">}</span>
    env<span class="token punctuation">.</span>BUILD_TASKS = source <span class="token operator">+</span> add <span class="token operator">+</span> <span class="token string">&quot;\\n                    \\n&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&quot;</span>
    <span class="token keyword">return</span> env<span class="token punctuation">.</span>BUILD_TASKS
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Docker.groovy</code> 中调用</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>def getObject<span class="token punctuation">(</span>String repo<span class="token punctuation">,</span> String tag<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> String dockerfile=<span class="token string">&quot;Dockerfile&quot;</span><span class="token punctuation">,</span> String context=<span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    this<span class="token punctuation">.</span>msg = new BuildMessage<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>


<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

def build<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token operator">/</span><span class="token operator">/</span> check <span class="token keyword">if</span> build success
        def stage = env<span class="token punctuation">.</span>STAGE_NAME <span class="token operator">+</span> <span class="token string">&#39;-build&#39;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>isSuccess<span class="token punctuation">)</span><span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&#39;\${stage}&#39;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
            this<span class="token punctuation">.</span>msg<span class="token punctuation">.</span>updateBuildMessage<span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token string">&quot;\${stage} OK...  √&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&#39;\${stage}&#39;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
            this<span class="token punctuation">.</span>msg<span class="token punctuation">.</span>updateBuildMessage<span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token string">&quot;\${stage} Failed...  x&quot;</span><span class="token punctuation">)</span>
            <span class="token operator">/</span><span class="token operator">/</span> <span class="token keyword">throw</span> exception，aborted pipeline
            error errMsg
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>使用<code>Jenkinsfile</code>来验证上述修改是否正确：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token annotation punctuation">@Library</span><span class="token punctuation">(</span><span class="token string">&#39;nohi-devops&#39;</span><span class="token punctuation">)</span> <span class="token number">_</span>

pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span> label <span class="token string">&#39;jnlp-slave&#39;</span><span class="token punctuation">}</span>
    options <span class="token punctuation">{</span>
		<span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span>
		<span class="token function">gitLabConnection</span><span class="token punctuation">(</span><span class="token string">&#39;gitlab&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    environment <span class="token punctuation">{</span>
        IMAGE_REPO <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;10.0.0.181:5000/demo/myblog&quot;</span></span>
        IMAGE_CREDENTIAL <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;credential-registry&quot;</span></span>
        DINGTALK_CREDS <span class="token operator">=</span> <span class="token function">credentials</span><span class="token punctuation">(</span><span class="token string">&#39;dingTalk&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;checkout&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    checkout scm
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;git-log&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script<span class="token punctuation">{</span>
                    sh <span class="token interpolation-string"><span class="token string">&quot;git log --oneline -n 1 &gt; gitlog.file&quot;</span></span>
                    env<span class="token punctuation">.</span>GIT_LOG <span class="token operator">=</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;gitlog.file&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                sh <span class="token string">&#39;printenv&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> 
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;build-image&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                        devops<span class="token punctuation">.</span><span class="token function">docker</span><span class="token punctuation">(</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">IMAGE_REPO</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">GIT_COMMIT</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            IMAGE_CREDENTIAL                          
                        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span> 
            sh <span class="token interpolation-string"><span class="token string">&quot;&quot;&quot;
                curl &#39;https://oapi.dingtalk.com/robot/send?access_token=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">DINGTALK_CREDS_PSW</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39; \\
                    -H &#39;Content-Type: application/json&#39; \\
                    -d &#39;{
                        &quot;msgtype&quot;: &quot;markdown&quot;,
                        &quot;markdown&quot;: {
                            &quot;title&quot;:&quot;myblog&quot;,
                            &quot;text&quot;: &quot;😄👍 构建成功 👍😄  \\n**项目名称**：NOHI  \\n**Git log**: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">GIT_LOG</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">   \\n**构建分支**: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">BRANCH_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">   \\n**构建地址**：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">RUN_DISPLAY_URL</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">  \\n**构建任务**：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>BUILD_TASKS</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;
                        }
                    }&#39;
            &quot;&quot;&quot;</span></span> 
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            echo <span class="token string">&#39;Oh no!&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来需要将<code>push</code>和<code>login</code>方法做同样的改造</p><p>最终的Docker.groovy文件为：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>package com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span>
 <span class="token operator">*</span> @<span class="token keyword">param</span> repo
 <span class="token operator">*</span> @<span class="token keyword">param</span> tag
 <span class="token operator">*</span> @<span class="token keyword">param</span> credentialsId
 <span class="token operator">*</span> @<span class="token keyword">param</span> dockerfile
 <span class="token operator">*</span> @<span class="token keyword">param</span> context
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def init<span class="token punctuation">(</span>String repo<span class="token punctuation">,</span> String tag<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> String dockerfile=<span class="token string">&quot;Dockerfile&quot;</span><span class="token punctuation">,</span> String context=<span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>repo = repo
    this<span class="token punctuation">.</span>tag = tag
    this<span class="token punctuation">.</span>dockerfile = dockerfile
    this<span class="token punctuation">.</span>credentialsId = credentialsId
    this<span class="token punctuation">.</span>context = context
    this<span class="token punctuation">.</span>fullAddress = <span class="token string">&quot;\${this.repo}:\${this.tag}&quot;</span>
    this<span class="token punctuation">.</span>isLoggedIn = false
    this<span class="token punctuation">.</span>msg = new BuildMessage<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>


<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> build image
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def build<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    def isSuccess = false
    def errMsg = <span class="token string">&quot;&quot;</span>
    retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token string">&quot;docker build \${this.context} -t \${this.fullAddress} -f \${this.dockerfile} &quot;</span>
            isSuccess = true
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token operator">/</span><span class="token operator">/</span>ignore
            errMsg = err<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token operator">/</span><span class="token operator">/</span> check <span class="token keyword">if</span> build success
        def stage = env<span class="token punctuation">.</span>STAGE_NAME <span class="token operator">+</span> <span class="token string">&#39;-build&#39;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>isSuccess<span class="token punctuation">)</span><span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&quot;\${stage}&quot;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
            this<span class="token punctuation">.</span>msg<span class="token punctuation">.</span>updateBuildMessage<span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token string">&quot;\${stage} OK...  √&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&quot;\${stage}&quot;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
            this<span class="token punctuation">.</span>msg<span class="token punctuation">.</span>updateBuildMessage<span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token string">&quot;\${stage} Failed...  x&quot;</span><span class="token punctuation">)</span>
            <span class="token operator">/</span><span class="token operator">/</span> <span class="token keyword">throw</span> exception，aborted pipeline
            error errMsg
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> push image
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def push<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>login<span class="token punctuation">(</span><span class="token punctuation">)</span>
    def isSuccess = false
    def errMsg = <span class="token string">&quot;&quot;</span>
    retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token string">&quot;docker push \${this.fullAddress}&quot;</span>
            isSuccess = true
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token operator">/</span><span class="token operator">/</span>ignore
            errMsg = err<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token operator">/</span><span class="token operator">/</span> check <span class="token keyword">if</span> build success
    def stage = env<span class="token punctuation">.</span>STAGE_NAME <span class="token operator">+</span> <span class="token string">&#39;-push&#39;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isSuccess<span class="token punctuation">)</span><span class="token punctuation">{</span>
        updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&quot;\${stage}&quot;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
        this<span class="token punctuation">.</span>msg<span class="token punctuation">.</span>updateBuildMessage<span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token string">&quot;\${stage} OK...  √&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&quot;\${stage}&quot;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
        this<span class="token punctuation">.</span>msg<span class="token punctuation">.</span>updateBuildMessage<span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token string">&quot;\${stage} Failed...  x&quot;</span><span class="token punctuation">)</span>
        <span class="token operator">/</span><span class="token operator">/</span> <span class="token keyword">throw</span> exception，aborted pipeline
        error errMsg
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> docker registry login
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def login<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>this<span class="token punctuation">.</span>isLoggedIn <span class="token punctuation">|</span><span class="token punctuation">|</span> credentialsId == <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> this
    <span class="token punctuation">}</span>
    <span class="token operator">/</span><span class="token operator">/</span> docker login
    withCredentials<span class="token punctuation">(</span><span class="token punctuation">[</span>usernamePassword<span class="token punctuation">(</span>credentialsId: this<span class="token punctuation">.</span>credentialsId<span class="token punctuation">,</span> usernameVariable: <span class="token string">&#39;USERNAME&#39;</span><span class="token punctuation">,</span> passwordVariable: <span class="token string">&#39;PASSWORD&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        def regs = this<span class="token punctuation">.</span>getRegistry<span class="token punctuation">(</span><span class="token punctuation">)</span>
        retry<span class="token punctuation">(</span>3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                sh <span class="token string">&quot;docker login \${regs} -u <span class="token variable">$USERNAME</span> -p <span class="token variable">$PASSWORD</span>&quot;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">echo</span> <span class="token string">&quot;docker login err, \${ignored.toString()}&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    this<span class="token punctuation">.</span>isLoggedIn = true<span class="token punctuation">;</span>
    <span class="token keyword">return</span> this<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> get registry server
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def getRegistry<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    def <span class="token function">sp</span> = this<span class="token punctuation">.</span>repo<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">sp</span><span class="token punctuation">.</span>size<span class="token punctuation">(</span><span class="token punctuation">)</span> &gt; 1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">sp</span><span class="token punctuation">[</span>0<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> this<span class="token punctuation">.</span>repo
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次测试构建</p><blockquote></blockquote><h5 id="library集成k8s服务部署" tabindex="-1"><a class="header-anchor" href="#library集成k8s服务部署" aria-hidden="true">#</a> library集成k8s服务部署</h5><h6 id="library实现部署简单版" tabindex="-1"><a class="header-anchor" href="#library实现部署简单版" aria-hidden="true">#</a> library实现部署简单版</h6><p><code>devops.groovy</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> kubernetes deployer
 <span class="token operator">*</span> @<span class="token keyword">param</span> resourcePath
 <span class="token operator">*</span><span class="token operator">/</span>
def deploy<span class="token punctuation">(</span>String resourcePath<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> new Deploy<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>init<span class="token punctuation">(</span>resourcePath<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增<code>Deploy.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token keyword">def</span> <span class="token function">init</span><span class="token punctuation">(</span>String resourcePath<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath <span class="token operator">=</span> resourcePath
    <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BuildMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token comment">//env.CURRENT_IMAGE用来存储当前构建的镜像地址，需要在Docker.groovy中设置值</span>
        sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{IMAGE_URL}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>CURRENT_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
        sh <span class="token interpolation-string"><span class="token string">&quot;kubectl apply -f </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> env<span class="token punctuation">.</span>STAGE_NAME<span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>stage_name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> OK...  √&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> env<span class="token punctuation">.</span>STAGE_NAME<span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>stage_name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> fail...  √&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> exc
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>Docker.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> isSuccess <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">def</span> errMsg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span>
    <span class="token function">retry</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            sh <span class="token interpolation-string"><span class="token string">&quot;docker push </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>fullAddress</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token comment">//把当前推送的镜像地址记录在环境变量中</span>
            env<span class="token punctuation">.</span>CURRENT_IMAGE <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fullAddress
            isSuccess <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//ignore</span>
            errMsg <span class="token operator">=</span> err<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Jenkinsfile</code> 中添加如下部分：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span><span class="token function">deploy</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;deploy&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="library实现自动部署优化版" tabindex="-1"><a class="header-anchor" href="#library实现自动部署优化版" aria-hidden="true">#</a> library实现自动部署优化版</h6><p>简单版本最明显的问题就是无法检测部署后的Pod状态，如果想做集成测试，通常要等到最新版本的Pod启动后再开始。因此有必要在部署的时候检测Pod是否正常运行。</p><p>比如要去检查myblog应用的pod是否部署正常，人工检查的大致步骤：</p><ol><li><p><code>kubectl -n nohi get pod</code>，查看pod列表</p></li><li><p>找到列表中带有myblog关键字的running的pod</p></li><li><p>查看上述running pod数，是否和myblog的deployment中定义的replicas副本数一致</p></li><li><p>若一致，则检查结束，若不一致，可能稍等几秒钟，再次执行相同的检查操作</p></li><li><p>如果5分钟了还没有检查通过，则大概率是pod有问题，通过查看日志进一步排查</p></li></ol><p>如何通过library代码实现上述过程：</p><ol><li><p>library如何获取myblog的pod列表？</p><ul><li><p>首先要知道本次部署的是哪个workload，因此需要调用者传递workload的yaml文件路径</p></li><li><p>library解析workload.yaml文件，找到如下值：</p><ul><li>pod所在的namespace</li><li>pod中使用的<code>labels</code>标签</li></ul></li><li><p>使用如下命令查找该workload关联的pod</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n &lt;namespace&gt; get po <span class="token operator">-</span>l &lt;key1=value1&gt; <span class="token operator">-</span>l &lt;key2=value2&gt;

<span class="token comment"># 如查找myblog的pod</span>
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>l app=myblog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>如何确定步骤1中的pod的状态？</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 或者可以直接进行提取状态</span>
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>l app=myblog <span class="token operator">-</span>ojsonpath=<span class="token string">&#39;{.items[0].status.phase}&#39;</span>

<span class="token comment"># 以json数组的形式存储</span>
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>l app=myblog <span class="token operator">-</span>o json

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>如何检测所有的副本数都是正常的？</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 以json数组的形式存储</span>
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>l app=myblog <span class="token operator">-</span>o json

<span class="token comment"># 遍历数组，检测每一个pod查看是否均正常（terminating和evicted除外）</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>如何实现在5分钟的时间内，若pod状态符合预期，则退出检测循环，若不符合预期则继续检测</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>use<span class="token punctuation">(</span> TimeCategory <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  def endTime = TimeCategory<span class="token punctuation">.</span>plus<span class="token punctuation">(</span>new Date<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> TimeCategory<span class="token punctuation">.</span>getMinutes<span class="token punctuation">(</span>timeoutMinutes<span class="token punctuation">,</span>5<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>true<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>new Date<span class="token punctuation">(</span><span class="token punctuation">)</span> &gt;= endTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">/</span><span class="token operator">/</span>超时了，则宣告pod状态不对
        updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&#39;deploy&#39;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> new Exception<span class="token punctuation">(</span><span class="token string">&quot;deployment timed out...&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token operator">/</span><span class="token operator">/</span>循环检测当前deployment下的pod的状态
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>this<span class="token punctuation">.</span>isDeploymentReady<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          readyCount+<span class="token operator">+</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>readyCount &gt; 5<span class="token punctuation">)</span><span class="token punctuation">{</span>
            updateGitlabCommitStatus<span class="token punctuation">(</span>name: <span class="token string">&#39;deploy&#39;</span><span class="token punctuation">,</span> state: <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
          readyCount = 0
      <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token function">echo</span> exc<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">/</span>每次检测若不满足所有pod均正常，则<span class="token function">sleep</span> 5秒钟后继续检测
      <span class="token function">sleep</span><span class="token punctuation">(</span>5<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p><code>devops.groovy</code></p><p>通过添加参数 watch来控制是否在pipeline中观察pod的运行状态</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>
<span class="token comment">/**
 * 
 * @param resourcePath
 * @param watch
 * @param workloadFilePath
 * @return
 */</span>
<span class="token keyword">def</span> <span class="token function">deploy</span><span class="token punctuation">(</span>String resourcePath<span class="token punctuation">,</span> Boolean watch <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> String workloadFilePath<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Deploy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>resourcePath<span class="token punctuation">,</span> watch<span class="token punctuation">,</span> workloadFilePath<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整版的<code>Deploy.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token keyword">import</span> org<span class="token punctuation">.</span>yaml<span class="token punctuation">.</span>snakeyaml<span class="token punctuation">.</span>Yaml
<span class="token keyword">import</span> groovy<span class="token punctuation">.</span>json<span class="token punctuation">.</span>JsonSlurperClassic
<span class="token keyword">import</span> groovy<span class="token punctuation">.</span>time<span class="token punctuation">.</span>TimeCategory




<span class="token keyword">def</span> <span class="token function">init</span><span class="token punctuation">(</span>String resourcePath<span class="token punctuation">,</span> Boolean watch<span class="token punctuation">,</span> String workloadFilePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath <span class="token operator">=</span> resourcePath
    <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BuildMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>watch <span class="token operator">=</span> watch
    <span class="token keyword">this</span><span class="token punctuation">.</span>workloadFilePath <span class="token operator">=</span> workloadFilePath
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>resourcePath <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>workloadFilePath<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token function">Exception</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;illegal resource path&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{IMAGE_URL}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>CURRENT_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
        sh <span class="token interpolation-string"><span class="token string">&quot;kubectl apply -f </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> env<span class="token punctuation">.</span>STAGE_NAME<span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>stage_name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> fail...  √&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> exc
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>watch<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 初始化workload文件</span>
        <span class="token function">initWorkload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        String namespace <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>workloadNamespace
        String name <span class="token operator">=</span> env<span class="token punctuation">.</span>workloadName
        <span class="token keyword">if</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>workloadType<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;deployment&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            echo <span class="token interpolation-string"><span class="token string">&quot;begin watch pod status from deployment </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>workloadName</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">...&quot;</span></span>
            <span class="token function">monitorDeployment</span><span class="token punctuation">(</span>namespace<span class="token punctuation">,</span> name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">//todo</span>
            echo <span class="token interpolation-string"><span class="token string">&quot;workload type </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>workloadType</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> does not support for now...&quot;</span></span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> env<span class="token punctuation">.</span>STAGE_NAME<span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>STAGE_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> OK...  √&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">initWorkload</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">def</span> content <span class="token operator">=</span> readFile <span class="token keyword">this</span><span class="token punctuation">.</span>workloadFilePath
        Yaml parser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Yaml</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">def</span> data <span class="token operator">=</span> parser<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span>
        <span class="token keyword">def</span> kind <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;kind&quot;</span></span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token function">Exception</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;workload file </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">kind</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> illegal, will exit pipeline!&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        env<span class="token punctuation">.</span>workloadType <span class="token operator">=</span> kind
        echo <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">data</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>workloadNamespace <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;metadata&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;namespace&quot;</span></span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>workloadNamespace<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>workloadNamespace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;default&quot;</span></span>
        <span class="token punctuation">}</span>
        env<span class="token punctuation">.</span>workloadName <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;metadata&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">]</span>

    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        echo <span class="token interpolation-string"><span class="token string">&quot;failed to readFile </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>workloadFilePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,exception: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">exc</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.&quot;</span></span>
        <span class="token keyword">throw</span> exc
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 *
 * @param namespace
 * @param name
 * @param timeoutMinutes
 * @param sleepTime
 * @return
 */</span>
<span class="token keyword">def</span> <span class="token function">monitorDeployment</span><span class="token punctuation">(</span>String namespace<span class="token punctuation">,</span> String name<span class="token punctuation">,</span> <span class="token keyword">int</span> timeoutMinutes <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> sleepTime <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">def</span> readyCount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">def</span> readyTarget <span class="token operator">=</span> <span class="token number">3</span>
    <span class="token function">use</span><span class="token punctuation">(</span> TimeCategory <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">def</span> endTime <span class="token operator">=</span> TimeCategory<span class="token punctuation">.</span><span class="token function">plus</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> TimeCategory<span class="token punctuation">.</span><span class="token function">getMinutes</span><span class="token punctuation">(</span>timeoutMinutes<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">def</span> lastRolling
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// checking timeout</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> endTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                echo <span class="token interpolation-string"><span class="token string">&quot;timeout, printing logs...&quot;</span></span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">printContainerLogs</span><span class="token punctuation">(</span>lastRolling<span class="token punctuation">)</span>
                <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string">&#39;deploy&#39;</span><span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>STAGE_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> Failed...  x&quot;</span></span><span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Exception</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;deployment timed out...&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// checking deployment status</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">def</span> rolling <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span>namespace<span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;deployment&quot;</span></span><span class="token punctuation">)</span>
                lastRolling <span class="token operator">=</span> rolling
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isDeploymentReady</span><span class="token punctuation">(</span>rolling<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    readyCount<span class="token operator">++</span>
                    echo <span class="token interpolation-string"><span class="token string">&quot;ready total count: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">readyCount</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>readyCount <span class="token operator">&gt;=</span> readyTarget<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> env<span class="token punctuation">.</span>STAGE_NAME<span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>STAGE_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> OK...  √&quot;</span></span><span class="token punctuation">)</span>
                        <span class="token keyword">break</span>
                    <span class="token punctuation">}</span>

                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    readyCount <span class="token operator">=</span> <span class="token number">0</span>
                    echo <span class="token interpolation-string"><span class="token string">&quot;reseting ready total count: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">readyCount</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">，print pods event logs&quot;</span></span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">printContainerLogs</span><span class="token punctuation">(</span>lastRolling<span class="token punctuation">)</span>
                    sh <span class="token interpolation-string"><span class="token string">&quot;kubectl get pod -n </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -o wide&quot;</span></span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string">&#39;deploy&#39;</span><span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_RESULT<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>STAGE_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> Failed...  ×&quot;</span></span><span class="token punctuation">)</span>
                echo <span class="token interpolation-string"><span class="token string">&quot;error: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">exc</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token punctuation">}</span>
            <span class="token function">sleep</span><span class="token punctuation">(</span>sleepTime<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">getResource</span><span class="token punctuation">(</span>String namespace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;default&quot;</span></span><span class="token punctuation">,</span> String name<span class="token punctuation">,</span> String kind<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;deployment&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sh <span class="token interpolation-string"><span class="token string">&quot;kubectl get </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">kind</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -n </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -o json &gt; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-yaml.yml&quot;</span></span>
    <span class="token keyword">def</span> jsonStr <span class="token operator">=</span> readFile <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-yaml.yml&quot;</span></span>
    <span class="token keyword">def</span> jsonSlurper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonSlurperClassic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> jsonObj <span class="token operator">=</span> jsonSlurper<span class="token punctuation">.</span><span class="token function">parseText</span><span class="token punctuation">(</span>jsonStr<span class="token punctuation">)</span>
    <span class="token keyword">return</span> jsonObj
<span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">printContainerLogs</span><span class="token punctuation">(</span>deployJson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>deployJson <span class="token operator">==</span> null<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">def</span> namespace <span class="token operator">=</span> deployJson<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>namespace
    <span class="token keyword">def</span> name <span class="token operator">=</span> deployJson<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>name
    <span class="token keyword">def</span> labels<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span>
    deployJson<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>template<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>labels<span class="token punctuation">.</span>each <span class="token punctuation">{</span> k<span class="token punctuation">,</span> v <span class="token operator">-&gt;</span>
        labels <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">labels</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -l=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">k</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">v</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
    sh <span class="token interpolation-string"><span class="token string">&quot;kubectl describe pods -n </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">labels</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">isDeploymentReady</span><span class="token punctuation">(</span>deployJson<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">def</span> status <span class="token operator">=</span> deployJson<span class="token punctuation">.</span>status
    <span class="token keyword">def</span> replicas <span class="token operator">=</span> status<span class="token punctuation">.</span>replicas
    <span class="token keyword">def</span> unavailable <span class="token operator">=</span> status<span class="token punctuation">[</span><span class="token string">&#39;unavailableReplicas&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">def</span> ready <span class="token operator">=</span> status<span class="token punctuation">[</span><span class="token string">&#39;readyReplicas&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>unavailable <span class="token operator">!=</span> null<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">def</span> deployReady <span class="token operator">=</span> <span class="token punctuation">(</span>ready <span class="token operator">!=</span> null <span class="token operator">&amp;&amp;</span> ready <span class="token operator">==</span> replicas<span class="token punctuation">)</span>
    <span class="token comment">// get pod information</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>deployJson<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>template<span class="token punctuation">.</span>metadata <span class="token operator">!=</span> null <span class="token operator">&amp;&amp;</span> deployReady<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>deployJson<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>template<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>labels <span class="token operator">!=</span> null<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">def</span> labels<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span>
            <span class="token keyword">def</span> namespace <span class="token operator">=</span> deployJson<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>namespace
            <span class="token keyword">def</span> name <span class="token operator">=</span> deployJson<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>name
            deployJson<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>template<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>labels<span class="token punctuation">.</span>each <span class="token punctuation">{</span> k<span class="token punctuation">,</span> v <span class="token operator">-&gt;</span>
                labels <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">labels</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -l=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">k</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">v</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>labels <span class="token operator">!=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sh <span class="token interpolation-string"><span class="token string">&quot;kubectl get pods -n </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">labels</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -o json &gt; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-json.json&quot;</span></span>
                <span class="token keyword">def</span> jsonStr <span class="token operator">=</span> readFile <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-json.json&quot;</span></span>
                <span class="token keyword">def</span> jsonSlurper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonSlurperClassic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">def</span> jsonObj <span class="token operator">=</span> jsonSlurper<span class="token punctuation">.</span><span class="token function">parseText</span><span class="token punctuation">(</span>jsonStr<span class="token punctuation">)</span>
                <span class="token keyword">def</span> totalCount <span class="token operator">=</span> <span class="token number">0</span>
                <span class="token keyword">def</span> readyCount <span class="token operator">=</span> <span class="token number">0</span>
                jsonObj<span class="token punctuation">.</span>items<span class="token punctuation">.</span>each <span class="token punctuation">{</span> k<span class="token punctuation">,</span> v <span class="token operator">-&gt;</span>
                    echo <span class="token interpolation-string"><span class="token string">&quot;pod phase </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">k<span class="token punctuation">.</span>status<span class="token punctuation">.</span>phase</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>k<span class="token punctuation">.</span>status<span class="token punctuation">.</span>phase <span class="token operator">!=</span> <span class="token interpolation-string"><span class="token string">&quot;Terminating&quot;</span></span> <span class="token operator">&amp;&amp;</span> k<span class="token punctuation">.</span>status<span class="token punctuation">.</span>phase <span class="token operator">!=</span> <span class="token interpolation-string"><span class="token string">&quot;Evicted&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        totalCount<span class="token operator">++</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>k<span class="token punctuation">.</span>status<span class="token punctuation">.</span>phase <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;Running&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            readyCount<span class="token operator">++</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                echo <span class="token interpolation-string"><span class="token string">&quot;Pod running count </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">totalCount</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> == </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">readyCount</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
                <span class="token keyword">return</span> totalCount <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> totalCount <span class="token operator">==</span> readyCount
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> deployReady
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>Jenkinsfile</code> 调用部分：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>        stage<span class="token punctuation">(</span><span class="token string">&#39;deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                container<span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span>deploy<span class="token punctuation">(</span><span class="token string">&quot;deploy&quot;</span><span class="token punctuation">,</span> true<span class="token punctuation">,</span> <span class="token string">&quot;deploy/deployment.yaml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="library实现即时消息推送" tabindex="-1"><a class="header-anchor" href="#library实现即时消息推送" aria-hidden="true">#</a> library实现即时消息推送</h5><h6 id="实现消息通知" tabindex="-1"><a class="header-anchor" href="#实现消息通知" aria-hidden="true">#</a> 实现消息通知</h6><p>由于发送消息通知属于通用的功能，因此有必要把消息通知抽象成为通用的功能。</p><p><code>devops.groovy</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> notificationSuccess
 <span class="token operator">*</span> @<span class="token keyword">param</span> project
 <span class="token operator">*</span> @<span class="token keyword">param</span> receiver
 <span class="token operator">*</span> @<span class="token keyword">param</span> credentialsId
 <span class="token operator">*</span> @<span class="token keyword">param</span> title
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def notificationSuccess<span class="token punctuation">(</span>String project<span class="token punctuation">,</span> String receiver=<span class="token string">&quot;dingTalk&quot;</span><span class="token punctuation">,</span> String credentialsId=<span class="token string">&quot;dingTalk&quot;</span><span class="token punctuation">,</span> String title=<span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    new Notification<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>getObject<span class="token punctuation">(</span>project<span class="token punctuation">,</span> receiver<span class="token punctuation">,</span> credentialsId<span class="token punctuation">,</span> title<span class="token punctuation">)</span><span class="token punctuation">.</span>notification<span class="token punctuation">(</span><span class="token string">&quot;success&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token operator">/</span><span class="token operator">*</span><span class="token operator">*</span>
 <span class="token operator">*</span> notificationFailed
 <span class="token operator">*</span> @<span class="token keyword">param</span> project
 <span class="token operator">*</span> @<span class="token keyword">param</span> receiver
 <span class="token operator">*</span> @<span class="token keyword">param</span> credentialsId
 <span class="token operator">*</span> @<span class="token keyword">param</span> title
 <span class="token operator">*</span> @<span class="token keyword">return</span>
 <span class="token operator">*</span><span class="token operator">/</span>
def notificationFailed<span class="token punctuation">(</span>String project<span class="token punctuation">,</span> String receiver=<span class="token string">&quot;dingTalk&quot;</span><span class="token punctuation">,</span> String credentialsId=<span class="token string">&quot;dingTalk&quot;</span><span class="token punctuation">,</span> String title=<span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    new Notification<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>getObject<span class="token punctuation">(</span>project<span class="token punctuation">,</span> receiver<span class="token punctuation">,</span> credentialsId<span class="token punctuation">,</span> title<span class="token punctuation">)</span><span class="token punctuation">.</span>notification<span class="token punctuation">(</span><span class="token string">&quot;failure&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建<code>Notification.groovy</code>文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token comment">/**
 *
 * @param type
 * @param credentialsId
 * @param title
 * @return
 */</span>
<span class="token keyword">def</span> <span class="token function">getObject</span><span class="token punctuation">(</span>String project<span class="token punctuation">,</span> String receiver<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> String title<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>project <span class="token operator">=</span> project
    <span class="token keyword">this</span><span class="token punctuation">.</span>receiver <span class="token operator">=</span> receiver
    <span class="token keyword">this</span><span class="token punctuation">.</span>credentialsId <span class="token operator">=</span> credentialsId
    <span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> title
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>


<span class="token keyword">def</span> <span class="token function">notification</span><span class="token punctuation">(</span>String type<span class="token punctuation">)</span><span class="token punctuation">{</span>
    String msg <span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;😄👍 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>title</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 👍😄&quot;</span></span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;😄👍 流水线成功啦 👍😄&quot;</span></span>
    <span class="token punctuation">}</span>
    <span class="token comment">// failed</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;failure&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        msg <span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;😖❌ </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>title</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> ❌😖&quot;</span></span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;😖❌ 流水线失败了 ❌😖&quot;</span></span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
	String title <span class="token operator">=</span> msg
    <span class="token comment">// rich notify msg</span>
    msg <span class="token operator">=</span> <span class="token function">genNotificationMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>receiver <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;dingTalk&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//new DingTalk().markDown(title, msg, this.credentialsId)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>receiver <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;wechat&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//todo</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>receiver <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;email&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//todo</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        error <span class="token interpolation-string"><span class="token string">&quot;no support notify type!&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">/**
 * get notification msg
 * @param msg
 * @return
 */</span>
<span class="token keyword">def</span> <span class="token function">genNotificationMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// project</span>
    msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">msg</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">  \\n  **项目名称**: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>project</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token comment">// get git log</span>
    <span class="token keyword">def</span> gitlog <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        sh <span class="token interpolation-string"><span class="token string">&quot;git log --oneline -n 1 &gt; gitlog.file&quot;</span></span>
        gitlog <span class="token operator">=</span> readFile <span class="token interpolation-string"><span class="token string">&quot;gitlog.file&quot;</span></span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception ignored<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>gitlog <span class="token operator">!=</span> null <span class="token operator">&amp;&amp;</span> gitlog <span class="token operator">!=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">msg</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">  \\n  **Git log**: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">gitlog</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
    <span class="token comment">// get git branch</span>
    <span class="token keyword">def</span> gitbranch <span class="token operator">=</span> env<span class="token punctuation">.</span>BRANCH_NAME
    <span class="token keyword">if</span> <span class="token punctuation">(</span>gitbranch <span class="token operator">!=</span> null <span class="token operator">&amp;&amp;</span> gitbranch <span class="token operator">!=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">msg</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">  \\n  **Git branch**: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">gitbranch</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
    <span class="token comment">// build tasks</span>
    msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">msg</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">  \\n  **Build Tasks**: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>BUILD_TASKS</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>

    <span class="token comment">// get buttons</span>
    msg <span class="token operator">=</span> msg <span class="token operator">+</span> <span class="token function">getButtonMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> msg
<span class="token punctuation">}</span>
<span class="token keyword">def</span> <span class="token function">getButtonMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    String res <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span>
    <span class="token keyword">def</span>  buttons <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token punctuation">[</span>
                    <span class="token interpolation-string"><span class="token string">&quot;title&quot;</span></span><span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;查看流水线&quot;</span></span><span class="token punctuation">,</span>
                    <span class="token interpolation-string"><span class="token string">&quot;actionURL&quot;</span></span><span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>RUN_DISPLAY_URL</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">[</span>
                    <span class="token interpolation-string"><span class="token string">&quot;title&quot;</span></span><span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;代码扫描结果&quot;</span></span><span class="token punctuation">,</span>
                    <span class="token interpolation-string"><span class="token string">&quot;actionURL&quot;</span></span><span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;http://sonar.nohi.com/dashboard?id=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>project</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
    buttons<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>res <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            res <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;   \\n &gt;&quot;</span></span>
        <span class="token punctuation">}</span>
        res <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">res</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> --- [&quot;</span></span><span class="token operator">+</span>it<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;title&quot;</span></span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token interpolation-string"><span class="token string">&quot;](&quot;</span></span><span class="token operator">+</span>it<span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;actionURL&quot;</span></span><span class="token punctuation">]</span><span class="token operator">+</span><span class="token interpolation-string"><span class="token string">&quot;) &quot;</span></span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建<code>DingTalk.groovy</code>文件：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token keyword">import</span> groovy<span class="token punctuation">.</span>json<span class="token punctuation">.</span>JsonOutput


<span class="token keyword">def</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> data<span class="token punctuation">,</span> credentialsId<span class="token punctuation">,</span> Boolean verbose<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">,</span> codes<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;100:399&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">def</span> reqBody <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JsonOutput</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token function">withCredentials</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">usernamePassword</span><span class="token punctuation">(</span>credentialsId<span class="token punctuation">:</span> credentialsId<span class="token punctuation">,</span> usernameVariable<span class="token punctuation">:</span> <span class="token string">&#39;USERNAME&#39;</span><span class="token punctuation">,</span> passwordVariable<span class="token punctuation">:</span> <span class="token string">&#39;PASSWORD&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">def</span> response <span class="token operator">=</span> <span class="token function">httpRequest</span><span class="token punctuation">(</span>
                httpMode<span class="token punctuation">:</span>method<span class="token punctuation">,</span>
                url<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;https://oapi.dingtalk.com/robot/send?access_token=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">PASSWORD</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                requestBody<span class="token punctuation">:</span>reqBody<span class="token punctuation">,</span>
                validResponseCodes<span class="token punctuation">:</span> codes<span class="token punctuation">,</span>
                contentType<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;APPLICATION_JSON&quot;</span></span><span class="token punctuation">,</span>
                quiet<span class="token punctuation">:</span> <span class="token operator">!</span>verbose
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">markDown</span><span class="token punctuation">(</span>String title<span class="token punctuation">,</span> String text<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> Boolean verbose<span class="token operator">=</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">def</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token interpolation-string"><span class="token string">&quot;msgtype&quot;</span></span><span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;markdown&quot;</span></span><span class="token punctuation">,</span>
            <span class="token interpolation-string"><span class="token string">&quot;markdown&quot;</span></span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
                    <span class="token interpolation-string"><span class="token string">&quot;title&quot;</span></span><span class="token punctuation">:</span> title<span class="token punctuation">,</span>
                    <span class="token interpolation-string"><span class="token string">&quot;text&quot;</span></span><span class="token punctuation">:</span> text
            <span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;POST&quot;</span></span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> credentialsId<span class="token punctuation">,</span> verbose<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要用到Http Request来发送消息，安装一下插件：http_request</p><h6 id="jenkinsfile调用" tabindex="-1"><a class="header-anchor" href="#jenkinsfile调用" aria-hidden="true">#</a> jenkinsfile调用</h6><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token annotation punctuation">@Library</span><span class="token punctuation">(</span><span class="token string">&#39;nohi-devops&#39;</span><span class="token punctuation">)</span> <span class="token number">_</span>

pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span> label <span class="token string">&#39;jnlp-slave&#39;</span><span class="token punctuation">}</span>
    options <span class="token punctuation">{</span>
		<span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span>
		<span class="token function">gitLabConnection</span><span class="token punctuation">(</span><span class="token string">&#39;gitlab&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    environment <span class="token punctuation">{</span>
        IMAGE_REPO <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;10.0.0.181:5000/demo/myblog&quot;</span></span>
        IMAGE_CREDENTIAL <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;credential-registry&quot;</span></span>
        DINGTALK_CREDS <span class="token operator">=</span> <span class="token function">credentials</span><span class="token punctuation">(</span><span class="token string">&#39;dingTalk&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;checkout&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    checkout scm
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;docker-image&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                        devops<span class="token punctuation">.</span><span class="token function">docker</span><span class="token punctuation">(</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">IMAGE_REPO</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">GIT_COMMIT</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            IMAGE_CREDENTIAL                          
                        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span><span class="token function">deploy</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;deploy&quot;</span></span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;deploy/deployment.yaml&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span> 
            script<span class="token punctuation">{</span>
                devops<span class="token punctuation">.</span><span class="token function">notificationSuccess</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;myblog&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;dingTalk&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            script<span class="token punctuation">{</span>
                devops<span class="token punctuation">.</span><span class="token function">notificationFailure</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;myblog&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;dingTalk&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote></blockquote><h5 id="library集成代码扫描" tabindex="-1"><a class="header-anchor" href="#library集成代码扫描" aria-hidden="true">#</a> library集成代码扫描</h5><p>sonarqube代码扫描作为通用功能，同样可以使用library实现。</p><p><code>devops.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">/**
 * sonarqube scanner
 * @param projectVersion
 * @param waitScan
 * @return
 */</span>
<span class="token keyword">def</span> <span class="token function">scan</span><span class="token punctuation">(</span>String projectVersion<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">,</span> Boolean waitScan <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Sonar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span>projectVersion<span class="token punctuation">,</span> waitScan<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建<code>Sonar.groovy</code></p><ul><li>可以传递projectVersion作为sonarqube的扫描版本</li><li>参数waitScan来设置是否等待本次扫描是否通过</li></ul><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops


<span class="token keyword">def</span> <span class="token function">init</span><span class="token punctuation">(</span>String projectVersion<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">,</span> Boolean waitScan <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>waitScan <span class="token operator">=</span> waitScan
    <span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BuildMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>projectVersion <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        projectVersion <span class="token operator">=</span> <span class="token function">sh</span><span class="token punctuation">(</span>returnStdout<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> script<span class="token punctuation">:</span> <span class="token string">&#39;git log --oneline -n 1|cut -d &quot; &quot; -f 1&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    sh <span class="token interpolation-string"><span class="token string">&quot;echo &#39;\\nsonar.projectVersion=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">projectVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#39; &gt;&gt; sonar-project.properties&quot;</span></span>
    sh <span class="token interpolation-string"><span class="token string">&quot;cat sonar-project.properties&quot;</span></span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">startToSonar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> exc
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">startToSonar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">withSonarQubeEnv</span><span class="token punctuation">(</span><span class="token string">&#39;sonarqube&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        sh <span class="token interpolation-string"><span class="token string">&quot;sonar-scanner -X;&quot;</span></span>
        sleep <span class="token number">5</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>waitScan<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//wait 3min</span>
        <span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">def</span> qg <span class="token operator">=</span> <span class="token function">waitForQualityGate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            String stage <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>stage_name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>qg<span class="token punctuation">.</span>status <span class="token operator">!=</span> <span class="token string">&#39;OK&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">stage</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> Failed...  ×&quot;</span></span><span class="token punctuation">)</span>
                <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">stage</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;failed&#39;</span><span class="token punctuation">)</span>
                error <span class="token interpolation-string"><span class="token string">&quot;Pipeline aborted due to quality gate failure: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">qg<span class="token punctuation">.</span>status</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_RESULT<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">stage</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> OK...  √&quot;</span></span><span class="token punctuation">)</span>
                <span class="token function">updateGitlabCommitStatus</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">stage</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> state<span class="token punctuation">:</span> <span class="token string">&#39;success&#39;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        echo <span class="token interpolation-string"><span class="token string">&quot;skip waitScan&quot;</span></span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Jenkinsfile</code>新增如下部分：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;CI&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            failFast <span class="token boolean">true</span>
            parallel <span class="token punctuation">{</span>
                <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Unit Test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        echo <span class="token interpolation-string"><span class="token string">&quot;Unit Test Stage Skip...&quot;</span></span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Code Scan&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            script <span class="token punctuation">{</span>
                               devops<span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="集成robot自动化测试" tabindex="-1"><a class="header-anchor" href="#集成robot自动化测试" aria-hidden="true">#</a> 集成robot自动化测试</h5><p>关于集成测试，我们需要知道的几点:</p><ul><li>测试人员进行编写</li><li>侧重于不同模块的接口调用，对新加的功能进行验证</li><li>注重新版本对以前的集成用例进行回归</li></ul><p>因此，更多的应该是跨模块去测试，而且测试用例是测试人员去维护，因此不适合把代码放在开发的git仓库中。</p><p>本节要实现的工作：</p><ol><li>创建新的git仓库<code>robot-cases</code>，用于存放robot测试用例</li><li>为<code>robot-cases</code>项目创建Jenkinsfile</li><li>配置Jenkins任务，实现该项目的自动化执行</li><li>在myblog模块的流水线中，对该流水线项目进行调用</li></ol><h6 id="初始化robot-cases项目" tabindex="-1"><a class="header-anchor" href="#初始化robot-cases项目" aria-hidden="true">#</a> 初始化robot-cases项目</h6><ol><li><p>新建gitlab项目，名称为<code>robot-cases</code></p></li><li><p>clone到本地</p></li><li><p>本地拷贝myblog项目的<code>robot.txt</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>robot-cases/
└── myblog
    └── robot<span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h6 id="配置jenkinsfile及自动化任务" tabindex="-1"><a class="header-anchor" href="#配置jenkinsfile及自动化任务" aria-hidden="true">#</a> 配置Jenkinsfile及自动化任务</h6><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>robot-cases/
├── Jenkinsfile
└── myblog
    └── robot<span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Jenkinsfile</code></p><p>多个业务项目的测试用例都在一个仓库中，因此需要根据参数设置来决定执行哪个项目的用例</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span>
        label <span class="token string">&#39;jnlp-slave&#39;</span>
    <span class="token punctuation">}</span>

	options <span class="token punctuation">{</span>
        <span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span>
		<span class="token function">gitLabConnection</span><span class="token punctuation">(</span><span class="token string">&#39;gitlab&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;checkout&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    checkout scm
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token keyword">switch</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>comp<span class="token punctuation">)</span><span class="token punctuation">{</span>
                            <span class="token keyword">case</span> <span class="token interpolation-string"><span class="token string">&quot;myblog&quot;</span></span><span class="token punctuation">:</span>
                                env<span class="token punctuation">.</span>testDir <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;myblog&quot;</span></span>
                                <span class="token keyword">break</span>
                            <span class="token keyword">case</span> <span class="token interpolation-string"><span class="token string">&quot;business1&quot;</span></span><span class="token punctuation">:</span>
                                env<span class="token punctuation">.</span>testDir <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;business1&quot;</span></span>
                                <span class="token keyword">break</span>
                            <span class="token keyword">default</span><span class="token punctuation">:</span>
                                env<span class="token punctuation">.</span>testDir <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;all&quot;</span></span>
                                <span class="token keyword">break</span>
                        <span class="token punctuation">}</span>
                        sh <span class="token string">&#39;robot -d artifacts/ \${testDir}/*&#39;</span>
                        <span class="token function">step</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
                            <span class="token punctuation">$</span><span class="token keyword">class</span> <span class="token punctuation">:</span> <span class="token string">&#39;RobotPublisher&#39;</span><span class="token punctuation">,</span>
                            outputPath<span class="token punctuation">:</span> <span class="token string">&#39;artifacts/&#39;</span><span class="token punctuation">,</span>
                            outputFileName <span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;output.xml&quot;</span></span><span class="token punctuation">,</span>
                            disableArchiveOutput <span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                            passThreshold <span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
                            unstableThreshold<span class="token punctuation">:</span> <span class="token number">80.0</span><span class="token punctuation">,</span>
                            onlyCritical <span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                            otherFiles <span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;*.png&quot;</span></span>
                        <span class="token punctuation">]</span><span class="token punctuation">)</span>
                        archiveArtifacts artifacts<span class="token punctuation">:</span> <span class="token string">&#39;artifacts/*&#39;</span><span class="token punctuation">,</span> fingerprint<span class="token punctuation">:</span> <span class="token boolean">true</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何实现将<code>env.comp</code> 传递进去？</p><p>配置流水线的参数化构建任务并验证参数化构建</p><blockquote><p>20230320 参数化构建过程，添加参数-字符参数-&gt; 名称输入<code>comp</code></p></blockquote><h6 id="library集成触发任务" tabindex="-1"><a class="header-anchor" href="#library集成触发任务" aria-hidden="true">#</a> library集成触发任务</h6><p>由于多个项目均需要触发自动构建，因此可以在library中抽象方法，实现接收comp参数，并在library中实现对<code>robot-cases</code>项目的触发。</p><p><img src="`+c+`" alt=""></p><p><code>devops.groovy</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">/**
 * 
 * @param comp
 * @return
 */</span>
<span class="token keyword">def</span> <span class="token function">robotTest</span><span class="token punctuation">(</span>String comp<span class="token operator">=</span><span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token class-name">Robot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">acceptanceTest</span><span class="token punctuation">(</span>comp<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建<code>Robot.groovy</code>文件</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>devops

<span class="token keyword">def</span> <span class="token function">acceptanceTest</span><span class="token punctuation">(</span>comp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        echo <span class="token interpolation-string"><span class="token string">&quot;Trigger to execute Acceptance Testing&quot;</span></span>
        <span class="token keyword">def</span> rf <span class="token operator">=</span> build job<span class="token punctuation">:</span> <span class="token string">&#39;robot-cases&#39;</span><span class="token punctuation">,</span>
                parameters<span class="token punctuation">:</span> <span class="token punctuation">[</span>
                        <span class="token function">string</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token string">&#39;comp&#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> comp<span class="token punctuation">)</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
                wait<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                propagate<span class="token punctuation">:</span> <span class="token boolean">false</span>
        <span class="token keyword">def</span> result <span class="token operator">=</span> rf<span class="token punctuation">.</span><span class="token function">getResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">def</span> msg <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>STAGE_NAME</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">... &quot;</span></span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;SUCCESS&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            msg <span class="token operator">+=</span> <span class="token interpolation-string"><span class="token string">&quot;√ success&quot;</span></span>
        <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token interpolation-string"><span class="token string">&quot;UNSTABLE&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            msg <span class="token operator">+=</span> <span class="token interpolation-string"><span class="token string">&quot;⚠ unstable&quot;</span></span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            msg <span class="token operator">+=</span> <span class="token interpolation-string"><span class="token string">&quot;× failure&quot;</span></span>
        <span class="token punctuation">}</span>
        echo rf<span class="token punctuation">.</span><span class="token function">getAbsoluteUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        env<span class="token punctuation">.</span>ROBOT_TEST_URL <span class="token operator">=</span> rf<span class="token punctuation">.</span><span class="token function">getAbsoluteUrl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">new</span> <span class="token class-name">BuildMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_TASKS<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        echo <span class="token interpolation-string"><span class="token string">&quot;trigger  execute Acceptance Testing exception: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">exc</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token keyword">new</span> <span class="token class-name">BuildMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">updateBuildMessage</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>BUILD_RESULT<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>Jenkinsfile</code>测试调用</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;integration test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span><span class="token function">robotTest</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;myblog&quot;</span></span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="多环境的cicd自动化实现" tabindex="-1"><a class="header-anchor" href="#多环境的cicd自动化实现" aria-hidden="true">#</a> 多环境的CICD自动化实现</h5><h6 id="实现目标及效果" tabindex="-1"><a class="header-anchor" href="#实现目标及效果" aria-hidden="true">#</a> 实现目标及效果</h6><p>目前项目存在<code>develop</code>和<code>master</code>两个分支，Jenkinsfile中配置的都是构建部署到相同的环境，实际的场景中，代码仓库的项目往往不同的分支有不同的作用，我们可以抽象出一个工作流程：</p><p><img src="`+l+`" alt=""></p><ul><li><p>开发人员提交代码到develop分支</p></li><li><p>Jenkins自动使用develop分支做单测、代码扫描、镜像构建（以commit id为镜像tag）、服务部署到开发环境</p></li><li><p>开发人员使用开发环境自测</p></li><li><p>测试完成后，在gitlab提交merge request请求，将代码合并至master分支</p></li><li><p>需要发版时，在gitlab端基于master分支创建tag（v2.3.0）</p></li><li><p>Jenkins自动检测到tag，拉取tag关联的代码做单测、代码扫描、镜像构建（以代码的tag为镜像的tag）、服务部署到测试环境、执行集成测试用例，输出测试报告</p></li><li><p>测试人员进行手动测试</p></li><li><p>上线</p></li></ul><h6 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路" aria-hidden="true">#</a> 实现思路</h6><p>以myblog项目为例，目前已经具备的是develop分支代码提交后，可以自动实现：</p><ul><li>单元测试、代码扫描</li><li>镜像构建</li><li>k8s服务部署</li><li>robot集成用例测试</li></ul><p>和上述目标相比，差异点：</p><ol><li>myblog应用目前只有一套环境，在nohi命名空间中。我们新建两个命名空间： <ul><li>dev，用作部署开发环境</li><li>test，用作部署集成测试环境</li></ul></li><li>需要根据不同的分支来执行不同的任务，有两种方案实现： <ul><li>develop和master分支使用不同的Jenkinsfile <ul><li>可行性很差，因为代码合并工作很繁琐</li><li>维护成本高，多个分支需要维护多个Jenkinsfile</li></ul></li><li>使用同一套Jenkinsfile，配合library和模板来实现一套Jenkinsfile适配多套环境 <ul><li>改造Jenkinsfile，实现根据分支来选择任务</li><li>需要将deploy目录中所有和特定环境绑定的内容模板化</li><li>在library中实现根据不同的分支，来替换模板中的内容</li></ul></li></ul></li></ol><h6 id="jenkinsfile根据分支选择任务" tabindex="-1"><a class="header-anchor" href="#jenkinsfile根据分支选择任务" aria-hidden="true">#</a> Jenkinsfile根据分支选择任务</h6><p>使用when关键字，配合正则表达式，实现分支的过滤选择：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>pipeline <span class="token punctuation">{</span>
    agent any
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Example Build&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">echo</span> <span class="token string">&#39;Hello World&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;Example Deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
                expression <span class="token punctuation">{</span> BRANCH_NAME ==~ <span class="token string">&quot;develop&quot;</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">echo</span> <span class="token string">&#39;Deploying to develop env&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别在develop和master分支进行验证。</p><p>针对本例，可以对Jenkinsfile做如下调整：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        stage<span class="token punctuation">(</span><span class="token string">&#39;integration test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
                expression <span class="token punctuation">{</span> BRANCH_NAME ==~ <span class="token operator">/</span>v<span class="token punctuation">.</span><span class="token operator">*</span><span class="token operator">/</span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            steps <span class="token punctuation">{</span>
                container<span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span>robotTest<span class="token punctuation">(</span>PROJECT<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="模板化k8s的资源清单" tabindex="-1"><a class="header-anchor" href="#模板化k8s的资源清单" aria-hidden="true">#</a> 模板化k8s的资源清单</h6><p>因为需要使用同一套模板和Jenkinsfile来部署到不同的环境，因此势必要对资源清单进行模板化，前面的内容中只将<code>deployment.yaml</code>放到了项目的<code>deploy</code>清单目录，此处将部署myblog用到的资源清单均补充进去，包含：</p><ul><li>deployment.yaml</li><li>service.yaml</li><li>ingress.yaml</li><li>configmap.yaml</li><li>secret.yaml</li></ul><p>涉及到需要进行模板化的内容包括：</p><ul><li><p>镜像地址</p></li><li><p>命名空间</p></li><li><p>ingress的域名信息</p></li></ul><p>模板化后的文件：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> deployment<span class="token punctuation">.</span>yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myblog
  namespace: <span class="token punctuation">{</span><span class="token punctuation">{</span>NAMESPACE<span class="token punctuation">}</span><span class="token punctuation">}</span>
spec:
  replicas: 1   <span class="token comment">#指定Pod副本数</span>
  selector:             <span class="token comment">#指定Pod的选择器</span>
    matchLabels:
      app: myblog
  template:
    metadata:
      labels:   <span class="token comment">#给Pod打label</span>
        app: myblog
    spec:
      containers:
      <span class="token operator">-</span> name: myblog
        image: <span class="token punctuation">{</span><span class="token punctuation">{</span>IMAGE_URL<span class="token punctuation">}</span><span class="token punctuation">}</span>
        imagePullPolicy: IfNotPresent
        env:
        <span class="token operator">-</span> name: MYSQL_HOST
          valueFrom:
            configMapKeyRef:
              name: myblog
              key: MYSQL_HOST
        <span class="token operator">-</span> name: MYSQL_PORT
          valueFrom:
            configMapKeyRef:
              name: myblog
              key: MYSQL_PORT
        <span class="token operator">-</span> name: MYSQL_USER
          valueFrom:
            secretKeyRef:
              name: myblog
              key: MYSQL_USER
        <span class="token operator">-</span> name: MYSQL_PASSWD
          valueFrom:
            secretKeyRef:
              name: myblog
              key: MYSQL_PASSWD
        ports:
        <span class="token operator">-</span> containerPort: 8002
        resources:
          requests:
            memory: 100Mi
            cpu: 50m
          limits:
            memory: 500Mi
            cpu: 100m
        livenessProbe:
          httpGet:
            path: <span class="token operator">/</span>blog/index/
            port: 8002
            scheme: HTTP
          initialDelaySeconds: 10  <span class="token comment"># 容器启动后第一次执行探测是需要等待多少秒</span>
          periodSeconds: 15     <span class="token comment"># 执行探测的频率</span>
          timeoutSeconds: 2             <span class="token comment"># 探测超时时间</span>
        readinessProbe: 
          httpGet: 
            path: <span class="token operator">/</span>blog/index/
            port: 8002
            scheme: HTTP
          initialDelaySeconds: 10 
          timeoutSeconds: 2
          periodSeconds: 15

$ <span class="token function">cat</span> configmap<span class="token punctuation">.</span>yaml
apiVersion: v1
<span class="token keyword">data</span>:
  MYSQL_HOST: mysql
  MYSQL_PORT: <span class="token string">&quot;3306&quot;</span>
kind: ConfigMap
metadata:
  name: myblog
  namespace: <span class="token punctuation">{</span><span class="token punctuation">{</span>NAMESPACE<span class="token punctuation">}</span><span class="token punctuation">}</span>

$ <span class="token function">cat</span> secret<span class="token punctuation">.</span>yaml
apiVersion: v1
<span class="token keyword">data</span>:
  MYSQL_PASSWD: MTIzNDU2
  MYSQL_USER: cm9vdA==
kind: Secret
metadata:
  name: myblog
  namespace: <span class="token punctuation">{</span><span class="token punctuation">{</span>NAMESPACE<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token function">type</span>: Opaque

$ <span class="token function">cat</span> service<span class="token punctuation">.</span>yaml
apiVersion: v1
kind: Service
metadata:
  name: myblog
  namespace: <span class="token punctuation">{</span><span class="token punctuation">{</span>NAMESPACE<span class="token punctuation">}</span><span class="token punctuation">}</span>
spec:
  ports:
  <span class="token operator">-</span> port: 80
    protocol: TCP
    targetPort: 8002
  selector:
    app: myblog
  sessionAffinity: None
  <span class="token function">type</span>: ClusterIP
status:
  loadBalancer: <span class="token punctuation">{</span><span class="token punctuation">}</span>

$ <span class="token function">cat</span> ingress<span class="token punctuation">.</span>yaml
apiVersion: networking<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
kind: Ingress
metadata:
  name: myblog
  namespace: <span class="token punctuation">{</span><span class="token punctuation">{</span>NAMES PACE<span class="token punctuation">}</span><span class="token punctuation">}</span>
spec:
  rules:
  <span class="token operator">-</span> host: <span class="token punctuation">{</span><span class="token punctuation">{</span>INGRESS_MYBLOG<span class="token punctuation">}</span><span class="token punctuation">}</span>
    http:
      paths:
      <span class="token operator">-</span> path: <span class="token operator">/</span>
        pathType: Prefix
        backend:
          service:
            name: myblog
            port:
              number: 80
status:
  loadBalancer: <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="实现library配置替换逻辑" tabindex="-1"><a class="header-anchor" href="#实现library配置替换逻辑" aria-hidden="true">#</a> 实现library配置替换逻辑</h6><p>我们需要实现使用相同的模板，做到如下事情：</p><ul><li>根据代码分支来部署到不同的命名空间 <ul><li>develop分支部署到开发环境，使用命名空间 dev</li><li>v.*部署到测试环境，使用命名空间 test</li></ul></li><li>不同环境使用不同的ingress地址来访问 <ul><li>开发环境，<code>blog-dev.nohi.com</code></li><li>测试环境，<code>blog-test.nohi.com</code></li></ul></li></ul><p>如何实现？sharedlibrary</p><p>所有的逻辑都会经过library这一层，我们具有完全可控权。</p><p>前面已经替换过镜像地址了，我们只需要实现如下逻辑：</p><ul><li>检测当前代码分支，替换命名空间</li><li>检测当前代码分支，替换Ingress地址</li></ul><p>问题来了，如何检测构建的触发是develop分支还是tag分支？</p><p>答案是：env.TAG_NAME，由tag分支触发的构建，环境变量中会带有TAG_NAME，且值为gitlab中的tag名称。</p><p>做个演示：</p><p>使用如下的Jenkinsfile，查看由master分支触发和由tag分支触发，printenv的值有什么不同</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>pipeline <span class="token punctuation">{</span>
    agent any
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Example Build&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                echo <span class="token string">&#39;Hello World&#39;</span>
                sh <span class="token string">&#39;printenv&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Example Deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
                expression <span class="token punctuation">{</span> BRANCH_NAME <span class="token operator">==~</span> <span class="token interpolation-string"><span class="token string">&quot;develop&quot;</span></span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            steps <span class="token punctuation">{</span>
                echo <span class="token string">&#39;Deploying to develop env&#39;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以选择和替换image镜像地址一样，来执行替换：</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> <span class="token function">tplHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{IMAGE_URL}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>CURRENT_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
    String namespace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;dev&quot;</span></span>
    String ingress <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;blog-dev.nohi.com&quot;</span></span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>TAG_NAME<span class="token punctuation">)</span><span class="token punctuation">{</span>
        namespace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;test&quot;</span></span>
        ingress <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;blog-test.nohi.com&quot;</span></span>
    <span class="token punctuation">}</span>
    sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{NAMESPACE}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">namespace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
    sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{INGRESS_MYBLOG}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">ingress</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我们的library是要为多个项目提供服务的，如果采用上述方式，则每加入一个项目，都需要对library做改动，形成了强依赖。因此需要想一种更优雅的方式来进行替换。</p><p>思路：</p>`,173),d=s(`<li><p>开发环境和集成测试环境里准备一个configmap，取名为 <code>devops-config</code></p></li><li><p>configmap的内容大致如下：</p><ul><li><p>开发环境</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>NAMESPACE=dev
INGRESS_MYBLOG=blog-dev<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>测试环境</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>NAMESPACE=test
INGRESS_MYBLOG=blog-test<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li>`,2),k=s(`<div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>NAMESPACE=dev
INGRESS_MYBLOG=blog-dev<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com
<span class="token punctuation">{</span><span class="token punctuation">{</span>NAMESPACE<span class="token punctuation">}</span><span class="token punctuation">}</span> =&gt; dev
<span class="token punctuation">{</span><span class="token punctuation">{</span>INGRESS_MYBLOG<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">-</span>&gt; blog-dev<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思是约定项目的deploy的资源清单中：</p><ul><li>所有的<code>{{NAMESPACE}}</code>被替换为<code>dev</code></li><li>所有的<code>{{INGRESS_MYBLOG}}</code>被替换为<code>blog-dev.nohi.com</code></li></ul>`,3),v=n("li",null,[n("p",null,[p("在library的逻辑中，实现读取触发当前构建的代码分支所关联的namespace下的"),n("code",null,"devops-config"),p("这个configmap，然后遍历里面的值进行模板替换即可。")])],-1),m=s(`<p>这样，则以后再有新增的项目，则只需要维护<code>devops-config</code>配置文件即可，shared-library则不需要随着项目的增加而进行修改，通过这种方式实现library和具体的项目解耦。</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token keyword">def</span> <span class="token function">tplHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{IMAGE_URL}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">env<span class="token punctuation">.</span>CURRENT_IMAGE</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
    String namespace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;dev&quot;</span></span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>TAG_NAME<span class="token punctuation">)</span><span class="token punctuation">{</span>
        namespace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;test&quot;</span></span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">def</span> configMapData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span>namespace<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;devops-config&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;configmap&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;data&quot;</span></span><span class="token punctuation">]</span>
        configMapData<span class="token punctuation">.</span>each <span class="token punctuation">{</span> k<span class="token punctuation">,</span> v <span class="token operator">-&gt;</span>
            echo <span class="token interpolation-string"><span class="token string">&quot;key is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">k</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, val is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">v</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
            sh <span class="token interpolation-string"><span class="token string">&quot;sed -i &#39;s#{{</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">k</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}}#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">v</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">#g&#39; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression"><span class="token keyword">this</span><span class="token punctuation">.</span>resourcePath</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/*&quot;</span></span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span>Exception exc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        echo <span class="token interpolation-string"><span class="token string">&quot;failed to get devops-config data,exception: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">exc</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.&quot;</span></span>
        <span class="token keyword">throw</span> exc
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="准备多环境" tabindex="-1"><a class="header-anchor" href="#准备多环境" aria-hidden="true">#</a> 准备多环境</h6>`,3),b=s(`<li><p>创建开发和测试环境的命名空间</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># </span>
$ kubectl create namespace dev
$ kubectl create namespace test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>分别在dev和test命名空间准备mysql数据库。演示功能，因此mysql未作持久化</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> mysql-all<span class="token punctuation">.</span>yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  namespace: dev
spec:
  ports:
  <span class="token operator">-</span> port: 3306
    protocol: TCP
    targetPort: 3306
  selector:
    app: mysql
  <span class="token function">type</span>: ClusterIP
<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: v1
kind: Secret
metadata:
  name: myblog
  namespace: dev
<span class="token function">type</span>: Opaque
<span class="token keyword">data</span>:
  MYSQL_USER: cm9vdA==
  MYSQL_PASSWD: MTIzNDU2
<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  namespace: dev
spec:
  replicas: 1   <span class="token comment">#指定Pod副本数</span>
  selector:             <span class="token comment">#指定Pod的选择器</span>
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:   <span class="token comment">#给Pod打label</span>
        app: mysql
    spec:
      nodeSelector:   <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
        component: mysql-dev
      volumes:
      <span class="token operator">-</span> name: mysql-<span class="token keyword">data</span>
        hostPath:
          path: <span class="token operator">/</span>opt/mysql-dev/<span class="token keyword">data</span>
      containers:
      <span class="token operator">-</span> name: mysql
        image: 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/mysql:5<span class="token punctuation">.</span>7-utf8
        ports:
        <span class="token operator">-</span> containerPort: 3306
        env:
        <span class="token operator">-</span> name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: myblog
              key: MYSQL_PASSWD
        <span class="token operator">-</span> name: MYSQL_DATABASE
          value: <span class="token string">&quot;myblog&quot;</span>
        resources:
          requests:
            memory: 100Mi
            cpu: 50m
          limits:
            memory: 500Mi
            cpu: 100m
        readinessProbe:
          tcpSocket:
            port: 3306
          initialDelaySeconds: 5
          periodSeconds: 10
          
<span class="token comment"># 创建开发环境的数据库</span>
$ kubectl create <span class="token operator">-</span>f mysql-all<span class="token punctuation">.</span>yaml

<span class="token comment"># 替换dev命名空间，创建测试环境的数据库</span>
$ sed <span class="token operator">-</span>i <span class="token string">&#39;s/namespace: dev/namespace: test/g&#39;</span> mysql-all<span class="token punctuation">.</span>yaml
$ kubectl create <span class="token operator">-</span>f mysql-all<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,2),g=n("p",null,"对myblog项目的k8s资源清单模板化改造",-1),y=s(`<li><p>初始化开发环境和测试环境的<code>devops-config</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 开发环境</span>
$ <span class="token function">cat</span> devops-config-dev<span class="token punctuation">.</span>txt
NAMESPACE=dev
INGRESS_MYBLOG=blog-dev<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com

$ kubectl <span class="token operator">-</span>n dev create configmap devops-config <span class="token operator">--</span><span class="token keyword">from</span><span class="token operator">-</span>env-file=devops-config-dev<span class="token punctuation">.</span>txt

<span class="token comment"># 测试环境</span>
$ <span class="token function">cat</span> devops-config-test<span class="token punctuation">.</span>txt
NAMESPACE=test
INGRESS_MYBLOG=blog-test<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com

$ kubectl <span class="token operator">-</span>n test create configmap devops-config <span class="token operator">--</span><span class="token keyword">from</span><span class="token operator">-</span>env-file=devops-config-test<span class="token punctuation">.</span>txt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>提交最新的library代码</p></li><li><p>提交最新的python-demo项目代码</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token annotation punctuation">@Library</span><span class="token punctuation">(</span><span class="token string">&#39;nohi-devops&#39;</span><span class="token punctuation">)</span> <span class="token number">_</span>

pipeline <span class="token punctuation">{</span>
    agent <span class="token punctuation">{</span> label <span class="token string">&#39;jnlp-slave&#39;</span><span class="token punctuation">}</span>
    options <span class="token punctuation">{</span>
		<span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span>
		<span class="token function">gitLabConnection</span><span class="token punctuation">(</span><span class="token string">&#39;gitlab&#39;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    environment <span class="token punctuation">{</span>
        IMAGE_REPO <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;10.0.0.181:5000/myblog&quot;</span></span>
        IMAGE_CREDENTIAL <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;credential-registry&quot;</span></span>
        DINGTALK_CREDS <span class="token operator">=</span> <span class="token function">credentials</span><span class="token punctuation">(</span><span class="token string">&#39;dingTalk&#39;</span><span class="token punctuation">)</span>
        PROJECT <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;myblog&quot;</span></span>
    <span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;checkout&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    checkout scm
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;CI&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            failFast <span class="token boolean">true</span>
            parallel <span class="token punctuation">{</span>
                <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Unit Test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        echo <span class="token interpolation-string"><span class="token string">&quot;Unit Test Stage Skip...&quot;</span></span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Code Scan&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    steps <span class="token punctuation">{</span>
                        <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            script <span class="token punctuation">{</span>
                               devops<span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;docker-image&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                        devops<span class="token punctuation">.</span><span class="token function">docker</span><span class="token punctuation">(</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">IMAGE_REPO</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">GIT_COMMIT</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span>
                            IMAGE_CREDENTIAL                          
                        <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;deploy&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span><span class="token function">deploy</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;deploy&quot;</span></span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;deploy/deployment.yaml&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;integration test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
                expression <span class="token punctuation">{</span> BRANCH_NAME <span class="token operator">==~</span> <span class="token interpolation-string"><span class="token string">/v.*/</span></span> <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">container</span><span class="token punctuation">(</span><span class="token string">&#39;tools&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    script<span class="token punctuation">{</span>
                    	devops<span class="token punctuation">.</span><span class="token function">robotTest</span><span class="token punctuation">(</span>PROJECT<span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        success <span class="token punctuation">{</span> 
            script<span class="token punctuation">{</span>
                devops<span class="token punctuation">.</span><span class="token function">notificationSuccess</span><span class="token punctuation">(</span>PROJECT<span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;dingTalk&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            script<span class="token punctuation">{</span>
                devops<span class="token punctuation">.</span><span class="token function">notificationFailure</span><span class="token punctuation">(</span>PROJECT<span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;dingTalk&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,3),h=s(`<h6 id="验证多环境自动部署" tabindex="-1"><a class="header-anchor" href="#验证多环境自动部署" aria-hidden="true">#</a> 验证多环境自动部署</h6><p>模拟如下流程：</p><ol><li><p>提交代码到develop分支，观察是否部署到dev的命名空间中，注意，第一次部署，需要执行migrate操作：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code> $ kubectl <span class="token operator">-</span>n dev exec  myblog-9f9f7c8cd-k6tbj python3 manage<span class="token punctuation">.</span>py migrate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>配置hosts解析，测试使用<code>http://blog-dev.nohi.com/blog/index/</code>进行访问到develop分支最新版本</p></li><li><p>合并代码至master分支</p></li><li><p>在gitlab中创建tag，观察是否自动部署至test的命名空间中，且使用<code>myblog-test.nohi.com/blog/index/</code>可以访问到最新版本</p></li></ol><h6 id="实现打tag后自动部署" tabindex="-1"><a class="header-anchor" href="#实现打tag后自动部署" aria-hidden="true">#</a> 实现打tag后自动部署</h6><p>我们发现，打了tag以后，多分支流水线中可以识别到该tag，但是并不会自动部署该tag的代码。因此，我们来使用一个新的插件：Basic Branch Build Strategies Plugin</p><p>安装并配置多分支流水线，注意Build strategies 设置：</p><ul><li>Regular branches</li><li>Tags <ul><li>Ignore tags newer than 可以不用设置，不然会默认不自动构建新打的tag</li><li>Ignore tags older than</li></ul></li></ul><h6 id="优化镜像部署逻辑" tabindex="-1"><a class="header-anchor" href="#优化镜像部署逻辑" aria-hidden="true">#</a> 优化镜像部署逻辑</h6><p>针对部署到测试环境的代码，由于已经打了tag了，因此，我们期望构建出来的镜像地址可以直接使用代码的tag作为镜像的tag。</p><p>思路一：直接在Jenkinsfile调用<code>devops.docker</code>时传递tag名称</p><p>思路二：在shared-library中，根据<code>env.TAG_NAME</code>来判断当前是否是tag分支的构建，若TAG_NAME不为空，则可以在构建镜像时使用TAG_NAME作为镜像的tag</p><p>很明显我们更期望使用思路二的方式来实现，因此，需要调整如下逻辑：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>def docker<span class="token punctuation">(</span>String repo<span class="token punctuation">,</span> String tag<span class="token punctuation">,</span> String credentialsId<span class="token punctuation">,</span> String dockerfile=<span class="token string">&quot;Dockerfile&quot;</span><span class="token punctuation">,</span> String context=<span class="token string">&quot;.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    this<span class="token punctuation">.</span>repo = repo
    this<span class="token punctuation">.</span>tag = tag
    <span class="token keyword">if</span><span class="token punctuation">(</span>env<span class="token punctuation">.</span>TAG_NAME<span class="token punctuation">)</span><span class="token punctuation">{</span>
        this<span class="token punctuation">.</span>tag = env<span class="token punctuation">.</span>TAG_NAME
    <span class="token punctuation">}</span>
    this<span class="token punctuation">.</span>dockerfile = dockerfile
    this<span class="token punctuation">.</span>credentialsId = credentialsId
    this<span class="token punctuation">.</span>context = context
    this<span class="token punctuation">.</span>fullAddress = <span class="token string">&quot;\${this.repo}:\${this.tag}&quot;</span>
    this<span class="token punctuation">.</span>isLoggedIn = false
    this<span class="token punctuation">.</span>msg = new BuildMessage<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> this
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提交代码，并进行测试，观察是否使用tag作为镜像标签进行部署。</p><h5 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h5><p>Jenkins-shared-library的代码地址： https://gitee.com/agagin/jenkins-shared-library</p><p>目标：让devops流程更好用</p><ul><li>项目更简便的接入</li><li>devops流程更方便维护</li></ul><p>思路：把各项目中公用的逻辑，抽象成方法，放到独立的library项目中，在各项目中引入shared-library项目，调用library提供的方法。</p><ul><li>镜像构建、推送</li><li>k8s服务部署、监控</li><li>钉钉消息推送</li><li>代码扫描</li><li>robot集成测试</li></ul><p>为了兼容多环境的CICD，因此采用模板与数据分离的方式，项目中的定义模板，shared-library中实现模板替换。为了实现shared-library与各项目解耦，使用configmap来维护模板与真实数据的值，思路是约定大于配置。</p>`,21);function f(a,w){return o(),i("div",null,[r,n("ol",null,[d,n("li",null,[n("p",null,"约定：configmap的key值，拼接"+t(a.KEY)+"则为代码中需要替换的模板部分，configmap的该key对应的value，则为该模板要被替换的值的内容。比如：",1),k]),v]),m,n("ol",null,[b,n("li",null,[g,n("ul",null,[n("li",null,t(a.NAMESPACE),1),n("li",null,t(a.INGRESS_MYBLOG),1),n("li",null,t(a.IMAGE_URL),1)])]),y]),h])}const S=e(u,[["render",f],["__file","14_Docker_k8s教程-06sharedLibrary进行CICD流程的优化.html.vue"]]);export{S as default};
