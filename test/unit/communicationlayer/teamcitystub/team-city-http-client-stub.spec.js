import teamCitylatestBuildsResponse from '../../../../src/communicationlayer/teamcitystub/team-city-latest-builds-response';
import teamCitylatestRunningBuildsResponse from '../../../../src/communicationlayer/teamcitystub/team-city-latest-running-builds-response';
import { TeamCityHttpClientStub } from '../../../../src/communicationlayer/teamcitystub/team-city-http-client-stub';

describe('the teamCityHttpClientStub fetch method', () => {
    it('given a url containing running:false returns a promise with an object with a json method that returns the teamCitylatestBuildsResponse', (done) => { 
        new TeamCityHttpClientStub()
            .fetch("host/bla?running:false&bla=false")
            .then(promiseResult => expect(promiseResult.json()).toBe(teamCitylatestBuildsResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('given a url containing running:true returns a promise with an object with a json method that returns the teamCitylatestRunningBuildsResponse', (done) => { 
        new TeamCityHttpClientStub()
            .fetch("host/bla?running:true&bla=false")
            .then(promiseResult => expect(promiseResult.json()).toBe(teamCitylatestRunningBuildsResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('given a url containing not running:true or running:false returns a failed promise', () => { 
       expect(() => new TeamCityHttpClientStub().fetch("randomUrl.com")).toThrowError("team city http client stub doesn't support randomUrl.com");
    });
});


