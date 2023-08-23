import{_ as e,p as i,q as r,a1 as n}from"./framework-449724a9.js";const s={},t=n(`<h1 id="mac" tabindex="-1"><a class="header-anchor" href="#mac" aria-hidden="true">#</a> MAC</h1><h2 id="brew" tabindex="-1"><a class="header-anchor" href="#brew" aria-hidden="true">#</a> brew</h2><blockquote><p>参考：https://www.cnblogs.com/daodaotest/p/12635957.html</p></blockquote><p>查看当前源：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># brew.git镜像源
git -C &quot;$(brew --repo)&quot; remote -v
# homebrew-core.git镜像源
git -C &quot;$(brew --repo homebrew/core)&quot; remote -v
# homebrew-cask.git镜像源
git -C &quot;$(brew --repo homebrew/cask)&quot; remote -v 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>阿里：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看 brew.git 当前源
$ cd &quot;$(brew --repo)&quot; &amp;&amp; git remote -v
origin	https://github.com/Homebrew/brew.git (fetch)
origin	https://github.com/Homebrew/brew.git (push)

# 查看 homebrew-core.git 当前源
$ cd &quot;$(brew --repo homebrew/core)&quot; &amp;&amp; git remote -v
origin	https://github.com/Homebrew/homebrew-core.git (fetch)
origin	https://github.com/Homebrew/homebrew-core.git (push)

# 修改 brew.git 为阿里源
$ git -C &quot;$(brew --repo)&quot; remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 修改 homebrew-core.git 为阿里源
$ git -C &quot;$(brew --repo homebrew/core)&quot; remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# zsh 替换 brew bintray 镜像
$ echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles&#39; &gt;&gt; ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles&#39; &gt;&gt; ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>清华</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 替换各个源
$ git -C &quot;$(brew --repo)&quot; remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
$ git -C &quot;$(brew --repo homebrew/core)&quot; remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
$ git -C &quot;$(brew --repo homebrew/cask)&quot; remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

# zsh 替换 brew bintray 镜像
$ echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles&#39; &gt;&gt; ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles&#39; &gt;&gt; ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>中科大</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 替换各个源
$ git -C &quot;$(brew --repo)&quot; remote set-url origin https://mirrors.ustc.edu.cn/brew.git
$ git -C &quot;$(brew --repo homebrew/core)&quot; remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
$ git -C &quot;$(brew --repo homebrew/cask)&quot; remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

# zsh 替换 brew bintray 镜像
$ echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles&#39; &gt;&gt; ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles&#39; &gt;&gt; ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 重置 brew.git 为官方源
$ git -C &quot;$(brew --repo)&quot; remote set-url origin https://github.com/Homebrew/brew.git

# 重置 homebrew-core.git 为官方源
$ git -C &quot;$(brew --repo homebrew/core)&quot; remote set-url origin https://github.com/Homebrew/homebrew-core.git

# 重置 homebrew-cask.git 为官方源
$ git -C &quot;$(brew --repo homebrew/cask)&quot; remote set-url origin https://github.com/Homebrew/homebrew-cask

# zsh 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
$ vi ~/.zshrc
# export HOMEBREW_BOTTLE_DOMAIN=xxxxxxxxx

# bash 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
$ vi ~/.bash_profile
# export HOMEBREW_BOTTLE_DOMAIN=xxxxxxxxx

# 刷新源
$ brew update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>腾讯</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>替换brew.git:
cd &quot;$(brew --repo)&quot;
git remote set-url origin https://mirrors.cloud.tencent.com/homebrew/brew.git

替换homebrew-core.git:
cd &quot;$(brew --repo)/Library/Taps/homebrew/homebrew-core&quot;
git remote set-url origin https://mirrors.cloud.tencent.com/homebrew/homebrew-core.git

-- bash
echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.cloud.tencent.com/homebrew-bottles&#39; &gt;&gt; ~/.bash_profile
source ~/.bash_profile
-- zsh
echo &#39;export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.cloud.tencent.com/homebrew-bottles&#39; &gt;&gt; ~/.zshrc
source ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,6),l=[t];function d(o,c){return i(),r("div",null,l)}const b=e(s,[["render",d],["__file","MAC.html.vue"]]);export{b as default};
