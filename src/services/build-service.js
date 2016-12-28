import { TeamcityBuildAdapter } from '../anticorruptionlayer/teamcity-build-adapter';
import { inject } from 'aurelia-framework';

@inject(TeamcityBuildAdapter)
export class BuildService {
    constructor(teamcityBuildAdapter) {
        this.teamcityBuildAdapter = teamcityBuildAdapter;
    }

    getAllFailedBuilds(baseUrl) {
        return Promise.all([this.teamcityBuildAdapter.getAllLatestFinishedBuilds(baseUrl), this.teamcityBuildAdapter.getAllLatestRunningBuilds(baseUrl)])
            .then(buildArrays => {

                let latestFinishedBuilds = buildArrays[0];
                let latestRunningBuilds = buildArrays[1];

                validateFailedBuilds();
                validateRunningBuilds();

                return latestFinishedBuilds
                    .filter(finishedBuild => finishedBuild.status === 'FAILURE')
                    .map(failedBuild => {
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
                    if (haveDuplicateNamesInBuildArray(latestFinishedBuilds)) {
                        throw new Error("There are failed builds with the same name. We didn't foresee this to happen. Sorry. Please contact us");
                    }
                }

                function validateRunningBuilds() {
                    if (haveDuplicateNamesInBuildArray(latestRunningBuilds)) {
                        throw new Error("There are running builds with the same name. We didn't foresee this to happen. Sorry. Please contact us");
                    }
                }

                function haveDuplicateNamesInBuildArray(buildArray) {
                    return buildArray
                        .map(failedBuild1 => buildArray.filter(failedBuild2 => failedBuild1.name === failedBuild2.name).length)
                        .filter(occurancesOfName => occurancesOfName > 1).length > 1;
                }
            });
    }

    getAllLatestRunningBuilds(baseUrl) {
        return this.teamcityBuildAdapter.getAllLatestRunningBuilds(baseUrl)
            .then(latestRunningBuilds => latestRunningBuilds
                .map(latestRunningBuild => {
                    latestRunningBuild.drawAttention = true;
                    return latestRunningBuild;
                }));
    }
}
