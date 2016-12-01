import { BuildService } from 'services/build-service';
import { inject } from 'aurelia-framework';

function setAllFailedBuilds(params) {
  this.service
      .getAllFailedBuilds(params.baseUrl)
      .then(builds => { this.builds = builds; });
}

@inject(BuildService)
export class BuildOverview {
  constructor(service) {
    this.service = service;
  }

  activate(params) {
    setAllFailedBuilds.bind(this)(params);
    setInterval(setAllFailedBuilds.bind(this), 5000, params);
  }
}
