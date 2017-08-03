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
                    .filter(failedBuild => isNotInBlackListBuilds.bind(this)(failedBuild))
                    .map(failedBuild => {
                        if(isNewBuildRunning()) {
                            var runningBuild = getCorrespondingRunningBuild();
                            runningBuild.drawAttention = true;
                            return runningBuild;
                        } 

                        return failedBuild;

                        function isNewBuildRunning() {
                            return getCorrespondingRunningBuild() !== undefined && getCorrespondingRunningBuild().buildNumber > failedBuild.buildNumber;
                        }

                        function getCorrespondingRunningBuild() { 
                            return latestRunningBuilds.filter(latestRunningBuild => latestRunningBuild.id === failedBuild.id)[0];
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

    removeFromBlackListBuilds(buildId) {
        localStorage.blackListBuilds = JSON.stringify(this.getBlackListBuilds().filter(blacklistBuildId => blacklistBuildId !== buildId));
    }

    getBlackListBuilds() {
        return localStorage.blackListBuilds ? JSON.parse(localStorage.blackListBuilds) : [];
    }

    isInBlackListBuilds(id) {
        return this.getBlackListBuilds().includes(id);
    }
}
