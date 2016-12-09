import { BuildService } from './build-service';
import { inject } from 'aurelia-framework';

@inject(BuildService)
export class BuildFactory {
    constructor(buildService) {
        this.buildService = buildService;
    }

    constructFailedBuildObjects(baseUrl) {
        return Promise.all([this.buildService.getAllFailedBuilds(baseUrl), this.buildService.getAllLatestRunningBuilds(baseUrl)])
            .then(buildArrays => {

                let failedBuilds = buildArrays[0];
                let latestRunningBuilds = buildArrays[1];

                validateFailedBuilds();
                validateRunningBuilds();
                
                return failedBuilds.map(failedBuild => {

                    failedBuild.drawAttention = isNewBuildRunning();
                    return failedBuild;

                    function isNewBuildRunning() {

                        function getCorrespondingBuild() {
                            return latestRunningBuilds.filter(latestRunningBuild => latestRunningBuild.name === failedBuild.name)[0];
                        }

                        return getCorrespondingBuild() !== undefined && getCorrespondingBuild().buildNumber > failedBuild.buildNumber;
                    }
                });

                function validateFailedBuilds() {
                    if (duplicateNamesInBuildArray(failedBuilds)) {
                        throw new Error("There are failed builds with the same name. We didn't foresee this to happen. Sorry. Please contact us");
                    }
                }

                function validateRunningBuilds() {
                    if (duplicateNamesInBuildArray(latestRunningBuilds)) {
                        throw new Error("There are running builds with the same name. We didn't foresee this to happen. Sorry. Please contact us");
                    }
                }

                function duplicateNamesInBuildArray(buildArray) {
                    return buildArray
                        .map(failedBuild1 => buildArray.filter(failedBuild2 => failedBuild1.name === failedBuild2.name).length)
                        .filter(occurancesOfName => occurancesOfName > 1).length > 1;
                }
            });
    }
}
