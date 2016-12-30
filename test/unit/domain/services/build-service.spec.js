import { BuildService } from '../../../../src/domain/services/build-service';

describe('the buildService', () => {

    beforeEach(() => localStorage.clear());

    describe('getAllFailedBuilds method', () => {
        it('returns only the failed builds and draw attention on the ones that have a new build that is running', (done) => {
            let teamcityBuildAdapterStub = {
                getAllLatestFinishedBuilds: function getAllLatestFinishedBuilds(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            "id": "build1_id",
                            "name": "Build1",
                            "buildNumber": "3.1.70.17327",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build2_id",
                            "name": "Build2",
                            "buildNumber": "2.1.75.17327",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build3_id",
                            "name": "Build3",
                            "buildNumber": "123",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "other_build3_id",
                            "name": "Build3",
                            "buildNumber": "123",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build4_id",
                            "name": "Build4",
                            "buildNumber": "3.1.70.23",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build5_id",
                            "name": "Build5",
                            "buildNumber": "3.1.70.17327",
                            "status": "SUCCESS",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                    ]);
                },
                getAllLatestRunningBuilds: function getAllLatestRunningBuilds(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            "id": "build2_id",
                            "name": "Build2",
                            "buildNumber": "2.1.75.17325",
                            "status": "SUCCESS",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build3_id",
                            "name": "Build3",
                            "buildNumber": "124",
                            "status": "SUCCESS",
                            "statusText": "Tests failed: 6 (2 new), passed: 10",
                            "drawAttention": false
                        },
                        {
                            "id": "build4_id",
                            "name": "Build4",
                            "buildNumber": "3.1.70.25",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (1 new), passed: 60",
                            "drawAttention": false
                        }
                    ]);
                }
            };

            new BuildService(teamcityBuildAdapterStub).getAllFailedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([
                    {
                        "id": "build1_id",
                        "name": "Build1",
                        "buildNumber": "3.1.70.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": false
                    },
                    {
                        "id": "build2_id",
                        "name": "Build2",
                        "buildNumber": "2.1.75.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": false
                    },
                    {
                        "id": "build3_id",
                        "name": "Build3",
                        "buildNumber": "123",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": true
                    },
                    {
                        "id": "other_build3_id",
                        "name": "Build3",
                        "buildNumber": "123",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": false
                    },
                    {
                        "id": "build4_id",
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

        it('returns only builds that are not in the blackListFailedBuilds from the localStorage', (done) => {
            let teamcityBuildAdapterStub = {
                getAllLatestFinishedBuilds: function getAllLatestFinishedBuilds(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            "id": "build1_id",
                            "name": "Build1",
                            "buildNumber": "3.1.70.17327",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build2_id",
                            "name": "Build2",
                            "buildNumber": "2.1.75.17327",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build3_id",
                            "name": "Build3",
                            "buildNumber": "123",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        }
                    ])
                },
                getAllLatestRunningBuilds: function getAllLatestRunningBuilds(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([]);
                }
            };

            localStorage.blackListFailedBuilds = JSON.stringify(["build2_id", "build3_id"]);

            new BuildService(teamcityBuildAdapterStub).getAllFailedBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([
                    {
                        "id": "build1_id",
                        "name": "Build1",
                        "buildNumber": "3.1.70.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": false
                    }
                ]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    });

    describe('getAllLatestRunningBuilds method', () => {
        it('returns all the latest running builds and draw attention on all of them', (done) => {
            let teamcityBuildAdapterStub = {
                getAllLatestRunningBuilds: function getAllLatestRunningBuilds(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            "name": "Build2",
                            "buildNumber": "2.1.75.17325",
                            "status": "SUCCESS",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "name": "Build3",
                            "buildNumber": "124",
                            "status": "SUCCESS",
                            "statusText": "Tests failed: 6 (2 new), passed: 10",
                            "drawAttention": false
                        },
                        {
                            "name": "Build4",
                            "buildNumber": "3.1.70.25",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (1 new), passed: 60",
                            "drawAttention": false
                        }
                    ]);
                }
            };

            new BuildService(teamcityBuildAdapterStub).getAllLatestRunningBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([
                    {
                        "name": "Build2",
                        "buildNumber": "2.1.75.17325",
                        "status": "SUCCESS",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": true
                    },
                    {
                        "name": "Build3",
                        "buildNumber": "124",
                        "status": "SUCCESS",
                        "statusText": "Tests failed: 6 (2 new), passed: 10",
                        "drawAttention": true
                    },
                    {
                        "name": "Build4",
                        "buildNumber": "3.1.70.25",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (1 new), passed: 60",
                        "drawAttention": true
                    }
                ]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);

        });

        it('returns only builds that are not in the blackListLatestRunningBuilds from the localStorage', (done) => {
            let teamcityBuildAdapterStub = {
                getAllLatestRunningBuilds: function getAllLatestRunningBuilds(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            "id": "build1_id",
                            "name": "Build1",
                            "buildNumber": "3.1.70.17327",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build2_id",
                            "name": "Build2",
                            "buildNumber": "2.1.75.17327",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        },
                        {
                            "id": "build3_id",
                            "name": "Build3",
                            "buildNumber": "123",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 8 (2 new), passed: 29",
                            "drawAttention": false
                        }
                    ])
                }
            };

            localStorage.blacklistLatestRunningBuilds = JSON.stringify(["build2_id", "build3_id"]);

            new BuildService(teamcityBuildAdapterStub).getAllLatestRunningBuilds("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual([
                    {
                        "id": "build1_id",
                        "name": "Build1",
                        "buildNumber": "3.1.70.17327",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 8 (2 new), passed: 29",
                        "drawAttention": true
                    }
                ]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    });

    describe('addToBlackListFailedBuilds method', () => {
        it('adds the buildId to the blacklist with failed builds in the localStorage', () => {
            new BuildService().addToBlackListFailedBuilds('31');
            new BuildService().addToBlackListFailedBuilds('28');
            new BuildService().addToBlackListFailedBuilds('een_tekst_id');

            expect(localStorage.blackListFailedBuilds).toBe(JSON.stringify(['31', '28', 'een_tekst_id']));
        });
    });

    describe('getBlackListFailedBuilds method', () => {
        it('returns the buildIds from the blacklist with failed builds in the localStorage', () => {
            localStorage.blackListFailedBuilds = JSON.stringify(['31', '28', 'een_tekst_id']);

            expect(new BuildService().getBlackListFailedBuilds()).toEqual(['31', '28', 'een_tekst_id']);
        });
    });

    describe('addToBlacklistLatestRunningBuilds method', () => {
        it('adds the buildId to the blacklist with latest running builds in the localStorage', () => {
            new BuildService().addToBlacklistLatestRunningBuilds('31');
            new BuildService().addToBlacklistLatestRunningBuilds('28');
            new BuildService().addToBlacklistLatestRunningBuilds('een_tekst_id');

            expect(localStorage.blacklistLatestRunningBuilds).toBe(JSON.stringify(['31', '28', 'een_tekst_id']));
        });
    });
});