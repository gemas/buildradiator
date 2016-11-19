import { BuildService } from '../../../src/services/build-service';

describe('the buildService', () => {
    it('gives', (done) => {
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
        }

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
        new BuildService(clientStub)
            .getAllFailedBuilds()
            .then(returnedBuilds => expect(returnedBuilds).toBe(onlyTheFailedBuilds))
            .finally(done);
    })
});


