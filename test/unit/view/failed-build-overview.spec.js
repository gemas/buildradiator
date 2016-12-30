import { FailedBuildOverview } from '../../../src/view/failed-build-overview';

describe('the failed build overview', () => {

  function putFunctionOnJobQueue(expectFunction) {
    Promise.resolve().then(expectFunction);
  }

  function makeBuildServiceStub() {
    let count = 0;

    function getAllFailedBuilds(baseUrl) {
      count++;
      expect(baseUrl).toEqual("baseUrl");
      return Promise.resolve(['a' + count, 'b' + count, 'c' + count]);
    }
    return { getAllFailedBuilds: getAllFailedBuilds };
  }

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('activate function', () => {
    it('should ask and save the failedbuilds from the buildFactory using the baseUrl from the parameters every 30 seconds', (done) => {

      let failedBuildOverview = new FailedBuildOverview(makeBuildServiceStub());

      failedBuildOverview.activate({ baseUrl: "baseUrl" });
      putFunctionOnJobQueue(() => expect(failedBuildOverview.builds).toEqual(['a1', 'b1', 'c1']));

      jasmine.clock().tick(30000);

      putFunctionOnJobQueue(() => expect(failedBuildOverview.builds).toEqual(['a2', 'b2', 'c2']));

      jasmine.clock().tick(29999);

      putFunctionOnJobQueue(() => expect(failedBuildOverview.builds).toEqual(['a2', 'b2', 'c2']));

      jasmine.clock().tick(1);

      putFunctionOnJobQueue(() => expect(failedBuildOverview.builds).toEqual(['a3', 'b3', 'c3']));

      putFunctionOnJobQueue(done);
    });
  });

  describe('addToBlackListFailedBuilds method', () => {
    it('should call addToBlackListFailedBuilds on the buildService even when "this" is not the FailedBuildOverview', () => {
      var addedId;
      var buildServiceStub = { addToBlackListFailedBuilds: (buildId) => addedId = buildId };
      var buildOverview = new FailedBuildOverview(buildServiceStub);

      buildOverview.addToBlackListFailedBuilds.apply({}, ["random_id"]);

      expect(addedId).toBe("random_id");
    });
  });
});
