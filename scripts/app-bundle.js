define('app',['exports', 'services/build-service', 'aurelia-framework'], function (exports, _buildService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function setAllBuilds(app, service) {
    service.getAllFailedBuilds('stub').then(function (builds) {
      app.builds = builds;
    });
  }

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_buildService.BuildService), _dec(_class = function App(service) {
    _classCallCheck(this, App);

    setAllBuilds(this, service);
  }) || _class);
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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/build-service',['exports', './http-client-router', 'aurelia-framework'], function (exports, _httpClientRouter, _aureliaFramework) {
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

  var BuildService = exports.BuildService = (_dec = (0, _aureliaFramework.inject)(_httpClientRouter.HttpClientRouter), _dec(_class = function () {
    function BuildService(clientRouter) {
      _classCallCheck(this, BuildService);

      this.clientRouter = clientRouter;
    }

    BuildService.prototype.getAllFailedBuilds = function getAllFailedBuilds(baseUrl) {
      var url = baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

      var init = {
        method: 'GET',
        headers: new Headers({
          'Accept': 'application/json',
          'X-Requested-With': 'Fetch'
        })
      };

      return this.clientRouter.fetch(url, init).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        return jsonResponse.buildType.filter(function (buildType) {
          return buildType.builds.build.some(function (build) {
            return build.status === 'FAILURE';
          });
        });
      });
    };

    return BuildService;
  }()) || _class);
});
define('services/fixed-array-of-failed-builds',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = [{
        "name": "Build2",
        "builds": {
            "build": [{
                "status": "FAILURE",
                "statusText": "Tests failed: 4 (1 new), passed: 31"
            }]
        }
    }, {
        "name": "Build8",
        "builds": {
            "build": [{
                "status": "FAILURE",
                "statusText": "Tests failed: 18 (0 new), passed: 7"
            }]
        }
    }, {
        "name": "Build12",
        "builds": {
            "build": [{
                "status": "FAILURE",
                "statusText": "Tests failed: 258 (52 new), passed: 0"
            }]
        }
    }, {
        "name": "Build15",
        "builds": {
            "build": [{
                "status": "FAILURE",
                "statusText": "Tests failed: 1 (1 new), passed: 4"
            }]
        }
    }, {
        "name": "Build18",
        "builds": {
            "build": [{
                "status": "FAILURE",
                "statusText": "Tests failed: 8 (2 new), passed: 29"
            }]
        }
    }];
});
define('services/mock-build-service',['exports', './fixed-array-of-failed-builds'], function (exports, _fixedArrayOfFailedBuilds) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MockBuildService = undefined;

  var _fixedArrayOfFailedBuilds2 = _interopRequireDefault(_fixedArrayOfFailedBuilds);

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

  var MockBuildService = exports.MockBuildService = function () {
    function MockBuildService() {
      _classCallCheck(this, MockBuildService);
    }

    MockBuildService.prototype.getAllFailedBuilds = function getAllFailedBuilds() {
      return Promise.resolve(_fixedArrayOfFailedBuilds2.default);
    };

    return MockBuildService;
  }();
});
define('services/real-build-service',['exports', './http-client-router', 'aurelia-framework'], function (exports, _httpClientRouter, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RealBuildService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var RealBuildService = exports.RealBuildService = (_dec = (0, _aureliaFramework.inject)(_httpClientRouter.HttpClientRouter), _dec(_class = function () {
    function RealBuildService(clientRouter) {
      _classCallCheck(this, RealBuildService);

      this.clientRouter = clientRouter;
    }

    RealBuildService.prototype.getAllFailedBuilds = function getAllFailedBuilds(baseUrl) {
      var url = baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

      var init = {
        method: 'GET',
        headers: new Headers({
          'Accept': 'application/json',
          'X-Requested-With': 'Fetch'
        })
      };

      return this.clientRouter.fetch(url, init).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        return jsonResponse.buildType.filter(function (buildType) {
          return buildType.builds.build.some(function (build) {
            return build.status === 'FAILURE';
          });
        });
      });
    };

    return RealBuildService;
  }()) || _class);
});
define('services/team-city-builds-response',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "buildType": [{
      "name": "build 1",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 198, ignored: 9"
        }]
      }
    }, {
      "name": "build 2",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 2391, ignored: 6"
        }]
      }
    }, {
      "name": "build 3",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "build 4",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "build 5",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 4 (1 new), passed: 31"
        }]
      }
    }, {
      "name": "build 6",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: 03. Great Brittain"
        }]
      }
    }, {
      "name": "build 7",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: 04. Finland"
        }]
      }
    }, {
      "name": "build 8",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: 05. Denmark"
        }]
      }
    }, {
      "name": "build 9",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: 06. Norway"
        }]
      }
    }, {
      "name": "build 10",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 10, passed: 25"
        }]
      }
    }]
  };
});
define('services/team-city-http-client-stub',['exports', './team-city-builds-response'], function (exports, _teamCityBuildsResponse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TeamCityHttpClientStub = undefined;

  var _teamCityBuildsResponse2 = _interopRequireDefault(_teamCityBuildsResponse);

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

    TeamCityHttpClientStub.prototype.fetch = function fetch() {
      return Promise.resolve({ json: function json() {
          return _teamCityBuildsResponse2.default;
        } });
    };

    return TeamCityHttpClientStub;
  }();

  ;
});
define('services/http-client-router',['exports', 'aurelia-fetch-client', './team-city-http-client-stub', 'aurelia-framework'], function (exports, _aureliaFetchClient, _teamCityHttpClientStub, _aureliaFramework) {
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
            return url.includes('stub') ? this.teamCityHttpClientStub.fetch() : this.realHttpClient.fetch(url, init);
        };

        return HttpClientRouter;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n      <div class=\"col-12 bg-danger text-center\" repeat.for=\"build of builds\">\r\n            <p>${build.name}</p> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map