import { HttpClientRouter } from '../communicationlayer/http-client-router';
import { inject } from 'aurelia-framework';

function fetchAgentArray(clientRouter, url) {
    let init = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch',
        })
    };

    return clientRouter.fetch(url, init)
        .then(response => response.json())
        .then(jsonResponse =>
            jsonResponse.agent
                .map(agent => {
                    return {
                        "id": agent.id,
                        "name": agent.name,
                        "url": agent.href
                    }
                }));
}

@inject(HttpClientRouter)
export class TeamcityAgentAdapter {
    constructor(clientRouter) {
        this.clientRouter = clientRouter;
    }

    getAllAgents(baseUrl) {
        let url = 'http://' + baseUrl + '/guestAuth/app/rest/agents';
        return fetchAgentArray(this.clientRouter, url);
    }

    getAllNotConnectedAgents(baseUrl) {
        let url = 'http://' + baseUrl + '/guestAuth/app/rest/agents?locator=connected:false';
        return fetchAgentArray(this.clientRouter, url);
    }
}
