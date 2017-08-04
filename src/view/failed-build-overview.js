import { BuildService } from '../domain/services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class FailedBuildOverview {
  constructor(service) {
    this.service = service;
  }

  activate(params) {
    this.url = params.baseUrl;
    setAllFailedBuilds.bind(this)(params);
    setInterval(setAllFailedBuilds.bind(this), 30000, params);

    function setAllFailedBuilds(params) {
      this.service
        .getAllFailedBuilds(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }
  }

  get baseUrl() {
    return this.url;
  }

  get hasFailedBuilds() {
    return this.builds && this.builds.length > 0 ? true : false;
  }
}
