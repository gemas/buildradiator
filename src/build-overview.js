import { BuildFactory } from 'services/build-factory';
import { inject } from 'aurelia-framework';

@inject(BuildFactory)
export class BuildOverview {
  constructor(factory) {
    this.factory = factory;
  }

  activate(params) {
    function setAllFailedBuilds(params) {
      this.factory
        .constructFailedBuildObjects(params.baseUrl)
        .then(builds => { this.builds = builds; });
    }

    setAllFailedBuilds.bind(this)(params);
    setInterval(setAllFailedBuilds.bind(this), 30000, params);
  }
}
