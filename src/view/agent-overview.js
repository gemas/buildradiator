import { AgentService } from '../domain/services/agent-service';
import { inject } from 'aurelia-framework';

@inject(AgentService)
export class AgentOverview {
    constructor(service) {
        this.service = service;
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