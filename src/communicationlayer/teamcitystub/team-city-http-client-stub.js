import teamCitylatestBuildsResponse from './team-city-latest-builds-response';
import teamCitylatestRunningBuildsResponse from './team-city-latest-running-builds-response';
import teamCityBuildTypesResponse from './team-city-build-types-response';

function makePromise(result) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(result)
    }, 500);
  });
}

export class TeamCityHttpClientStub {
  fetch(url) {
    if (url.includes('running:false')) {
      return makePromise({ json: () => teamCitylatestBuildsResponse });
    }
    if (url.includes('running:true')) {
      return makePromise({ json: () => teamCitylatestRunningBuildsResponse });
    }
    if (url.endsWith('/guestAuth/app/rest/buildTypes')) {
      return makePromise({ json: () => teamCityBuildTypesResponse });
    }
    throw new Error("team city http client stub doesn't support " + url);
  }
};
