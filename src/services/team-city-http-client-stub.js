import teamCityBuildsResponse from './team-city-builds-response';

export class TeamCityHttpClientStub {
  fetch() {
    return Promise.resolve({json: ()=>teamCityBuildsResponse});
  }
};
