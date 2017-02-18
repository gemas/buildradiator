import { TeamcityBuildAdapter } from '../../anticorruptionlayer/teamcity-build-adapter';
import { inject } from 'aurelia-framework';

function isNotInBlackListBuilds(build) {
    return !this.getBlackListBuilds().includes(build.id);
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

                return latestFinishedBuilds
                    .filter(finishedBuild => finishedBuild.status === 'FAILURE')
                    .filter(finishedBuild => isNotInBlackListBuilds.bind(this)(finishedBuild))
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
        return this.teamcityBuildAdapter.getAllLatestRunningBuilds(baseUrl)
            .then(latestRunningBuilds => latestRunningBuilds
                .filter(latestRunningBuild => isNotInBlackListBuilds.bind(this)(latestRunningBuild))
                .map(latestRunningBuild => {
                    latestRunningBuild.drawAttention = true;
                    return latestRunningBuild;
                }));
    }

    addToBlackListBuilds(buildId) {
        localStorage.blackListBuilds = JSON.stringify(this.getBlackListBuilds().concat(buildId));
    }

    getBlackListBuilds(buildId) {
        return localStorage.blackListBuilds ? JSON.parse(localStorage.blackListBuilds) : [];
    }
}
