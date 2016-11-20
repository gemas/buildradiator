import {HttpClientRouter} from '../../../src/services/http-client-router';

describe('the httpClientRouter fetch method', () => {
    let realResponse = ['realResponse'];
    let fakeResponse = ['fakeResponse'];
    let realHttpClient = {
        fetch: (baseUrl, init) => {
            if (baseUrl === 'something.else.then.stub.com' && init === 'initobject') {
                return Promise.resolve(realResponse)
            } else {
                throw 'GetAllFailedBuilds is not stubbed on the real buildservice for: ' + baseUrl + ' and init parameter: ' + init;
            };
        }
    }
    let stubHttpClient = { fetch: () => Promise.resolve(fakeResponse) };
    let httpCLientRouter = new HttpClientRouter(realHttpClient, stubHttpClient);

    it('returns the failed builds from the mockBuildService when baseUrl is stub', (done) => {
        httpCLientRouter
            .fetch('stub')
            .then(returnedResponse => expect(returnedResponse).toBe(fakeResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('returns the failed builds from the realBuildService when baseUrl is not stub', (done) => {
        httpCLientRouter
            .fetch('something.else.then.stub.com', 'initobject')
            .then(returnedResponse => expect(returnedResponse).toBe(realResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});