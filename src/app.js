export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Teamcity radiator';
    config.map([
      { route: ':baseUrl', name: 'Build Overview', moduleId: 'build-overview' },
    ]);
  }
}