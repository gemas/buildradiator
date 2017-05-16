[![Build Status](https://travis-ci.org/robisrob/buildradiator.svg?branch=master)](https://travis-ci.org/robisrob/buildradiator)

# buildradiator

## Getting started

Make sure you have [nodejs](https://nodejs.org/) installed. 
Open up a shell and type the following commands:

```shell
git clone https://github.com/robisrob/buildradiator.git
cd buildradiator
npm install
npm start
```

Open http://localhost:9000/#/stub (you can replace stub with the url of your TeamCity server)

## Tests

If you want to run the tests like they run on travis, make sure you have [Firefox](https://www.mozilla.org/en-US/firefox/products/) installed.  
Then open up a shell and type the following command:

```shell
npm test
```

If you want to watch the tests, make sure you have [Chrome](https://www.google.com/chrome) installed.  
Then open up a shell and type the following command:

```shell
npm run test:watch
```
## Deployment
To deploy the application you must do a build and copy the generated files to a webserver:
```shell
au build --env prod
```

See the [following script](buildscripts/deploy.sh) to see what steps are nessary to deploy to github pages. This script is executed automatically by Travis when there is a commit and all the tests are green. To make this work Travis must be configured with an environment variable GH_PAGES that contains a token from github.
