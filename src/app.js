import buildService from 'services/build-service';

export class App {
  constructor() {
    this.message = buildService.getAllBuilds("http://localhost:8111");
  }
}
