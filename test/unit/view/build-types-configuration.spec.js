import { BuildTypesConfiguration } from '../../../src/view/build-types-configuration';

describe('the buildTypesConfiguration', () => {

    function putFunctionOnJobQueue(expectFunction) {
        Promise.resolve().then(expectFunction);
    }

    it('should initialize a buildTypesGroupedByLabel property with the object the getBuildTypesGroupedByLabel from the buildTypeService returns', (done) => {
        let buildTypesConfiguration = new BuildTypesConfiguration({ getBuildTypesGroupedByLabel: () => Promise.resolve(['a1', 'b1', 'c1'])});
        putFunctionOnJobQueue(() => expect(buildTypesConfiguration.buildTypesGroupedByLabel).toEqual(['a1', 'b1', 'c1']));
        putFunctionOnJobQueue(done);
    });

});
