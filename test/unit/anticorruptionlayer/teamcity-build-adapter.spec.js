import { TeamcityBuildAdapter } from '../../../src/anticorruptionlayer/teamcity-build-adapter';

function makeClientStubForGettingAllLatestFinishedBuilds(baseUrl, fetchResponse) {
    return makeClientStub('http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))', fetchResponse);
}

function makeClientStubForGettingAllLatestRunningBuilds(baseUrl, fetchResponse) {
    return makeClientStub('http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))', fetchResponse);
}

function makeClientStub(expectedUrl, fetchResponse) {

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

describe('the teamcityBuildAdapter ', () => {
    describe('the teamcityBuildAdapter getAllLatestFinishedBuilds method', () => {
        it('asks the latest builds from teamcity and transforms those to build objects from our domain', (done) => {
            let fetchResponse = {
                "buildType": [{
                    "id": "build_1_id",
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
                    "id": "build_2_id",
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
                    "id": "build_3_id",
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

            let expectedBuilds = [
                {
                    "id": "build_1_id",
                    "name": "Build1",
                    "buildNumber": "183",
                    "status": "SUCCESS",
                    "statusText": "Tests passed: 198, ignored: 9",
                    "drawAttention": false
                },
                {
                    "id": "build_2_id",
                    "name": "Build2",
                    "buildNumber": "2931",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 4 (1 new), passed: 31",
                    "drawAttention": false
                },
                {
                    "id": "build_3_id",
                    "name": "Build3",
                    "buildNumber": "121",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": false
                }
            ];

            new TeamcityBuildAdapter(makeClientStubForGettingAllLatestFinishedBuilds("test.com", fetchResponse))
                .getAllLatestFinishedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(expectedBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

        it('returns an empty array when there are no builds', (done) => {
            let fetchResponse = {
                "buildType": []
            };

            new TeamcityBuildAdapter(makeClientStubForGettingAllLatestFinishedBuilds("test.com", fetchResponse))
                .getAllLatestFinishedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

        it('returns the builds even if are no builds in some of the buildTypes of the response', (done) => {
            let fetchResponse = {
                "buildType": [
                    {
                        "id": "build_1_id",
                        "name": "Build1",
                        "builds": {
                            "build": []
                        }
                    },
                    {
                        "id": "build_2_id",
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

            let expectedBuilds = [
                {
                    "id": "build_2_id",
                    "name": "Build2",
                    "buildNumber": "123",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": false
                }
            ];

            new TeamcityBuildAdapter(makeClientStubForGettingAllLatestFinishedBuilds("test.com", fetchResponse))
                .getAllLatestFinishedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(expectedBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    })

    describe('the teamcityBuildAdapter getAllLatestRunningBuilds method', () => {
        it('returns all the running builds', (done) => {
            let fetchResponse = {
                "buildType": [{
                    "id": "build_1_id",
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
                    "id": "build_2_id",
                    "name": "Build2",
                    "builds": {
                        "build": []
                    }
                },
                {
                    "id": "build_3_id",
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

            let latestRunningBuilds = [
                {
                    "id": "build_1_id",
                    "name": "Build1",
                    "buildNumber": "183",
                    "status": "SUCCESS",
                    "statusText": "Tests passed: 198, ignored: 9",
                    "drawAttention": false
                },
                {
                    "id": "build_3_id",
                    "name": "Build3",
                    "buildNumber": "121",
                    "status": "FAILURE",
                    "statusText": "Tests failed: 8 (2 new), passed: 29",
                    "drawAttention": false
                }
            ];

            new TeamcityBuildAdapter(makeClientStubForGettingAllLatestRunningBuilds("test.com", fetchResponse))
                .getAllLatestRunningBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(latestRunningBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

        it('returns an empty array when there are no running builds', (done) => {
            let fetchResponse = {
                "buildType": [{
                    "id": "build_1_id",
                    "name": "Build1",
                    "builds": {
                        "build": []
                    }
                }]
            };

            new TeamcityBuildAdapter(makeClientStubForGettingAllLatestRunningBuilds("test.com", fetchResponse))
                .getAllLatestRunningBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    })
});


