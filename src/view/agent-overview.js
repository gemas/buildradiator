import { AgentService } from '../domain/services/agent-service';
import { inject } from 'aurelia-framework';

@inject(AgentService)
export class AgentOverview {
    constructor(service) {
        this.service = service;
    }

    getConnectedCssClass(agent) {
        if (agent.connected == true) {
            return 'alert-success';
        }
        if (agent.connected === false) {
            return 'alert-danger';
        }
        throw new Error('The connected property "' + agent.connected + '" is invalid')
    }

    activate(params) {
        this.url = params.baseUrl;
        setAgents.bind(this)(params);
        setInterval(setAgents.bind(this), 30000, params);

        function setAgents(params) {
            this.service
                .getAgents(params.baseUrl)
                .then(agents => { this.agents = agents; });
        }
    }
} 