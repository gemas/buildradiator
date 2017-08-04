import { FailedBuildOverview } from '../../../src/view/failed-build-overview';

describe('the failed build overview', () => {

  function putFunctionOnJobQueue(expectFunction) {
    Promise.resolve().then(expectFunction);
  }

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('activate function', () => {
    function makeBuildServiceStub() {

      let count = 0;

      function getAllFailedBuilds(baseUrl) {
        count++;
        expect(baseUrl).toEqual("baseUrl");
        return Promise.resolve(['a' + count, 'b' + count, 'c' + count]);
      }
      return { getAllFailedBuilds: getAllFailedBuilds };
    }
    it('should ask and save the failedbuilds from the buildService using the baseUrl from the parameters every 30 seconds', (done) => {

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

  describe('hasFailedBuilds', () => {
    it('returns true when buildService returns builds', (done) => {
      var failedBuildOverview = new FailedBuildOverview({ getAllFailedBuilds: () => Promise.resolve(['A', 'B']) });
      failedBuildOverview.activate({ baseUrl: "baseUrl" });

      putFunctionOnJobQueue(() => expect(failedBuildOverview.hasFailedBuilds()).toEqual(true));
      putFunctionOnJobQueue(done);
    });

    it('returns false when buildService returns no builds', (done) => {
      var failedBuildOverview = new FailedBuildOverview({ getAllFailedBuilds: () => Promise.resolve([]) });
      failedBuildOverview.activate({ baseUrl: "baseUrl" });

      putFunctionOnJobQueue(() => expect(failedBuildOverview.hasFailedBuilds()).toEqual(false));
      putFunctionOnJobQueue(done);
    });

    it('returns false when buildService returns undefined', (done) => {
      var failedBuildOverview = new FailedBuildOverview({ getAllFailedBuilds: () => Promise.resolve(undefined) });
      failedBuildOverview.activate({ baseUrl: "baseUrl" });

      putFunctionOnJobQueue(() => expect(failedBuildOverview.hasFailedBuilds()).toEqual(false));
      putFunctionOnJobQueue(done);
    });

    it('returns false when buildService returns null', (done) => {
      var failedBuildOverview = new FailedBuildOverview({ getAllFailedBuilds: () => Promise.resolve(null) });
      failedBuildOverview.activate({ baseUrl: "baseUrl" });

      putFunctionOnJobQueue(() => expect(failedBuildOverview.hasFailedBuilds()).toEqual(false));
      putFunctionOnJobQueue(done);
    });
  });

  describe('property baseUrl', () => {
    it('returns the baseUrl given as parameter', (done) => {
      var failedBuildOverview = new FailedBuildOverview({ getAllFailedBuilds: () => Promise.resolve(['A', 'B']) });
      failedBuildOverview.activate({ baseUrl: "baseUrl" });

      putFunctionOnJobQueue(() => expect(failedBuildOverview.baseUrl).toEqual("baseUrl"));
      putFunctionOnJobQueue(done);
    });
  });
});
