import { BuildService } from '../domain/services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class RunningBuildOverview {
  constructor(buildService) {
    this.buildService = buildService;
    this.addToBlacklistLatestRunningBuilds = buildId => buildService.addToBlacklistLatestRunningBuilds(buildId);
    this.getBlacklistLatestRunningBuilds = () => buildService.getBlacklistLatestRunningBuilds();
  }

  activate(params) {
    function setAllRunningBuilds(params) {
      this.buildService
        .getAllLatestRunningBuilds(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }

    setAllRunningBuilds.bind(this)(params);
    setInterval(setAllRunningBuilds.bind(this), 30000, params);
  }
}
