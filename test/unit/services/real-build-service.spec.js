import {RealBuildService} from '../../../src/services/real-build-service';

describe('the buildService getAllFailedBuilds method', () => {
    it('returns only the failed builds when given a response with failed an successfull builds', (done) => {
        let fetchResponse = {
            "buildType": [{
                "name": "Build1",
                "builds": {
                    "build": [
                        {
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
                "builds": {
                    "build": [
                        {
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
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29"
                        }
                    ]
                }
            }
        ];

        let clientStub = { fetch: () => Promise.resolve({ json: () => fetchResponse }) }
        new RealBuildService(clientStub)
            .getAllFailedBuilds()
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
                            "status": "SUCCESS",
                            "statusText": "Tests passed: 198, ignored: 9"
                        }
                    ]
                }
            }]
        };

        let clientStub = { fetch: () => Promise.resolve({ json: () => fetchResponse }) }
        new RealBuildService(clientStub)
            .getAllFailedBuilds()
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
                "builds": {
                    "build": [
                        {
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29"
                        }
                    ]
                }
            }
        ];

        let clientStub = { fetch: () => Promise.resolve({ json: () => fetchResponse }) }
        new RealBuildService(clientStub)
            .getAllFailedBuilds()
            .then(returnedBuilds => expect(returnedBuilds).toEqual(onlyTheFailedBuilds))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});


