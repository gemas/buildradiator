import { BuildOverview } from '../../src/build-overview';

describe('the build overview', () => {
  it('activate function should ask the failedbuilds from buildservice with the baseurl from the parameters and set the result on the build overview', (done) => {
    let buildServiceStub = {
      getAllFailedBuilds: function getAllFailedBuilds(baseUrl) {
        expect(baseUrl).toEqual("baseUrl");
        return Promise.resolve(['a', 'b', 'c'])
      }
    }
    let buildOverview = new BuildOverview(buildServiceStub);
    buildOverview.activate({ baseUrl: "baseUrl" });
    expectAtEndOfJobQueue(() => expect(buildOverview.builds).toEqual(['a', 'b', 'c']))

    function expectAtEndOfJobQueue(expectFunction) {
      Promise.resolve().then(expectFunction).finally(done);
    }
  });
});

