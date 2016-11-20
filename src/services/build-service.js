import { HttpClientRouter } from './http-client-router';
import { inject } from 'aurelia-framework';

@inject(HttpClientRouter)
export class BuildService {
  constructor(clientRouter) {
    this.clientRouter = clientRouter;
  }

  getAllFailedBuilds(baseUrl) {
    let url = baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

    let init = {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch',
      })
    };

    return this.clientRouter.fetch(url, init)
      .then(response => response.json())
      .then(jsonResponse =>
        jsonResponse.buildType
          .filter(buildTypeElement => buildTypeElement.builds.build.length > 0)
          .map(buildTypeElement => {
            return {
              "name": buildTypeElement.name,
              "status": buildTypeElement.builds.build[0].status,
              "statusText": buildTypeElement.builds.build[0].statusText
            }
          })
          .filter(build => build.status === 'FAILURE'));
  }
}
