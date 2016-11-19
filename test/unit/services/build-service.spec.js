import { BuildService } from '../../../src/services/build-service';

describe('the BuildService getAllFailedBuilds method', () => {
    let realBuilds = ['realBuild'];
    let fakeBuilds = ['fakeBuild'];
    let realBuildService = {
        getAllFailedBuilds: (baseUrl) => {
            if (baseUrl === 'something.else.then.mock.com') {
                return Promise.resolve(realBuilds)
            } else {
                throw 'GetAllFailedBuilds is not stubbed on the real buildservice for: ' + baseUrl;
            };
        }
    }
    let mockBuildService = { getAllFailedBuilds: () => Promise.resolve(fakeBuilds) };
    let buildService = new BuildService(realBuildService, mockBuildService);

    it('returns the failed builds from the mockBuildService when baseUrl is mock', (done) => {
        buildService
            .getAllFailedBuilds('mock')
            .then(returnedBuilds => expect(returnedBuilds).toBe(fakeBuilds))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('returns the failed builds from the realBuildService when baseUrl is not mock', (done) => {
        buildService
            .getAllFailedBuilds('something.else.then.mock.com')
            .then(returnedBuilds => expect(returnedBuilds).toBe(realBuilds))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});


