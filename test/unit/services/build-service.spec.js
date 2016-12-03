import { BuildService } from '../../../src/services/build-service';

function makeClientStub(baseUrl, fetchResponse) {
    return {
        fetch: function (url, init) {
            expect(url).toEqual('http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))')
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

describe('the buildService ', () => {
    describe('the buildService getAllFailedBuilds method', () => {
        it('returns only the failed builds when given a response with failed an successfull builds', (done) => {
            let fetchResponse = {
                "buildType": [{
                    "name": "Build1",
                    "builds": {
                        "build": [
                            {
                                "number": "183",
                                "status": "SUCCESS",
                                "statusText": "Tests passed: 198, ignored: 9"
                            }
                        ]
                    }
                },
                {
                    "name": "Build2",
                    "builds": {
                        "build": [
                            {
                                "number": "2931",
                                "status": "FAILURE",
                                "statusText": "Tests failed: 4 (1 new), passed: 31"
                            }
                        ]
                    }
                },
                {
                    "name": "Build3",
                    "builds": {
                        "build": [
                            {
                                "number": "121",
                                "status": "FAILURE",
                                "statusText": "Tests failed: 8 (2 new), passed: 29"
                            }
                        ]
                    }
                }
                ]
            };

            let onlyTheFailedBuilds = [
                {
                    "name": "Build2",
                    "buildNumber": "2931",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 4 (1 new), passed: 31"
                },
                {
                    "name": "Build3",
                    "buildNumber": "121",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29"
                }
            ];

            new BuildService(makeClientStub("test.com", fetchResponse))
                .getAllFailedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(onlyTheFailedBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

        it('returns an empty array when there are no failed builds', (done) => {
            let fetchResponse = {
                "buildType": [{
                    "name": "Build1",
                    "builds": {
                        "build": [
                            {
                                "number": "123",
                                "status": "SUCCESS",
                                "statusText": "Tests passed: 198, ignored: 9"
                            }
                        ]
                    }
                }]
            };

            new BuildService(makeClientStub("test.com", fetchResponse))
                .getAllFailedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

        it('returns the failed builds even if are no builds in some of the buildTypes', (done) => {
            let fetchResponse = {
                "buildType": [
                    {
                        "name": "Build1",
                        "builds": {
                            "build": []
                        }
                    },
                    {
                        "name": "Build2",
                        "builds": {
                            "build": [
                                {
                                    "number": "123",
                                    "status": "FAILURE",
                                    "statusText": "Tests failed: 8 (2 new), passed: 29"
                                }
                            ]
                        }
                    }
                ]
            };

            let onlyTheFailedBuilds = [
                {
                    "name": "Build2",
                    "buildNumber": "123",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                }
            ];

            new BuildService(makeClientStub("test.com", fetchResponse))
                .getAllFailedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(onlyTheFailedBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    })
});


