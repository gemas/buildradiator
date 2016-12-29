import { TeamcityBuildAdapter } from '../../anticorruptionlayer/teamcity-build-adapter';
import { inject } from 'aurelia-framework';

function getBlackListFailedBuilds() {
    return localStorage.blackListFailedBuilds ? JSON.parse(localStorage.blackListFailedBuilds) : [];
}

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

                function isNotInBlackListFailedBuilds(finishedBuild) {
                    return !getBlackListFailedBuilds().includes(finishedBuild.id);
                }

                return latestFinishedBuilds
                    .filter(finishedBuild => finishedBuild.status === 'FAILURE')
                    .filter(finishedBuild => isNotInBlackListFailedBuilds(finishedBuild))
                    .map(failedBuild => {
                        failedBuild.drawAttention = isNewBuildRunning();
                        return failedBuild;

                        function isNewBuildRunning() {

                            function getCorrespondingBuild() {
                                return latestRunningBuilds.filter(latestRunningBuild => latestRunningBuild.id === failedBuild.id)[0];
                            }

                            return getCorrespondingBuild() !== undefined && getCorrespondingBuild().buildNumber > failedBuild.buildNumber;
                        }
                    });
            });
    }

    getAllLatestRunningBuilds(baseUrl) {

        function getBlacklistLatestRunningBuilds() {
            return localStorage.blacklistLatestRunningBuilds ? JSON.parse(localStorage.blacklistLatestRunningBuilds) : [];
        }

        function isNotInBlacklistLatestRunningBuilds(runningBuild) {
            return !getBlacklistLatestRunningBuilds().includes(runningBuild.id);
        }

        return this.teamcityBuildAdapter.getAllLatestRunningBuilds(baseUrl)
            .then(latestRunningBuilds => latestRunningBuilds
                .filter(latestRunningBuild => isNotInBlacklistLatestRunningBuilds(latestRunningBuild))
                .map(latestRunningBuild => {
                    latestRunningBuild.drawAttention = true;
                    return latestRunningBuild;
                }));
    }

    addToBlackListFailedBuilds(buildId) {
        localStorage.blackListFailedBuilds = JSON.stringify(getBlackListFailedBuilds().concat(buildId));
    } 
}
