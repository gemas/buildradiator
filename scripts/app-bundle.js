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
    service.getAllFailedBuilds("http://localhost:8111").then(function (builds) {
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
define('services/build-service',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
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

  var BuildService = exports.BuildService = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function BuildService(client) {
      _classCallCheck(this, BuildService);

      this.client = client;
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

    return BuildService;
  }()) || _class);
});
define('services/teamcity-mock',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var response = {
    "buildType": [{
      "name": "Bus",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 198, ignored: 9"
        }]
      }
    }, {
      "name": "C2C.UI",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 2391, ignored: 6"
        }]
      }
    }, {
      "name": "01. Ireland",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "02. Belgium",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "03. Great Brittain",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 4 (1 new), passed: 31"
        }]
      }
    }, {
      "name": "04. Finland",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: 03. Great Brittain"
        }]
      }
    }, {
      "name": "05. Denmark",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: 04. Finland"
        }]
      }
    }, {
      "name": "06. Norway",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: 05. Denmark"
        }]
      }
    }, {
      "name": "07. Sweden",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: 06. Norway"
        }]
      }
    }, {
      "name": "08. The Netherlands",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 10, passed: 25"
        }]
      }
    }, {
      "name": "DBConvert",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "Excell Migration",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "Install SSIS",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS Acc",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS DEV",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS DEV Smoke",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS DEV Smoke 2",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS PreAcc",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS PROD",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS Test",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "SSIS Test Release",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "Start Migration",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "DEV Deploy + Test (Dev)",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 61"
        }]
      }
    }, {
      "name": "DEV Deploy + Test (Smoke)",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Compilation error: Main\\QPark.C2C\\QPark.C2C.UI\\QPark.C2C.UI.csproj (new)"
        }]
      }
    }, {
      "name": "DEV Deploy + Test (Smoke2)",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Compilation error: Main\\QPark.C2C\\QPark.C2C.UI\\QPark.C2C.UI.csproj (new)"
        }]
      }
    }, {
      "name": "TEST Deploy + Test",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 4, passed: 57"
        }]
      }
    }, {
      "name": "Access",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 20"
        }]
      }
    }, {
      "name": "Archive",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 33, ignored: 4"
        }]
      }
    }, {
      "name": "Assets",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 669, ignored: 2"
        }]
      }
    }, {
      "name": "Auth",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 41"
        }]
      }
    }, {
      "name": "Contract",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "DocumentationDeploy",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "Finance",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 106"
        }]
      }
    }, {
      "name": "Geo",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 93"
        }]
      }
    }, {
      "name": "Monitoring",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 7"
        }]
      }
    }, {
      "name": "Notes",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 32"
        }]
      }
    }, {
      "name": "Output",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 12, ignored: 4"
        }]
      }
    }, {
      "name": "PMS",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Success"
        }]
      }
    }, {
      "name": "PMSReservation",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 92"
        }]
      }
    }, {
      "name": "PublicAPI",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 322, ignored: 19"
        }]
      }
    }, {
      "name": "Relations",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 283"
        }]
      }
    }, {
      "name": "Sales",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 37 (10 new), passed: 3479, ignored: 29"
        }]
      }
    }, {
      "name": "Skidata",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 92"
        }]
      }
    }, {
      "name": "SSO",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 11"
        }]
      }
    }, {
      "name": "Translations",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 15"
        }]
      }
    }, {
      "name": "Upstream",
      "builds": {
        "build": [{
          "status": "SUCCESS",
          "statusText": "Tests passed: 350, ignored: 3"
        }]
      }
    }, {
      "name": "DEV E2E Tests",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 37 (5 new), passed: 102, ignored: 18"
        }]
      }
    }, {
      "name": "DEV E2E Tests WhiteListing",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 4 (1 new), passed: 10"
        }]
      }
    }, {
      "name": "DEV SmokeTests",
      "builds": {
        "build": [{
          "status": "FAILURE",
          "statusText": "Tests failed: 26 (1 new), passed: 105, ignored: 1"
        }]
      }
    }]
  };

  var HttpClient = exports.HttpClient = function () {
    function HttpClient() {
      _classCallCheck(this, HttpClient);
    }

    HttpClient.prototype.fetch = function fetch() {
      return { then: function then() {
          return { then: function then(a) {
              var filteredresponse = a(response);console.log(a);return { then: function then(a) {
                  a(filteredresponse);
                } };
            } };
        }

      };
    };

    return HttpClient;
  }();
});
define('services/mock-teamcity-service',[], function () {});
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
define('fixed-array-of-failed-builds',["exports"], function (exports) {
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n      <div class=\"col-12 bg-danger text-center\">\r\n            <p>${builds.buildType[0].id}</p> \r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map