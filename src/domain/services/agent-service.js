import { TeamcityAgentAdapter } from '../../anticorruptionlayer/teamcity-agent-adapter';
import { inject } from 'aurelia-framework';



@inject(TeamcityAgentAdapter)
export class AgentService {
    constructor(teamcityAgentAdapter) {
        this.teamcityAgentAdapter = teamcityAgentAdapter;
    }

    getAgents(baseUrl) {
        return Promise.all([this.teamcityAgentAdapter.getAllAgents(baseUrl), this.teamcityAgentAdapter.getAllNotConnectedAgents(baseUrl)])
            .then(buildArrays => {

                let allAgents = buildArrays[0];
                let notConnectedAgents = buildArrays[1];

                allAgents.forEach(agent => agent.connected = isConnected(agent));

                function isNotConnected(agent) {
                    return notConnectedAgents.map(agent => agent.id).includes(agent.id);
                }

                 function isConnected(agent) {
                    return !isNotConnected(agent);
                }

                return allAgents;
            });
    }
}
