define("app",["exports"],function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.App=function(){function t(){e(this,t)}return t.prototype.configureRouter=function(t,e){this.router=e,t.title="Teamcity radiator",t.map([{route:"failed/:baseUrl",name:"Faled Build Overview",moduleId:"view/failed-build-overview"},{route:"running/:baseUrl",name:"Running Build Overview",moduleId:"view/running-build-overview"}])},t}()}),define("environment",["exports"],function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={debug:!1,testing:!1}}),define("main",["exports","./environment"],function(t,e){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function n(t){t.use.standardConfiguration().feature("resources"),u.default.debug&&t.use.developmentLogging(),u.default.testing&&t.use.plugin("aurelia-testing"),t.start().then(function(){return t.setRoot()})}Object.defineProperty(t,"__esModule",{value:!0}),t.configure=n;var u=i(e);Promise.config({warnings:{wForgottenReturn:!1}})}),define("anticorruptionlayer/teamcity-build-adapter",["exports","../communicationlayer/http-client-router","aurelia-framework"],function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){var i={method:"GET",headers:new Headers({Accept:"application/json","X-Requested-With":"Fetch"})};return t.fetch(e,i).then(function(t){return t.json()}).then(function(t){return t.buildType.filter(function(t){return t.builds.build.length>0}).map(function(t){return{id:t.id,name:t.name,buildNumber:t.builds.build[0].number,status:t.builds.build[0].status,statusText:t.builds.build[0].statusText,drawAttention:!1}})})}Object.defineProperty(t,"__esModule",{value:!0}),t.TeamcityBuildAdapter=void 0;var s,a;t.TeamcityBuildAdapter=(s=(0,i.inject)(e.HttpClientRouter),s(a=function(){function t(e){n(this,t),this.clientRouter=e}return t.prototype.getAllLatestFinishedBuilds=function(t){var e="http://"+t+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,e)},t.prototype.getAllLatestRunningBuilds=function(t){var e="http://"+t+"/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))";return u(this.clientRouter,e)},t}())||a)}),define("communicationlayer/http-client-router",["exports","aurelia-fetch-client","./teamcitystub/team-city-http-client-stub","aurelia-framework"],function(t,e,i,n){"use strict";function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.HttpClientRouter=void 0;var s,a;t.HttpClientRouter=(s=(0,n.inject)(e.HttpClient,i.TeamCityHttpClientStub),s(a=function(){function t(e,i){u(this,t),this.realHttpClient=e,this.teamCityHttpClientStub=i}return t.prototype.fetch=function(t,e){return t.includes("stub")?this.teamCityHttpClientStub.fetch(t):this.realHttpClient.fetch(t,e)},t}())||a)}),define("resources/index",["exports"],function(t){"use strict";function e(t){}Object.defineProperty(t,"__esModule",{value:!0}),t.configure=e}),define("view/failed-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.FailedBuildOverview=void 0;var u,s;t.FailedBuildOverview=(u=(0,i.inject)(e.BuildService),u(s=function(){function t(e){n(this,t),this.service=e,this.addToBlackListFailedBuilds=function(t){return e.addToBlackListFailedBuilds(t)},this.getBlackListFailedBuilds=function(){return e.getBlackListFailedBuilds()}}return t.prototype.activate=function(t){function e(t){var e=this;this.service.getAllFailedBuilds(t.baseUrl).then(function(t){e.builds=t})}e.bind(this)(t),setInterval(e.bind(this),3e4,t)},t}())||s)}),define("view/running-build-overview",["exports","../domain/services/build-service","aurelia-framework"],function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.RunningBuildOverview=void 0;var u,s;t.RunningBuildOverview=(u=(0,i.inject)(e.BuildService),u(s=function(){function t(e){n(this,t),this.buildService=e,this.addToBlacklistLatestRunningBuilds=function(t){return e.addToBlacklistLatestRunningBuilds(t)}}return t.prototype.activate=function(t){function e(t){var e=this;this.buildService.getAllLatestRunningBuilds(t.baseUrl).then(function(t){e.builds=t})}e.bind(this)(t),setInterval(e.bind(this),3e4,t)},t}())||s)}),define("communicationlayer/teamcitystub/team-city-http-client-stub",["exports","./team-city-latest-builds-response","./team-city-latest-running-builds-response"],function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TeamCityHttpClientStub=void 0;var s=n(e),a=n(i);t.TeamCityHttpClientStub=function(){function t(){u(this,t)}return t.prototype.fetch=function(t){if(t.includes("running:false"))return Promise.resolve({json:function(){return s.default}});if(t.includes("running:true"))return Promise.resolve({json:function(){return a.default}});throw new Error("team city http client stub doesn't support "+t)},t}()}),define("communicationlayer/teamcitystub/team-city-latest-builds-response",["exports"],function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={buildType:[{id:"build_1_id",name:"build 1",builds:{build:[{number:"3.1.70.17327",status:"FAILURE",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_2_id",name:"build 2",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",builds:{build:[{number:"123",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_4_id",builds:{build:[{number:"3.1.54.17253",status:"SUCCESS",statusText:"Tests passed: 35"}]}},{id:"build_5_id",name:"same name as other build",builds:{build:[{number:"3.1.54.17287",status:"FAILURE",statusText:"Tests failed: 4 (1 new), passed: 31"}]}},{id:"build_6_id",name:"same name as other build",builds:{build:[{number:"1.2.54.17287",status:"FAILURE",statusText:"Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"}]}},{id:"build_7_id",name:"build 7",builds:{build:[{number:"3.5.54.17287",status:"FAILURE",statusText:"Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"}]}},{id:"build_8_id",name:"build 8",builds:{build:[{number:"3.5.87.17287",status:"SUCCESS",statusText:"Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"}]}},{id:"build_9_id",name:"build 9",builds:{build:[{number:"3.5.99.17287",status:"FAILURE",statusText:"Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"}]}},{id:"build_10_id",name:"build 10",builds:{build:[{number:"3.5.99.21",status:"FAILURE",statusText:"Tests failed: 10, passed: 25"}]}}]}}),define("communicationlayer/teamcitystub/team-city-latest-running-builds-response",["exports"],function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={buildType:[{id:"build_1_id",name:"build 1",builds:{build:[{number:"3.1.70.17328",status:"SUCCESS",statusText:"Tests passed: 198, ignored: 9"}]}},{id:"build_25_id",name:"build 25",builds:{build:[{number:"3.1.6965.17318",status:"SUCCESS",statusText:"Tests passed: 2391, ignored: 6"}]}},{id:"build_3_id",name:"build 3",builds:{build:[{number:"120",status:"FAILURE",statusText:"Tests passed: 35"}]}},{id:"build_4_id",name:"build 4",builds:{build:[{number:"3.1.54.17255",status:"FAILURE",statusText:"Tests passed: 35"}]}}]}}),define("domain/services/build-service",["exports","../../anticorruptionlayer/teamcity-build-adapter","aurelia-framework"],function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.BuildService=void 0;var u,s;t.BuildService=(u=(0,i.inject)(e.TeamcityBuildAdapter),u(s=function(){function t(e){n(this,t),this.teamcityBuildAdapter=e}return t.prototype.getAllFailedBuilds=function(t){var e=this;return Promise.all([this.teamcityBuildAdapter.getAllLatestFinishedBuilds(t),this.teamcityBuildAdapter.getAllLatestRunningBuilds(t)]).then(function(t){function i(t){return!this.getBlackListFailedBuilds().includes(t.id)}var n=t[0],u=t[1];return n.filter(function(t){return"FAILURE"===t.status}).filter(function(t){return i.bind(e)(t)}).map(function(t){function e(){function e(){return u.filter(function(e){return e.id===t.id})[0]}return void 0!==e()&&e().buildNumber>t.buildNumber}return t.drawAttention=e(),t})})},t.prototype.getAllLatestRunningBuilds=function(t){function e(t){return!this.getBlacklistLatestRunningBuilds().includes(t.id)}var i=this;return this.teamcityBuildAdapter.getAllLatestRunningBuilds(t).then(function(t){return t.filter(function(t){return e.bind(i)(t)}).map(function(t){return t.drawAttention=!0,t})})},t.prototype.addToBlackListFailedBuilds=function(t){localStorage.blackListFailedBuilds=JSON.stringify(this.getBlackListFailedBuilds().concat(t))},t.prototype.addToBlacklistLatestRunningBuilds=function(t){localStorage.blacklistLatestRunningBuilds=JSON.stringify(this.getBlacklistLatestRunningBuilds().concat(t))},t.prototype.getBlackListFailedBuilds=function(t){return localStorage.blackListFailedBuilds?JSON.parse(localStorage.blackListFailedBuilds):[]},t.prototype.getBlacklistLatestRunningBuilds=function(t){return localStorage.blacklistLatestRunningBuilds?JSON.parse(localStorage.blacklistLatestRunningBuilds):[]},t}())||s)}),define("view/elements/build-overview",["exports","aurelia-framework"],function(t,e){"use strict";function i(t,e,i,n){i&&Object.defineProperty(t,e,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e,i,n,u){var s={};return Object.keys(n).forEach(function(t){s[t]=n[t]}),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=i.slice().reverse().reduce(function(i,n){return n(t,e,i)||i},s),u&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(u):void 0,s.initializer=void 0),void 0===s.initializer&&(Object.defineProperty(t,e,s),s=null),s}Object.defineProperty(t,"__esModule",{value:!0}),t.BuildOverview=void 0;var s,a,r,l;t.BuildOverview=(s=function(){function t(){n(this,t),i(this,"builds",a,this),i(this,"addToBlacklist",r,this),i(this,"getBlacklist",l,this),this.showBlackList=!1}return t.prototype.getBuildStatusCssClass=function(t){if("SUCCESS"===t.status)return"alert-success";if("FAILURE"===t.status)return"alert-danger";throw new Error('The buildstatus "'+t.status+'" is invalid')},t.prototype.getDrawAttentionCssClass=function(t){if(t.drawAttention===!0)return"draw-attention";if(t.drawAttention===!1)return"";throw new Error('The drawAttention "'+t.drawAttention+'" is invalid')},t.prototype.startDrag=function(t){return this.showBlackList=!0,t.dataTransfer.setData("id",t.target.id),!0},t.prototype.endDrag=function(t){this.showBlackList=!1},t.prototype.preventEventPropagation=function(t){t.preventDefault()},t.prototype.drop=function(t){var e=this;this.addToBlacklist(t.dataTransfer.getData("id")),this.builds=this.builds.filter(function(t){return!e.getBlacklist().includes(t.id)})},t}(),a=u(s.prototype,"builds",[e.bindable],{enumerable:!0,initializer:null}),r=u(s.prototype,"addToBlacklist",[e.bindable],{enumerable:!0,initializer:null}),l=u(s.prototype,"getBlacklist",[e.bindable],{enumerable:!0,initializer:null}),s)}),define("text!app.html",["module"],function(t){t.exports='<template>\n  <require from="css/custom.css"></require>\n  <router-view></router-view>\n</template>'}),define("text!css/custom.css",["module"],function(t){t.exports="@keyframes fadeIn { \n  from { opacity: 0; } \n}\n\n.draw-attention {\n    animation: fadeIn 1s infinite alternate;\n}"}),define("text!view/failed-build-overview.html",["module"],function(t){t.exports='<template>\n\t<require from="./elements/build-overview"></require>\n\t<build-overview builds.bind="builds" add-to-blacklist.bind="addToBlackListFailedBuilds" get-blacklist.bind="getBlackListFailedBuilds"></build-overview>\n</template>'}),define("text!view/running-build-overview.html",["module"],function(t){t.exports='<template>\n\t<require from="./elements/build-overview"></require>\n\t<build-overview builds.bind="builds" add-to-blacklist.bind="addToBlacklistLatestRunningBuilds"></build-overview>\n</template>'}),define("text!view/elements/build-overview.html",["module"],function(t){t.exports='<template>\n    <div class="container">\n        <div class="row">\n            <div class="col-md-4 text-center" repeat.for="build of builds">\n                <div id ="${build.id}" class="${getBuildStatusCssClass(build)} ${getDrawAttentionCssClass(build)} alert" role="alert " draggable="true" dragstart.delegate="startDrag($event)" dragend.delegate="endDrag($event)">\n                    <h1>${build.name}</h1>\n                    <p>${build.statusText}</p>\n                </div>\n            </div>\n        </div>\n        <div class="row" show.bind="showBlackList">\n            <div class="col-md-12 text-center alert alert-warning" drop.delegate="drop($event)" dragover.delegate="preventEventPropagation($event)">\n                <h1>Blacklist</h1>\n            </div>\n        </div>\n    </div>\n</template>'});