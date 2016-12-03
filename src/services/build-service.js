import { HttpClientRouter } from './http-client-router';
import { inject } from 'aurelia-framework';

function fetchBuildArray(clientRouter, url) {
  let init = {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch',
    })
  };

  return clientRouter.fetch(url, init)
    .then(response => response.json())
    .then(jsonResponse =>
      jsonResponse.buildType
        .filter(buildTypeElement => buildTypeElement.builds.build.length > 0)
        .map(buildTypeElement => {
          return { 
            "name": buildTypeElement.name,
            "buildNumber": buildTypeElement.builds.build[0].number,
            "status": buildTypeElement.builds.build[0].status,
            "statusText": buildTypeElement.builds.build[0].statusText
          }
        })
    );
}

@inject(HttpClientRouter)
export class BuildService {
  constructor(clientRouter) {
    this.clientRouter = clientRouter;
  }

  getAllFailedBuilds(baseUrl) {
    let url = 'http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

    return fetchBuildArray(this.clientRouter, url)
      .then(buildArray => buildArray.filter(build => build.status === 'FAILURE'));
  }

  getAllLatestRunningBuilds(baseUrl) {
    let url = 'http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))';

    return fetchBuildArray(this.clientRouter, url)
  }
}
