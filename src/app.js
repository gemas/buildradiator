import buildService from 'services/build-service';

function setAllBuilds(app) {
  buildService
  .getAllBuilds("http://localhost:8111")
  .then(builds => {app.builds = builds;} ) 
}

export class App {
  constructor() {
    setAllBuilds(this);
  }
}
