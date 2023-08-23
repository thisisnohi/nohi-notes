import{_ as e,p as i,q as l,a1 as n}from"./framework-449724a9.js";const s={},a=n(`<h1 id="maven" tabindex="-1"><a class="header-anchor" href="#maven" aria-hidden="true">#</a> MAVEN</h1><h2 id="跳过测试类" tabindex="-1"><a class="header-anchor" href="#跳过测试类" aria-hidden="true">#</a> 跳过测试类</h2><ul><li>-DskipTests，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。</li><li>-Dmaven.test.skip=true，不执行测试用例，也不编译测试用例类。</li></ul><h2 id="生命周期-lifecycle" tabindex="-1"><a class="header-anchor" href="#生命周期-lifecycle" aria-hidden="true">#</a> 生命周期 lifecycle</h2><ul><li><p>default</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>validate
initialize
generate-sources
process-sources
generate-resources
process-resources
compile
process-classes
generate-test-sources
process-test-sources
generate-test-resources
process-test-resources
test-compile
process-test-classes
test
prepare-package
package
pre-integration-test
integration-test
post-integration-test
verify
install
deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>clean</p><ul><li>pre-clean</li><li>clean （注意这个clean不是lifecycle而是phase）</li><li>post-clean</li></ul></li></ul><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> install</h2><p>mvn install:install-file -Dfile=/Users/nohi/Downloads/dingtalk-sdk-java/taobao-sdk-java-auto_1479188381469-20210101.jar -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=12.2.0.1 -Dpackaging=jar</p><p>-- DgroupId和DartifactId构成了该jar包在pom.xml的坐标， 对应依赖的DgroupId和DartifactId -- Dfile表示需要上传的jar包的绝对路径 -- Dpackaging 为安装文件的种类</p><h2 id="仓库配置" tabindex="-1"><a class="header-anchor" href="#仓库配置" aria-hidden="true">#</a> 仓库配置</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mirrorOf=“*”  //刚才经过，mirror一切，你配置的repository不起作用了
mirrorOf=my-repo-id //镜像my-repo-id，你配置的my-repo-id仓库不起作用了
mirrorOf=*,!my-repo-id  //!表示非运算，排除你配置的my-repo-id仓库，其他仓库都被镜像了。就是请求下载my-repo-id的仓库的jar不使用mirror的url下载，其他都是用mirror配置的url下载
mirrorOf=external:*  //如果本地库存在就用本地库的，如果本地没有所有下载就用mirror配置的url下载
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>apache-maven的settings.xml不做任何配置时是有默认的仓库的，这个仓库就是central仓库，默认值是https://repo.maven.apache.org/maven2/，我们可以配置mirrorOf=central只镜像默认的central仓库</li><li>如果你只配置了mirrorOf=”my-repo-id“没有配置central或*，那么请求maven会判断，首先在默认的central仓库https://repo.maven.apache.org/maven2/找依赖，如果找不到就去my-repo-id对应的仓库找，遍历所有仓库后找不到就报错。</li></ul><h3 id="多仓库配置" tabindex="-1"><a class="header-anchor" href="#多仓库配置" aria-hidden="true">#</a> 多仓库配置</h3><blockquote><p>参见：https://www.cnblogs.com/gentlescholar/p/15049090.html</p></blockquote><p>profiles节点下配置多个profile，而且配置之后要激活</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;activeProfiles&gt;
    &lt;activeProfile&gt;aliyun&lt;/activeProfile&gt;
    &lt;activeProfile&gt;maven-central&lt;/activeProfile&gt;
&lt;/activeProfiles&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>pom.xml maven.settings.xml</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  &lt;profiles&gt;
     &lt;profile&gt;
        &lt;id&gt;aliyun&lt;/id&gt;
        &lt;repositories&gt;
            &lt;repository&gt;
                &lt;id&gt;aliyun&lt;/id&gt;
                &lt;url&gt;https://maven.aliyun.com/repository/public/&lt;/url&gt;
                &lt;releases&gt;
                    &lt;enabled&gt;true&lt;/enabled&gt;
                &lt;/releases&gt;
                &lt;snapshots&gt;
                    &lt;enabled&gt;true&lt;/enabled&gt;
                    &lt;updatePolicy&gt;always&lt;/updatePolicy&gt;
                &lt;/snapshots&gt;
            &lt;/repository&gt;
        &lt;/repositories&gt;
    &lt;/profile&gt;
    &lt;profile&gt;
        &lt;id&gt;maven-central&lt;/id&gt;
        &lt;repositories&gt;
            &lt;repository&gt;
                &lt;id&gt;maven-central&lt;/id&gt;
                &lt;url&gt;https://repo.maven.apache.org/maven2/&lt;/url&gt;
                &lt;releases&gt;
                    &lt;enabled&gt;true&lt;/enabled&gt;
                &lt;/releases&gt;
                &lt;snapshots&gt;
                    &lt;enabled&gt;true&lt;/enabled&gt;
                    &lt;updatePolicy&gt;always&lt;/updatePolicy&gt;
                &lt;/snapshots&gt;
            &lt;/repository&gt;
        &lt;/repositories&gt;
    &lt;/profile&gt;
  &lt;/profiles&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>idea 勾选对应profile</li><li>maven命令：mvn -Paliyun</li></ul><h2 id="项目中配置镜像" tabindex="-1"><a class="header-anchor" href="#项目中配置镜像" aria-hidden="true">#</a> 项目中配置镜像</h2><ul><li><p>项目中pom.xml</p><p>这里的id就是mirrorOf要使用的ID。</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- 特殊maven仓库 --&gt;
&lt;repositories&gt;
    &lt;repository&gt;
        &lt;id&gt;central-repo1&lt;/id&gt;
        &lt;name&gt;Maven Repository Switchboard&lt;/name&gt;
        &lt;url&gt;http://repo1.maven.org/maven2/&lt;/url&gt;
        &lt;layout&gt;default&lt;/layout&gt;
        &lt;releases&gt;
            &lt;enabled&gt;true&lt;/enabled&gt;
        &lt;/releases&gt;
    &lt;/repository&gt;
&lt;/repositories&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),t=[a];function r(d,v){return i(),l("div",null,t)}const u=e(s,[["render",r],["__file","mvn.html.vue"]]);export{u as default};
