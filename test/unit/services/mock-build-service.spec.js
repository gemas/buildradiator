import { MockBuildService } from '../../../src/services/mock-build-service';
import fixedArrayOfFailedBuilds from '../../../src/services/fixed-array-of-failed-builds';

describe('the mockBuildService getAllFailedBuilds method', () => {
    it('returns a fixed array of failed builds', (done) => {
        new MockBuildService()
            .getAllFailedBuilds()
            .then(returnedBuilds => expect(fixedArrayOfFailedBuilds).toBe(returnedBuilds))
            .catch(error => expect(error).toBeUndefined())
            .finally(done);
    });
});


