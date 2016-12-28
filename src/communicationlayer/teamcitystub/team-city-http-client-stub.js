import teamCitylatestBuildsResponse from './team-city-latest-builds-response';
import teamCitylatestRunningBuildsResponse from './team-city-latest-running-builds-response';

export class TeamCityHttpClientStub {
  fetch(url) {
    if (url.includes('running:false')) {
      return Promise.resolve({json: () => teamCitylatestBuildsResponse});
    }
    if (url.includes('running:true')) {
      return Promise.resolve({json: () => teamCitylatestRunningBuildsResponse});
    }
    throw new Error("team city http client stub doesn't support " + url);
  }
};
