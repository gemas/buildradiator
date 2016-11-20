import teamCityBuildsResponse from '../../../../src/services/teamcitystub/team-city-builds-response';
import { TeamCityHttpClientStub } from '../../../../src/services/teamcitystub/team-city-http-client-stub';

describe('the teamCityHttpClientStub fetch method', () => {
    it('returns a promise with an object with a json method that returns the teamCityBuildsResponse', (done) => { 
        new TeamCityHttpClientStub()
            .fetch()
            .then(promiseResult => expect(promiseResult.json()).toBe(teamCityBuildsResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});


