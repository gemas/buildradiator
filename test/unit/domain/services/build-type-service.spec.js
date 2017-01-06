import { BuildTypeService } from '../../../../src/domain/services/build-type-service';

describe('the buildTypeService', () => {

    describe('getBuildTypesGroupedByLabel method', () => {
        it('returns on object with the labels with it corresponding builds', (done) => {
            let teamcityBuildTypeAdapterStub = {
                getBuildTypes: function getBuildTypes(baseUrl) {
                    expect(baseUrl).toEqual("test.com");
                    return Promise.resolve([
                        {
                            id: "build_55_id",
                            name: "build 55"
                        },
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
                    ]);
                }
            };

            new BuildTypeService(teamcityBuildTypeAdapterStub).getBuildTypesGroupedByLabel("test.com")
                .then(returnedBuilds => expect(returnedBuilds).toEqual(
                    {
                        "build 55": {
                            type: "build"
                        },
                        "Proj1": {
                            type: "label",
                            "SubProj1": {
                                type: "label",
                                "build 1": {
                                    type: "build"
                                },
                                "SubProj2": {
                                    type: "label",
                                    "build 2": {
                                        type: "build"
                                    }
                                }
                            },
                            "build 3": {
                                type: "build"
                            }
                        }
                    }
                ))
                .catch(error => expect(error).toBeUndefined())
                .finally(done);
        });
    });

});