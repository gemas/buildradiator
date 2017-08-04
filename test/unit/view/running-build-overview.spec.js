import { RunningBuildOverview } from '../../../src/view/running-build-overview';

function putFunctionOnJobQueue(expectFunction) {
  Promise.resolve().then(expectFunction);
}

function makeBuildServiceStub() {
  let count = 0;

  function getAllLatestRunningBuilds(baseUrl) {
    count++;
    expect(baseUrl).toEqual("baseUrl");
    return Promise.resolve(['a' + count, 'b' + count, 'c' + count]);
  }
  return { getAllLatestRunningBuilds: getAllLatestRunningBuilds };
}

describe('the running build overview', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should ask and save the latest running builds from the buildService using the baseUrl from the parameters every 30 seconds', (done) => {

    let runningBuildOverview = new RunningBuildOverview(makeBuildServiceStub());

    runningBuildOverview.activate({ baseUrl: "baseUrl" });
    putFunctionOnJobQueue(() => expect(runningBuildOverview.builds).toEqual(['a1', 'b1', 'c1']));

    jasmine.clock().tick(30000);

    putFunctionOnJobQueue(() => expect(runningBuildOverview.builds).toEqual(['a2', 'b2', 'c2']));

    jasmine.clock().tick(29999);

    putFunctionOnJobQueue(() => expect(runningBuildOverview.builds).toEqual(['a2', 'b2', 'c2']));

    jasmine.clock().tick(1);

    putFunctionOnJobQueue(() => expect(runningBuildOverview.builds).toEqual(['a3', 'b3', 'c3']));

    putFunctionOnJobQueue(done);
  });

  describe('property baseUrl', () => {
    it('returns the baseUrl given as parameter', (done) => {
      let runningBuildOverview = new RunningBuildOverview(makeBuildServiceStub());
      runningBuildOverview.activate({ baseUrl: "baseUrl" });

      putFunctionOnJobQueue(() => expect(runningBuildOverview.baseUrl).toEqual("baseUrl"));
      putFunctionOnJobQueue(done);
    });
  });
});

