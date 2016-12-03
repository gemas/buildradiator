import { HttpClientRouter } from '../../../src/services/http-client-router';

describe('the httpClientRouter fetch method', () => {
    let realResponse = ['realResponse'];
    let fakeResponse = ['fakeResponse'];
    let realHttpClient = {
        fetch: (url, init) => {
            expect(url).toEqual('something.else.com');
            expect(init).toEqual('initobject');
            return Promise.resolve(realResponse)
        }
    }

    let stubHttpClient = {
        fetch: (url) => {
            expect(url).toEqual('url/stub/blabla');
            return Promise.resolve(fakeResponse)
        }
    };

    let httpCLientRouter = new HttpClientRouter(realHttpClient, stubHttpClient);

    it('call fetch on the stubHttpClient when url contains stub', (done) => {
        httpCLientRouter
            .fetch('url/stub/blabla')
            .then(returnedResponse => expect(returnedResponse).toBe(fakeResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('call fetch on the realHttpClient when url doesn\'t contains stub', (done) => {
        httpCLientRouter
            .fetch('something.else.com', 'initobject')
            .then(returnedResponse => expect(returnedResponse).toBe(realResponse))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});