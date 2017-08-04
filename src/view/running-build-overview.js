import { BuildService } from '../domain/services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class RunningBuildOverview {
  constructor(buildService) {
    this.buildService = buildService;
  }

  activate(params) {
    this.url = params.baseUrl;

    setAllRunningBuilds.bind(this)(params);
    setInterval(setAllRunningBuilds.bind(this), 30000, params);
    
    function setAllRunningBuilds(params) {
      this.buildService
        .getAllLatestRunningBuilds(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }
  }

  get baseUrl() {
    return this.url;
  }
}
