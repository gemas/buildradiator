import { FailedBuildOverview } from '../../src/failed-build-overview';

function putFunctionOnJobQueue(expectFunction) {
  Promise.resolve().then(expectFunction);
}

function makeBuildFactoryStub() {
  let count = 0;

  function constructFailedBuildObjects(baseUrl) {
    count++;
    expect(baseUrl).toEqual("baseUrl");
    return Promise.resolve(['a' + count, 'b' + count, 'c' + count]);
  }
  return { constructFailedBuildObjects: constructFailedBuildObjects };
}

describe('the failed build overview', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should ask and save the failedbuilds from the buildFactory using the baseUrl from the parameters every 5 seconds', (done) => {

    let failedBuildOverview = new FailedBuildOverview(makeBuildFactoryStub());

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

