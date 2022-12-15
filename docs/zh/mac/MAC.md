# MAC



## brew

> 参考：https://www.cnblogs.com/daodaotest/p/12635957.html

查看当前源：

```
# brew.git镜像源
git -C "$(brew --repo)" remote -v
# homebrew-core.git镜像源
git -C "$(brew --repo homebrew/core)" remote -v
# homebrew-cask.git镜像源
git -C "$(brew --repo homebrew/cask)" remote -v 
```



* 阿里：

  ```
  # 查看 brew.git 当前源
  $ cd "$(brew --repo)" && git remote -v
  origin	https://github.com/Homebrew/brew.git (fetch)
  origin	https://github.com/Homebrew/brew.git (push)
  
  # 查看 homebrew-core.git 当前源
  $ cd "$(brew --repo homebrew/core)" && git remote -v
  origin	https://github.com/Homebrew/homebrew-core.git (fetch)
  origin	https://github.com/Homebrew/homebrew-core.git (push)
  
  # 修改 brew.git 为阿里源
  $ git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
  
  # 修改 homebrew-core.git 为阿里源
  $ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
  
  # zsh 替换 brew bintray 镜像
  $ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
  $ source ~/.zshrc
  
  # bash 替换 brew bintray 镜像
  $ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
  $ source ~/.bash_profile
  
  # 刷新源
  $ brew update
  ```

* 清华

  ```
  # 替换各个源
  $ git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
  $ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
  $ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git
  
  # zsh 替换 brew bintray 镜像
  $ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.zshrc
  $ source ~/.zshrc
  
  # bash 替换 brew bintray 镜像
  $ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
  $ source ~/.bash_profile
  
  # 刷新源
  $ brew update
  ```

* 中科大

  ```
  # 替换各个源
  $ git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
  $ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
  $ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
  
  # zsh 替换 brew bintray 镜像
  $ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
  $ source ~/.zshrc
  
  # bash 替换 brew bintray 镜像
  $ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
  $ source ~/.bash_profile
  
  # 刷新源
  $ brew update
  ```

* 重置

  ```
  # 重置 brew.git 为官方源
  $ git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git
  
  # 重置 homebrew-core.git 为官方源
  $ git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
  
  # 重置 homebrew-cask.git 为官方源
  $ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask
  
  # zsh 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
  $ vi ~/.zshrc
  # export HOMEBREW_BOTTLE_DOMAIN=xxxxxxxxx
  
  # bash 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
  $ vi ~/.bash_profile
  # export HOMEBREW_BOTTLE_DOMAIN=xxxxxxxxx
  
  # 刷新源
  $ brew update
  ```

* 腾讯

  ```
  替换brew.git:
  cd "$(brew --repo)"
  git remote set-url origin https://mirrors.cloud.tencent.com/homebrew/brew.git
  
  替换homebrew-core.git:
  cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
  git remote set-url origin https://mirrors.cloud.tencent.com/homebrew/homebrew-core.git
  
  -- bash
  echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.cloud.tencent.com/homebrew-bottles' >> ~/.bash_profile
  source ~/.bash_profile
  -- zsh
  echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.cloud.tencent.com/homebrew-bottles' >> ~/.zshrc
  source ~/.zshrc
  ```

  