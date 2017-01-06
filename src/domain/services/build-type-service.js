import { TeamcityBuildTypeAdapter } from '../../anticorruptionlayer/teamcity-build-type-adapter';
import { inject } from 'aurelia-framework';

@inject(TeamcityBuildTypeAdapter)
export class BuildTypeService {
    constructor(teamcityBuildTypeAdapter) {
        this.teamcityBuildTypeAdapter = teamcityBuildTypeAdapter;
    }

    getBuildTypesGroupedByLabel(baseUrl) {
        return this.teamcityBuildTypeAdapter.getBuildTypes(baseUrl)
            .then(buildTypes => {
                return buildTypes.reduce((root, element) => {
                    let currentRoot = root;
                    (function addToRoot(element) {
                        if(element.label) {
                            addToRoot(element.label);
                        }
                        if(!currentRoot[element.name]) {
                            currentRoot[element.name] = {type: "build"};
                            if(currentRoot.type) {
                                currentRoot.type = "label";
                            }
                        } 
                        currentRoot = currentRoot[element.name];
                    })(element);
                    return root;
                }, {});
            });
    }
}