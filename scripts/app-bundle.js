define('app',["exports", "services/build-service"], function (exports, _buildService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _buildService2 = _interopRequireDefault(_buildService);

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

  function setAllBuilds(app) {
    _buildService2.default.getAllBuilds("http://localhost:8111").then(function (builds) {
      app.builds = builds;
    });
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    setAllBuilds(this);
  };
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
define('services/build-service',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var client = new _aureliaFetchClient.HttpClient();

  function getAllBuilds(baseUrl) {
    var url = baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

    var init = {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      })
    };

    return client.fetch(url, init).then(function (response) {
      return response.json();
    });
  }

  exports.default = { getAllBuilds: getAllBuilds };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${builds.buildType[0].id}</h1>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map