export default function makeClientStub(expectedUrl, fetchResponse) {

    return {
        fetch: function (actualUrl, init) {
            expect(actualUrl).toEqual(expectedUrl);
            expect(init).toEqual({
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch',
                })
            })
            return Promise.resolve({ json: () => fetchResponse })
        }
    };
}