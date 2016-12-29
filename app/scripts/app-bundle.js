define("app",["exports"],function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.App=function(){function e(){t(this,e)}return e.prototype.configureRouter=function(e,t){this.router=t,e.title="Teamcity radiator",e.map([{route:"failed/:baseUrl",name:"Faled Build Overview",moduleId:"view/failed-build-overview"},{route:"running/:baseUrl",name:"Running Build Overview",moduleId:"view/running-build-overview"}])},e}()}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(e,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function n(e){e.use.standardConfiguration().feature("resources"),u.default.debug&&e.use.developmentLogging(),u.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=n;var u=i(t);Promise.config({warnings:{wForgottenReturn:!1}})}),define("anticorruptionlayer/teamcity-build-adapter",["exports","../communicationlayer/http-client-router","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){var i={method:"GET",headers:new Headers({Accept:"application/json","X-Requested-With":"Fetch"})};return e.fetch(t,i).then(function(e){return e.json()}).then(function(e){return e.buildType.filter(function(e){return e.builds.build.length>0}).map(function(e){return{id:e.id,name:e.name,buildNumber:e.builds.build[0].number,status:e.builds.build[0].status,statusText:e.builds.build[0].statusText,drawAttention:!1}})})}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamcityBuildAdapter=void 0;var r,s;e.TeamcityBuildAdapter=(r=(0,i.inject)(t.HttpClientRouter),r(s=function(){function e(t){n(this,e),this.clientRouter=t}return e.prototype.getAllLatestFinishedBuilds=function(e){var t="http://"+e+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,t)},e.prototype.getAllLatestRunningBuilds=function(e){var t="http://"+e+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,t)},e}())||s)}),define("communicationlayer/http-client-router",["exports","aurelia-fetch-client","./teamcitystub/team-city-http-client-stub","aurelia-framework"],function(e,t,i,n){"use strict";function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.HttpClientRouter=void 0;var r,s;e.HttpClientRouter=(r=(0,n.inject)(t.HttpClient,i.TeamCityHttpClientStub),r(s=function(){function e(t,i){u(this,e),this.realHttpClient=t,this.teamCityHttpClientStub=i}return e.prototype.fetch=function(e,t){return e.includes("stub")?this.teamCityHttpClientStub.fetch(e):this.realHttpClient.fetch(e,t)},e}())||s)}),define("resources/index",["exports"],function(e){"use strict";function t(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=t}),define("view/failed-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.FailedBuildOverview=void 0;var u,r;e.FailedBuildOverview=(u=(0,i.inject)(t.BuildService),u(r=function(){function e(t){n(this,e),this.service=t}return e.prototype.activate=function(e){function t(e){var t=this;this.service.getAllFailedBuilds(e.baseUrl).then(function(e){t.builds=e})}t.bind(this)(e),setInterval(t.bind(this),3e4,e)},e}())||r)}),define("view/running-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.RunningBuildOverview=void 0;var u,r;e.RunningBuildOverview=(u=(0,i.inject)(t.BuildService),u(r=function(){function e(t){n(this,e),this.buildService=t}return e.prototype.activate=function(e){function t(e){var t=this;this.buildService.getAllLatestRunningBuilds(e.baseUrl).then(function(e){t.builds=e})}t.bind(this)(e),setInterval(t.bind(this),3e4,e)},e}())||r)}),define("communicationlayer/teamcitystub/team-city-http-client-stub",["exports","./team-city-latest-builds-response","./team-city-latest-running-builds-response"],function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.TeamCityHttpClientStub=void 0;var r=n(t),s=n(i);e.TeamCityHttpClientStub=function(){function e(){u(this,e)}return e.prototype.fetch=function(e){if(e.includes("running:false"))return Promise.resolve({json:function(){return r.default}});if(e.includes("running:true"))return Promise.resolve({json:function(){return s.default}});throw new Error("team city http client stub doesn't support "+e)},e}()}),define("communicationlayer/teamcitystub/team-city-latest-builds-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={buildType:[{id:"build_1_id",name:"build 1",builds:{build:[{number:"3.1.70.17327",status:"FAILURE",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_2_id",name:"build 2",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",builds:{build:[{number:"123",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_4_id",builds:{build:[{number:"3.1.54.17253",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_5_id",name:"same name as other build",builds:{build:[{number:"3.1.54.17287",status:"FAILURE",statusText:"Tests failed: 4 (1 new), passed: 31"}]}},{id:"build_6_id",name:"same name as other build",builds:{build:[{number:"1.2.54.17287",status:"FAILURE",statusText:"Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"}]}},{id:"build_7_id",name:"build 7",builds:{build:[{number:"3.5.54.17287",status:"FAILURE",statusText:"Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"}]}},{id:"build_8_id",name:"build 8",builds:{build:[{number:"3.5.87.17287",status:"SUCCESS",statusText:"Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"}]}},{id:"build_9_id",name:"build 9",builds:{build:[{number:"3.5.99.17287",status:"FAILURE",statusText:"Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"}]}},{id:"build_10_id",name:"build 10",builds:{build:[{number:"3.5.99.21",status:"FAILURE",statusText:"Tests failed: 10, passed: 25"}]}}]}}),define("communicationlayer/teamcitystub/team-city-latest-running-builds-response",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={buildType:[{id:"build_1_id",name:"build 1",builds:{build:[{number:"3.1.70.17328",status:"SUCCESS",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_25_id",name:"build 25",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",builds:{build:[{number:"120",status:"FAILURE",statusText:"Tests passed: 35"}]}},{name:"build 4",builds:{build:[{number:"3.1.54.17255",status:"FAILURE",statusText:"Tests passed: 35"}]}}]}}),define("domain/services/build-service",["exports","../../anticorruptionlayer/teamcity-build-adapter","aurelia-framework"],function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildService=void 0;var u,r;e.BuildService=(u=(0,i.inject)(t.TeamcityBuildAdapter),u(r=function(){function e(t){n(this,e),this.teamcityBuildAdapter=t}return e.prototype.getAllFailedBuilds=function(e){return Promise.all([this.teamcityBuildAdapter.getAllLatestFinishedBuilds(e),this.teamcityBuildAdapter.getAllLatestRunningBuilds(e)]).then(function(e){function t(){return localStorage.blackListFailedBuilds?JSON.parse(localStorage.blackListFailedBuilds):[]}function i(e){return!t().includes(e.id)}var n=e[0],u=e[1];return n.filter(function(e){return"FAILURE"===e.status}).filter(function(e){return i(e)}).map(function(e){function t(){function t(){return u.filter(function(t){return t.id===e.id})[0]}return void 0!==t()&&t().buildNumber>e.buildNumber}return e.drawAttention=t(),e})})},e.prototype.getAllLatestRunningBuilds=function(e){function t(){return localStorage.blacklistLatestRunningBuilds?JSON.parse(localStorage.blacklistLatestRunningBuilds):[]}function i(e){return!t().includes(e.id)}return this.teamcityBuildAdapter.getAllLatestRunningBuilds(e).then(function(e){return e.filter(function(e){return i(e)}).map(function(e){return e.drawAttention=!0,e})})},e}())||r)}),define("view/elements/build-overview",["exports","aurelia-framework"],function(e,t){"use strict";function i(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t,i,n,u){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),u&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(u):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}Object.defineProperty(e,"__esModule",{value:!0}),e.BuildOverview=void 0;var r,s;e.BuildOverview=(r=function(){function e(){n(this,e),i(this,"builds",s,this),this.showBlackList=!1}return e.prototype.getBuildStatusCssClass=function(e){if("SUCCESS"===e.status)return"alert-success";if("FAILURE"===e.status)return"alert-danger";throw new Error('The buildstatus "'+e.status+'" is invalid')},e.prototype.getDrawAttentionCssClass=function(e){if(e.drawAttention===!0)return"draw-attention";if(e.drawAttention===!1)return"";throw new Error('The drawAttention "'+e.drawAttention+'" is invalid')},e.prototype.startDrag=function(e){return this.showBlackList=!0,!0},e.prototype.endDrag=function(e){this.showBlackList=!1},e.prototype.preventEventPropagation=function(e){e.preventDefault()},e.prototype.drop=function(e){},e}(),s=u(r.prototype,"builds",[t.bindable],{enumerable:!0,initializer:null}),r)}),define("text!app.html",["module"],function(e){e.exports='<template>\n  <require from="css/custom.css"></require>\n  <router-view></router-view>\n</template>'}),define("text!css/custom.css",["module"],function(e){e.exports="@keyframes fadeIn { \n  from { opacity: 0; } \n}\n\n.draw-attention {\n    animation: fadeIn 1s infinite alternate;\n}"}),define("text!view/failed-build-overview.html",["module"],function(e){e.exports='<template>\n\t<require from="./elements/build-overview"></require>\n\t<build-overview builds.bind="builds"></build-overview>\n</template>'}),define("text!view/running-build-overview.html",["module"],function(e){e.exports='<template>\n\t<require from="./elements/build-overview"></require>\n\t<build-overview builds.bind="builds"></build-overview>\n</template>'}),define("text!view/elements/build-overview.html",["module"],function(e){e.exports='<template>\n    <div class="container">\n        <div class="row">\n            <div class="col-md-4 text-center" repeat.for="build of builds">\n                <div class="${getBuildStatusCssClass(build)} ${getDrawAttentionCssClass(build)} alert" role="alert " draggable="true" dragstart.delegate="startDrag($event)" dragend.delegate="endDrag($event)">\n                    <h1>${build.name}</h1>\n                    <p>${build.statusText}</p>\n                </div>\n            </div>\n        </div>\n        <div class="row" show.bind="showBlackList">\n            <div class="col-md-12 text-center alert alert-warning" drop.delegate="drop($event)" dragover.delegate="preventEventPropagation($event)">\n                <h1>Blacklist</h1>\n            </div>\n        </div>\n    </div>\n</template>'});