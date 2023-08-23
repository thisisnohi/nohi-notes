import{_ as a,p as s,q as n,a1 as e}from"./framework-449724a9.js";const i={},l=e(`<h1 id="git-hooks" tabindex="-1"><a class="header-anchor" href="#git-hooks" aria-hidden="true">#</a> git hooks</h1><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><ul><li>https://www.cnblogs.com/hpcpp/p/7380939.html</li><li>https://www.jianshu.com/p/5531a21afa68</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><ul><li><p>mac</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span>  <span class="token parameter variable">-p</span> <span class="token number">443</span>:443 <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-p</span> <span class="token number">222</span>:22 <span class="token parameter variable">--name</span> gitlab <span class="token parameter variable">--restart</span> always <span class="token parameter variable">-v</span> /home/gitlab/config:/etc/gitlab <span class="token parameter variable">-v</span> /home/gitlab/logs:/var/log/gitlab <span class="token parameter variable">-v</span> /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>linux</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d  -p 10443:443 -p 10080:10080 -p 10022:10022 --name gitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce

/home/gitlab/config:/etc/gitlab
/home/gitlab/logs:/var/log/gitlab
/home/gitlab/data:/var/opt/gitlab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p><strong>坑</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10080 访问：strict-origin-when-cross-origin
使用其他商品访问：http://10.0.0.210:82
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> hooks</h2><ul><li><p>参考：https://www.jianshu.com/p/5531a21afa68</p></li><li><p><code>vi /etc/gitlab/gitlab.rb</code></p></li><li><p><code>gitaly[&#39;custom_hooks_dir&#39;] = &quot;/var/opt/gitlab/gitaly/custom_hooks&quot;</code></p></li><li><p>Gitlab - project - setting - general setting 获取 projectid 这里是2</p></li><li><p>echo -n projectid | sha256sum 获取输出</p><ul><li>如： echo -n 2 | sha256sum</li><li>结果： d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35</li><li>路径目录 d4/73/d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35.git</li></ul></li><li><p>cd /var/opt/gitlab/git-data/repositories/@hashed/<code>d4/73/d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35.git</code></p></li><li><p>Customer_hooks/pre-receive.d/01.sh</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Get custom commit message format
while read OLD_REVISION NEW_REVISION REFNAME ; do
  echo [pre-receive] OLD_REVISION : \${OLD_REVISION}
  echo [pre-receive] NEW_REVISION : \${NEW_REVISION}
  echo [pre-receive] REFNAME      : \${REFNAME}

  export OLD_VALUE=\${OLD_REVISION}
  export NEW_VALUE=\${NEW_REVISION}
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>注释</p><ul><li>https://www.cnblogs.com/jiaoshou/p/11190619.html</li><li>标准注释</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>feat： 新增 feature
fix: 修复 bug
docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
refactor: 代码重构，没有加新功能或者修复 bug
perf: 优化相关，比如提升性能、体验
test: 测试用例，包括单元测试、集成测试等
chore: 改变构建流程、或者增加依赖库、工具等
revert: 回滚到上一个版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>注释脚本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">validate_ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment"># --- Arguments</span>
    <span class="token assign-left variable">oldrev</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse $1<span class="token variable">)</span></span>
    <span class="token assign-left variable">newrev</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse $2<span class="token variable">)</span></span>
    <span class="token assign-left variable">refname</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$3</span>&quot;</span>

    <span class="token assign-left variable">commitList</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">git</span> rev-list $oldrev<span class="token punctuation">..</span>$newrev<span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;****************&#39;</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">$commitList</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;****************&#39;</span>
    <span class="token assign-left variable">split</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token variable">$commitList</span><span class="token punctuation">)</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> target.txt
    <span class="token keyword">for</span> <span class="token for-or-select variable">s</span> <span class="token keyword">in</span> <span class="token variable">\${split<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
    <span class="token keyword">do</span>
    <span class="token comment">#echo $s</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$s</span> <span class="token operator">&gt;&gt;</span>./target.txt
        <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">git</span> cat-file commit $s <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;1,/^$/d&#39;</span><span class="token variable">\`</span></span>
        <span class="token builtin class-name">echo</span> COMMIT MSG:<span class="token variable">$msg</span>

    <span class="token keyword">done</span>
    <span class="token comment">#python3 scp.py</span>
    <span class="token comment">#cp target.txt /home/gitlab/target.txt</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>

<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$2</span>&quot;</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$3</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;11111&quot;</span>
    <span class="token assign-left variable">PAGER</span><span class="token operator">=</span> validate_ref <span class="token variable">$2</span> <span class="token variable">$3</span> <span class="token variable">$1</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;2222&quot;</span>
    <span class="token keyword">while</span> <span class="token builtin class-name">read</span> oldrev newrev refname
    <span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;before validate_ref oldrev:<span class="token variable">$oldrev</span>&quot;</span>
        validate_ref <span class="token variable">$oldrev</span> <span class="token variable">$newrev</span> <span class="token variable">$refname</span>
    <span class="token keyword">done</span>
<span class="token keyword">fi</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;before exit&quot;</span>
<span class="token builtin class-name">exit</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul>`,9),t=[l];function p(c,o){return s(),n("div",null,t)}const d=a(i,[["render",p],["__file","git-hooks.html.vue"]]);export{d as default};
