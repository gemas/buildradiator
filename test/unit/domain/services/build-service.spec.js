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
                            "statusText": "Tests failed: 0",
                            "drawAttention": false
                        },
                        {
                            "id": "build3_id",
                            "name": "Build3",
                            "buildNumber": "124",
                            "status": "SUCCESS",
                            "statusText": "Tests failed: 0",
                            "drawAttention": false
                        },
                        {
                            "id": "build4_id",
                            "name": "Build4",
                            "buildNumber": "3.1.70.25",
                            "status": "FAILURE",
                            "statusText": "Tests failed: 18 (1 new), passed: 60",
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
                        "buildNumber": "124",
                        "status": "SUCCESS",
                        "statusText": "Tests failed: 0",
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
                        "buildNumber": "3.1.70.25",
                        "status": "FAILURE",
                        "statusText": "Tests failed: 18 (1 new), passed: 60",
                        "drawAttention": true
                    }
                ]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

        it('returns only builds that are not in the blackListBuilds from the localStorage', (done) => {
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

            localStorage.blackListBuilds = JSON.stringify(["build2_id", "build3_id"]);

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

        it('returns only builds that are not in the blackListBuilds from the localStorage', (done) => {
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

            localStorage.blackListBuilds = JSON.stringify(["build2_id", "build3_id"]);

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

    describe('addToBlackListBuilds method', () => {
        it('adds the buildId to the blacklist with failed builds in the localStorage', () => {
            new BuildService().addToBlackListBuilds('31');
            new BuildService().addToBlackListBuilds('28');
            new BuildService().addToBlackListBuilds('een_tekst_id');

            expect(localStorage.blackListBuilds).toBe(JSON.stringify(['31', '28', 'een_tekst_id']));
        });
    });

    describe('addToBlackListBuilds method', () => {
        it('removes the given buildId from the blacklist', () => {
            localStorage.blackListBuilds = JSON.stringify(['12', '23', '10', '23']);

            new BuildService().removeFromBlackListBuilds("23");

            expect(localStorage.blackListBuilds).toBe(JSON.stringify(['12', '10',]));
        });

         it('removes nothing if the id does not exist in the blacklist', () => {
            localStorage.blackListBuilds = JSON.stringify(['12', '23', '10', '23']);

            new BuildService().removeFromBlackListBuilds("89");

            expect(localStorage.blackListBuilds).toBe(JSON.stringify(['12', '23', '10', '23']));
        });
    });

    describe('getBlackListBuilds', () => {
        it('returns the buildIds from the blacklist with failed builds in the localStorage', () => {
            localStorage.blackListBuilds = JSON.stringify(['31', '28', 'een_tekst_id']);

            expect(new BuildService().getBlackListBuilds()).toEqual(['31', '28', 'een_tekst_id']);
        });

        it('returns an empty array when there is now blacklist with failed builds in the localStorage', () => {
            expect(new BuildService().getBlackListBuilds()).toEqual([]);
        });
    });

    describe('isInBlackListBuilds', () => {
        it('returns true if id is in blaclist', () => {
            localStorage.blackListBuilds = JSON.stringify(['31', '28', 'een_tekst_id']);

            expect(new BuildService().isInBlackListBuilds('31')).toBe(true);
        });

        it('returns false if id is not in blacklist', () => {
            expect(new BuildService().isInBlackListBuilds('85')).toBe(false);
        });
    });

    
});