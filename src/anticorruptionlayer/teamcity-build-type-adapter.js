import { HttpClientRouter } from '../communicationlayer/http-client-router';
import { inject } from 'aurelia-framework';


@inject(HttpClientRouter)
export class TeamcityBuildTypeAdapter {
    constructor(clientRouter) {
        this.clientRouter = clientRouter;
    }

    getBuildTypes(url) {
        return this.clientRouter.fetch('http://' + url + "/guestAuth/app/rest/buildTypes", makeInit())
            .then(response => response.json())
            .then(jsonResponse => makeBuildType(jsonResponse));

        function makeInit() {
            return {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch',
                })
            };
        }

        function makeBuildType(jsonResponse) {
            return jsonResponse.buildType
                .map(buildTypeElement => {
                    return {
                        id: buildTypeElement.id,
                        name: buildTypeElement.name,
                        label: makeLabel(buildTypeElement.projectName)
                    };
                });

            function makeLabel(projectName) {
                return projectName.split(" :: ")
                    .map(labelName => {
                        return { name: labelName };
                    })
                    .reduce((p1, p2) => {
                        p2.label = p1;
                        return p2;
                    });
            }
        }

    }
}
