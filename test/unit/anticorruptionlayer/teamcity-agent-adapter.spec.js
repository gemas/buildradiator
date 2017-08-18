import { TeamcityAgentAdapter } from '../../../src/anticorruptionlayer/teamcity-agent-adapter';
import makeClientStub from './client-stub-factory.js'

describe('the teamcityAgentAdapter ', () => {
    describe('getAllAgents method', () => {
        it('asks all the agents from teamcity and transforms those to build objects from our domain', (done) => {
            let fetchResponse = {
                "count": 2,
                "href": "/guestAuth/app/rest/agents",
                "agent": [
                    {
                        "id": 3,
                        "name": "SomeAgent_1",
                        "typeId": 3,
                        "href": "/guestAuth/app/rest/agents/id:3"
                    },
                    {
                        "id": 2,
                        "name": "SomeAgent_2",
                        "typeId": 2,
                        "href": "/guestAuth/app/rest/agents/id:2"
                    }
                ]
            };

            let expectedBuilds = [
                {
                    "id": 3,
                    "name": "SomeAgent_1",
                    "url": "/guestAuth/app/rest/agents/id:3"
                },
                {
                    "id": 2,
                    "name": "SomeAgent_2",
                    "url": "/guestAuth/app/rest/agents/id:2"
                }
            ];

            new TeamcityAgentAdapter(makeClientStubForGettingAllAgents("test.com", fetchResponse))
                .getAllAgents("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(expectedBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    })

    describe('getAllNotConnectedAgents method', () => {
        it('asks all the agents from teamcity and transforms those to build objects from our domain', (done) => {
            let fetchResponse = {
                "count": 2,
                "href": "/guestAuth/app/rest/agents",
                "agent": [
                    {
                        "id": 3,
                        "name": "SomeAgent_1",
                        "typeId": 3,
                        "href": "/guestAuth/app/rest/agents/id:3"
                    },
                    {
                        "id": 2,
                        "name": "SomeAgent_2",
                        "typeId": 2,
                        "href": "/guestAuth/app/rest/agents/id:2"
                    }
                ]
            };

            let expectedBuilds = [
                {
                    "id": 3,
                    "name": "SomeAgent_1",
                    "url": "/guestAuth/app/rest/agents/id:3"
                },
                {
                    "id": 2,
                    "name": "SomeAgent_2",
                    "url": "/guestAuth/app/rest/agents/id:2"
                }
            ];

            new TeamcityAgentAdapter(makeClientStubForGettingAllNotConnectedAgents("test.com", fetchResponse))
                .getAllNotConnectedAgents("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(expectedBuilds))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    })

    function makeClientStubForGettingAllAgents(baseUrl, fetchResponse) {
        return makeClientStub('http://' + baseUrl + '/guestAuth/app/rest/agents', fetchResponse);
    }

    function makeClientStubForGettingAllNotConnectedAgents(baseUrl, fetchResponse) {
        return makeClientStub('http://' + baseUrl + '/guestAuth/app/rest/agents?locator=connected:false', fetchResponse);
    }
});


