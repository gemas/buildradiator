export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Teamcity radiator';
    config.map([
      { route: 'failed/:baseUrl', name: 'Faled Build Overview', moduleId: 'view/failed-build-overview' },
      { route: 'running/:baseUrl', name: 'Running Build Overview', moduleId: 'view/running-build-overview' },
      { route: 'config/:baseUrl', name: 'Build Type Configuration', moduleId: 'view/build-types-configuration' }
    ]);
  }
}