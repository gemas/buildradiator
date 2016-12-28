import { TeamcityBuildAdapter } from 'anticorruptionlayer/teamcity-build-adapter';
import { inject } from 'aurelia-framework';

@inject(TeamcityBuildAdapter)
export class RunningBuildOverview {
  constructor(teamcityBuildAdapter) {
    this.teamcityBuildAdapter = teamcityBuildAdapter;
  }

  activate(params) {
    function setAllRunningBuilds(params) {
      this.teamcityBuildAdapter
        .getAllLatestRunningBuilds(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }

    setAllRunningBuilds.bind(this)(params);
    setInterval(setAllRunningBuilds.bind(this), 30000, params);
  }
}
