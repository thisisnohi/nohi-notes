@echo off
yarn build && cd nohi-notes && git init && git add -A && git commit -m 'deploy' && git push -f git@github.com:thisisnohi/nohi-notes.git master:gh-pages
