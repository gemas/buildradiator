import {BuildService} from 'services/build-service';
import {inject} from 'aurelia-framework';

function setAllBuilds(app) {
  app.service
  .getAllBuilds("http://localhost:8111")
  .then(builds => {app.builds = builds;} ) 
}

@inject(BuildService)
export class App {
  constructor(service) {
    this.service = service;
    setAllBuilds(this);
  }
}
