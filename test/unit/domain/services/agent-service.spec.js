import { AgentService } from '../../../../src/domain/services/agent-service';

describe('the agentService', () => {

    beforeEach(() => localStorage.clear());

    describe('getAgents method', () => {
        it('returns the agents with a connected property', (done) => {
            let teamcityAgentAdapterStub = {
                getAllAgents: function getAllAgents(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
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
                    ]);
                },
                getAllNotConnectedAgents: function getAllNotConnectedAgents(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            "id": 2,
                            "name": "SomeAgent_2",
                            "url": "/guestAuth/app/rest/agents/id:2"
                        }
                    ]);
                }
            };

            new AgentService(teamcityAgentAdapterStub).getAgents("test.com")
                .then(returnedAgents => expect(returnedAgents).toEqual([
                    {
                        "id": 3,
                        "name": "SomeAgent_1",
                        "url": "/guestAuth/app/rest/agents/id:3",
                        "connected": true
                    },
                    {
                        "id": 2,
                        "name": "SomeAgent_2",
                        "url": "/guestAuth/app/rest/agents/id:2",
                        "connected": false
                    }
                ]))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });

    });
});