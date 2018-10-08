# NOHI Notes
[![aaa](https://img.shields.io/badge/thisisnohi-test__git-brightgreen.svg)](http://github.com/thisisnohi)

https://thisisnohi.github.io/nohi-notes
## 利用vuePress制作个人笔记

## Development

> Please make sure your version of Node.js is greater than 8.

``` bash
yarn
yarn dev  # serves VuePress' own docs with itself
yarn test # make sure your code change pass the test
```

## Deploy
```
yarn build 
cd nohi-notes (config.js中的对应的dest)
注：.gitignore忽略dest对应目录,dest对应目录push到master/gh-pages
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io push到master
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO> push到gh-pages
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

https://thisisnohi.github.io/nohi-notes/ 最后一定要/结尾
```
