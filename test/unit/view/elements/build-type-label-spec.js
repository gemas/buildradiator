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
});