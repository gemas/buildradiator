import { App } from '../../src/app';

describe('the app', () => {
  it('should have an array with failed builds retrieved from the buildservice by initialization', (done) => {
    let buildServiceStub = { getAllFailedBuilds: (done) => Promise.resolve(['a', 'b', 'c']) }
    let app = new App(buildServiceStub);
    expectAtEndOfEventLoop(() => expect(app.builds).toEqual(['a', 'b', 'c']))

    function expectAtEndOfEventLoop(expectFunction) {
      setTimeout(() => {
        expectFunction();
        done();
      }, 0);
    }
  });
});

