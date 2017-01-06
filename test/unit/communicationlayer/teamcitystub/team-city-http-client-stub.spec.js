import teamCitylatestBuildsResponse from '../../../../src/communicationlayer/teamcitystub/team-city-latest-builds-response';
import teamCitylatestRunningBuildsResponse from '../../../../src/communicationlayer/teamcitystub/team-city-latest-running-builds-response';
import teamCityBuildTypesResponse from '../../../../src/communicationlayer/teamcitystub/team-city-build-types-response';
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

    it('given a url containing not running:true or running:false throws an exception', () => {
        expect(() => new TeamCityHttpClientStub().fetch("randomUrl.com")).toThrowError("team city http client stub doesn't support randomUrl.com");
    });

    it('given a url ends with /guestAuth/app/rest/buildTypes returns a promise with an object with a json method that returns the build types', (done) => {
        new TeamCityHttpClientStub()
            .fetch("something/guestAuth/app/rest/buildTypes")
            .then(promiseResult => expect(promiseResult.json()).toBe(teamCityBuildTypesResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);

        new TeamCityHttpClientStub()
            .fetch("somethingElse/guestAuth/app/rest/buildTypes")
            .then(promiseResult => expect(promiseResult.json()).toBe(teamCityBuildTypesResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('given a url containing, but not equals host/guestAuth/app/rest/buildTypes throws an exception', () => {
        expect(() => new TeamCityHttpClientStub().fetch("host/guestAuth/app/rest/buildTypes?bla=2")).toThrowError("team city http client stub doesn't support host/guestAuth/app/rest/buildTypes?bla=2");
    });
});


