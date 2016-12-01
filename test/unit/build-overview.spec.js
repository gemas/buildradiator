import { BuildOverview } from '../../src/build-overview';

function putFunctionOnJobQueue(expectFunction) {
  Promise.resolve().then(expectFunction);
}

describe('the build overview', () => {
  it('should ask and save the failedbuilds from the buildservice using the baseUrl from the parameters every 5 seconds', (done) => {
    function makeBuildServiceStub() {
      let count = 0;

      function getAllFailedBuilds(baseUrl) {
        count++;
        expect(baseUrl).toEqual("baseUrl");
        return Promise.resolve(['a' + count, 'b' + count, 'c' + count])
      }
      return { getAllFailedBuilds: getAllFailedBuilds }
    }

    jasmine.clock().install();
    let buildOverview = new BuildOverview(makeBuildServiceStub());

    buildOverview.activate({ baseUrl: "baseUrl" });
    putFunctionOnJobQueue(() => expect(buildOverview.builds).toEqual(['a1', 'b1', 'c1']));

    jasmine.clock().tick(5000);

    putFunctionOnJobQueue(() => expect(buildOverview.builds).toEqual(['a2', 'b2', 'c2']))

    jasmine.clock().tick(4999);

    putFunctionOnJobQueue(() => expect(buildOverview.builds).toEqual(['a2', 'b2', 'c2']))

    jasmine.clock().tick(1);

    putFunctionOnJobQueue(() => expect(buildOverview.builds).toEqual(['a3', 'b3', 'c3']))

    putFunctionOnJobQueue(done);
    jasmine.clock().uninstall();
  })
});

