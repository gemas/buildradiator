import { BuildService } from '../domain/services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class FailedBuildOverview {
  constructor(service) {
    this.service = service;
  }

  activate(params) {
    setAllFailedBuilds.bind(this)(params);
    setInterval(setAllFailedBuilds.bind(this), 30000, params);

    function setAllFailedBuilds(params) {
      this.service
        .getAllFailedBuilds(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }
  }

  get hasFailedBuilds() {
    return this.builds && this.builds.length > 0 ? true : false;
  }
}
