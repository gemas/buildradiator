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
                    addToCurrentRoot(element);
                    return root;

                    function addToCurrentRoot(element) {
                        if (element.label) {
                            addToCurrentRoot(element.label);
                        }
                        addElementToCurrentRootIfNotYetThere(element.name);
                        currentRoot = currentRoot[element.name];

                        function addElementToCurrentRootIfNotYetThere(nameElement) {
                            if (!currentRoot[nameElement]) {
                                addElementToCurrentRoot(nameElement);
                            }

                            function addElementToCurrentRoot(nameElement) {
                                currentRoot[nameElement] = { type: "build" };
                                changeCurrentRootsTypeToLabelIfPresent();

                                function changeCurrentRootsTypeToLabelIfPresent() {
                                    if (currentRoot.type) {
                                        currentRoot.type = "label";
                                    }
                                }
                            }
                        }
                    }
                }, {});
            });
    }
}