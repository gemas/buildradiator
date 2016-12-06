export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Teamcity radiator';
    config.map([
      { route: 'failed/:baseUrl', name: 'Faled Build Overview', moduleId: 'failed-build-overview' },
      { route: 'running/:baseUrl', name: 'Running Build Overview', moduleId: 'running-build-overview' },
    ]);
  }
}