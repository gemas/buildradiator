import { BuildService } from '../services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class FailedBuildOverview {
  constructor(service) {
    this.service = service;
  }

  activate(params) {
    function setAllFailedBuilds(params) {
      this.service
        .getAllFailedBuilds(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }

    setAllFailedBuilds.bind(this)(params);
    setInterval(setAllFailedBuilds.bind(this), 30000, params);
  }
}
