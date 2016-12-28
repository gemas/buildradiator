import { BuildService } from '../../../src/services/build-service';

describe('the buildService getAllFailedBuilds method', () => {
    it('returns the failed builds and draw attention on the ones that have a new build that is running', (done) => {
        let teamcityBuildAdapterStub = {
            getAllFailedBuilds: function getAllFailedBuilds(baseUrl) {
                expect(baseUrl).toEqual("test.com");
                return Promise.resolve([
                    {
                        "name": "Build1",
                        "buildNumber": "3.1.70.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    },
                    {
                        "name": "Build2",
                        "buildNumber": "2.1.75.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    },
                    {
                        "name": "Build3",
                        "buildNumber": "123",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    },
                    {
                        "name": "Build4",
                        "buildNumber": "3.1.70.23",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    }
                ]);
            },
            getAllLatestRunningBuilds: function getAllFailedBuilds(baseUrl) {
                expect(baseUrl).toEqual("test.com");
                return Promise.resolve([
                    {
                        "name": "Build2",
                        "buildNumber": "2.1.75.17325",
                        "status": "SUCCESS",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    },
                    {
                        "name": "Build3",
                        "buildNumber": "124",
                        "status": "SUCCESS",
                        "statusText": "Tests failed: 6 (2 new), passed: 10"
                    },
                    {
                        "name": "Build4",
                        "buildNumber": "3.1.70.25",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (1 new), passed: 60"
                    }
                ]);
            }
        }

        new BuildService(teamcityBuildAdapterStub).getAllFailedBuilds("test.com")
            .then(returnedBuilds => expect(returnedBuilds).toEqual([
                {
                    "name": "Build1",
                    "buildNumber": "3.1.70.17327",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": false
                },
                {
                    "name": "Build2",
                    "buildNumber": "2.1.75.17327",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": false
                },
                {
                    "name": "Build3",
                    "buildNumber": "123",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": true
                },
                {
                    "name": "Build4",
                    "buildNumber": "3.1.70.23",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": true
                }
            ]))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });

    it('makes the assumption that the name in the failing builds is unique', (done) => {
        let teamcityBuildAdapterStub = {
            getAllFailedBuilds: function getAllFailedBuilds(baseUrl) {
                expect(baseUrl).toEqual("test.com");
                return Promise.resolve([
                    {
                        "name": "Build1",
                        "buildNumber": "3.1.70.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    },
                    {
                        "name": "Build1",
                        "buildNumber": "2.1.75.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    }
                ]);
            },
            getAllLatestRunningBuilds: function getAllLatestRunningBuilds(baseUrl) {
                expect(baseUrl).toEqual("test.com");
                return Promise.resolve([
                ]);
            }
        }

        new BuildService(teamcityBuildAdapterStub).getAllFailedBuilds("test.com")
            .then(() => { throw "exception isn't thrown" })
            .catch(error => expect(error).toEqual(new Error("There are failed builds with the same name. We didn't foresee this to happen. Sorry. Please contact us")))
            .finally(done);
    });

    it('makes the assumption that the name in the running builds is unique', (done) => {
        let teamcityBuildAdapterStub = {
            getAllFailedBuilds: function getAllFailedBuilds(baseUrl) {
                expect(baseUrl).toEqual("test.com");
                return Promise.resolve([]);
            },
            getAllLatestRunningBuilds: function getAllLatestRunningBuilds(baseUrl) {
                expect(baseUrl).toEqual("test.com");
                return Promise.resolve([
                    {
                        "name": "Build1",
                        "buildNumber": "3.1.70.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    },
                    {
                        "name": "Build1",
                        "buildNumber": "2.1.75.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29"
                    }
                ]);
            }
        }

        new BuildService(teamcityBuildAdapterStub).getAllFailedBuilds("test.com")
            .then(() => { throw "exception isn't thrown" })
            .catch(error => expect(error).toEqual(new Error("There are running builds with the same name. We didn't foresee this to happen. Sorry. Please contact us")))
            .finally(done);
    });
});