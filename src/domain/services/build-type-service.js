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
                        addLabelToCurrentRootRecursivelyIfThereIsOne();
                        addElementToCurrentRootIfNotYetThere();
                        changeCurrentRootToNewElement();

                        function changeCurrentRootToNewElement() {
                            currentRoot = currentRoot[element.name];
                        }

                        function addLabelToCurrentRootRecursivelyIfThereIsOne() {
                            if (element.label) {
                                addToCurrentRoot(element.label);
                            }
                        }

                        function addElementToCurrentRootIfNotYetThere() {
                            if (!currentRoot[element.name]) {
                                addElementToCurrentRoot();
                            }

                            function addElementToCurrentRoot() {
                                currentRoot[element.name] = isElementTypeBuild() ?  
                                makeBuildElement():
                                makeLabelElement();

                                function isElementTypeBuild() {
                                    return element.id;
                                }

                                function makeBuildElement() {
                                    return { id: element.id, type: "build" };
                                }

                                function makeLabelElement() {
                                    return  { type: "label" };
                                }
                            }
                        }
                    }
                }, {type: "label"});
            });
    }
}