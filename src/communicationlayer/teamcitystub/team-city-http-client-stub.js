import teamCitylatestBuildsResponse from './team-city-latest-builds-response';
import teamCitylatestRunningBuildsResponse from './team-city-latest-running-builds-response';
import teamCityBuildTypesResponse from './team-city-build-types-response';
import teamCityAllAgentsResponse from './team-city-all-agents-response';
import teamCityNotConnectedAgentsResponse from './team-city-not-connected-agents-response';

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
    if (url.endsWith('/guestAuth/app/rest/agents')) {
      return makePromise({ json: () => teamCityAllAgentsResponse });
    }
    if (url.endsWith('/guestAuth/app/rest/agents?locator=connected:false')) {
      return makePromise({ json: () => teamCityNotConnectedAgentsResponse });
    }
    throw new Error("team city http client stub doesn't support " + url);
  }
};
