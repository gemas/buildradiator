import { BuildTypeLabel } from '../../../../src/view/elements/build-type-label';

describe('the BuildTypeLabel', () => {

    describe('labelsBuildTypeGroupedByLabel', () => {
        it('returns an array with all the labels', () => {
            let buildTypeLabel = new BuildTypeLabel();
            buildTypeLabel.buildTypesGroupedByLabel = {
                type: "label",
                "build 55": {},
                "Proj1": {
                    "SubProj1": {},
                    "build 3": {}
                }
            };

            expect(buildTypeLabel.labelsBuildTypeGroupedByLabel).toEqual(["build 55", "Proj1"]);
        });
    });

    describe('given certain buildTypesGroupedByLabel', () => {
        let buildTypeLabel = new BuildTypeLabel();
        buildTypeLabel.buildTypesGroupedByLabel = {
            type: "label",
            "build 55": {
                type: "build"
            },
            "Proj1": {
                type: "label"
            }
        };

        describe('isNotABuildType', () => {
            it('returns false when element has "build" as a type', () => {
                expect(buildTypeLabel.isNotABuildType("build 55")).toBe(false);
            });

            it('returns true when element has not "build" as a type', () => {
                expect(buildTypeLabel.isNotABuildType("Proj1")).toBe(true);
            });
        });

        describe('isABuildType', () => {
            it('returns true when element has "build" as a type', () => {
                expect(buildTypeLabel.isABuildType("build 55")).toBe(true);
            });

            it('returns false when element has not "build" as a type', () => {
                expect(buildTypeLabel.isABuildType("Proj1")).toBe(false);
            });
        });
    });

    describe('getId', () => {
        let buildTypeLabel = new BuildTypeLabel();
        buildTypeLabel.buildTypesGroupedByLabel = {
            type: "label",
            "build 55": {
                type: "build",
                id: "someId"
            },
            "Proj1": {
                type: "label"
            }
        };

        it('given an element of the type build retuns his id', () => {
            expect(buildTypeLabel.getId("build 55")).toBe("someId");
        });

        it('given an element not of the type build returns an empty id', () => {
            expect(buildTypeLabel.getId("Proj1")).toBe("");
        });
    });

    describe('changeStatusBuildType', () => {

        it('given checked is false addToBlackListBuilds of buildservice is called with id of element', () => {
            let buildTypeLabel = new BuildTypeLabel({addToBlackListBuilds: _passedId => passedId = _passedId});
            var passedId;

            buildTypeLabel.changeStatusBuildType({target: {id: "some id", checked: false}});

            expect(passedId).toBe("some id");
        });

        it('given checked is true removeFromBlackListBuilds of buildservice is called with id of element', () => {
            let buildTypeLabel = new BuildTypeLabel({removeFromBlackListBuilds: _passedId => passedId = _passedId});
            var passedId;

            buildTypeLabel.changeStatusBuildType({target: {id: "some id", checked: true}});

            expect(passedId).toBe("some id");
        });
    });

    describe('isChecked', () => {

        let buildTypeLabel = new BuildTypeLabel({isInBlackListBuilds: id => id === "someId"});

        buildTypeLabel.buildTypesGroupedByLabel = {
            type: "label",
            "build 55": {
                type: "build",
                id: "someId"
            },
            "build 1": {
                type: "build",
                id: "someOtherId"
            },
        };

        it('given id that belongs to label is in blacklist returns false', () => {
            expect(buildTypeLabel.isChecked("build 55")).toBe(false);
        });

        it('given id that belongs to label is not blacklist returns true', () => {
            expect(buildTypeLabel.isChecked("build 1")).toBe(true);
        });
    });
});