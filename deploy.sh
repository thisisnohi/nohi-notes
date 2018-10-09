#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd nohi-notes

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:thisisnohi/nohi-notes.git master:gh-pages
