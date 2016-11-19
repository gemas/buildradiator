import fixedArrayOfFailedBuilds from './fixed-array-of-failed-builds';

export class MockBuildService {
  getAllFailedBuilds() {
    return Promise.resolve(fixedArrayOfFailedBuilds);
  }
}
