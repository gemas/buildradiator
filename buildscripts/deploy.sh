#!/bin/bash

echo "New deploy\n"

au build --env prod

cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "travis-ci"
git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/robisrob/buildradiator gh-pages

mkdir -p gh-pages/app/scripts
cp $HOME/build/robisrob/buildradiator/index.html ./gh-pages/app/index.html
cp $HOME/build/robisrob/buildradiator/scripts/app-bundle.js ./gh-pages/app/scripts/app-bundle.js
cp $HOME/build/robisrob/buildradiator/scripts/vendor-bundle.js ./gh-pages/app/scripts/vendor-bundle.js
git add -A
git commit -m "new deploy: $TRAVIS_BUILD_NUMBER"
git push 
