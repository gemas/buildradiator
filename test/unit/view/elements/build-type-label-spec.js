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
});