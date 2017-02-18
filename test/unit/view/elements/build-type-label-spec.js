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
            }

            expect(buildTypeLabel.labelsBuildTypeGroupedByLabel).toEqual(["build 55", "Proj1"]);
        });
    });

    describe('isNotABuildType', () => {
        let buildTypeLabel = new BuildTypeLabel();
        buildTypeLabel.buildTypesGroupedByLabel = {
            type: "label",
            "build 55": {
                type: "build"
            },
            "Proj1": {
                type: "label"
            }
        }

        it('returns false when element has "build" as a type', () => {
            expect(buildTypeLabel.isNotABuildType("build 55")).toBe(false);
        });

        it('returns true when element has not "build" as a type', () => {
            expect(buildTypeLabel.isNotABuildType("Proj1")).toBe(true);
        });
    });
});