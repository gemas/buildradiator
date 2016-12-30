define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Teamcity radiator';
      config.map([{ route: 'failed/:baseUrl', name: 'Faled Build Overview', moduleId: 'view/failed-build-overview' }, { route: 'running/:baseUrl', name: 'Running Build Overview', moduleId: 'view/running-build-overview' }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('anticorruptionlayer/teamcity-build-adapter',['exports', '../communicationlayer/http-client-router', 'aurelia-framework'], function (exports, _httpClientRouter, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TeamcityBuildAdapter = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function fetchBuildArray(clientRouter, url) {
    var init = {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      })
    };

    return clientRouter.fetch(url, init).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      return jsonResponse.buildType.filter(function (buildTypeElement) {
        return buildTypeElement.builds.build.length > 0;
      }).map(function (buildTypeElement) {
        return {
          "id": buildTypeElement.id,
          "name": buildTypeElement.name,
          "buildNumber": buildTypeElement.builds.build[0].number,
          "status": buildTypeElement.builds.build[0].status,
          "statusText": buildTypeElement.builds.build[0].statusText,
          "drawAttention": false
        };
      });
    });
  }

  var TeamcityBuildAdapter = exports.TeamcityBuildAdapter = (_dec = (0, _aureliaFramework.inject)(_httpClientRouter.HttpClientRouter), _dec(_class = function () {
    function TeamcityBuildAdapter(clientRouter) {
      _classCallCheck(this, TeamcityBuildAdapter);

      this.clientRouter = clientRouter;
    }

    TeamcityBuildAdapter.prototype.getAllLatestFinishedBuilds = function getAllLatestFinishedBuilds(baseUrl) {
      var url = 'http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';
      return fetchBuildArray(this.clientRouter, url);
    };

    TeamcityBuildAdapter.prototype.getAllLatestRunningBuilds = function getAllLatestRunningBuilds(baseUrl) {
      var url = 'http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))';
      return fetchBuildArray(this.clientRouter, url);
    };

    return TeamcityBuildAdapter;
  }()) || _class);
});
define('communicationlayer/http-client-router',['exports', 'aurelia-fetch-client', './teamcitystub/team-city-http-client-stub', 'aurelia-framework'], function (exports, _aureliaFetchClient, _teamCityHttpClientStub, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.HttpClientRouter = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var HttpClientRouter = exports.HttpClientRouter = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _teamCityHttpClientStub.TeamCityHttpClientStub), _dec(_class = function () {
        function HttpClientRouter(realHttpClient, teamCityHttpClientStub) {
            _classCallCheck(this, HttpClientRouter);

            this.realHttpClient = realHttpClient;
            this.teamCityHttpClientStub = teamCityHttpClientStub;
        }

        HttpClientRouter.prototype.fetch = function fetch(url, init) {
            return url.includes('stub') ? this.teamCityHttpClientStub.fetch(url) : this.realHttpClient.fetch(url, init);
        };

        return HttpClientRouter;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('view/failed-build-overview',['exports', '../domain/services/build-service', 'aurelia-framework'], function (exports, _buildService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FailedBuildOverview = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FailedBuildOverview = exports.FailedBuildOverview = (_dec = (0, _aureliaFramework.inject)(_buildService.BuildService), _dec(_class = function () {
    function FailedBuildOverview(service) {
      _classCallCheck(this, FailedBuildOverview);

      this.service = service;
      this.addToBlackListFailedBuilds = function (buildId) {
        return service.addToBlackListFailedBuilds(buildId);
      };
      this.getBlackListFailedBuilds = function () {
        return service.getBlackListFailedBuilds();
      };
    }

    FailedBuildOverview.prototype.activate = function activate(params) {
      function setAllFailedBuilds(params) {
        var _this = this;

        this.service.getAllFailedBuilds(params.baseUrl).then(function (builds) {
          _this.builds = builds;
        });
      }

      setAllFailedBuilds.bind(this)(params);
      setInterval(setAllFailedBuilds.bind(this), 30000, params);
    };

    return FailedBuildOverview;
  }()) || _class);
});
define('view/running-build-overview',['exports', '../domain/services/build-service', 'aurelia-framework'], function (exports, _buildService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RunningBuildOverview = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var RunningBuildOverview = exports.RunningBuildOverview = (_dec = (0, _aureliaFramework.inject)(_buildService.BuildService), _dec(_class = function () {
    function RunningBuildOverview(buildService) {
      _classCallCheck(this, RunningBuildOverview);

      this.buildService = buildService;
      this.addToBlacklistLatestRunningBuilds = function (buildId) {
        return buildService.addToBlacklistLatestRunningBuilds(buildId);
      };
    }

    RunningBuildOverview.prototype.activate = function activate(params) {
      function setAllRunningBuilds(params) {
        var _this = this;

        this.buildService.getAllLatestRunningBuilds(params.baseUrl).then(function (builds) {
          _this.builds = builds;
        });
      }

      setAllRunningBuilds.bind(this)(params);
      setInterval(setAllRunningBuilds.bind(this), 30000, params);
    };

    return RunningBuildOverview;
  }()) || _class);
});
define('communicationlayer/teamcitystub/team-city-http-client-stub',['exports', './team-city-latest-builds-response', './team-city-latest-running-builds-response'], function (exports, _teamCityLatestBuildsResponse, _teamCityLatestRunningBuildsResponse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TeamCityHttpClientStub = undefined;

  var _teamCityLatestBuildsResponse2 = _interopRequireDefault(_teamCityLatestBuildsResponse);

  var _teamCityLatestRunningBuildsResponse2 = _interopRequireDefault(_teamCityLatestRunningBuildsResponse);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TeamCityHttpClientStub = exports.TeamCityHttpClientStub = function () {
    function TeamCityHttpClientStub() {
      _classCallCheck(this, TeamCityHttpClientStub);
    }

    TeamCityHttpClientStub.prototype.fetch = function fetch(url) {
      if (url.includes('running:false')) {
        return Promise.resolve({ json: function json() {
            return _teamCityLatestBuildsResponse2.default;
          } });
      }
      if (url.includes('running:true')) {
        return Promise.resolve({ json: function json() {
            return _teamCityLatestRunningBuildsResponse2.default;
          } });
      }
      throw new Error("team city http client stub doesn't support " + url);
    };

    return TeamCityHttpClientStub;
  }();

  ;
});
define('communicationlayer/teamcitystub/team-city-latest-builds-response',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "buildType": [{
      "id": "build_1_id",
      "name": "build 1",
      "builds": {
        "build": [{
          "number": "3.1.70.17327",
          "status": "FAILURE",
          "statusText": "Tests passed: 198, ignored: 9"
        }]
      }
    }, {
      "id": "build_2_id",
      "name": "build 2",
      "builds": {
        "build": [{
          "number": "3.1.6965.17318",
          "status": "SUCCESS",
          "statusText": "Tests passed: 2391, ignored: 6"
        }]
      }
    }, {
      "id": "build_3_id",
      "name": "build 3",
      "builds": {
        "build": [{
          "number": "123",
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "id": "build_4_id",
      "builds": {
        "build": [{
          "number": "3.1.54.17253",
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "id": "build_5_id",
      "name": "same name as other build",
      "builds": {
        "build": [{
          "number": "3.1.54.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 4 (1 new), passed: 31"
        }]
      }
    }, {
      "id": "build_6_id",
      "name": "same name as other build",
      "builds": {
        "build": [{
          "number": "1.2.54.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"
        }]
      }
    }, {
      "id": "build_7_id",
      "name": "build 7",
      "builds": {
        "build": [{
          "number": "3.5.54.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"
        }]
      }
    }, {
      "id": "build_8_id",
      "name": "build 8",
      "builds": {
        "build": [{
          "number": "3.5.87.17287",
          "status": "SUCCESS",
          "statusText": "Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"
        }]
      }
    }, {
      "id": "build_9_id",
      "name": "build 9",
      "builds": {
        "build": [{
          "number": "3.5.99.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"
        }]
      }
    }, {
      "id": "build_10_id",
      "name": "build 10",
      "builds": {
        "build": [{
          "number": "3.5.99.21",
          "status": "FAILURE",
          "statusText": "Tests failed: 10, passed: 25"
        }]
      }
    }]
  };
});
define('communicationlayer/teamcitystub/team-city-latest-running-builds-response',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "buildType": [{
      "id": "build_1_id",
      "name": "build 1",
      "builds": {
        "build": [{
          "number": "3.1.70.17328",
          "status": "SUCCESS",
          "statusText": "Tests passed: 198, ignored: 9"
        }]
      }
    }, {
      "id": "build_25_id",
      "name": "build 25",
      "builds": {
        "build": [{
          "number": "3.1.6965.17318",
          "status": "SUCCESS",
          "statusText": "Tests passed: 2391, ignored: 6"
        }]
      }
    }, {
      "id": "build_3_id",
      "name": "build 3",
      "builds": {
        "build": [{
          "number": "120",
          "status": "FAILURE",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "id": "build_4_id",
      "name": "build 4",
      "builds": {
        "build": [{
          "number": "3.1.54.17255",
          "status": "FAILURE",
          "statusText": "Tests passed: 35"
        }]
      }
    }]
  };
});
define('domain/services/build-service',['exports', '../../anticorruptionlayer/teamcity-build-adapter', 'aurelia-framework'], function (exports, _teamcityBuildAdapter, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BuildService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var BuildService = exports.BuildService = (_dec = (0, _aureliaFramework.inject)(_teamcityBuildAdapter.TeamcityBuildAdapter), _dec(_class = function () {
        function BuildService(teamcityBuildAdapter) {
            _classCallCheck(this, BuildService);

            this.teamcityBuildAdapter = teamcityBuildAdapter;
        }

        BuildService.prototype.getAllFailedBuilds = function getAllFailedBuilds(baseUrl) {
            var _this = this;

            return Promise.all([this.teamcityBuildAdapter.getAllLatestFinishedBuilds(baseUrl), this.teamcityBuildAdapter.getAllLatestRunningBuilds(baseUrl)]).then(function (buildArrays) {

                var latestFinishedBuilds = buildArrays[0];
                var latestRunningBuilds = buildArrays[1];

                function isNotInBlackListFailedBuilds(finishedBuild) {
                    return !this.getBlackListFailedBuilds().includes(finishedBuild.id);
                }

                return latestFinishedBuilds.filter(function (finishedBuild) {
                    return finishedBuild.status === 'FAILURE';
                }).filter(function (finishedBuild) {
                    return isNotInBlackListFailedBuilds.bind(_this)(finishedBuild);
                }).map(function (failedBuild) {
                    failedBuild.drawAttention = isNewBuildRunning();
                    return failedBuild;

                    function isNewBuildRunning() {

                        function getCorrespondingBuild() {
                            return latestRunningBuilds.filter(function (latestRunningBuild) {
                                return latestRunningBuild.id === failedBuild.id;
                            })[0];
                        }

                        return getCorrespondingBuild() !== undefined && getCorrespondingBuild().buildNumber > failedBuild.buildNumber;
                    }
                });
            });
        };

        BuildService.prototype.getAllLatestRunningBuilds = function getAllLatestRunningBuilds(baseUrl) {
            var _this2 = this;

            function isNotInBlacklistLatestRunningBuilds(runningBuild) {
                return !this.getBlacklistLatestRunningBuilds().includes(runningBuild.id);
            }

            return this.teamcityBuildAdapter.getAllLatestRunningBuilds(baseUrl).then(function (latestRunningBuilds) {
                return latestRunningBuilds.filter(function (latestRunningBuild) {
                    return isNotInBlacklistLatestRunningBuilds.bind(_this2)(latestRunningBuild);
                }).map(function (latestRunningBuild) {
                    latestRunningBuild.drawAttention = true;
                    return latestRunningBuild;
                });
            });
        };

        BuildService.prototype.addToBlackListFailedBuilds = function addToBlackListFailedBuilds(buildId) {
            localStorage.blackListFailedBuilds = JSON.stringify(this.getBlackListFailedBuilds().concat(buildId));
        };

        BuildService.prototype.addToBlacklistLatestRunningBuilds = function addToBlacklistLatestRunningBuilds(buildId) {
            localStorage.blacklistLatestRunningBuilds = JSON.stringify(this.getBlacklistLatestRunningBuilds().concat(buildId));
        };

        BuildService.prototype.getBlackListFailedBuilds = function getBlackListFailedBuilds(buildId) {
            return localStorage.blackListFailedBuilds ? JSON.parse(localStorage.blackListFailedBuilds) : [];
        };

        BuildService.prototype.getBlacklistLatestRunningBuilds = function getBlacklistLatestRunningBuilds(buildId) {
            return localStorage.blacklistLatestRunningBuilds ? JSON.parse(localStorage.blacklistLatestRunningBuilds) : [];
        };

        return BuildService;
    }()) || _class);
});
define('view/elements/build-overview',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BuildOverview = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

    var BuildOverview = exports.BuildOverview = (_class = function () {
        function BuildOverview() {
            _classCallCheck(this, BuildOverview);

            _initDefineProp(this, 'builds', _descriptor, this);

            _initDefineProp(this, 'addToBlacklist', _descriptor2, this);

            _initDefineProp(this, 'getBlacklist', _descriptor3, this);

            this.showBlackList = false;
        }

        BuildOverview.prototype.getBuildStatusCssClass = function getBuildStatusCssClass(build) {
            if (build.status === 'SUCCESS') {
                return 'alert-success';
            }
            if (build.status === 'FAILURE') {
                return 'alert-danger';
            }
            throw new Error('The buildstatus "' + build.status + '" is invalid');
        };

        BuildOverview.prototype.getDrawAttentionCssClass = function getDrawAttentionCssClass(build) {
            if (build.drawAttention === true) {
                return 'draw-attention';
            }
            if (build.drawAttention === false) {
                return '';
            }
            throw new Error('The drawAttention "' + build.drawAttention + '" is invalid');
        };

        BuildOverview.prototype.startDrag = function startDrag(event) {
            this.showBlackList = true;
            event.dataTransfer.setData("id", event.target.id);
            return true;
        };

        BuildOverview.prototype.endDrag = function endDrag(event) {
            this.showBlackList = false;
        };

        BuildOverview.prototype.preventEventPropagation = function preventEventPropagation(event) {
            event.preventDefault();
        };

        BuildOverview.prototype.drop = function drop(event) {
            var _this = this;

            this.addToBlacklist(event.dataTransfer.getData("id"));
            this.builds = this.builds.filter(function (build) {
                return !_this.getBlacklist().includes(build.id);
            });
        };

        return BuildOverview;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'builds', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'addToBlacklist', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'getBlacklist', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"css/custom.css\"></require>\n  <router-view></router-view>\n</template>"; });
define('text!css/custom.css', ['module'], function(module) { module.exports = "@keyframes fadeIn { \n  from { opacity: 0; } \n}\n\n.draw-attention {\n    animation: fadeIn 1s infinite alternate;\n}"; });
define('text!view/failed-build-overview.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"./elements/build-overview\"></require>\n\t<build-overview builds.bind=\"builds\" add-to-blacklist.bind=\"addToBlackListFailedBuilds\" get-blacklist.bind=\"getBlackListFailedBuilds\"></build-overview>\n</template>"; });
define('text!view/running-build-overview.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"./elements/build-overview\"></require>\n\t<build-overview builds.bind=\"builds\" add-to-blacklist.bind=\"addToBlacklistLatestRunningBuilds\"></build-overview>\n</template>"; });
define('text!view/elements/build-overview.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-4 text-center\" repeat.for=\"build of builds\">\n                <div id =\"${build.id}\" class=\"${getBuildStatusCssClass(build)} ${getDrawAttentionCssClass(build)} alert\" role=\"alert \" draggable=\"true\" dragstart.delegate=\"startDrag($event)\" dragend.delegate=\"endDrag($event)\">\n                    <h1>${build.name}</h1>\n                    <p>${build.statusText}</p>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\" show.bind=\"showBlackList\">\n            <div class=\"col-md-12 text-center alert alert-warning\" drop.delegate=\"drop($event)\" dragover.delegate=\"preventEventPropagation($event)\">\n                <h1>Blacklist</h1>\n            </div>\n        </div>\n    </div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map