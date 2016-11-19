import {BuildService} from 'services/build-service';
import {inject} from 'aurelia-framework';

function setAllBuilds(app, service) {
  service
  .getAllFailedBuilds("http://localhost:8111")
  .then(builds => {app.builds = builds;} ) 
}

@inject(BuildService)
export class App {
  constructor(service) {
    setAllBuilds(this, service);
  }
}
