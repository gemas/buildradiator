import { BuildService } from 'services/build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class BuildOverview {
  constructor(service) {
    this.service = service;
  }

  activate(params) {
    this.service
      .getAllFailedBuilds(params.baseUrl)
      .then(builds => { this.builds = builds; });
  }
}
