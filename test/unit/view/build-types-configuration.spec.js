import { BuildTypesConfiguration } from '../../../src/view/build-types-configuration';

describe('the buildTypesConfiguration', () => {

    function putFunctionOnJobQueue(expectFunction) {
        Promise.resolve().then(expectFunction);
    }

    it('activate function should should ask and save the buildTypes from the buildTypesService using the baseUrl from the parameters', (done) => {
        let buildTypesConfiguration = new BuildTypesConfiguration({
            getBuildTypesGroupedByLabel: (baseUrl) => {
                expect(baseUrl).toEqual("baseUrl");
                return Promise.resolve(['a1', 'b1', 'c1']);
            }
        });

        buildTypesConfiguration.activate({ baseUrl: "baseUrl" }); 

        putFunctionOnJobQueue(() => expect(buildTypesConfiguration.buildTypesGroupedByLabel).toEqual(['a1', 'b1', 'c1']));
        putFunctionOnJobQueue(done);
    });

});
