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
    service.getAllFailedBuilds("mock").then(function (builds) {
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
define('services/build-service',['exports', './real-build-service', './mock-build-service', 'aurelia-framework'], function (exports, _realBuildService, _mockBuildService, _aureliaFramework) {
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

  var BuildService = exports.BuildService = (_dec = (0, _aureliaFramework.inject)(_realBuildService.RealBuildService, _mockBuildService.MockBuildService), _dec(_class = function () {
    function BuildService(realBuildService, mockBuildService) {
      _classCallCheck(this, BuildService);

      this.realBuildService = realBuildService;
      this.mockBuildService = mockBuildService;
    }

    BuildService.prototype.getAllFailedBuilds = function getAllFailedBuilds(baseUrl) {
      return baseUrl === 'mock' ? this.mockBuildService.getAllFailedBuilds() : this.realBuildService.getAllFailedBuilds(baseUrl);
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
define('services/real-build-service',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
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

  var RealBuildService = exports.RealBuildService = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function RealBuildService(client) {
      _classCallCheck(this, RealBuildService);

      this.client = client;
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

      return this.client.fetch(url, init).then(function (response) {
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n      <div class=\"col-12 bg-danger text-center\" repeat.for=\"build of builds\">\r\n            <p>${build.name}</p> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map