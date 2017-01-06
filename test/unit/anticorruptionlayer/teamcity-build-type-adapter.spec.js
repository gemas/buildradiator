import { TeamcityBuildTypeAdapter } from '../../../src/anticorruptionlayer/teamcity-build-type-adapter';
import makeClientStub from './client-stub-factory.js'

describe('the teamcityBuildTypeAdapter ', () => {
    it('asks the buildTypes from teamcity and transforms those to buildTypes from our domain', (done) => {
        var fetchResponse = {
            "count": 2,
            "href": "/httpAuth/app/rest/buildTypes",
            "buildType": [
                {
                    "id": "build_1_id",
                    "name": "build 1",
                    "projectName": "Proj1 :: SubProj1",
                    "projectId": "Proj1_SubProj1",
                    "href": "/httpAuth/app/rest/buildTypes/id:build_1_id",
                    "webUrl": "http://testurl.com/viewType.html?buildTypeId=build_1_id"
                },
                {
                    "id": "build_2_id",
                    "name": "build 2",
                    "projectName": "Proj1 :: SubProj1 :: SubProj2",
                    "projectId": "Proj1_SubProj1_SubProj3",
                    "href": "/httpAuth/app/rest/buildTypes/id:build_2_id",
                    "webUrl": "http://testurl.com/viewType.html?buildTypeId=build_2_id"
                },
                {
                    "id": "build_3_id",
                    "name": "build 3",
                    "projectName": "Proj1",
                    "projectId": "Proj1",
                    "href": "/httpAuth/app/rest/buildTypes/id:build_3_id",
                    "webUrl": "http://testurl.com/viewType.html?buildTypeId=build_3_id"
                }]
        };

        new TeamcityBuildTypeAdapter(makeClientStub("teamcityUrl.com/guestAuth/app/rest/buildTypes", fetchResponse))
            .getBuildTypes("teamcityUrl.com")
            .then(returnedBuildTypes => expect(returnedBuildTypes).toEqual([
                {
                    id: "build_1_id",
                    name: "build 1",
                    label: {
                        name: "SubProj1", label: { name: "Proj1" }
                    }
                },
                {
                    id: "build_2_id",
                    name: "build 2",
                    label: {
                        name: "SubProj2", label: { name: "SubProj1", label: { name: "Proj1" } }
                    }
                },
                {
                    id: "build_3_id",
                    name: "build 3",
                    label: {
                        name: "Proj1"
                    }
                }
            ]))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});


